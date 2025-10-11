# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15** portfolio/agency website for Blackbox Designs built with:
- **Next.js 15** (App Router with Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **GSAP** for advanced animations
- **React Hook Form** with **Zod** validation
- **Nodemailer** for email notifications
- **Google reCAPTCHA v3** for form protection

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build production bundle
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

The dev server runs on http://localhost:3000

## Architecture

### Clean Architecture Pattern

The codebase follows **Clean Architecture** principles with clear separation of concerns in the `src/` directory:

```
src/
├── application/         # Core business logic layer
│   ├── domain/         # Domain entities (data models)
│   └── interface/      # Repository interfaces
├── infrastructure/     # External integrations (email, CMS)
├── presentation/       # Controllers (server actions)
└── use-case/          # Application use cases (business logic orchestration)
```

**Data Flow**: UI Components → Controllers (presentation) → Use Cases → Infrastructure → External Services

### Key Architectural Patterns

1. **Server Actions**: Controllers in `src/presentation/controllers/` use `"use server"` directive
2. **Dependency Injection**: Use cases instantiate their own infrastructure dependencies
3. **Type Safety**: Zod schemas validate all form inputs before reaching domain layer

### Directory Structure

- `app/` - Next.js App Router pages and API routes
  - `api/recaptchaSubmit/` - reCAPTCHA verification endpoint
  - `(legal)/` - Route group for legal pages (privacy, terms, POPI)
- `components/` - React components
  - `sections/` - Page sections (hero, about, contact, portfolio, etc.)
  - `layout/` - Header and footer components
  - `ui/` - Reusable UI components (shadcn/ui pattern)
- `lib/` - Utilities and shared code
  - `config/` - Configuration (CMS settings)
  - `context/` - React context providers (GoogleCaptchaWrapper)
  - `emails/` - Email templates using @react-email
  - `utils.ts` - Utility functions (cn, renderEmailTemplate)
- `public/` - Static assets

## Important Implementation Details

### Email System

The contact form uses a **two-email system**:
1. **Contact notification** to business (`EMAIL_TO`) via `ContactUsInfrastructure`
2. **User acknowledgment** email via `NotifyUserInfrastructure`

Both are sent through Nodemailer using SMTP configuration from `.env`.

### Contact Form Features

**Enhanced Contact Form** with multiple features:
- **Project Type Selector**: Dropdown for selecting project category (Web, Mobile, Design, etc.)
- **Budget Range Selector**: Helps qualify leads with budget expectations
- **File Upload**: Supports PDF, Word docs, text files, and images (max 5MB)
- **localStorage Persistence**: Form data auto-saves and restores if page refreshes
- **File Validation**: Client-side validation for file size and type

**Spam Protection** via honeypot:
- Hidden `website` field in contact form (CSS `hidden` class)
- Field has `tabIndex={-1}` and `autoComplete="off"` to prevent real users from filling it
- If honeypot field is filled, submission is silently rejected (logs warning, shows success message to fool bots)
- Honeypot check happens client-side before API call in contact.tsx:188-201

**Form Data Flow**:
1. User fills form → Auto-saves to localStorage on every change
2. On submit → Honeypot check → Controller → Use Case → Infrastructure
3. On success → Clear localStorage and file, send confirmation emails
4. File metadata sent in email (name, size, type) - actual file not attached to email

### CMS Integration

Portfolio projects are fetched from an external Strapi CMS:
- Base URL configured via `CMS_URL` environment variable
- Configuration in `lib/config/cms-config.ts`
- Projects endpoint: `/api/projects`

### Animation Libraries

Two animation libraries are used:
- **Framer Motion**: For component-level animations (forms, transitions)
- **GSAP**: For complex, timeline-based animations (see `components/animated-background.tsx`)

### Path Aliases

TypeScript is configured with `@/*` alias mapping to project root:
```typescript
import { ContactUs } from "@/src/application/domain/contact-us.domain"
import { Button } from "@/components/ui/button"
```

## Environment Variables

Required environment variables (see `.env`):
- `NEXT_PUBLIC_NODE_ENV` - Environment mode
- `CMS_URL` - Strapi CMS base URL
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD` - Email configuration
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Business contact email

## Code Conventions

1. **Server Actions**: Use `"use server"` directive at top of controller files
2. **Form Validation**: Define Zod schemas in component files before component definition
3. **Error Handling**: Always return `{ success: boolean, error?: string }` pattern from controllers/use cases
4. **Email Templates**: Use `@react-email` components, render with `renderEmailTemplate` utility
5. **Styling**: Use Tailwind utility classes with `cn()` helper for conditional classes

## Image Configuration

Next.js image optimization is configured for:
- Pexels (`images.pexels.com`)
- Unsplash (`images.unsplash.com`)
- CMS domain (`cms.blackboxdesigns.co.za`)
- Localhost (development)

See `next.config.ts` for full configuration.

## SEO Configuration

Comprehensive SEO implementation with:
- **Metadata Utilities**: Centralized in `lib/utils/metadata.ts` with `generateMetadata()` helper
- **SEO Config**: All SEO constants in `lib/config/seo-config.ts` (keywords, descriptions, company info)
- **Structured Data**: JSON-LD schemas in `lib/utils/structured-data.ts`:
  - Organization Schema (company details)
  - LocalBusiness Schema (location, hours, geo-coordinates)
  - WebSite Schema (search action)
  - Service Schema (service offerings)
  - Utilities for Breadcrumb and FAQ schemas

### Page-Specific SEO
Each page has unique metadata via `generateMetadata()`:
- Home: `/` - Main landing page
- About: `/about` - Company information
- Services: `/services` - Service offerings + Service Schema
- Portfolio: `/portfolio` - Project showcase
- Contact: `/contact` - Contact information

### Technical SEO
- **Sitemap**: Dynamic sitemap at `/sitemap.xml` using `app/sitemap.ts`
- **Robots.txt**: Optimized for Googlebot, Bingbot at `/robots.txt`
- **Open Graph**: Full OG tags for social sharing (Twitter, Facebook, LinkedIn)
- **Canonical URLs**: Prevent duplicate content
- **Structured Data**: All schemas injected via Next.js `<Script>` component

### Keywords Strategy
Targeting South African market with location-based keywords:
- "web development South Africa"
- "web design Johannesburg"
- "mobile app development"
- Full keyword list in `seo-config.ts`

### SEO Action Items
See `SEO-CHECKLIST.md` for:
- Google Search Console setup
- Content creation strategy
- Performance optimization
- Analytics configuration
