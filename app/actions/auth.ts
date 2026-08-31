"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users, authTokens } from "@/lib/drizzle/schema";
import { hashPassword, verifyPassword } from "@/src/utils/auth/password";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  signSession,
} from "@/src/utils/auth/session";
import {
  decideOtpAttempt,
  generateOtp,
  hashOtp,
  otpExpiry,
} from "@/src/utils/auth/otp";
import { sendPasswordResetOtpEmail } from "@/src/infrastructure/password-reset.infrastructure";
import { roleHomePath, type UserRole } from "@/src/utils/auth/roles";
import { safeNext } from "@/src/utils/auth/safe-next";

export type ActionState = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;
const CODE_RE = /^\d{6}$/;

function adminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_PROMOTE_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

function shouldBeAdmin(email: string): boolean {
  return adminEmails().has(email.toLowerCase());
}

async function setSession(userId: string, role: UserRole) {
  const jwt = await signSession({ sub: userId, role });
  const opts = sessionCookieOptions();
  const cookieStore = await cookies();
  cookieStore.set({ ...opts, value: jwt });
}

async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

async function issueResetOtp(user: {
  id: string;
  email: string;
  firstName: string | null;
}) {
  // Invalidate any open reset token so we never have two live at once.
  await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(authTokens.userId, user.id),
        eq(authTokens.purpose, "password_reset"),
        isNull(authTokens.consumedAt),
      ),
    );

  const code = generateOtp();
  const tokenHash = await hashOtp(code);

  await db.insert(authTokens).values({
    userId: user.id,
    purpose: "password_reset",
    tokenHash,
    expiresAt: otpExpiry(),
  });

  await sendPasswordResetOtpEmail({
    to: user.email,
    firstName: user.firstName,
    code,
  });
}

async function findActiveResetToken(userId: string) {
  const [row] = await db
    .select()
    .from(authTokens)
    .where(
      and(
        eq(authTokens.userId, userId),
        eq(authTokens.purpose, "password_reset"),
        isNull(authTokens.consumedAt),
        gt(authTokens.expiresAt, new Date()),
      ),
    )
    .orderBy(desc(authTokens.createdAt))
    .limit(1);
  return row ?? null;
}

export async function login(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!EMAIL_RE.test(email) || !password) {
    return { ok: false, error: "Invalid email or password." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return { ok: false, error: "Invalid email or password." };
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return { ok: false, error: "Invalid email or password." };
  }

  // Late promotion: if the env allowlist grew after the user was created, upgrade.
  let role = user.role;
  if (role !== "admin" && shouldBeAdmin(user.email)) {
    role = "admin";
    await db.update(users).set({ role }).where(eq(users.id, user.id));
  }

  await setSession(user.id, role);
  redirect(safeNext(next, roleHomePath(role)));
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function requestPasswordReset(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Always continue to the reset page so we never leak whether an email exists.
  if (user) {
    await issueResetOtp({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    });
  }

  redirect(`/auth/reset?email=${encodeURIComponent(email)}`);
}

export async function resetPassword(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const code = String(formData.get("code") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!CODE_RE.test(code)) {
    return { ok: false, error: "Enter the 6-digit code from your email." };
  }
  if (password.length < MIN_PASSWORD) {
    return {
      ok: false,
      error: `Password must be at least ${MIN_PASSWORD} characters.`,
    };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: "Passwords do not match." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Generic message — never confirm whether the email exists.
  if (!user) {
    return { ok: false, error: "Invalid code." };
  }

  const token = await findActiveResetToken(user.id);
  const decision = await decideOtpAttempt(
    token ? { tokenHash: token.tokenHash, attempts: token.attempts } : null,
    code,
  );

  if (decision.action === "reject") {
    if (token && (decision.consume || decision.incrementAttempts)) {
      await db
        .update(authTokens)
        .set({
          attempts: decision.incrementAttempts
            ? token.attempts + 1
            : token.attempts,
          consumedAt: decision.consume ? new Date() : token.consumedAt,
        })
        .where(eq(authTokens.id, token.id));
    }
    return { ok: false, error: decision.error };
  }

  await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(eq(authTokens.id, token!.id));

  const passwordHash = await hashPassword(password);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, user.id));

  await setSession(user.id, user.role);
  redirect(roleHomePath(user.role));
}
