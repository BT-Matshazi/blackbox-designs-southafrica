import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  AuthenticationError,
  AuthorizationError,
} from "@/src/utils/error-handler";

vi.mock("server-only", () => ({}));
vi.mock("@/src/utils/auth/current-user", () => ({
  getCurrentUser: vi.fn(),
}));

import { getCurrentUser } from "@/src/utils/auth/current-user";
import { requireAdmin } from "@/src/utils/auth/require-admin";

const mockedGetCurrentUser = vi.mocked(getCurrentUser);

const adminUser = {
  id: "u1",
  email: "admin@example.com",
  firstName: "Ada",
  lastName: null,
  role: "admin" as const,
  mustChangePassword: false,
};

describe("requireAdmin", () => {
  beforeEach(() => {
    mockedGetCurrentUser.mockReset();
  });

  it("throws AuthenticationError when signed out", async () => {
    mockedGetCurrentUser.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toBeInstanceOf(AuthenticationError);
  });

  it("throws AuthorizationError for non-admins", async () => {
    mockedGetCurrentUser.mockResolvedValue({ ...adminUser, role: "user" });
    await expect(requireAdmin()).rejects.toBeInstanceOf(AuthorizationError);
  });

  it("throws AuthorizationError for admins who must still set their password", async () => {
    mockedGetCurrentUser.mockResolvedValue({
      ...adminUser,
      mustChangePassword: true,
    });
    await expect(requireAdmin()).rejects.toThrow(/password change required/i);
  });

  it("returns the user for a fully set-up admin", async () => {
    mockedGetCurrentUser.mockResolvedValue(adminUser);
    await expect(requireAdmin()).resolves.toEqual(adminUser);
  });
});
