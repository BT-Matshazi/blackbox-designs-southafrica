import { config } from "dotenv";
config({ path: ".env" });

import { Pool } from "pg";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }
  const pool = new Pool({ connectionString: url });

  const tables = await pool.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`,
  );
  const enums = await pool.query(
    `SELECT t.typname
     FROM pg_type t
     JOIN pg_namespace n ON n.oid = t.typnamespace
     WHERE n.nspname = 'public' AND t.typtype = 'e'
     ORDER BY t.typname`,
  );

  console.log("Tables in public schema:", tables.rows.map((r) => r.tablename));
  console.log("Enum types in public schema:", enums.rows.map((r) => r.typname));

  if (!process.argv.includes("--drop")) {
    console.log("\nDry run. Re-run with --drop to remove everything listed above.");
    await pool.end();
    return;
  }

  for (const { tablename } of tables.rows) {
    await pool.query(`DROP TABLE IF EXISTS "${tablename}" CASCADE`);
    console.log(`Dropped table ${tablename}`);
  }
  for (const { typname } of enums.rows) {
    await pool.query(`DROP TYPE IF EXISTS "${typname}" CASCADE`);
    console.log(`Dropped type ${typname}`);
  }
  // Drizzle keeps migration bookkeeping in its own schema; remove leftovers too.
  await pool.query(`DROP SCHEMA IF EXISTS drizzle CASCADE`);
  console.log("Dropped schema drizzle (if it existed)");

  await pool.end();
  console.log("Database cleared.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
