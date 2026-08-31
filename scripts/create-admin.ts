import { config } from "dotenv";
config({ path: ".env" });

import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { hashPassword } from "@/src/utils/auth/password";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error("Usage: npx tsx scripts/create-admin.ts <email> <password>");
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const normalized = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, normalized))
    .limit(1);

  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, role: "admin", updatedAt: new Date() })
      .where(eq(users.id, existing.id));
    console.log(`Updated ${normalized}: password set, role=admin.`);
  } else {
    await db
      .insert(users)
      .values({ email: normalized, passwordHash, role: "admin" });
    console.log(`Created admin ${normalized}.`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
