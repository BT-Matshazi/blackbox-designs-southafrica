import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
  plugins: [
    {
      name: "vite-mock-email-for-tests",
      apply: "serve",
      enforce: "pre",
      resolveId(id: string) {
        // Intercept email template import and replace with mock
        if (id.includes("lib/emails/contact-us")) {
          return path.resolve(import.meta.dirname, "vitest.email-mock.ts");
        }
        return null;
      },
    },
  ],
  test: {
    include: ["src/**/*.test.ts", "lib/**/*.test.ts"],
    environment: "node",
    env: {
      // Modules import lib/drizzle/db.ts at load time; the pool only connects
      // on first query, so a dummy URL keeps unit tests DB-free.
      DATABASE_URL: "postgresql://test:test@localhost:5432/test",
    },
  },
});
