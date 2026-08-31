# Admin Leads Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Persist contact-form leads to Postgres and expose them in an authenticated `/admin` dashboard, with auth ported from native-child-power-up-games (login + OTP password reset only).

**Architecture:** Drizzle ORM + `pg` on the existing `DATABASE_URL` Postgres (cleared first). Custom JWT-cookie auth (`jose` + `bcryptjs`), guarded three ways: `middleware.ts`, admin layout DB re-check, `requireAdmin()` in every admin action. Lead persistence slots into the existing clean architecture (`LeadRepository` interface + Drizzle infrastructure), saved by `ContactUsUseCase` *before* the notification emails are sent.

**Tech Stack:** Next.js 15.3.6 (App Router, React 19), TypeScript 5, Drizzle ORM, PostgreSQL, jose, bcryptjs, Tailwind 4, vitest.

**Spec:** `docs/superpowers/specs/2026-08-31-admin-leads-dashboard-design.md`

## Global Constraints

- Next.js **15.3.6** — `middleware.ts` at repo root (NOT `proxy.ts`, which is Next 16). `searchParams` is a Promise and must be awaited.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).
- Package manager: **npm**.
- `JWT_SECRET` must be ≥ 32 characters (enforced in code).
- Controllers/use cases return `{ success: boolean, error?: string }`; auth server actions return `ActionState = { ok: true } | { ok: false; error: string }` and `redirect()` on success.
- Server actions files start with `"use server"`. Server-only auth utils start with `import "server-only"`.
- Auth/admin pages set `robots: { index: false, follow: false }`.
- UI styling: Tailwind 4 theme tokens already defined in `app/globals.css` (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-muted-foreground`, `text-accent`, `bg-primary`, `font-display`, `font-mono`). Do NOT use native-child's `brand-cream` / `native-green` tokens — they don't exist here.
- Existing SMTP env vars are reused: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`. (Note: this repo uses `SMTP_PASSWORD`, not native-child's `SMTP_PASS`.)
- Tests run with `npm test` (vitest, node environment). TDD: write the failing test first for every unit-testable module.
- Commit after every task.

---

### Task 1: Dependencies, vitest, npm scripts

**Files:**
- Modify: `package.json` (via npm install + scripts edit)
- Create: `vitest.config.ts`
- Create: `lib/utils.test.ts` (sanity test proving the runner + alias work)

**Interfaces:**
- Consumes: nothing.
- Produces: `npm test` (vitest run), `npm run db:generate`, `npm run db:migrate` scripts; all runtime deps for later tasks.

- [ ] **Step 1: Install dependencies**

```bash
npm install drizzle-orm@^0.45.2 pg@^8.20.0 jose@^6.2.3 bcryptjs@^3.0.3 input-otp@^1.4.2 dotenv@^17.4.2
npm install -D drizzle-kit@^0.31.10 @types/pg @types/bcryptjs vitest tsx
```

- [ ] **Step 2: Add npm scripts**

In `package.json`, add to `"scripts"` (keep existing entries):

```json
"test": "vitest run",
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate",
"db:studio": "drizzle-kit studio"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
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
```

- [ ] **Step 4: Write the sanity test** — `lib/utils.test.ts`

```typescript
import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: 1 test PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/utils.test.ts
git commit -m "chore: add drizzle/auth dependencies and vitest setup"
```

---

### Task 2: Drizzle schema, config, db client, first migration

**Files:**
- Create: `lib/drizzle/schema/enums.ts`
- Create: `lib/drizzle/schema/schema.ts`
- Create: `lib/drizzle/schema/index.ts`
- Create: `lib/drizzle/db.ts`
- Create: `drizzle.config.ts`
- Generated: `drizzle/migrations/0000_*.sql`

**Interfaces:**
- Consumes: deps from Task 1.
- Produces: `db` (drizzle instance) from `@/lib/drizzle/db`; tables `users`, `authTokens`, `leads` and enums `userRole`, `authTokenPurpose`, `leadStatus`, `leadSource` from `@/lib/drizzle/schema`. Column shapes below are relied on by every later task.

- [ ] **Step 1: Create `lib/drizzle/schema/enums.ts`**

```typescript
import { pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const authTokenPurpose = pgEnum("auth_token_purpose", ["password_reset"]);

export const leadStatus = pgEnum("lead_status", ["new", "contacted", "closed"]);

/** Where a lead came from. Only "contact" is written in phase 1. */
export const leadSource = pgEnum("lead_source", ["contact", "onboarding"]);
```

- [ ] **Step 2: Create `lib/drizzle/schema/schema.ts`**

```typescript
import {
  pgTable,
  index,
  unique,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { authTokenPurpose, leadSource, leadStatus, userRole } from "./enums";

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    email: varchar({ length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    /** Bcrypt hash. Required — there is no guest/claimable-account flow here. */
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    role: userRole().notNull().default("user"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    unique("users_email_unique").on(table.email),
    index("users_email_idx").on(table.email),
  ],
);

export const authTokens = pgTable(
  "auth_tokens",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    purpose: authTokenPurpose().notNull(),
    /** Bcrypt hash of the 6-digit OTP. */
    tokenHash: varchar("token_hash", { length: 128 }).notNull(),
    attempts: integer().notNull().default(0),
    expiresAt: timestamp("expires_at").notNull(),
    consumedAt: timestamp("consumed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("auth_tokens_user_id_idx").on(table.userId),
    index("auth_tokens_user_purpose_idx").on(table.userId, table.purpose),
    index("auth_tokens_expires_at_idx").on(table.expiresAt),
  ],
);

export const leads = pgTable(
  "leads",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 30 }),
    company: varchar({ length: 200 }),
    message: text().notNull(),
    projectType: varchar("project_type", { length: 100 }),
    budgetRange: varchar("budget_range", { length: 100 }),
    /** File metadata only — the uploaded file's bytes are not stored anywhere. */
    attachmentName: varchar("attachment_name", { length: 255 }),
    attachmentSize: integer("attachment_size"),
    attachmentType: varchar("attachment_type", { length: 100 }),
    source: leadSource().notNull().default("contact"),
    status: leadStatus().notNull().default("new"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("leads_status_idx").on(table.status),
    index("leads_created_at_idx").on(table.createdAt),
    index("leads_email_idx").on(table.email),
  ],
);
```

- [ ] **Step 3: Create `lib/drizzle/schema/index.ts`**

```typescript
export * from "./enums";
export * from "./schema";
```

- [ ] **Step 4: Create `lib/drizzle/db.ts`**

```typescript
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, {
  schema,
  logger: process.env.NODE_ENV !== "production",
});
```

- [ ] **Step 5: Create `drizzle.config.ts`**

```typescript
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
```

- [ ] **Step 6: Generate the migration**

Run: `npm run db:generate`
Expected: creates `drizzle/migrations/0000_<name>.sql` containing `CREATE TABLE` for `users`, `auth_tokens`, `leads` and `CREATE TYPE` for the four enums. Do NOT run migrate yet — the DB is cleared in Task 3.

- [ ] **Step 7: Commit**

```bash
git add lib/drizzle drizzle.config.ts drizzle/
git commit -m "feat: add drizzle schema for users, auth tokens and leads"
```

---

### Task 3: Clear the database and migrate

The user has explicitly authorized clearing this database ("use existing DATABASE_URL — clear the db first"). Still: **list first, show the list in your task report, then drop.**

**Files:**
- Create: `scripts/clear-db.ts`

**Interfaces:**
- Consumes: `.env`'s `DATABASE_URL` (already present).
- Produces: a clean `public` schema containing exactly the Task 2 tables.

- [ ] **Step 1: Create `scripts/clear-db.ts`**

```typescript
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
```

- [ ] **Step 2: Dry-run to list contents**

Run: `npx tsx scripts/clear-db.ts`
Expected: prints the current tables and enum types. **Copy this list into your task report** so there is a record of what was removed.

- [ ] **Step 3: Drop everything**

Run: `npx tsx scripts/clear-db.ts --drop`
Expected: every listed table and type dropped, exit 0.

- [ ] **Step 4: Apply the migration**

Run: `npm run db:migrate`
Expected: applies `0000_*.sql` without error.

- [ ] **Step 5: Verify the new tables exist**

Run: `npx tsx scripts/clear-db.ts`
Expected: lists exactly `auth_tokens`, `leads`, `users` and enum types `auth_token_purpose`, `lead_source`, `lead_status`, `user_role`.

- [ ] **Step 6: Commit**

```bash
git add scripts/clear-db.ts
git commit -m "feat: add db clear script; apply initial migration"
```

---

### Task 4: Error classes, roles, JWT session (+tests)

**Files:**
- Create: `src/utils/error-handler.ts`
- Create: `src/utils/auth/roles.ts`
- Create: `src/utils/auth/session.ts`
- Test: `src/utils/auth/session.test.ts`, `src/utils/auth/roles.test.ts`

**Interfaces:**
- Consumes: `jose` (Task 1).
- Produces:
  - `AuthenticationError` (401), `AuthorizationError` (403), `ValidationError` (400), `NotFoundError` (404), base `ApplicationError` — from `@/src/utils/error-handler`.
  - `USER_ROLES: readonly ["user","admin"]`, `type UserRole`, `isUserRole(value: unknown): value is UserRole`, `roleHomePath(role: UserRole): string` — from `@/src/utils/auth/roles`.
  - `SESSION_COOKIE_NAME = "session"`, `type SessionPayload = { sub: string; role: UserRole }`, `signSession(payload): Promise<string>`, `verifySession(jwt): Promise<SessionPayload | null>`, `sessionCookieOptions()` — from `@/src/utils/auth/session`.

- [ ] **Step 1: Write the failing tests** — `src/utils/auth/session.test.ts`

```typescript
import { describe, expect, it, vi } from "vitest";
import { SignJWT } from "jose";

const SECRET = "test-secret-that-is-at-least-32-chars!!";

// session.ts caches the encoded key, so reload the module per test to
// control JWT_SECRET.
async function loadSession(secret: string = SECRET) {
  vi.resetModules();
  process.env.JWT_SECRET = secret;
  return import("@/src/utils/auth/session");
}

function rawJwt(claims: Record<string, unknown>, exp: string) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("user-1")
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(new TextEncoder().encode(SECRET));
}

describe("session", () => {
  it("round-trips a signed session", async () => {
    const { signSession, verifySession } = await loadSession();
    const jwt = await signSession({ sub: "user-1", role: "admin" });
    expect(await verifySession(jwt)).toEqual({ sub: "user-1", role: "admin" });
  });

  it("rejects a tampered token", async () => {
    const { signSession, verifySession } = await loadSession();
    const jwt = await signSession({ sub: "user-1", role: "admin" });
    expect(await verifySession(jwt.slice(0, -2) + "xx")).toBeNull();
  });

  it("rejects an expired token", async () => {
    const { verifySession } = await loadSession();
    const jwt = await rawJwt({ role: "admin" }, "-10s");
    expect(await verifySession(jwt)).toBeNull();
  });

  it("defaults unknown roles to user", async () => {
    const { verifySession } = await loadSession();
    const jwt = await rawJwt({ role: "superuser" }, "1h");
    expect(await verifySession(jwt)).toEqual({ sub: "user-1", role: "user" });
  });

  it("throws when JWT_SECRET is shorter than 32 chars", async () => {
    const { signSession } = await loadSession("too-short");
    await expect(signSession({ sub: "u", role: "user" })).rejects.toThrow(
      /32 characters/,
    );
  });
});
```

And `src/utils/auth/roles.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/src/utils/auth/session` / `roles`.

- [ ] **Step 3: Create `src/utils/error-handler.ts`**

(Trimmed port of native-child's — only the classes this project uses.)

```typescript
export class ApplicationError extends Error {
  public code?: string;
  public statusCode?: number;
  public details?: unknown;

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApplicationError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, details);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTHENTICATION_ERROR", 401);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string = "Access denied") {
    super(message, "AUTHORIZATION_ERROR", 403);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string = "The requested resource was not found") {
    super(message, "NOT_FOUND_ERROR", 404);
    this.name = "NotFoundError";
  }
}
```

- [ ] **Step 4: Create `src/utils/auth/roles.ts`**

```typescript
export const USER_ROLES = ["user", "admin"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" &&
    (USER_ROLES as readonly string[]).includes(value)
  );
}

export function roleHomePath(role: UserRole): string {
  return role === "admin" ? "/admin" : "/";
}
```

- [ ] **Step 5: Create `src/utils/auth/session.ts`**

(Direct port from native-child; only the roles import differs in effect.)

```typescript
import { SignJWT, jwtVerify } from "jose";
import { isUserRole, type UserRole } from "./roles";

export const SESSION_COOKIE_NAME = "session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;

export type SessionPayload = {
  sub: string;
  role: UserRole;
};

let cachedKey: Uint8Array | null = null;
function getKey(): Uint8Array {
  if (cachedKey) return cachedKey;
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be set to a value of at least 32 characters",
    );
  }
  cachedKey = new TextEncoder().encode(secret);
  return cachedKey;
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getKey());
}

export async function verifySession(
  jwt: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(jwt, getKey(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string") return null;
    const role = isUserRole(payload.role) ? payload.role : "user";
    return { sub: payload.sub, role };
  } catch {
    return null;
  }
}

export function sessionCookieOptions(): {
  name: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: all session + roles tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/utils/error-handler.ts src/utils/auth/roles.ts src/utils/auth/session.ts src/utils/auth/session.test.ts src/utils/auth/roles.test.ts
git commit -m "feat: add JWT session, roles and error classes"
```

---

### Task 5: Password hashing and OTP logic (+tests)

**Files:**
- Create: `src/utils/auth/password.ts`
- Create: `src/utils/auth/otp.ts`
- Test: `src/utils/auth/otp.test.ts`

**Interfaces:**
- Consumes: `bcryptjs`.
- Produces from `@/src/utils/auth/password`: `hashPassword(plain): Promise<string>`, `verifyPassword(plain, hash): Promise<boolean>`.
- Produces from `@/src/utils/auth/otp`: `OTP_LENGTH`, `OTP_TTL_MS`, `OTP_MAX_ATTEMPTS`, `generateOtp(): string`, `hashOtp(code): Promise<string>`, `verifyOtp(code, hash): Promise<boolean>`, `otpExpiry(): Date`, and the pure decision function used by Task 8's `resetPassword`:
  - `type OtpDecision = { action: "reject"; error: string; consume: boolean; incrementAttempts?: boolean } | { action: "accept" }`
  - `decideOtpAttempt(token: { tokenHash: string; attempts: number } | null, code: string): Promise<OtpDecision>`

- [ ] **Step 1: Write the failing tests** — `src/utils/auth/otp.test.ts`

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/src/utils/auth/otp`.

- [ ] **Step 3: Create `src/utils/auth/password.ts`**

```typescript
import bcrypt from "bcryptjs";

const ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
```

- [ ] **Step 4: Create `src/utils/auth/otp.ts`**

```typescript
import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";

export const OTP_LENGTH = 6;
export const OTP_TTL_MS = 15 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

/** Returns a zero-padded 6-digit numeric string. */
export function generateOtp(): string {
  return String(randomInt(0, 10 ** OTP_LENGTH)).padStart(OTP_LENGTH, "0");
}

export function hashOtp(code: string): Promise<string> {
  // 8 rounds is plenty for a 6-digit code that lives 15 min and has a 5-attempt cap.
  return bcrypt.hash(code, 8);
}

export function verifyOtp(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash);
}

export function otpExpiry(): Date {
  return new Date(Date.now() + OTP_TTL_MS);
}

export type OtpDecision =
  | {
      action: "reject";
      error: string;
      /** The caller must mark the token consumed. */
      consume: boolean;
      /** The caller must persist attempts + 1. */
      incrementAttempts?: boolean;
    }
  | { action: "accept" };

/**
 * Pure decision for one OTP attempt. The caller is responsible for looking up
 * the active token (filtering expired/consumed rows) and for persisting the
 * side effects this decision prescribes.
 */
export async function decideOtpAttempt(
  token: { tokenHash: string; attempts: number } | null,
  code: string,
): Promise<OtpDecision> {
  if (!token) {
    return {
      action: "reject",
      error: "Code expired or not found. Request a new one.",
      consume: false,
    };
  }

  if (token.attempts >= OTP_MAX_ATTEMPTS) {
    return {
      action: "reject",
      error: "Too many attempts. Request a new code.",
      consume: true,
    };
  }

  const ok = await verifyOtp(code, token.tokenHash);
  if (!ok) {
    const nextAttempts = token.attempts + 1;
    return {
      action: "reject",
      error:
        nextAttempts >= OTP_MAX_ATTEMPTS
          ? "Too many attempts. Request a new code."
          : "Invalid code. Try again.",
      consume: nextAttempts >= OTP_MAX_ATTEMPTS,
      incrementAttempts: true,
    };
  }

  return { action: "accept" };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: all otp tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/utils/auth/password.ts src/utils/auth/otp.ts src/utils/auth/otp.test.ts
git commit -m "feat: add password hashing and OTP primitives with attempt logic"
```

---

### Task 6: safeNext open-redirect guard (+tests)

**Files:**
- Create: `src/utils/auth/safe-next.ts`
- Test: `src/utils/auth/safe-next.test.ts`

**Interfaces:**
- Produces: `safeNext(next: string, fallback: string): string` from `@/src/utils/auth/safe-next`.

- [ ] **Step 1: Write the failing tests** — `src/utils/auth/safe-next.test.ts`

```typescript
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/src/utils/auth/safe-next`.

- [ ] **Step 3: Create `src/utils/auth/safe-next.ts`**

(Port of native-child's `safeNext`, parameterised on the fallback.)

```typescript
/**
 * Only allow same-origin relative paths for post-login redirects. Resolve
 * against a sentinel origin so protocol-relative ("//evil.com") and
 * backslash-normalised ("/\evil.com") values that browsers treat as external
 * are rejected.
 */
export function safeNext(next: string, fallback: string): string {
  if (next && !next.includes("\\")) {
    try {
      const url = new URL(next, "https://placeholder.invalid");
      if (url.origin === "https://placeholder.invalid") {
        return url.pathname + url.search;
      }
    } catch {
      // fall through to the fallback
    }
  }
  return fallback;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all safe-next tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/auth/safe-next.ts src/utils/auth/safe-next.test.ts
git commit -m "feat: add open-redirect guard for post-login next paths"
```

---

### Task 7: Lead domain, repository interface, Drizzle infrastructure

Thin DB layer — no unit tests; exercised by Task 8's use-case tests (mocked) and Task 12's end-to-end check (real).

**Files:**
- Create: `src/application/domain/lead.domain.ts`
- Create: `src/application/interface/lead.repository.ts`
- Create: `src/infrastructure/lead.infrastructure.ts`

**Interfaces:**
- Consumes: `db`, `leads` from Task 2.
- Produces from `@/src/application/domain/lead.domain`: `LEAD_STATUSES`, `type LeadStatus`, `isLeadStatus(value: unknown): value is LeadStatus`, `type LeadSource`, `interface NewLead`, `interface Lead`.
- Produces from `@/src/application/interface/lead.repository`: `interface LeadRepository`, `type LeadFilter`.
- Produces: `class LeadInfrastructure implements LeadRepository` from `@/src/infrastructure/lead.infrastructure`.

- [ ] **Step 1: Create `src/application/domain/lead.domain.ts`**

```typescript
export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isLeadStatus(value: unknown): value is LeadStatus {
  return (
    typeof value === "string" &&
    (LEAD_STATUSES as readonly string[]).includes(value)
  );
}

export type LeadSource = "contact" | "onboarding";

export interface NewLead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  projectType?: string;
  budgetRange?: string;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
  source: LeadSource;
}

export interface Lead extends NewLead {
  id: string;
  status: LeadStatus;
  createdAt: Date;
}
```

- [ ] **Step 2: Create `src/application/interface/lead.repository.ts`**

```typescript
import { Lead, LeadStatus, NewLead } from "../domain/lead.domain";

export type LeadFilter = {
  status?: LeadStatus;
  /** Case-insensitive substring match on name, email or company. */
  search?: string;
};

export interface LeadRepository {
  save(lead: NewLead): Promise<{ success: boolean; id?: string; error?: string }>;
  findAll(filter?: LeadFilter): Promise<Lead[]>;
  updateStatus(
    id: string,
    status: LeadStatus,
  ): Promise<{ success: boolean; error?: string }>;
}
```

- [ ] **Step 3: Create `src/infrastructure/lead.infrastructure.ts`**

```typescript
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { leads } from "@/lib/drizzle/schema";
import { Lead, LeadStatus, NewLead } from "@/src/application/domain/lead.domain";
import {
  LeadFilter,
  LeadRepository,
} from "@/src/application/interface/lead.repository";

type LeadRow = typeof leads.$inferSelect;

function toDomain(row: LeadRow): Lead {
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone ?? undefined,
    company: row.company ?? undefined,
    message: row.message,
    projectType: row.projectType ?? undefined,
    budgetRange: row.budgetRange ?? undefined,
    attachmentName: row.attachmentName ?? undefined,
    attachmentSize: row.attachmentSize ?? undefined,
    attachmentType: row.attachmentType ?? undefined,
    source: row.source,
    status: row.status,
    createdAt: row.createdAt,
  };
}

export class LeadInfrastructure implements LeadRepository {
  async save(
    lead: NewLead,
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const [row] = await db
        .insert(leads)
        .values({
          firstName: lead.firstName,
          lastName: lead.lastName,
          email: lead.email,
          phone: lead.phone ?? null,
          company: lead.company ?? null,
          message: lead.message,
          projectType: lead.projectType ?? null,
          budgetRange: lead.budgetRange ?? null,
          attachmentName: lead.attachmentName ?? null,
          attachmentSize: lead.attachmentSize ?? null,
          attachmentType: lead.attachmentType ?? null,
          source: lead.source,
        })
        .returning({ id: leads.id });
      return { success: true, id: row.id };
    } catch (error) {
      console.error("[LeadInfrastructure] Failed to save lead:", error);
      return { success: false, error: "Failed to save lead" };
    }
  }

  async findAll(filter?: LeadFilter): Promise<Lead[]> {
    const conditions = [];
    if (filter?.status) {
      conditions.push(eq(leads.status, filter.status));
    }
    if (filter?.search) {
      const term = `%${filter.search}%`;
      conditions.push(
        or(
          ilike(leads.firstName, term),
          ilike(leads.lastName, term),
          ilike(leads.email, term),
          ilike(leads.company, term),
        ),
      );
    }

    const rows = await db
      .select()
      .from(leads)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(leads.createdAt));

    return rows.map(toDomain);
  }

  async updateStatus(
    id: string,
    status: LeadStatus,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updated = await db
        .update(leads)
        .set({ status })
        .where(eq(leads.id, id))
        .returning({ id: leads.id });
      if (updated.length === 0) {
        return { success: false, error: "Lead not found" };
      }
      return { success: true };
    } catch (error) {
      console.error("[LeadInfrastructure] Failed to update status:", error);
      return { success: false, error: "Failed to update lead status" };
    }
  }
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/application/domain/lead.domain.ts src/application/interface/lead.repository.ts src/infrastructure/lead.infrastructure.ts
git commit -m "feat: add lead domain, repository interface and drizzle infrastructure"
```

---

### Task 8: Persist leads in ContactUsUseCase (+tests)

**Files:**
- Modify: `src/use-case/contact-us.use-case.ts` (full replacement below)
- Test: `src/use-case/contact-us.use-case.test.ts`

**Interfaces:**
- Consumes: `LeadRepository`, `LeadInfrastructure` (Task 7); existing `ContactUsRepository` (`sendContactUsEmail`), `ContactUsInfrastructure`, `ContactUs` domain.
- Produces: `ContactUsUseCase` with constructor `(contactUsRepository?: ContactUsRepository, leadRepository?: LeadRepository)` — defaults preserve the existing zero-arg call in `contact-us.controller.ts`, which needs **no changes**.

Behavior contract:
1. Required fields: `firstName`, `lastName`, `email`, `message` — `phone`/`company` become optional (fixes the existing mismatch with the UI, which sends `""` for them).
2. The lead is saved **before** the email is sent.
3. Result is `success: true` if the lead was saved OR the email was sent; `success: false` only when both fail.

- [ ] **Step 1: Write the failing tests** — `src/use-case/contact-us.use-case.test.ts`

```typescript
import { describe, expect, it, vi } from "vitest";
import { ContactUsUseCase } from "@/src/use-case/contact-us.use-case";
import { LeadRepository } from "@/src/application/interface/lead.repository";
import { ContactUsRepository } from "@/src/application/interface/contact-us.repository";

