# Admin Leads Dashboard — Design

**Date:** 2026-08-31
**Status:** Approved
**Scope:** Phase 1 — persist contact-form leads and show them in an authenticated admin dashboard.

## Background

blackbox-designs currently has no persistence: the contact form (`components/sections/contact.tsx` → `contactUsController` → `ContactUsUseCase` → `ContactUsInfrastructure`) sends two emails via SMTP and stores nothing. There is no database, no auth, and no admin surface. `DATABASE_URL` exists in `.env` pointing at a provisioned Postgres that contains leftover tables from a previous use; the user has asked for it to be **cleared** before the new schema is applied.

The auth system is ported from the sibling project `native-child-power-up-games` (custom JWT-cookie auth: `jose` + `bcryptjs` + Drizzle/Postgres + email OTP), reduced to **login + password reset** — no public signup, no email-verification flow.

## Decisions (confirmed with user)

1. **Auth scope:** login + OTP-based password reset only. No public signup.
2. **Database:** reuse the existing `DATABASE_URL` Postgres; drop all leftover tables first (list them before dropping).
3. **Design approved as-is**, including vitest test coverage.

## Stack additions

Dependencies: `drizzle-orm`, `drizzle-kit`, `pg` (+ `@types/pg`), `jose`, `bcryptjs` (+ `@types/bcryptjs`), `input-otp`, `dotenv` (for drizzle config/scripts). `zod` is already present. Dev: `vitest`, `tsx`.

