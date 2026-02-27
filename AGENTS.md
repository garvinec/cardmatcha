# Repository Guidelines

## Project Structure & Module Organization
- The Next.js App Router lives in `app/`; route folders such as `cards`, `category`, `issuer`, and `chat` map directly to pages, and `app/api` hosts Supabase-backed serverless endpoints.
- Shared UI stays in `components/`: use `components/ui` for shadcn primitives while feature composites like `credit-card-grid.tsx` sit at the root; data access lives in `lib/` with server actions in `lib/actions` and the shared client in `lib/supabase.ts`.
- Keep domain types in `types/index.d.ts`, static assets in `public/`, global styles in `styles/globals.css`, and update `middleware.ts` only when adjusting Clerk coverage.

## Build, Test, and Development Commands
- `npm install` syncs dependencies; the committed lockfile is npm-based, so avoid mixing pnpm or yarn.
- `npm run dev` launches the local Next.js server; ensure `.env.local` defines `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `npm run lint` runs `next lint` (ESLint + TypeScript), while `npm run build` and `npm run start` handle production builds and smoke checks.

## Coding Style & Naming Conventions
- Implement components in TypeScript using PascalCase (`HeaderSearch`) and keep hooks/utilities camelCase, colocating related files within their feature folder.
- Default to 2-space indentation and the Next.js ESLint preset; run `npm run lint -- --fix` for safe formatting.
- Favor Tailwind utility classes and extract shared patterns into shadcn wrappers or the `cn` helper, keeping server actions lean and marked with "use server".

## Testing Guidelines
- No automated suite exists yet, so combine linting with targeted manual QA before merging.
- When adding coverage, standardize on Vitest + React Testing Library with `<component>.test.tsx` files next to the component.
- Stub Supabase and Clerk interactions in tests; never depend on live credentials.

## Commit & Pull Request Guidelines
- Mirror the existing history: short (≤72 chars), present-tense commit subjects like `Simplify rewards snapshot`.
- Summaries should link related issues and include screenshots or recordings for UI changes.
- Confirm `npm run lint` passes and call out schema or data contract updates; seek an extra reviewer when touching `lib/actions` or auth middleware.

## Environment & Security Notes
- Keep Supabase and Clerk keys in `.env.local`; never commit secrets or staged samples.
- Align route protection with `middleware.ts` and avoid logging sensitive Supabase payloads outside server actions.

## Cursor Cloud specific instructions

### Service overview
CardMatcha is a single Next.js 15 application (no separate backend). All data comes from a remote Supabase (PostgreSQL) instance; no local database is needed.

### Running the dev server
- `npm run dev` starts the server on port 3000. Standard commands are in `package.json` scripts and the README.
- The app requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`. Without real Supabase credentials, the UI renders but data-dependent sections show empty states or error boundaries. This is expected.
- `OPENAI_API_KEY` is optional (only needed for the `/chat` AI advisor, which is currently a "Coming Soon" placeholder).

### Gotchas
- When killing the dev server, ensure all child processes are terminated (the `next dev` process spawns a `next-server` child). Use `lsof -t -i:3000` to find PIDs and kill them individually. Failing to do so causes port conflicts on restart.
- The server actions in `lib/actions/` use the browser Supabase client (`createSupabaseClient` from `utils/supabase/client.ts`). This works at runtime because Next.js server actions run in the Node.js environment where `createBrowserClient` still functions, but Supabase queries will fail with placeholder credentials.
- No automated test suite exists; validation is lint-only (`npm run lint`) plus manual QA.
