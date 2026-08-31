import { SignJWT, jwtVerify } from "jose";
import { isUserRole, type UserRole } from "./roles";

export const SESSION_COOKIE_NAME = "session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export type SessionPayload = {
  sub: string;
  role: UserRole;
};

let cachedKey: Uint8Array | null = null;
function getKey(): Uint8Array {
  if (cachedKey) return cachedKey;
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be set to a value of at least 32 characters",
    );
  }
  cachedKey = new TextEncoder().encode(secret);
  return cachedKey;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getKey());
}

export async function verifySession(
  jwt: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(jwt, getKey(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string") return null;
    const role = isUserRole(payload.role) ? payload.role : "user";
    return { sub: payload.sub, role };
  } catch {
    return null;
  }
}

export function sessionCookieOptions(): {
  name: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
