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
