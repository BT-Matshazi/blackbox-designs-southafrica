import { randomInt } from "node:crypto";

/** Unambiguous alphanumerics — no 0/O, 1/l/I. */
export const TEMP_PASSWORD_CHARSET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

const TEMP_PASSWORD_LENGTH = 16;

/** Generate a one-time password for an invited admin. */
export function generateTempPassword(): string {
  let password = "";
  for (let i = 0; i < TEMP_PASSWORD_LENGTH; i++) {
    password += TEMP_PASSWORD_CHARSET[randomInt(TEMP_PASSWORD_CHARSET.length)];
  }
  return password;
}