const baseData = {
  firstName: "Thandi",
  lastName: "Ndlovu",
  email: "thandi@example.com",
  company: "",
  phone: "",
  message: "I need a website for my new business.",
  projectType: "Web Development",
  budgetRange: "R25k – R50k",
};

function makeMocks({ saveOk = true, emailOk = true } = {}) {
  const calls: string[] = [];
  const leadRepo: LeadRepository = {
    save: vi.fn(async () => {
      calls.push("save");
      return saveOk
        ? { success: true, id: "lead-1" }
        : { success: false, error: "db down" };
    }),
    findAll: vi.fn(async () => []),
    updateStatus: vi.fn(async () => ({ success: true })),
  };
  const emailRepo: ContactUsRepository = {
    sendContactUsEmail: vi.fn(async () => {
      calls.push("email");
      return emailOk
        ? { success: true, messageId: "msg-1" }
        : { success: false, error: "smtp down" };
    }),
  };
  return { leadRepo, emailRepo, calls };
}

describe("ContactUsUseCase", () => {
  it("saves the lead before sending the email, tagged source=contact", async () => {
    const { leadRepo, emailRepo, calls } = makeMocks();
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);

    const result = await useCase.execute(baseData);

    expect(result.success).toBe(true);
    expect(calls).toEqual(["save", "email"]);
    expect(leadRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Thandi",
        email: "thandi@example.com",
        source: "contact",
      }),
    );
  });

  it("still succeeds when the email fails but the lead was saved", async () => {
    const { leadRepo, emailRepo } = makeMocks({ emailOk: false });
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute(baseData);
    expect(result.success).toBe(true);
  });

  it("still succeeds when persistence fails but the email was sent", async () => {
    const { leadRepo, emailRepo } = makeMocks({ saveOk: false });
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute(baseData);
    expect(result.success).toBe(true);
  });

  it("fails when both persistence and email fail", async () => {
    const { leadRepo, emailRepo } = makeMocks({ saveOk: false, emailOk: false });
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute(baseData);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("accepts empty phone and company (they are optional in the UI)", async () => {
    const { leadRepo, emailRepo } = makeMocks();
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute({ ...baseData, phone: "", company: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a submission with no message and touches nothing", async () => {
    const { leadRepo, emailRepo } = makeMocks();
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute({ ...baseData, message: "" });
    expect(result.success).toBe(false);
    expect(leadRepo.save).not.toHaveBeenCalled();
    expect(emailRepo.sendContactUsEmail).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `ContactUsUseCase` constructor takes no args yet and validation requires phone/company.

- [ ] **Step 3: Replace `src/use-case/contact-us.use-case.ts`**

```typescript
import { ContactUs } from "@/src/application/domain/contact-us.domain";
import { ContactUsRepository } from "@/src/application/interface/contact-us.repository";
import { LeadRepository } from "@/src/application/interface/lead.repository";
import { ContactUsInfrastructure } from "@/src/infrastructure/contact-us.infrastructure";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";

export class ContactUsUseCase {
  constructor(
    private contactUsRepository: ContactUsRepository = new ContactUsInfrastructure(),
    private leadRepository: LeadRepository = new LeadInfrastructure(),
  ) {}

  async execute(
    data: ContactUs,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return { success: false, error: "Name, email and message are required" };
    }

    // Persist first so an SMTP failure can never lose the lead.
    const saved = await this.leadRepository.save({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      company: data.company || undefined,
      message: data.message,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      attachmentName: data.attachmentName,
      attachmentSize: data.attachmentSize,
      attachmentType: data.attachmentType,
      source: "contact",
    });
    if (!saved.success) {
      console.error("[ContactUsUseCase] Lead persistence failed", {
        error: saved.error,
      });
    }

    const emailResult = await this.contactUsRepository.sendContactUsEmail(data);
    if (!emailResult.success) {
      console.error("[ContactUsUseCase] Notification email failed", {
        error: emailResult.error,
      });
    }

    if (saved.success || emailResult.success) {
      return { success: true, messageId: emailResult.messageId };
    }
    return {
      success: false,
      error: emailResult.error ?? "Failed to submit enquiry",
    };
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all use-case tests PASS (and everything from earlier tasks still green).

- [ ] **Step 5: Commit**

```bash
git add src/use-case/contact-us.use-case.ts src/use-case/contact-us.use-case.test.ts
git commit -m "feat: persist contact leads before sending notification emails"
```

---

### Task 9: Password-reset OTP email

**Files:**
- Create: `lib/emails/password-reset.tsx`
- Create: `src/infrastructure/password-reset.infrastructure.ts`

**Interfaces:**
- Consumes: `renderEmailTemplate` from `@/lib/utils`; SMTP env vars.
- Produces: `sendPasswordResetOtpEmail(args: { to: string; firstName: string | null; code: string }): Promise<{ success: boolean; error?: string }>` from `@/src/infrastructure/password-reset.infrastructure`.

- [ ] **Step 1: Create `lib/emails/password-reset.tsx`**

(Adapted from native-child's OTP email; Blackbox palette — ink `#131316`, crimson `#D43F52`, paper `#FBFAF7` — and no logo image.)

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export type PasswordResetEmailProps = {
  firstName: string | null;
  code: string;
  ttlMinutes: number;
};

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        ink: "#131316",
        crimson: "#D43F52",
        paper: "#FBFAF7",
        soft: "#F0EEE8",
        muted: "#6b6e7a",
      },
    },
  },
};

export default function PasswordResetEmail({
  firstName,
  code,
  ttlMinutes,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Your code is ${code}. Expires in ${ttlMinutes} minutes.`}</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-paper m-0 p-0 font-sans text-ink">
          <Container className="mx-auto max-w-[480px] px-6 py-10">
            <Section className="mb-8">
              <Text className="m-0 text-lg font-bold tracking-tight text-ink">
                BLACKBOX<span className="text-crimson">.</span>
              </Text>
            </Section>
            <Section>
              <Text className="m-0 text-[10px] uppercase tracking-[0.2em] text-muted">
                RESET YOUR PASSWORD
              </Text>
              <Heading className="mt-2 mb-1 text-2xl font-bold leading-tight tracking-tight text-ink">
                Reset your password
              </Heading>
              <Text className="m-0 mt-3 text-base leading-relaxed text-ink/80">
                {firstName ? `Hi ${firstName}, ` : ""}
                Use the code below to choose a new password for your Blackbox
                Designs admin account.
              </Text>
            </Section>

            <Section className="my-8 rounded-2xl bg-soft py-6 text-center">
              <Text className="m-0 font-mono text-4xl font-bold tracking-[0.4em] text-ink">
                {code}
              </Text>
              <Text className="m-0 mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">
                Expires in {ttlMinutes} minutes
              </Text>
            </Section>

            <Hr className="my-6 border-ink/10" />

            <Section>
              <Text className="m-0 text-[12px] leading-relaxed text-muted">
                If you didn&apos;t request this email, you can safely ignore
                it — no changes will be made to your account. The code can be
                used once and expires after {ttlMinutes} minutes.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```

- [ ] **Step 2: Create `src/infrastructure/password-reset.infrastructure.ts`**

(Same nodemailer pattern as `contact-us.infrastructure.ts` — note `SMTP_PASSWORD`.)

```typescript
import nodemailer, { TransportOptions } from "nodemailer";
import { renderEmailTemplate } from "@/lib/utils";
import PasswordResetEmail from "@/lib/emails/password-reset";
import { OTP_TTL_MS } from "@/src/utils/auth/otp";

export async function sendPasswordResetOtpEmail(args: {
  to: string;
  firstName: string | null;
  code: string;
}): Promise<{ success: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as TransportOptions);

  try {
    const html = await renderEmailTemplate(PasswordResetEmail, {
      firstName: args.firstName,
      code: args.code,
      ttlMinutes: Math.round(OTP_TTL_MS / 60000),
    });

    await transporter.sendMail({
      from: `"BlackBox Designs" <${process.env.EMAIL_FROM}>`,
      to: args.to,
      subject: "Reset your password",
      html,
    });

    return { success: true };
  } catch (error) {
    console.error(
      "[PasswordResetInfrastructure] Failed to send reset email:",
      error,
    );
    return { success: false, error: "Failed to send password reset email" };
  }
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/emails/password-reset.tsx src/infrastructure/password-reset.infrastructure.ts
git commit -m "feat: add password reset OTP email"
```

---

### Task 10: Auth server actions, current-user, require-admin

**Files:**
- Create: `src/utils/auth/current-user.ts`
- Create: `src/utils/auth/require-admin.ts`
- Create: `app/actions/auth.ts`

**Interfaces:**
- Consumes: everything from Tasks 4–7 and 9; `db`, `users`, `authTokens` from Task 2.
- Produces:
  - `getCurrentUser(): Promise<CurrentUser | null>` with `CurrentUser = { id, email, firstName, lastName, role }` — from `@/src/utils/auth/current-user`.
  - `requireAdmin(): Promise<AdminUser>` — from `@/src/utils/auth/require-admin`.
  - `type ActionState`, `login`, `logout`, `requestPasswordReset`, `resetPassword` server actions — from `@/app/actions/auth`. Signatures: `(prev: ActionState | null, formData: FormData) => Promise<ActionState>` for use with `useActionState`; `logout(): Promise<void>`.

- [ ] **Step 1: Create `src/utils/auth/current-user.ts`**

```typescript
import "server-only";

import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { SESSION_COOKIE_NAME, verifySession } from "./session";
import type { UserRole } from "./roles";

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
};

/**
 * Resolve the signed-in user from the session cookie. Returns null when no
 * cookie is present, the JWT is invalid/expired, or the user no longer exists.
 * Always re-reads the DB so a stale JWT role is never trusted for rendering.
 *
 * Server-only — do not import from a Client Component.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifySession(token);
  if (!payload) return null;

  const [row] = await db
    .select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, payload.sub))
    .limit(1);

  return row ?? null;
}
```

- [ ] **Step 2: Create `src/utils/auth/require-admin.ts`**

```typescript
import "server-only";

import { getCurrentUser, type CurrentUser } from "./current-user";
import {
  AuthenticationError,
  AuthorizationError,
} from "@/src/utils/error-handler";

export type AdminUser = CurrentUser & { role: "admin" };

/**
 * Resolve the current user and assert they are an admin. Throws
 * AuthenticationError (401) if not signed in, AuthorizationError (403)
 * if signed in but not an admin.
 *
 * Server-only.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  if (user.role !== "admin") {
    throw new AuthorizationError("Admin role required");
  }
  return user as AdminUser;
}
```

- [ ] **Step 3: Create `app/actions/auth.ts`**

(Port of native-child's actions minus signup/verification, using `decideOtpAttempt` and `safeNext`. `redirect()` throws internally — calls after it never run.)

```typescript
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/lib/drizzle/db";
import { users, authTokens } from "@/lib/drizzle/schema";
import { hashPassword, verifyPassword } from "@/src/utils/auth/password";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  signSession,
} from "@/src/utils/auth/session";
import {
  decideOtpAttempt,
  generateOtp,
  hashOtp,
  otpExpiry,
} from "@/src/utils/auth/otp";
import { sendPasswordResetOtpEmail } from "@/src/infrastructure/password-reset.infrastructure";
import { roleHomePath, type UserRole } from "@/src/utils/auth/roles";
import { safeNext } from "@/src/utils/auth/safe-next";

export type ActionState = { ok: true } | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;
const CODE_RE = /^\d{6}$/;

function adminEmails(): Set<string> {
  return new Set(
    (process.env.ADMIN_PROMOTE_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

function shouldBeAdmin(email: string): boolean {
  return adminEmails().has(email.toLowerCase());
}

async function setSession(userId: string, role: UserRole) {
  const jwt = await signSession({ sub: userId, role });
  const opts = sessionCookieOptions();
  const cookieStore = await cookies();
  cookieStore.set({ ...opts, value: jwt });
}

async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

async function issueResetOtp(user: {
  id: string;
  email: string;
  firstName: string | null;
}) {
  // Invalidate any open reset token so we never have two live at once.
  await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(authTokens.userId, user.id),
        eq(authTokens.purpose, "password_reset"),
        isNull(authTokens.consumedAt),
      ),
    );

  const code = generateOtp();
  const tokenHash = await hashOtp(code);

  await db.insert(authTokens).values({
    userId: user.id,
    purpose: "password_reset",
    tokenHash,
    expiresAt: otpExpiry(),
  });

  await sendPasswordResetOtpEmail({
    to: user.email,
    firstName: user.firstName,
    code,
  });
}

async function findActiveResetToken(userId: string) {
  const [row] = await db
    .select()
    .from(authTokens)
    .where(
      and(
        eq(authTokens.userId, userId),
        eq(authTokens.purpose, "password_reset"),
        isNull(authTokens.consumedAt),
        gt(authTokens.expiresAt, new Date()),
      ),
    )
    .orderBy(desc(authTokens.createdAt))
    .limit(1);
  return row ?? null;
}

export async function login(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!EMAIL_RE.test(email) || !password) {
    return { ok: false, error: "Invalid email or password." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return { ok: false, error: "Invalid email or password." };
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return { ok: false, error: "Invalid email or password." };
  }

  // Late promotion: if the env allowlist grew after the user was created, upgrade.
  let role = user.role;
  if (role !== "admin" && shouldBeAdmin(user.email)) {
    role = "admin";
    await db.update(users).set({ role }).where(eq(users.id, user.id));
  }

  await setSession(user.id, role);
  redirect(safeNext(next, roleHomePath(role)));
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function requestPasswordReset(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Always continue to the reset page so we never leak whether an email exists.
  if (user) {
    await issueResetOtp({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    });
  }

  redirect(`/auth/reset?email=${encodeURIComponent(email)}`);
}

export async function resetPassword(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const code = String(formData.get("code") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!CODE_RE.test(code)) {
    return { ok: false, error: "Enter the 6-digit code from your email." };
  }
  if (password.length < MIN_PASSWORD) {
    return {
      ok: false,
      error: `Password must be at least ${MIN_PASSWORD} characters.`,
    };
  }
  if (password !== confirmPassword) {
    return { ok: false, error: "Passwords do not match." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  // Generic message — never confirm whether the email exists.
  if (!user) {
    return { ok: false, error: "Invalid code." };
  }

  const token = await findActiveResetToken(user.id);
  const decision = await decideOtpAttempt(
    token ? { tokenHash: token.tokenHash, attempts: token.attempts } : null,
    code,
  );

  if (decision.action === "reject") {
    if (token && (decision.consume || decision.incrementAttempts)) {
      await db
        .update(authTokens)
        .set({
          attempts: decision.incrementAttempts
            ? token.attempts + 1
            : token.attempts,
          consumedAt: decision.consume ? new Date() : token.consumedAt,
        })
        .where(eq(authTokens.id, token.id));
    }
    return { ok: false, error: decision.error };
  }

  await db
    .update(authTokens)
    .set({ consumedAt: new Date() })
    .where(eq(authTokens.id, token!.id));

  const passwordHash = await hashPassword(password);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, user.id));

  await setSession(user.id, user.role);
  redirect(roleHomePath(user.role));
}
```

- [ ] **Step 4: Type-check and run tests**

Run: `npx tsc --noEmit && npm test`
Expected: no type errors; all existing tests still PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/auth/current-user.ts src/utils/auth/require-admin.ts app/actions/auth.ts
git commit -m "feat: add auth server actions with login and OTP password reset"
```

---

### Task 11: Admin bootstrap script

**Files:**
- Create: `scripts/create-admin.ts`

**Interfaces:**
- Consumes: `db`, `users` (Task 2), `hashPassword` (Task 5).
- Produces: `npx tsx scripts/create-admin.ts <email> <password>` — creates or updates a user as admin. (tsx resolves the `@/*` alias from tsconfig, same as native-child's scripts.)

- [ ] **Step 1: Create `scripts/create-admin.ts`**

```typescript
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
```

- [ ] **Step 2: Smoke-test against the real DB**

Run: `npx tsx scripts/create-admin.ts smoke-test@example.com temp-password-123`
Expected: `Created admin smoke-test@example.com.`
Then run it again with the same email: expected `Updated smoke-test@example.com: password set, role=admin.`
Clean up: delete the smoke user —

```bash
npx tsx -e "import('dotenv').then(d=>{d.config({path:'.env'});return import('pg')}).then(async ({Pool})=>{const p=new Pool({connectionString:process.env.DATABASE_URL});await p.query(\"DELETE FROM users WHERE email='smoke-test@example.com'\");await p.end();console.log('cleaned');})"
```

- [ ] **Step 3: Commit**

```bash
git add scripts/create-admin.ts
git commit -m "feat: add create-admin bootstrap script"
```

---

### Task 12: Middleware and auth UI (login, forgot, reset)

**Files:**
- Create: `middleware.ts` (repo root)
- Create: `components/auth/auth-shell.tsx`
- Create: `components/auth/password-field.tsx`
- Create: `components/ui/input-otp.tsx`
- Create: `app/login/page.tsx`, `app/login/login-form.tsx`
- Create: `app/auth/forgot/page.tsx`, `app/auth/forgot/forgot-form.tsx`
- Create: `app/auth/reset/page.tsx`, `app/auth/reset/reset-form.tsx`

**Interfaces:**
- Consumes: `login`, `logout`, `requestPasswordReset`, `resetPassword`, `ActionState` (Task 10); `getCurrentUser` (Task 10); `roleHomePath` (Task 4); `SESSION_COOKIE_NAME`, `verifySession` (Task 4); `input-otp` package; `cn` from `@/lib/utils`.
- Produces: `/login`, `/auth/forgot`, `/auth/reset` pages; edge guard for `/admin/:path*`; `AuthShell`, `AuthField`, `AuthError`, `AuthSubmit` components reused by nothing else yet but exported from `@/components/auth/auth-shell`.

- [ ] **Step 1: Create `middleware.ts`** (repo root, NOT inside `app/`)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySession } from "@/src/utils/auth/session";

function loginUrl(req: NextRequest): URL {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return url;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(loginUrl(req));
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.redirect(loginUrl(req));
  }

  if (session.role === "admin") {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 2: Create `components/auth/auth-shell.tsx`**

(Structure from native-child, restyled with Blackbox theme tokens.)

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PasswordField } from "./password-field";

export function AuthShell({
  eyebrow,
  heading,
  intro,
  children,
}: {
  eyebrow: string;
  heading: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-accent"
        >
          <ArrowLeft className="size-3.5" />
          Back to site
        </Link>

        <header className="mt-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h1>
          {intro && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </header>

        <section className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-7">
          {children}
        </section>
      </div>
    </main>
  );
}

export function AuthField({
  name,
  label,
  type = "text",
  autoComplete,
  required,
  defaultValue,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  if (type === "password") {
    return (
      <PasswordField
        name={name}
        label={label}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
      />
    );
  }

  return (
    <label className="grid gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </label>
  );
}

export function AuthError({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {children}
    </p>
  );
}

export function AuthSubmit({
  pending,
  pendingLabel,
  children,
}: {
  pending: boolean;
  pendingLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
```

- [ ] **Step 3: Create `components/auth/password-field.tsx`**

```tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Password input with a show/hide toggle. Rendered by AuthField whenever
 * `type="password"` — don't use directly; keep styles in sync with AuthField.
 */
export function PasswordField({
  name,
  label,
  autoComplete,
  required,
  placeholder,
}: {
  name: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="grid gap-1.5">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <div className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-input bg-background pl-4 pr-11 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </label>
  );
}
```

- [ ] **Step 4: Create `components/ui/input-otp.tsx`**

```tsx
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const ctx = React.useContext(OTPInputContext);
  const slot = ctx?.slots[index];

  return (
    <div
      data-slot="input-otp-slot"
      data-active={slot?.isActive}
      className={cn(
        "relative flex h-12 w-10 items-center justify-center border-y border-r border-border bg-card text-base font-semibold tabular-nums text-foreground shadow-xs transition-all outline-none",
        "first:rounded-l-lg first:border-l last:rounded-r-lg",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/30",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        className,
      )}
      {...props}
    >
      {slot?.char}
      {slot?.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="h-5 w-px animate-pulse bg-foreground/70" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <Minus className="size-4 text-muted-foreground" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
```

- [ ] **Step 5: Create `app/login/page.tsx`**

```tsx
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { LoginForm } from "./login-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Log in · Blackbox Designs",
  robots: { index: false, follow: false },
};

type LoginSearchParams = Promise<{ next?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: LoginSearchParams;
}) {
  const user = await getCurrentUser();
  if (user) redirect(roleHomePath(user.role));

  const { next } = await searchParams;

  return (
    <AuthShell
      eyebrow="Admin access"
      heading="Log in."
      intro="This area is for Blackbox Designs administrators."
    >
      <LoginForm next={next} />
    </AuthShell>
  );
}
```

- [ ] **Step 6: Create `app/login/login-form.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import {
  AuthField,
  AuthError,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="grid gap-4">
      {next && <input type="hidden" name="next" value={next} />}

      <AuthField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      <AuthField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
      />

      <div className="-mt-1 text-right">
        <Link
          href="/auth/forgot"
          className="text-xs font-medium text-accent hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {state?.ok === false && <AuthError>{state.error}</AuthError>}

      <AuthSubmit pending={pending} pendingLabel="Logging in…">
        Log in
      </AuthSubmit>
    </form>
  );
}
```

- [ ] **Step 7: Create `app/auth/forgot/page.tsx` and `app/auth/forgot/forgot-form.tsx`**

`app/auth/forgot/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotForm } from "./forgot-form";

export const metadata: Metadata = {
  title: "Forgot password · Blackbox Designs",
  robots: { index: false, follow: false },
};

export default async function ForgotPage() {
  const user = await getCurrentUser();
  if (user) redirect(roleHomePath(user.role));

  return (
    <AuthShell
      eyebrow="Password reset"
      heading="Forgot your password?"
      intro="Enter your email and we'll send you a 6-digit reset code."
    >
      <ForgotForm />
    </AuthShell>
  );
}
```

`app/auth/forgot/forgot-form.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/auth";
import {
  AuthError,
  AuthField,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, null);

  return (
    <form action={action} className="grid gap-4">
      <AuthField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
      />
      {state?.ok === false && <AuthError>{state.error}</AuthError>}
      <AuthSubmit pending={pending} pendingLabel="Sending…">
        Send reset code
      </AuthSubmit>
    </form>
  );
}
```

- [ ] **Step 8: Create `app/auth/reset/page.tsx` and `app/auth/reset/reset-form.tsx`**

`app/auth/reset/page.tsx`:

```tsx
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { roleHomePath } from "@/src/utils/auth/roles";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetForm } from "./reset-form";

export const metadata: Metadata = {
  title: "Reset password · Blackbox Designs",
  robots: { index: false, follow: false },
};

type ResetSearchParams = Promise<{ email?: string }>;

export default async function ResetPage({
  searchParams,
}: {
  searchParams: ResetSearchParams;
}) {
  const user = await getCurrentUser();
  if (user) redirect(roleHomePath(user.role));

  const { email } = await searchParams;
  if (!email) redirect("/auth/forgot");

  return (
    <AuthShell
      eyebrow="Password reset"
      heading="Check your email."
      intro={`We sent a 6-digit code to ${email}. Enter it below with your new password.`}
    >
      <ResetForm email={email} />
    </AuthShell>
  );
}
```

`app/auth/reset/reset-form.tsx`:

```tsx
"use client";

import { useActionState, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetPassword } from "@/app/actions/auth";
import {
  AuthError,
  AuthField,
  AuthSubmit,
} from "@/components/auth/auth-shell";

export function ResetForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(resetPassword, null);
  const [code, setCode] = useState("");

  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="code" value={code} />

      <div className="grid gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
          6-digit code
        </span>
        <InputOTP maxLength={6} value={code} onChange={setCode} autoFocus>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <AuthField
        name="password"
        label="New password (min 8 characters)"
        type="password"
        autoComplete="new-password"
        required
      />
      <AuthField
        name="confirmPassword"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
      />

      {state?.ok === false && <AuthError>{state.error}</AuthError>}

      <AuthSubmit pending={pending} pendingLabel="Updating password…">
        Reset password
      </AuthSubmit>
    </form>
  );
}
```

- [ ] **Step 9: Verify it builds and renders**

Requires `JWT_SECRET` in `.env` — if not yet present, generate and append one first:

```bash
grep -q '^JWT_SECRET=' .env || echo "JWT_SECRET=$(openssl rand -base64 48 | tr -d '/+=' | cut -c1-40)" >> .env
```

(If shell access to `.env` is denied, STOP and ask the user to add `JWT_SECRET` manually.)

Run: `npx tsc --noEmit`, then `npm run dev` in the background and:

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/login          # expect 200
curl -s -o /dev/null -w "%{http_code}" -L http://localhost:3000/admin       # expect 200 after redirect
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin          # expect 307 (redirect to /login)
```

