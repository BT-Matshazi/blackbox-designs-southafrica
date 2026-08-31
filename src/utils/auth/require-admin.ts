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
  return user as AdminUser;
}
