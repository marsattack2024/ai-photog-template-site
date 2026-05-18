# Tech Decision Guide (TypeScript / This Codebase)

Guidelines for technical choices in this repo: Next.js, Supabase, Vercel, TypeScript.

## API Route vs Server Action

| Use API route when | Use server action when |
|--------------------|-------------------------|
| Called from non-React clients (webhooks, external APIs, cron). | Form submission or mutation from a React component in the same app. |
| Need explicit HTTP method, headers, or status codes. | Prefer simpler “call a function” from the client with progressive enhancement. |
| Large payloads, file uploads, or long-running work that should be HTTP request/response. | Small mutations tied to a single page or form. |
| Reusable by multiple pages or external systems. | Logic is specific to one flow and doesn’t need a stable URL. |

**This repo:** Most server-side endpoints are API routes under `src/app/api/` because they are used by the dashboard, webhooks, and integrations. Use server actions where a form or button is the only caller and you want less boilerplate.

## Adding a New npm Package

- **Necessity:** Prefer existing deps (e.g. Supabase, Next, React ecosystem). Add only when the need is clear and not a one-off.
- **TypeScript:** Prefer packages with types (`@types/*` or built-in). Avoid `any`-heavy or untyped APIs.
- **Size and security:** Check bundle impact for client-side deps. Run `dependency_analyzer.ts --audit` after adding; fix or document vulnerabilities.
- **Overrides:** If a transitive dep is vulnerable and upstream hasn’t fixed it, consider `overrides` in `package.json` (document and re-test).

## Supabase vs External API

- **Supabase:** Primary data store (Postgres), Auth, RLS. Use for app data, users, projects, and anything that needs RLS and real-time where applicable.
- **External API:** Use for third-party services (e.g. Google Ads, Meta Ads, Twilio, Firecrawl). Keep keys in env; call from API routes or server-only code. Never expose secrets to the client.
- **Caching and rate limits:** Respect external API limits. Cache when reasonable (in-memory or Supabase/Redis if the project introduces it). Document in `docs/plans` if you add a new integration.

## Vercel Constraints

- **Function timeout:** Pro plan allows longer serverless duration (e.g. 300s for some routes). See `vercel.json` for `maxDuration` per route. Design long-running work (e.g. batch jobs) accordingly (background job or external worker if needed).
- **Env vars:** `NEXT_PUBLIC_*` are baked into the client bundle. Use only for non-secret, client-needed values. Secrets stay in server-only env.
- **Edge:** Middleware and edge routes have no Node APIs. Use only Edge-safe code in `middleware.ts` and edge route handlers.

## TypeScript Boundaries

- **Strict mode:** No `any`. Use `unknown` and narrow, or `as unknown as T` only at boundaries (e.g. `request.json()`, Supabase responses, external API payloads).
- **Types location:** Shared types in `src/types`. Colocate types with a module when they’re used only there. Match existing patterns (e.g. `Database` from `@/types/database`).
- **JSON and DB:** Supabase returns typed rows when using the generated client. For raw JSON (e.g. request body), define an interface and validate or cast at the boundary once.

## When to Document in docs/plans/

- New or changed **database schema** or RLS.
- New **external integration** (OAuth, webhooks, third-party API).
- **Architectural** decisions (e.g. why we use API routes instead of server actions for X).
- **Security** decisions (auth flow, scoping, secrets handling).

Keep docs/plans concise and update them when the implementation diverges.