Stop the dev server afterwards.

- [ ] **Step 10: Commit**

```bash
git add middleware.ts components/auth components/ui/input-otp.tsx app/login app/auth
git commit -m "feat: add admin middleware guard and auth pages"
```

---

### Task 13: Admin dashboard — leads list, detail, status updates

**Files:**
- Create: `app/actions/leads.ts`
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `components/admin/leads-table.tsx`

**Interfaces:**
- Consumes: `requireAdmin` (Task 10), `getCurrentUser` (Task 10), `logout` (Task 10), `LeadInfrastructure` (Task 7), `Lead`, `LEAD_STATUSES`, `isLeadStatus` (Task 7), `toast` from `sonner`, `cn` from `@/lib/utils`.
- Produces: `/admin` page; `updateLeadStatus(id: string, status: string): Promise<{ success: boolean; error?: string }>` server action from `@/app/actions/leads`.

- [ ] **Step 1: Create `app/actions/leads.ts`**

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/src/utils/auth/require-admin";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";
import { isLeadStatus } from "@/src/application/domain/lead.domain";

export async function updateLeadStatus(
  id: string,
  status: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAdmin();
  } catch {
    return { success: false, error: "Not authorized" };
  }

  if (!isLeadStatus(status)) {
    return { success: false, error: "Invalid status" };
  }

  const repo = new LeadInfrastructure();
  const result = await repo.updateStatus(id, status);
  if (result.success) {
    revalidatePath("/admin");
  }
  return result;
}
```

- [ ] **Step 2: Create `app/admin/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/utils/auth/current-user";
import { logout } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin · Blackbox Designs",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // DB-backed re-check — the middleware's JWT check alone would trust a
  // stale role claim.
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              Blackbox Designs
            </p>
            <p className="font-display text-lg font-semibold">Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Create `app/admin/page.tsx`**