blackbox-designs is **Next 15**, so the edge guard is `middleware.ts` (native-child uses Next 16's `proxy.ts` — same logic, different filename).

## Database schema

Location: `lib/drizzle/` (`db.ts`, `schema/index.ts`, `schema/schema.ts`, `schema/enums.ts`), `drizzle.config.ts` at root, migrations in `drizzle/migrations/`.

- **`users`**
  - `id` uuid PK default random
  - `email` varchar(255) unique, indexed
  - `first_name`, `last_name` varchar(100)
  - `password_hash` varchar(255) NOT NULL (no guest-user nullability — that was a native-child product wrinkle)
  - `role` enum `user_role` (`user` | `admin`), default `user`, NOT NULL
  - `created_at`, `updated_at` timestamps
- **`auth_tokens`** (same shape as native-child)
  - `id` uuid PK, `user_id` FK → users ON DELETE CASCADE
  - `purpose` enum `auth_token_purpose` (`password_reset`)
  - `token_hash` varchar(128) — bcrypt (8 rounds) of a 6-digit OTP
  - `attempts` int default 0, `expires_at` (15-min TTL), `consumed_at`, `created_at`
  - indexes on `user_id`, `(user_id, purpose)`, `expires_at`
- **`leads`**
  - `id` uuid PK, `created_at`
  - `first_name`, `last_name`, `email`, `message` (NOT NULL); `phone`, `company` (nullable — optional in the UI)
  - `project_type`, `budget_range` (nullable)
  - `attachment_name`, `attachment_size`, `attachment_type` (nullable — metadata only; file bytes are not uploaded today)
  - `source` enum `lead_source` (`contact` | `onboarding`) — only `contact` written in phase 1
  - `status` enum `lead_status` (`new` | `contacted` | `closed`), default `new`

### Clearing the existing database

Before the first migration: connect, enumerate tables in `public` schema, present the list, then drop them (types/enums included). This is explicitly authorized by the user ("clear the db first"). Done via a one-off script, not committed as a migration.

## Lead capture (clean-architecture seams)

- `src/application/domain/lead.domain.ts` — `Lead` entity: `ContactUs` fields + `id`, `createdAt`, `status`, `source`.
- `src/application/interface/lead.repository.ts` — `LeadRepository` with `save(lead)`, `findAll(filter?)`, `updateStatus(id, status)`.
- `src/infrastructure/lead.infrastructure.ts` — Drizzle implementation.
- `ContactUsUseCase.execute` change: **persist the lead first, then send emails**, so an SMTP failure cannot lose the lead. If persistence fails, still attempt the email (degrade to current behavior) and report failure only if both fail.
- Bug fix included: the use case currently requires `phone` and `company` although the UI marks them optional and sends `""` — validation is relaxed to match the UI (required: firstName, lastName, email, message).
- Historical leads are not migrated (they exist only as emails in the inbox); only new submissions appear.

## Auth

Ported from native-child, **post-security-fix versions** (see their `docs/security-assessment.md`):

- `src/utils/auth/session.ts` — `SessionPayload = { sub, role }`, HS256 via `jose`, 7-day TTL, cookie `session` (httpOnly, sameSite lax, secure in prod). Requires `JWT_SECRET` ≥ 32 chars (throws otherwise).
- `src/utils/auth/password.ts` — bcrypt, 12 rounds.
- `src/utils/auth/otp.ts` — 6-digit OTP via `crypto.randomInt`, 15-min TTL, 5-attempt cap, bcrypt-8 hash.
- `src/utils/auth/current-user.ts` — `getCurrentUser()`: cookie → verify JWT → **fresh DB lookup** (stale/revoked roles caught). `import "server-only"`.
- `src/utils/auth/require-admin.ts` — `requireAdmin()` throwing 401/403 errors.
- `src/utils/auth/roles.ts` — `user` | `admin`; `roleHomePath` (admin → `/admin`, user → `/`).
- `app/actions/auth.ts` — server actions: `login` (with `ADMIN_PROMOTE_EMAILS` late-promotion at every login), `logout`, `requestPasswordReset` (enumeration-safe generic response), `resetPassword` (OTP consume + new password + session mint). Includes `safeNext` open-redirect guard (rejects backslashes, resolves against sentinel origin). Prior live tokens of the same purpose are consumed before issuing a new one.
- OTP email: rendered with the existing `@react-email` + nodemailer setup (`lib/emails/password-reset.tsx`), sent via existing SMTP env vars.

### Pages

- `/login` — email + password, `useActionState`, hidden `next` input, forgot-password link. `noindex`.
- `/auth/forgot` — request OTP by email. `noindex`.
- `/auth/reset` — OTP (via `input-otp`, 3+3 slots) + new password. `noindex`.
- Shared `components/auth/auth-shell.tsx` kit (`AuthShell`, `AuthField`, `AuthError`, `AuthSubmit`, `PasswordField`) — structure from native-child, restyled to blackbox's dark/design language using existing Tailwind 4 tokens and shadcn patterns.
- Already-authenticated users hitting auth pages are redirected to `roleHomePath`.

### Guards (three layers, as in native-child)

1. `middleware.ts` — matcher `["/admin/:path*"]`: no/invalid JWT → `/login?next=…`; non-admin role → `/`. JWT-only (edge-safe).
2. `app/admin/layout.tsx` — `getCurrentUser()` DB-backed re-check, `force-dynamic`, `robots: { index: false }`.
3. Every admin server action / route calls `requireAdmin()`.

### Admin bootstrap

- `scripts/create-admin.ts` — `npx tsx scripts/create-admin.ts email password` creates the first admin (no signup exists).
- `ADMIN_PROMOTE_EMAILS` comma-separated allowlist, applied lazily at login.

### New env vars

`JWT_SECRET` (≥32 chars), `ADMIN_PROMOTE_EMAILS` (optional). `DATABASE_URL` already present. SMTP vars reused.

## Admin dashboard (`/admin`)

- **Leads list**: table (name, email, project type, budget, status badge, date), text search (name/email/company), status filter tabs. Server component fetching via `LeadRepository`; pagination if/when needed (simple `ORDER BY created_at DESC` initially).
- **Lead detail**: dialog or detail panel with all fields, full message, attachment metadata.
- **Status update**: dropdown (`new` → `contacted` → `closed`) via server action (guarded by `requireAdmin()`).
- Header with the admin's name and a logout button (`<form action={logout}>`).
- Built with existing shadcn/ui components (`dialog`, `select`, `badge`, table markup).

## Error handling

- `src/utils/error-handler.ts` ported: `ApplicationError` base + `AuthenticationError` (401), `AuthorizationError` (403), `ValidationError`, `NotFoundError`.
- Auth actions return `ActionState = { ok: true } | { ok: false; error: string }` and `redirect()` on success.
- Lead persistence failures are logged; contact flow degrades to email-only rather than failing the visitor's submission.

## Testing

Add vitest (`vitest.config.ts`, `npm test`). Focused coverage of security-critical logic:

- `session.ts` — sign/verify roundtrip, expiry, bad-secret rejection, unknown-role default.
- `safeNext` — open-redirect vectors (`//evil.com`, `/\evil.com`, `https://evil.com`, valid relative paths).
- OTP consume logic — attempt cap, expiry, already-consumed, wrong code.
- `ContactUsUseCase` — lead persisted before email; SMTP failure does not lose the lead (mocked repository/infrastructure).

## Out of scope (later phases)

- Onboarding submissions into `leads` (`source: 'onboarding'`) — schema supports it, not wired.
- File upload storage (bytes are currently discarded; only metadata travels).
- Role-management UI, activity logging, rate limiting on auth actions.
- reCAPTCHA (CLAUDE.md mentions it but it does not exist in code).
