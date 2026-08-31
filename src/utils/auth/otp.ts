import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";

export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 15 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

/** Returns a zero-padded 6-digit numeric string. */
export function generateOtp(): string {
  return String(randomInt(0, 10 ** OTP_LENGTH)).padStart(OTP_LENGTH, "0");
}

export function hashOtp(code: string): Promise<string> {
  // 8 rounds is plenty for a 6-digit code that lives 15 min and has a 5-attempt cap.
  return bcrypt.hash(code, 8);
}

export function verifyOtp(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash);
}

export function otpExpiry(): Date {
  return new Date(Date.now() + OTP_TTL_MS);
}

export type OtpDecision =
  | {
      action: "reject";
      error: string;
      /** The caller must mark the token consumed. */
      consume: boolean;
      /** The caller must persist attempts + 1. */
      incrementAttempts?: boolean;
    }
  | { action: "accept" };

/**
 * Pure decision for one OTP attempt. The caller is responsible for looking up
 * the active token (filtering expired/consumed rows) and for persisting the
 * side effects this decision prescribes.
 */
export async function decideOtpAttempt(
  token: { tokenHash: string; attempts: number } | null,
  code: string,
): Promise<OtpDecision> {
  if (!token) {
    return {
      action: "reject",
      error: "Code expired or not found. Request a new one.",
      consume: false,
    };
  }

  if (token.attempts >= OTP_MAX_ATTEMPTS) {
    return {
      action: "reject",
      error: "Too many attempts. Request a new code.",
      consume: true,
    };
  }

  const ok = await verifyOtp(code, token.tokenHash);
  if (!ok) {
    const nextAttempts = token.attempts + 1;
    return {
      action: "reject",
      error:
        nextAttempts >= OTP_MAX_ATTEMPTS
          ? "Too many attempts. Request a new code."
          : "Invalid code. Try again.",
      consume: nextAttempts >= OTP_MAX_ATTEMPTS,
      incrementAttempts: true,
    };
  }

  return { action: "accept" };
}
