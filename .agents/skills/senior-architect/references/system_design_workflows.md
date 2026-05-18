# System Design Workflows (TypeScript / This Codebase)

Step-by-step workflows for common architecture tasks in this repo.

## Adding a New API Route

1. **Decide path:** e.g. `src/app/api/my-feature/route.ts` or `src/app/api/my-feature/[id]/route.ts`.
2. **Create route file:** Export `GET`/`POST`/etc. Use `createRouteLogger("api/my-feature")`. Parse input, validate, return `NextResponse.json()`.
3. **Put logic in lib:** Add `src/lib/my-feature.ts` (or under an existing lib module). Route only calls lib and maps errors to HTTP status.
4. **Auth/ownership:** If the route is protected, use project patterns (e.g. `withAuth`, session, or RLS). Ensure queries filter by project/user/org as in existing routes.
5. **Types:** Use `@/types` or inline types; no `any`. For request body, define an interface and validate (or use Zod if the project uses it).
6. **Verify:** Run `npx tsc --noEmit` and `npm run lint`. Optionally run `project_architect.ts` to confirm structure.

## Adding a New Lib Module

1. **Place:** `src/lib/<module-name>.ts` or `src/lib/<module-name>/index.ts` if multiple files.
2. **Imports:** Use `@/` alias. Import from `@/lib/supabase`, `@/types`, etc. No circular deps.
3. **Exports:** Export only the public API of the module. Keep internals non-exported where possible.
4. **Types:** Prefer explicit types; use `unknown` and type guards at boundaries (e.g. JSON, Supabase).
5. **Usage:** Import in API routes or components via `@/lib/<module-name>`.
6. **Script:** Run `architecture_diagram_generator.ts` to see the new module in the lib list.

## Feature Planning (Multi-File or Cross-Cutting)

1. **Plan in tasks/todo.md:** Checkable items; one item per logical step. Include verification steps (run X, test Y).
2. **Larger features:** Create or update a doc in `docs/plans/` (e.g. `docs/plans/YYYY-MM-DD-feature-name.md`) with context, decisions, and schema/API shape.
3. **Review plan:** Run `/review-plan` (or equivalent) before implementation. Address security and RLS if the feature touches auth, new tables, or public endpoints.
4. **Execute:** Implement in order; mark items complete in `tasks/todo.md`. After corrections, update `tasks/lessons.md`.
5. **Verify:** `npx tsc --noEmit`, `npm run lint`, `npm run test` (if applicable). Run `project_architect.ts` for a sanity check.

## Generating an Architecture Overview

1. **List routes and lib:**  
   `npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts`
2. **Mermaid-style diagram:**  
   `npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts --mermaid`
3. **Machine-readable:**  
   `npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts --json`
4. Use output to document in `docs/plans/` or to decide where to add a new route/module.

## Evaluating a New Dependency

1. **List current deps:**  
   `npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts`
2. **Audit status:**  
   `npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts --audit`
3. **Add dependency:** `npm install <pkg>`. Prefer minimal API and good TypeScript types. Check license and maintenance.
4. **Usage:** Import only from the public API. Avoid relying on internals or undocumented behavior.
5. **Document:** If the choice is non-obvious, note it in `docs/plans/` or in code comments.

## Security-Critical or Auth-Related Changes

1. **Plan:** Document in `tasks/todo.md` and, if large, in `docs/plans/`. Include a security checklist (RLS, input validation, no secrets in client bundle, etc.).
2. **Review:** Use project security review (e.g. `/security-audit` or manual checklist) before merging.
3. **RLS:** Any new or changed table must have RLS policies that match the intended access model (user/project/org).
4. **Verify:** Run tests and manual checks. Ensure no `.env` or secrets are committed or exposed.