```tsx
import Link from "next/link";
import { LeadInfrastructure } from "@/src/infrastructure/lead.infrastructure";
import {
  LEAD_STATUSES,
  isLeadStatus,
} from "@/src/application/domain/lead.domain";
import { LeadsTable } from "@/components/admin/leads-table";
import { cn } from "@/lib/utils";

type AdminSearchParams = Promise<{ status?: string; q?: string }>;

function filterHref(status: string | undefined, q: string | undefined) {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (q) params.set("q", q);
  const qs = params.toString();
  return qs ? `/admin?${qs}` : "/admin";
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: AdminSearchParams;
}) {
  const { status: rawStatus, q } = await searchParams;
  const status = rawStatus && isLeadStatus(rawStatus) ? rawStatus : undefined;

  const repo = new LeadInfrastructure();
  const leads = await repo.findAll({ status, search: q || undefined });

  const tabs: { label: string; value: string | undefined }[] = [
    { label: "All", value: undefined },
    ...LEAD_STATUSES.map((s) => ({ label: s, value: s as string })),
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-muted-foreground">
            {leads.length} {leads.length === 1 ? "lead" : "leads"}
            {status ? ` · ${status}` : ""}
            {q ? ` · matching “${q}”` : ""}
          </p>
        </div>

        <form action="/admin" method="get" className="flex items-center gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name, email, company…"
            className="h-9 w-64 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          <button
            type="submit"
            className="h-9 rounded-lg border border-border px-3 text-sm hover:bg-muted"
          >
            Search
          </button>
        </form>
      </div>

      <nav className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={filterHref(tab.value, q)}
            className={cn(
              "border-b-2 px-3 py-2 text-sm capitalize transition-colors",
              status === tab.value ||
                (tab.value === undefined && status === undefined)
                ? "border-accent font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <LeadsTable leads={leads} />
    </div>
  );
}
```

