---
name: senior-architect
description: >
  Software architecture for this TypeScript/Next.js codebase. Use when designing
  system architecture, API boundaries, data flows, integration patterns, or
  making technical decisions. Covers Next.js App Router, src/app/api routes,
  src/lib modules, Supabase, and project conventions (tasks/todo.md, docs/plans,
  verification-first workflow). Use for architecture diagrams, dependency analysis,
  route/module mapping, and trade-off evaluation. TypeScript-only; no Python/Go.
keywords: architecture, typescript, nextjs, app-router, api-routes, supabase, design
---

# Senior Architect (TypeScript / This Codebase)

Architecture skill scoped to this repo: **Next.js 16 App Router**, **React 19**, **TypeScript (strict)**, **Supabase**, **Vercel**. Use for system design, API layout, dependency analysis, and diagramming.

## This Repo at a Glance

- **App:** Next.js 16 (App Router), React 19, TypeScript strict, path alias `@/*` → `./src/*`
- **Structure:** `src/app` (routes + API), `src/lib` (shared logic), `src/components` (UI), `src/types`
- **Backend:** Supabase (Postgres, Auth, RLS). Serverless API routes under `src/app/api/**/route.ts`
- **Planning:** `tasks/todo.md` (plan + checkables), `tasks/lessons.md` (learned rules), `docs/plans/` (designs)
- **Conventions:** Plan first, verify before build, no `any`, security planned up front (see CLAUDE.md and tasks/lessons.md)

## Quick Start: Scripts (TypeScript)

Run from repo root. Use `npx tsx` to execute the scripts (no build step).

```bash
# Architecture overview: API routes + lib modules (optional Mermaid)
npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts [--mermaid] [--json]

# Project health: tsc, lint, route count, key files
npx tsx .claude/skills/senior-architect/scripts/project_architect.ts [--verbose] [--json]

# Dependency summary: direct deps, audit count, circular hints
npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts [--json]
```

## Core Capabilities

### 1. Architecture Diagram Generator

Maps **API surface** and **lib** layout for this codebase.

- Scans `src/app/api` for `route.ts` files (App Router API routes).
- Scans `src/lib` for top-level modules.
- Output: structured list or Mermaid-style blocks (no external diagram tool).
- Use when: explaining the system, onboarding, or planning new API/module placement.

**Usage:**
```bash
npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts
npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts --mermaid --json
```

### 2. Project Architect

Runs **TypeScript and structure checks** aligned with this repo.

- Runs `npx tsc --noEmit` (respects tsconfig.json and `exclude`).
- Optionally runs `npm run lint` if defined.
- Reports: route count, presence of key dirs (`src/app`, `src/lib`, `tasks`, `docs/plans`).
- Use when: pre-commit or pre-plan sanity check, or to confirm structure.

**Usage:**
```bash
npx tsx .claude/skills/senior-architect/scripts/project_architect.ts
npx tsx .claude/skills/senior-architect/scripts/project_architect.ts --verbose --json
```

### 3. Dependency Analyzer

Summarizes **npm dependencies** for this project.

- Reads `package.json` (dependencies + devDependencies).
- Optionally runs `npm audit --json` and reports vulnerability counts (no fix applied).
- Output: list of direct deps, optional audit summary.
- Use when: evaluating new packages, or before upgrades.

**Usage:**
```bash
npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts
npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts --audit --json
```

## Architecture Conventions (This Codebase)

### API Routes

- One **route handler** per path: `src/app/api/<segment>/route.ts` (GET/POST/etc.).
- Shared logic lives in **src/lib**, not inside route files.
- Use **createRouteLogger** (or project logger) in API routes; no raw `console.log` in production paths.
- Auth/ownership: use project patterns (e.g. `withAuth`, RLS, project-scoped queries) as in existing routes.

### TypeScript

- **Strict mode** only. No `any`; use `unknown` and type guards or `as unknown as T` at boundaries (e.g. Supabase/JSON).
- Path alias: `@/` for `src/` (e.g. `@/lib/supabase`, `@/components/...`).
- Types: prefer `src/types` and colocated types; match existing patterns in the repo.

### Data & Backend

- **Supabase**: Postgres, Auth, RLS. Use typed client from `@/lib/supabase` (or server/admin variants as per project).
- New tables/migrations: document in `docs/plans` or migration files; RLS and ownership in scope from the start.

### Planning & Tasks

- **tasks/todo.md**: plan with checkable items; mark complete as you go; add review notes when done.
- **tasks/lessons.md**: update after corrections; read at session start.
- **docs/plans/**: long-lived design docs (e.g. auth, SEO, geo). Reference when changing those areas.

## When to Use This Skill

- Designing a new **API surface** or **module layout** (where to put routes, libs, types).
- Explaining or **documenting** how `src/app` and `src/lib` fit together.
- Evaluating **dependencies** or **tech choices** (new lib, Supabase feature, deployment).
- **Trade-offs**: server vs client components, API route vs server action, RLS vs app-level checks.
- **Diagrams**: generating a high-level map of routes and lib modules (via the script output or Mermaid).

## Out of Scope for This Skill

- Non-TypeScript stacks (Python, Go, Swift, Kotlin, Flutter) — not used in this repo.
- Generic system design (datacenters, k8s, multi-region) unless directly relevant to this app’s deployment (Vercel/Supabase).

## Reference Documentation (This Skill)

Detailed guides in `references/` (relative to this skill folder):

- **references/architecture_patterns.md** — Next.js App Router layout, API vs lib separation, server/client components, Supabase/RLS, logging.
- **references/system_design_workflows.md** — Adding API routes, new lib modules, feature planning (tasks/todo.md, docs/plans), diagram workflow.
- **references/tech_decision_guide.md** — API route vs server action, new dependencies, Supabase vs external APIs, Vercel constraints, TypeScript boundaries.

## Other Repo Docs

- **CLAUDE.md** — Workflow, principles, safety, task management.
- **tasks/lessons.md** — Learned rules and anti-patterns.
- **docs/plans/** — Feature-specific architecture (e.g. auth, SEO, integrations).
- **.cursor/rules/** / **.claude/rules/** — Coding and verification rules.

## Common Commands (This Repo)

```bash
# Dev & quality
npm run dev
npm run build
npm run test
npm run lint
npx tsc --noEmit

# Architecture scripts (from repo root)
npx tsx .claude/skills/senior-architect/scripts/architecture_diagram_generator.ts --mermaid
npx tsx .claude/skills/senior-architect/scripts/project_architect.ts --verbose
npx tsx .claude/skills/senior-architect/scripts/dependency_analyzer.ts --audit
```
