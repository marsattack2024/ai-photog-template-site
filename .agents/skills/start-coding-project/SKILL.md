---
name: start-coding-project
description: Initialize and run a complete coding project from a goal description. Creates PRD, architecture, task plan, and begins full implementation cycle.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: <project goal description>
---

# Start Coding Project

You are starting a new coding project. The goal is: $ARGUMENTS

## Current State
- Branch: !`git branch --show-current 2>/dev/null || echo "not initialized"`
- Existing files: !`ls -la src/ 2>/dev/null || echo "no src/ directory yet"`
- Tasks: !`jq '.tasks | length' progress/tasks.json 2>/dev/null || echo "no tasks yet"`

## Execution Steps

### 1. Create PRD
Read `docs/templates/prd.md` and create `docs/prd.md` from the goal. Fill in:
- Project goal (one clear sentence)
- Problem statement (who has this problem, why it matters)
- Target users (specific persona, not generic)
- Core requirements (P0 must-haves only for MVP)
- Success criteria (measurable outcomes)
- Out of scope (what we're NOT building)

### 2. Create Architecture Doc
Read `docs/templates/architecture.md` and create `docs/architecture.md`:
- Tech stack choices (Node.js/TypeScript, framework, DB, etc.)
- Component breakdown
- API design (endpoints, methods, payloads)
- Data models
- Testing strategy

### 3. Initialize Project
- Set up `package.json` with proper scripts (test, lint, build, dev)
- Create `tsconfig.json` with strict mode
- Install core dependencies
- Create directory structure (src/, tests/, etc.)
- Set up test runner (vitest preferred)
- Set up linting (eslint + prettier)

### 4. Create Task Plan
Break PRD into ordered tasks in `progress/tasks.json`. Each task needs deliverables, verification criteria, and risk notes.

### 5. Execute Tasks
For each task in order:
1. Implement all deliverables
2. Run verification: `npm test`, `npm run lint`, `npx tsc --noEmit`, grep for TODOs/secrets
3. If FAIL: fix and retry (max 3 attempts)
4. If PASS: `git add <files> && git commit -m "feat: <task title>"`

### 6. Polish
Review all code for quality. Simplify where possible. Run tests after each change.

### 7. Report
Generate morning report at `docs/morning-report.md`.