- [ ] **Step 4: Create `components/admin/leads-table.tsx`**

```tsx
"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { updateLeadStatus } from "@/app/actions/leads";
import {
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
} from "@/src/application/domain/lead.domain";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "border-accent/30 bg-accent/10 text-accent",
  contacted: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  closed: "border-border bg-muted text-muted-foreground",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (leads.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        No leads yet. New contact-form submissions will appear here.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">
              Project
            </th>
            <th className="hidden px-4 py-3 font-medium lg:table-cell">
              Budget
            </th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">
              Received
            </th>
            <th className="w-10 px-2 py-3" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              open={openId === lead.id}
              onToggle={() =>
                setOpenId(openId === lead.id ? null : lead.id)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadRow({
  lead,
  open,
  onToggle,
}: {
  lead: Lead;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-border last:border-b-0 hover:bg-muted/50"
      >
        <td className="px-4 py-3 font-medium">
          {lead.firstName} {lead.lastName}
        </td>
        <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
        <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
          {lead.projectType ?? "—"}
        </td>
        <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
          {lead.budgetRange ?? "—"}
        </td>
        <td className="px-4 py-3">
          <StatusSelect lead={lead} />
        </td>
        <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
          {formatDate(lead.createdAt)}
        </td>
        <td className="px-2 py-3">
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border bg-muted/30 last:border-b-0">
          <td colSpan={7} className="px-4 py-4">
            <div className="grid gap-3 text-sm">
              <p className="whitespace-pre-wrap leading-relaxed">
                {lead.message}
              </p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-4">
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Phone
                  </dt>
                  <dd>{lead.phone ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Company
                  </dt>
                  <dd>{lead.company ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Source
                  </dt>
                  <dd className="capitalize">{lead.source}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                    Attachment
                  </dt>
                  <dd>
                    {lead.attachmentName
                      ? `${lead.attachmentName}${
                          lead.attachmentSize
                            ? ` (${formatBytes(lead.attachmentSize)})`
                            : ""
                        } — metadata only, file not stored`
                      : "—"}
                  </dd>
                </div>
              </dl>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function StatusSelect({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={lead.status}
      disabled={pending}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        const status = e.target.value;
        startTransition(async () => {
          const result = await updateLeadStatus(lead.id, status);
          if (result.success) {
            toast.success("Status updated");
          } else {
            toast.error(result.error ?? "Failed to update status");
          }
        });
      }}
      className={cn(
        "h-7 cursor-pointer rounded-full border px-2 text-xs font-medium capitalize outline-none",
        STATUS_STYLES[lead.status],
        pending && "opacity-60",
      )}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
```

