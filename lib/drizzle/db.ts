import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let pool: Pool | null = null;
let dbInstance: any = null;

function initializeDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  if (!dbInstance) {
    dbInstance = drizzle(pool, {
      schema,
      logger: process.env.NODE_ENV !== "production",
    });
  }
  return dbInstance;
}

export const db = new Proxy({}, {
  get(target, prop) {
    const instance = initializeDb();
    return Reflect.get(instance, prop);
  },
}) as any;
