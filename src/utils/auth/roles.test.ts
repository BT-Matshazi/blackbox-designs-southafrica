import { describe, expect, it } from "vitest";
import { isUserRole, roleHomePath } from "@/src/utils/auth/roles";

describe("roles", () => {
  it("recognises valid roles", () => {
    expect(isUserRole("admin")).toBe(true);
    expect(isUserRole("user")).toBe(true);
    expect(isUserRole("scanner")).toBe(false);
    expect(isUserRole(null)).toBe(false);
  });

  it("routes admins to /admin and everyone else home", () => {
    expect(roleHomePath("admin")).toBe("/admin");
    expect(roleHomePath("user")).toBe("/");
  });
});
