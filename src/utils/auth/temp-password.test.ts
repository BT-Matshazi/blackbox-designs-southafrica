import { describe, expect, it } from "vitest";
import {
  TEMP_PASSWORD_CHARSET,
  generateTempPassword,
} from "@/src/utils/auth/temp-password";

describe("generateTempPassword", () => {
  it("always produces 16 characters from the unambiguous charset", () => {
    for (let i = 0; i < 100; i++) {
      const pw = generateTempPassword();
      expect(pw).toHaveLength(16);
      for (const ch of pw) {
        expect(TEMP_PASSWORD_CHARSET).toContain(ch);
      }
    }
  });

  it("never contains ambiguous characters (0, O, 1, l, I)", () => {
    for (let i = 0; i < 100; i++) {
      expect(generateTempPassword()).not.toMatch(/[0O1lI]/);
    }
  });

  it("produces different passwords on consecutive calls", () => {
    expect(generateTempPassword()).not.toBe(generateTempPassword());
  });
});
