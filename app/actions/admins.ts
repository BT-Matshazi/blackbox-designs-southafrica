"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { requireAdmin } from "@/src/utils/auth/require-admin";
import { hashPassword } from "@/src/utils/auth/password";
import { generateTempPassword } from "@/src/utils/auth/temp-password";
import { sendAdminInviteEmail } from "@/src/infrastructure/admin-invite.infrastructure";
import type { ActionState } from "./auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function inviteAdmin(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Not authorized" };
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!firstName) {
    return { ok: false, error: "First name is required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing.length > 0) {
    return { ok: false, error: "A user with this email already exists." };
  }

  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  const [created] = await db
    .insert(users)
    .values({
      email,
      firstName,
      lastName: lastName || null,
      passwordHash,
      role: "admin",
      mustChangePassword: true,
    })
    .returning({ id: users.id });

  const sent = await sendAdminInviteEmail({
    to: email,
    firstName,
    tempPassword,
  });

  if (!sent.success) {
    // Without the email the invitee can never log in, and the row would block
    // a retry — roll it back so the invite can simply be sent again.
    await db.delete(users).where(eq(users.id, created.id));
    return {
      ok: false,
      error: "Could not send the invite email. Nothing was created — try again.",
    };
  }

  revalidatePath("/admin/admins");
  return { ok: true };
}