- [ ] **Step 5: Ensure sonner's `<Toaster />` is mounted**

Check `app/layout.tsx` for a `<Toaster` element (sonner). If it is already rendered there, do nothing. If not, add to `app/admin/layout.tsx`: import `{ Toaster } from "@/components/ui/sonner"` and render `<Toaster />` just before the closing `</div>` of the layout wrapper.

- [ ] **Step 6: Type-check and run tests**

Run: `npx tsc --noEmit && npm test`
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add app/actions/leads.ts app/admin components/admin
git commit -m "feat: add admin leads dashboard with status management"
```

---

### Task 14: Env, docs, build and end-to-end verification

**Files:**
- Modify: `.env` (JWT_SECRET — added in Task 12 Step 9 if not already present; optional `ADMIN_PROMOTE_EMAILS`)
- Modify: `CLAUDE.md` (document the new subsystem)
- Real E2E against dev server + real DB.

**Interfaces:**
- Consumes: everything.
- Produces: a verified, documented, working feature.

- [ ] **Step 1: Confirm env vars**

`JWT_SECRET` must be in `.env` (Task 12 Step 9). Optionally add `ADMIN_PROMOTE_EMAILS=bekithemba@helloyes.co.za` the same way. If `.env` cannot be modified by the executor, STOP and list the required lines for the user.

- [ ] **Step 2: Create the real admin user**

```bash
npx tsx scripts/create-admin.ts bekithemba@helloyes.co.za <generated-temp-password>
```

Generate a random temp password (`openssl rand -base64 12`), pass it in, and **report it to the user** with the recommendation to change it via `/auth/forgot` once SMTP is confirmed working.

- [ ] **Step 3: Full test suite + production build**

Run: `npm test && npm run build`
Expected: all tests pass; build completes with `/admin`, `/login`, `/auth/forgot`, `/auth/reset` in the route list.

- [ ] **Step 4: End-to-end smoke test with the dev server**

Start `npm run dev` in the background, then:

1. Insert a test lead through the real stack (exercises LeadInfrastructure against the real DB):

```bash
npx tsx -e "
import('dotenv').then(d=>{d.config({path:'.env'});return import('@/src/infrastructure/lead.infrastructure')}).then(async (m)=>{
  const repo=new m.LeadInfrastructure();
  const r=await repo.save({firstName:'Test',lastName:'Lead',email:'test-lead@example.com',message:'E2E smoke test lead',source:'contact'});
  console.log(r);
  const all=await repo.findAll();
  console.log('count:',all.length);
});"
```

Expected: `{ success: true, id: ... }` and count ≥ 1.

2. `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin` → expect `307` (logged-out redirect).
3. Interactive check (the JWT cookie flow can't be driven by curl through a server action): ask the user to open http://localhost:3000/login, log in with the temp credentials, confirm the test lead is visible, change its status, and log out. Alternatively, if browser automation (claude-in-chrome) is available to the executing session, do this yourself.
4. Clean up the test lead:

```bash
npx tsx -e "import('dotenv').then(d=>{d.config({path:'.env'});return import('pg')}).then(async ({Pool})=>{const p=new Pool({connectionString:process.env.DATABASE_URL});await p.query(\"DELETE FROM leads WHERE email='test-lead@example.com'\");await p.end();console.log('cleaned');})"
```

Stop the dev server.

- [ ] **Step 5: Update `CLAUDE.md`**

Add a section after "Important Implementation Details" (keep it short):

```markdown
### Database & Admin Dashboard

