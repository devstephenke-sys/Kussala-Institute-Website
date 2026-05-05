# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## KISLP Website (`artifacts/kislp-website`)

React + Vite website for the Kussala Institute for Strategic Leadership and Peacebuilding (KISLP). Uses Wouter routing, Framer Motion, shadcn/ui, Tailwind CSS. Logo at `public/kislp-logo.jpeg`. Pages: Home, About, Programs, Impact, Contact, Donate.

### Payments (Stripe) — PENDING USER ACTION

Stripe integration was dismissed during setup. To enable real payments, either:
1. **Option A (Replit integration):** Re-open the Integrations tab and connect Stripe — recommended approach.
2. **Option B (manual keys):** Provide `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` as secrets. Then:
   - Install stripe/stripe-replit-sync packages (already in root package.json)
   - Create `artifacts/api-server/src/stripeClient.ts`, `webhookHandlers.ts`, `stripeService.ts`, `storage.ts`
   - Update `artifacts/api-server/src/app.ts` to add webhook route before express.json()
   - Update `artifacts/api-server/src/index.ts` to call initStripe()
   - Create seed script `scripts/src/seed-products.ts` to create 4 donation tiers in Stripe
   - Update Donate page to call `/api/checkout` and redirect to Stripe hosted checkout
