import { pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const authTokenPurpose = pgEnum("auth_token_purpose", ["password_reset"]);

export const leadStatus = pgEnum("lead_status", ["new", "contacted", "closed"]);

/** Where a lead came from. Only "contact" is written in phase 1. */
export const leadSource = pgEnum("lead_source", ["contact", "onboarding"]);
