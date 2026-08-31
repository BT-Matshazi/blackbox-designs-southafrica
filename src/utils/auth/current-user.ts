import "server-only";

import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { SESSION_COOKIE_NAME, verifySession } from "./session";
import type { UserRole } from "./roles";

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  mustChangePassword: boolean;
};

/**
 * Resolve the signed-in user from the session cookie. Returns null when no
 * cookie is present, the JWT is invalid/expired, or the user no longer exists.
 * Always re-reads the DB so a stale JWT role is never trusted for rendering.
 *
 * Server-only — do not import from a Client Component.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifySession(token);
  if (!payload) return null;

  const [row] = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
      mustChangePassword: users.mustChangePassword,
    })
    .from(users)
    .where(eq(users.id, payload.sub))
    .limit(1);

  return row ?? null;
}
