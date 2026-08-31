import { describe, expect, it, vi } from "vitest";
import { SignJWT } from "jose";

const SECRET = "test-secret-that-is-at-least-32-chars!!";

// session.ts caches the encoded key, so reload the module per test to
// control JWT_SECRET.
async function loadSession(secret: string = SECRET) {
  vi.resetModules();
  process.env.JWT_SECRET = secret;
  return import("@/src/utils/auth/session");
}

function rawJwt(claims: Record<string, unknown>, exp: string) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("user-1")
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(SECRET));
}

describe("session", () => {
  it("round-trips a signed session", async () => {
    const { signSession, verifySession } = await loadSession();
    const jwt = await signSession({ sub: "user-1", role: "admin" });
    expect(await verifySession(jwt)).toEqual({ sub: "user-1", role: "admin" });
  });

  it("rejects a tampered token", async () => {
    const { signSession, verifySession } = await loadSession();
    const jwt = await signSession({ sub: "user-1", role: "admin" });
    expect(await verifySession(jwt.slice(0, -2) + "xx")).toBeNull();
  });

  it("rejects an expired token", async () => {
    const { verifySession } = await loadSession();
    const jwt = await rawJwt({ role: "admin" }, "-10s");
    expect(await verifySession(jwt)).toBeNull();
  });

  it("defaults unknown roles to user", async () => {
    const { verifySession } = await loadSession();
    const jwt = await rawJwt({ role: "superuser" }, "1h");
    expect(await verifySession(jwt)).toEqual({ sub: "user-1", role: "user" });
  });

  it("throws when JWT_SECRET is shorter than 32 chars", async () => {
    const { signSession } = await loadSession("too-short");
    await expect(signSession({ sub: "u", role: "user" })).rejects.toThrow(
      /32 characters/,
    );
  });
});
