# Architecture Patterns (TypeScript / This Codebase)

Patterns and practices for this repo: Next.js 16 App Router, React 19, TypeScript strict, Supabase, Vercel.

## Route Layout (App Router)

### API Routes

- **One handler per path:** `src/app/api/<segment>/route.ts` (or `route.tsx`). Export `GET`, `POST`, `PUT`, `PATCH`, `DELETE` as named functions.
- **Segment naming:** Use kebab-case for multi-word segments (e.g. `call-reviews`, `dream-100`). Dynamic segments: `[id]`, `[projectId]`.
- **No shared logic in route files:** Put business logic in `src/lib`. The route file parses the request, calls lib, and returns `NextResponse.json()`.

**When to use:** Any server-side endpoint that the frontend or external systems call.

**Example shape:**
```typescript
// src/app/api/some-feature/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createRouteLogger } from "@/lib/logger";
import { doSomething } from "@/lib/some-feature";

const log = createRouteLogger("api/some-feature");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await doSomething(body);
  return NextResponse.json(result);
}
```

### Page Routes

- **Layouts:** `src/app/(dashboard)/layout.tsx` for shared shell; route groups with `(name)` don’t affect the URL.
- **Pages:** `page.tsx` in a segment directory defines the UI for that path. Use server components by default; add `"use client"` only where needed (state, hooks, browser APIs).

## App vs Lib Separation

| Location | Purpose |
|----------|---------|
| `src/app` | Routes (API handlers, pages, layouts). Thin: parse request, call lib, render or respond. |
| `src/lib` | Shared logic, Supabase clients, utilities, types used across app and API. |
| `src/components` | Reusable UI. Can import from `@/lib`. |
| `src/types` | Shared TypeScript types (e.g. DB, API contracts). |

**Rule:** If two API routes or a page and an API route need the same logic, it belongs in `src/lib`, not duplicated in app.

## Server vs Client Components

- **Default:** Server component. No `"use client"`. Can async and fetch directly.
- **Client when:** `useState`, `useEffect`, event handlers, browser APIs, or a dependency that requires client (e.g. some UI libraries).
- **Boundary:** Keep client trees small. Put client only on the leaf that needs it; let the parent stay server.

## Supabase & Data

- **Typed client:** Use the project’s Supabase client from `@/lib/supabase` (or server/admin variants). Types from `@/types/database`.
- **RLS:** All table access is subject to RLS. Design policies so rows are scoped by `user_id` or `project_id` (or org) as per existing patterns.
- **Migrations:** New tables and RLS go in `supabase/migrations/`. Document in `docs/plans` when a feature touches schema or auth.

## Logging

- **API routes:** Use `createRouteLogger("api/<route-id>")` from `@/lib/logger`. No raw `console.log` in production code paths.
- **Structured fields:** Log request id, user id (if authed), and domain-relevant fields so logs are queryable.

## Anti-Patterns

- **Business logic in route.ts:** Move to `src/lib` and import.
- **`any` types:** Use `unknown` and narrow, or `as unknown as T` only at boundaries (e.g. JSON body, Supabase response).
- **New API route without ownership:** Ensure RLS or app-level checks enforce who can access the resource (project, org, user).
- **Skipping plan for multi-file changes:** Use `tasks/todo.md` and, for larger features, `docs/plans/`.

## Tools (This Repo)

- **TypeScript:** `npx tsc --noEmit` — must pass.
- **Lint:** `npm run lint` — run before commit.
- **Architecture script:** `npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts` — list API routes and lib modules.
- **Project health:** `npx tsx .claude/skills/senior-architect/scripts/project_architect.ts` — tsc + lint + structure.
