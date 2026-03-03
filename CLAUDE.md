# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint + TypeScript check
npm run lint -- --fix  # Auto-fix lint issues
npm run start    # Start production server
```

No automated test suite exists. Lint passes are the primary CI gate before merging.

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
```

## Architecture

**Next.js 15 App Router** with React 19 and TypeScript. Desktop-only app — `middleware.ts` + `MobileBlock`/`MobileContentWrapper` components block and hide content on mobile.

### Data Layer

Two Supabase clients depending on context:
- `utils/supabase/client.ts` — `createSupabaseClient()` — browser client, used in server actions
- `utils/supabase/server.ts` — `createSupabaseServerClient()` — server-only client with cookie access for auth
- `utils/supabase/middleware.ts` — session refresh for middleware

**Server Actions** (`lib/actions/`) are the primary data access pattern. They use `"use server"` and call `createSupabaseClient()` (not the server client). Key actions:
- `cards.actions.ts` — `getCards`, `getMostPopularCards`, `getCardsByCategory`, `getCardsByIssuer`
- `card.actions.ts` — `getCardById`
- `profile.actions.ts` — `getCardsByUser`, `addCardToUser`, `removeCardFromUser`, `bestUserCardsByCategory`
- `feedback.actions.ts`, `missing-card.actions.ts` — form submissions

### Database Schema (Supabase/PostgreSQL)

Core tables: `credit_cards`, `card_rewards`, `card_benefits`, `reward_categories`, `user_cards`

`credit_cards` has `category` and `issuer_code` columns used for filtering. `user_cards` maps users to their owned cards. `card_rewards` joins to `reward_categories` for per-category reward rates.

All types are in `types/index.d.ts`. The `CreditCardWithDetails` type includes nested rewards and benefits with their categories.

### API Routes

- `app/api/cards/search/` — card search endpoint
- `app/api/chat/route.ts` — streams responses from GPT-4o via Vercel AI SDK (`streamText`)

### Styling

Custom **matcha color palette** (`matcha-50` through `matcha-900`) defined as CSS variables in `styles/globals.css` and registered in `tailwind.config.ts`. Use `matcha-*` classes for brand colors. The `cn()` helper from `lib/utils.ts` merges Tailwind classes.

UI components from **shadcn/ui** live in `components/ui/`. Feature components sit at `components/` root (e.g., `credit-card.tsx`, `credit-card-grid.tsx`, `header.tsx`, `browse-by-grid.tsx`).

### Conventions

- TypeScript build errors are ignored (`ignoreBuildErrors: true` in `next.config.mjs`) but lint is enforced
- Components: PascalCase; hooks/utils: camelCase
- 2-space indentation
- Commit messages: short (≤72 chars), present-tense (e.g., `Add filter by issuer`)
- `next.config.mjs` has an allowlist of external image domains for card images from bank websites — add new domains there when needed
