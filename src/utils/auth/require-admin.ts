import "server-only";

import { getCurrentUser, type CurrentUser } from "./current-user";
import {
  AuthenticationError,
  AuthorizationError,
} from "@/src/utils/error-handler";

export type AdminUser = CurrentUser & { role: "admin" };

/**
 * Resolve the current user and assert they are an admin. Throws
 * AuthenticationError (401) if not signed in, AuthorizationError (403)
 * if signed in but not an admin.
 *
 * Server-only.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  if (user.role !== "admin") {
    throw new AuthorizationError("Admin role required");
  }
  // A temp-password session is not fully authorized until the invitee has
  // chosen their own password — the flag is an authorization boundary, not
  // just a UI redirect.
  if (user.mustChangePassword) {
    throw new AuthorizationError("Password change required");
  }
  return user as AdminUser;
}
