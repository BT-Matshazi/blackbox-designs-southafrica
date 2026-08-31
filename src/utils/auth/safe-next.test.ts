import { describe, expect, it } from "vitest";
import { safeNext } from "@/src/utils/auth/safe-next";

describe("safeNext", () => {
  it("allows same-origin relative paths, preserving the query", () => {
    expect(safeNext("/admin?status=new", "/")).toBe("/admin?status=new");
  });

  it("falls back for absolute URLs", () => {
    expect(safeNext("https://evil.com/phish", "/")).toBe("/");
  });

  it("falls back for protocol-relative URLs", () => {
    expect(safeNext("//evil.com", "/")).toBe("/");
  });

  it("falls back for backslash-normalised URLs", () => {
    expect(safeNext("/\\evil.com", "/")).toBe("/");
  });

  it("falls back for empty input", () => {
    expect(safeNext("", "/admin")).toBe("/admin");
  });
});
