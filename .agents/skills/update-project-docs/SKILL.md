---
name: update-project-docs
description: Use after ANY task that touches 3+ files, adds a new feature, adds or changes API routes, changes database schema, adds tests, or modifies architecture. Also use after committing, after merging branches, after fixing multi-step bugs, after completing plan phases, and when the user says "done", "ship it", "that works", or "commit". Updates lessons.md, roadmap.md, and MEMORY.md. This is step 12 of the Verification Checklist in AGENTS.md — non-negotiable for multi-file work.
user-invocable: true
allowed-tools: Read, Edit, Write, Grep, Glob, Bash, Task
argument-hint: <brief description of what was just completed>
---

# Update Project Docs

**What was completed:** $ARGUMENTS

## Purpose

After a major feature is done and tested, extract universal lessons and update project documentation. This runs as the final step of any significant work — after verification passes, before or after commit.

## Process

### Step 1 — Gather Context

Read these files to understand current state:
- `tasks/lessons.md` — existing rules (check count, last entry number)
- `tasks/roadmap.md` — current roadmap state
- `~/.Codex/projects/-Users-Humberto-Documents-GitHub-002--p2p-ads-generator-Codex-Dev-Environment/memory/MEMORY.md` — current memory

Gather what changed:
```bash
git log --oneline -20   # recent commits
git diff main --stat     # files changed (if on branch)
```

### Step 2 — Extract Lessons

Dispatch a **researcher** subagent to analyze the completed work and propose lessons:

**Subagent prompt:**
> You are reviewing a completed feature to extract universal engineering lessons.
>
> **What was built:** [from $ARGUMENTS]
> **Recent commits:** [from git log]
> **Files changed:** [from git diff --stat]
>
> Read the changed files and identify patterns that are UNIVERSAL — not specific to this one feature.
>
> **Good lessons** (universal patterns):
> - "Stream long-running generations" — applies to any LLM call
> - "Version append, never overwrite" — applies to any versioned data
> - "Standalone generators get their own tables" — applies to any new feature
>
> **Bad lessons** (too specific):
> - "The carousel prompt needs 12 slides" — only applies to one placement
> - "We fixed a bug in line 47 of route.ts" — one-time fix
>
> **For each proposed lesson:**
> 1. State the lesson as an imperative rule (same voice as existing lessons)
> 2. Add a brief explanation after the em dash
> 3. Flag if it might already exist in lessons.md (provide the existing rule number)
> 4. Flag if it improves/supersedes an existing rule
>
> Read `tasks/lessons.md` first to check for duplicates and improvement opportunities.
> Return a structured list: NEW lessons, IMPROVED lessons (with rule number to update), and SKIP (already covered).

### Step 3 — Review and Apply Lessons

For each proposed lesson from the subagent:

**If NEW and universal:**
- Append to `tasks/lessons.md` with the next number
- Use the same format: `N. **Bold imperative** — explanation.`

**If IMPROVES an existing rule:**
- Edit the existing rule in place — make it better, don't create a duplicate
- Only improve if the new version is genuinely clearer or more complete

**If already covered:**
- Skip — do not add duplicates

**Quality gate — every lesson must pass ALL of these:**
- [ ] Would this apply to a different project? (universal)
- [ ] Is it an imperative rule, not a description of what happened? (actionable)
- [ ] Does it NOT already exist in lessons.md? (no duplicates)
- [ ] Would a future Codex instance benefit from knowing this? (valuable)

### Step 4 — Update Roadmap

Read `tasks/roadmap.md` and update:
- Move completed items from "What to Build Next" to appropriate "Completed" section or mark as done
- Update test counts if new tests were added
- Update "System Architecture" table if new capabilities were added
- Update "Model Usage" table if new routes/models were added
- Update "Deprecation Risk Map" if new dependency chains exist

### Step 5 — Update Memory

Read MEMORY.md and update if the completed work introduced:
- New key files that should be remembered
- New architectural patterns
- Changed platform constraints
- New testing patterns
- Updated model usage

Only update MEMORY.md for **stable, architectural knowledge** — not session-specific details.

### Step 6 — Report

Output a summary:
```
DOCS UPDATE COMPLETE
====================
Lessons:
  - Added: [count] new rules ([list numbers])
  - Improved: [count] existing rules ([list numbers])
  - Skipped: [count] (already covered)

Roadmap:
  - [list of changes made]

Memory:
  - [list of changes made, or "No changes needed"]

Total lessons: [new count] (was [old count])
```

## When NOT to Use

- After trivial changes (typo fix, one-liner, config change)
- After incomplete work (tests failing, feature not verified)
- For session-specific notes (use MEMORY.md directly instead)

## Anti-Patterns

| Bad | Good |
|-----|------|
| "We fixed the carousel bug on line 47" | "Trace data flow end-to-end before coding" |
| "Next.js 16 broke our lint script" | "Verify build tooling after framework upgrades" |
| "The Apify API returns weird data" | "LLM structured extraction needs a fallback parser" |
| Adding a lesson that's already rule #34 | Improving rule #34 with the new insight |
| 5 lessons from a small feature | 1-2 genuinely universal lessons, or 0 if nothing new |
