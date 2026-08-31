import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL must be set for Drizzle Kit");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/drizzle/schema/index.ts",
  out: "./drizzle/migrations",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
