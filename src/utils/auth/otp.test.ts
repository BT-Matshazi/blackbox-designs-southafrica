import { describe, expect, it } from "vitest";
import {
  OTP_MAX_ATTEMPTS,
  decideOtpAttempt,
  generateOtp,
  hashOtp,
  verifyOtp,
} from "@/src/utils/auth/otp";

describe("generateOtp", () => {
  it("always produces a 6-digit numeric string", () => {
    for (let i = 0; i < 100; i++) {
      expect(generateOtp()).toMatch(/^\d{6}$/);
    }
  });
});

describe("hashOtp / verifyOtp", () => {
  it("round-trips a code and rejects a wrong one", async () => {
    const hash = await hashOtp("123456");
    expect(await verifyOtp("123456", hash)).toBe(true);
    expect(await verifyOtp("654321", hash)).toBe(false);
  });
});

describe("decideOtpAttempt", () => {
  it("rejects when no active token exists (expired/consumed/none)", async () => {
    const d = await decideOtpAttempt(null, "123456");
    expect(d).toEqual({
      action: "reject",
      error: "Code expired or not found. Request a new one.",
      consume: false,
    });
  });

  it("rejects and consumes when attempts are exhausted", async () => {
    const tokenHash = await hashOtp("123456");
    const d = await decideOtpAttempt(
      { tokenHash, attempts: OTP_MAX_ATTEMPTS },
      "123456",
    );
    expect(d).toEqual({
      action: "reject",
      error: "Too many attempts. Request a new code.",
      consume: true,
    });
  });

  it("rejects a wrong code and increments attempts", async () => {
    const tokenHash = await hashOtp("123456");
    const d = await decideOtpAttempt({ tokenHash, attempts: 0 }, "000000");
    expect(d).toEqual({
      action: "reject",
      error: "Invalid code. Try again.",
      consume: false,
      incrementAttempts: true,
    });
  });

  it("consumes on the wrong code that hits the attempt cap", async () => {
    const tokenHash = await hashOtp("123456");
    const d = await decideOtpAttempt(
      { tokenHash, attempts: OTP_MAX_ATTEMPTS - 1 },
      "000000",
    );
    expect(d).toEqual({
      action: "reject",
      error: "Too many attempts. Request a new code.",
      consume: true,
      incrementAttempts: true,
    });
  });

  it("accepts the correct code", async () => {
    const tokenHash = await hashOtp("123456");
    const d = await decideOtpAttempt({ tokenHash, attempts: 2 }, "123456");
    expect(d).toEqual({ action: "accept" });
  });
});