- **Drizzle ORM + PostgreSQL** (`DATABASE_URL`): schema in `lib/drizzle/schema/`, migrations in `drizzle/migrations/` (`npm run db:generate` / `db:migrate`). Tables: `users`, `auth_tokens`, `leads`.
- **Leads**: `ContactUsUseCase` persists every contact submission to `leads` *before* sending emails. Repository seam: `src/application/interface/lead.repository.ts` → `src/infrastructure/lead.infrastructure.ts`.
- **Auth**: custom JWT-cookie auth (`jose` + `bcryptjs`) in `src/utils/auth/` and `app/actions/auth.ts`. Login + OTP password reset only — no public signup. Admins: `npx tsx scripts/create-admin.ts <email> <password>` or `ADMIN_PROMOTE_EMAILS` allowlist. Requires `JWT_SECRET` (≥32 chars).
- **Admin dashboard**: `/admin` (leads list, search/filter, status updates). Guarded by `middleware.ts` (JWT), the admin layout (DB re-check), and `requireAdmin()` in server actions.
- **Tests**: `npm test` (vitest). Session/OTP/redirect-guard/use-case units in `src/**/*.test.ts`.
```

Also fix the stale claim while there: remove "**Google reCAPTCHA v3** for form protection" from the tech list (it doesn't exist in code; the honeypot section already describes the real protection).

- [ ] **Step 6: Final commit**

```bash
git add CLAUDE.md
git commit -m "docs: document database, auth and admin dashboard"
```

- [ ] **Step 7: Report**

Report to the user: admin URL (`/admin`), the admin email + temp password created in Step 2, the recommendation to change it via the forgot-password flow, and the note that only leads submitted after this deploy appear (historical leads live in the inbox).

---

## Self-Review Notes

- Spec coverage: schema (T2), DB clear (T3), session/roles/errors (T4), password+OTP (T5), safeNext (T6), lead persistence seam (T7–8), reset email (T9), actions + guards (T10, T12, T13), bootstrap (T11), UI (T12–13), tests (T1, T4–6, T8), env/docs/E2E (T14). Out-of-scope items from the spec are not implemented anywhere. ✓
- The existing `contact-us.controller.ts` and `components/sections/contact.tsx` need **no changes** — verified against their current source; the zero-arg `new ContactUsUseCase()` keeps working via default constructor params.
- Type names cross-checked: `ActionState`, `CurrentUser`, `AdminUser`, `Lead`, `NewLead`, `LeadStatus`, `LeadFilter`, `OtpDecision`, `SessionPayload` are each defined once and consumed by name elsewhere. ✓
