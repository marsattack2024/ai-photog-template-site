---
name: build-feature
description: Full-pipeline feature orchestrator. Takes a design doc or feature description and runs the complete chain — assumption audit, planning, adversarial review, execution, verification, and branch completion. The single "go" button for major features.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
argument-hint: <path-to-design-doc.md or feature description>
---

# Build Feature

**Announce at start:** "Using build-feature to orchestrate the full pipeline: audit → plan → review → execute → verify → finish."

## Overview

This is the end-to-end orchestrator for major features. It chains every skill in the correct order so you type ONE command and the system handles the rest — with human checkpoints at the right moments.

## Pipeline

```
Step 0:   Context & Lessons
Step 0.5: Create Feature Branch / Worktree
Step 1:   Design (P2P-aware brainstorming — or skip if design doc provided)
Step 2:   Assumption Audit ← the skepticism gate
Step 3:   Implementation Plan (lean format, 400-line cap)
Step 4:   Parallel Review Gate (/review-plan + security triage + UI pre-check + external docs)
Step 5:   Execution (sequential or selective-parallel via Task tool)
Step 6:   Verification (.claude/rules/verification.md — 17 checks)
Step 6.25: UI Post-Check (MANDATORY for UI features — blocks merge)
Step 6.5: Security Gate (/security-audit staged)
Step 7:   Branch Completion
```

---

## Step 0: Context & Lessons

Before anything else:

1. Read `tasks/lessons.md` — apply every relevant rule throughout
2. Read `CLAUDE.md` — refresh on workflow rules and verification checklist
3. Check current git branch: `git branch --show-current`
4. Check for existing design docs: `ls docs/plans/`

---

## Step 0.5: Create Feature Branch / Worktree

**Never build on `main` or `master`.** Before touching any file:

1. Check the current branch: `git branch --show-current`
2. If on `main` or `master`, derive a branch name from the feature description.
3. **Default: create a worktree** for full isolation:
   ```bash
   git worktree add ".worktrees/feat/<feature-name>" -b "feat/<feature-name>"
   cd ".worktrees/feat/<feature-name>" && npm install
   npx vitest run
   ```
   ⚠️ **Dev server warning (lesson #74):** Changes in a worktree are completely invisible to the dev server running from the main project directory. Tell the user: "You won't see this in your browser until we merge." Merge first, then test in the browser.
4. **Exception — skip worktree and use a plain branch only if** the user explicitly says "no worktree" or "just a branch":
   ```bash
   git checkout -b feat/<short-feature-name>
   ```
5. Confirm the active branch before proceeding: `git branch --show-current`

**If already on a feature branch:** note it and continue — do not create another branch or worktree.

---

## Step 1: Design

**If `$ARGUMENTS` points to an existing design doc (file path ending in `.md`):**

- Read it. Summarize the scope to the user in 2-3 sentences.
- Confirm: "Design doc exists. Skipping brainstorming — moving to assumption audit."
- Proceed to Step 2.

**If `$ARGUMENTS` is a feature description (no doc exists):**

Run `/plan-feature $ARGUMENTS` — the full pre-build reasoning session. This will:

1. Read `tasks/lessons.md` and `tasks/todo.md` for context
2. Stress-test the idea against the actual codebase (assumption invalidation)
3. Look up live external docs for any API/service the feature touches
4. Triage scope into P0/P1/P2/cut with user approval
5. Name the one risky unknown
6. Write the design doc to `docs/plans/YYYY-MM-DD-<feature-name>.md`

⛔ **PAUSE after plan-feature completes.** Present the design doc to the user and wait for explicit approval before proceeding. The user must confirm "looks good" or request changes. Do not auto-proceed to Step 2.

Once approved, proceed to Step 2 with the design doc path.

**If `$ARGUMENTS` is empty:**

- Ask the user: "What are we building? Provide a design doc path or describe the feature."

---

## Step 2: Assumption Audit (The Skepticism Gate)

This is the most important step for preventing wasted work. Before any planning, verify that the design doc's assumptions match reality.

**Spawn a research subagent** (Task tool, subagent_type: "Explore") with this mandate:

> Read the design doc at [path]. For every claim it makes about the codebase, verify it:
>
> 1. **"File X exists / does Y"** — Read the actual file. Does it?
> 2. **"Component Z works like this"** — Read the component. Does it actually?
> 3. **"This table has field F"** — Check the schema/types. Does it?
> 4. **"Changing A won't affect B"** — Grep for imports and consumers of A. Will it?
> 5. **"We can reuse pattern P"** — Find where P is used. Is it compatible?
> 6. **Side effect scan** — For each file the design says to modify, list everything that imports from it
> 7. **External platform docs** — If the feature touches any external service (Supabase pgvector/RPC, Next.js App Router, Google Ads API, Meta Graph API, OpenAI embeddings, Apify, Firecrawl, Perplexity), use the `firecrawl:firecrawl-cli` skill to pull current docs for the specific endpoints and parameters the design references. Flag any version drift, deprecated fields, or changed signatures.
> 8. **State machine & resilience audit** — If the feature introduces any state/status/lifecycle field: list every valid state and every transition. For each non-terminal state, verify it has BOTH a success exit AND a failure exit. Check if transitions are awaited with `{ error }` or fire-and-forget. Ask: "What is the DB state if the browser closes / server crashes / network drops while in each non-terminal state?" If the answer is "stuck forever," flag as WRONG.
>
> Output a report:
>
> - CONFIRMED: [assumptions that are correct]
> - WRONG: [assumptions that don't match reality + what's actually true]
> - RISKY: [assumptions that are technically correct but have side effects]
> - MISSING: [things the design doesn't mention but should]
> - STATE MACHINE: [if applicable — state diagram, missing transitions, fire-and-forget writes, resilience gaps]

**Prep Refactor Gate:** After the assumption audit, run a file size check on every file the feature will modify:

```bash
wc -l $(grep -rn "from.*<module>" src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | head -20)
```

For any file >500 lines that the feature will extend by 100+ more lines:

- Flag it: "⚠️ `<file>` is N lines. This feature adds ~M more. Consider running `/refactor <file>` first."
- Also check sibling files for copy-paste duplication (identical `useState`/`useEffect` blocks, matching handler patterns, shared constants defined per-file) — sibling duplication is a higher-priority refactor signal than raw line count.
- Ask: "Run `/refactor <file>` in a prep commit before we plan the feature?" If yes: run it first, get it committed, then return to planning. If no: note it and proceed.

**Present findings to the user.** If there are WRONG assumptions:

- Explain what the design assumed vs what the code actually does
- Propose corrections
- Ask: "Should I update the design doc with these corrections before planning?"
- If yes: update the doc, then proceed
- If no (user overrides): note the override and proceed with caution

**This step catches the "update X on Y" problem** — where the user describes what they think the system does, and the system blindly codes against that mental model instead of checking reality.

---

## Step 3: Implementation Plan

Write the implementation plan to `docs/plans/YYYY-MM-DD-<feature-name>.md`.

**Lean plan format — plans are specs, not implementations:**

- One task per heading: `## Task N: [verb] [what]`
- Each task: what to do, which file, success criteria (2-3 lines max)
- Code snippets: max 15 lines each — show the pattern, not the full implementation
- Total plan cap: 400 lines. If you're going over, you're writing implementation, not a spec.
- Reference existing files by path instead of embedding their content: "Follow the pattern in `src/lib/google-ads/encryption.ts`"

Before finalizing, scan all task code snippets for external API calls, SDK methods, or library-specific patterns. These will be verified in Step 4d — but flag them now so 4d has a clear checklist. Add a `## External Dependencies to Verify` section at the bottom of the plan listing each library/service and the specific methods referenced.

---

## Step 4: Parallel Review Gate

⛔ **HARD GATE — no file may be written until ALL sub-steps below return results.**

Launch Steps 4a, 4b, 4c, and 4d in parallel (they are independent). Read ALL results in one pass after all complete. Do NOT poll individually — launch all, then wait.

**Known rationalizations to reject:** "foundation work is structural," "I'll address findings later," "this won't change based on review," "let me start while it runs." ALL of these violate this gate.

### 4a. Security Triage

Run `/security-audit triage:<one-sentence description of what the plan builds>` in parallel with 4b, 4c, and 4d.

Security triage runs alongside the plan-critic — not before it. The Gate Summary merges all findings after all four return: triage output is embedded into the plan during Gate Summary resolution. If the critic flags missing security coverage, triage findings will fill those gaps at that point.

The triage mode analyzes the plan's _intent_ and outputs a focused checklist of which security surfaces are relevant (SSRF? Token encryption? New DB tables? Public endpoints? OAuth? XML generation?).

**Embed the triage output directly into the implementation plan** under a "Security Acceptance Criteria" section. These become required checklist items — tasks that must be satisfied before Step 6.5 can pass.

If the triage outputs no relevant surfaces: note "No special security surfaces identified" and proceed.

### 4b. Plan Review

Invoke `/review-plan` on the implementation plan (now including the security checklist).

The review-plan skill will:

- Spawn a fresh-context plan-critic agent
- Cross-reference every task against `tasks/lessons.md`
- Check file paths, codebase conflicts, dependency ordering
- Verify that the security checklist items from Step 4a have corresponding tasks in the plan
- Output: APPROVE or REVISE with specific fixes

**If REVISE:** Fix the blockers, re-run /review-plan. Maximum 3 cycles.
**If APPROVE:** Proceed to execution.

⛔ **DO NOT write a single implementation file until you have received the APPROVE verdict in this conversation.** The plan-critic runs in a fresh context with zero attachment to the plan — it will catch schema design issues, missing RLS policies, wrong index strategies, and dependency ordering that you cannot see from inside the planning context. "Foundation work is structural and won't change" is rationalization, not reasoning. Wait for the verdict.

### 4c. UI Pre-Check

**Only for features that touch UI files (components, pages).** Skip for backend-only features.

⛔ **DO NOT begin Task 1 until /ui-check pre has been called.** This is the last gate before execution — it takes 5 seconds and gives subagents a violation baseline so they don't inherit pre-existing debt.

Before execution, call `/ui-check pre:<list of files the plan will modify>`.

This is a fast grep-based check that flags if any planned files have existing token violations (hardcoded pixel sizes, `text-foreground`, inline card styling, etc.).

- If violations predicted: warn the user — "These files have N existing violations. Fix them during execution or leave them, but know they're there."
- Do NOT block execution — this is informational.
- The full checklist is in the `/ui-check` skill.

### 4d. External Docs Verification

⛔ **Non-negotiable for any feature that uses external libraries or services.**

**Grep-first (lesson #95):** Before reaching for Perplexity or Firecrawl, grep the codebase for existing usage of the library/method. If 2+ files already use it successfully, the codebase is the source of truth — no docs check needed.

Scan the implementation plan for:

- **New npm packages** being installed (no existing usage → verify)
- **External service calls** with zero existing usage in codebase (Supabase Storage, OpenAI, Google Ads, Meta Graph API, etc.)
- **Platform-specific patterns** never used before (new Next.js App Router conventions, new Vercel config)

For each genuinely novel surface, verify current API signatures and limits:

- Quick lookups: `mcp__perplexity__perplexity_search`
- Specific docs pages: `firecrawl:firecrawl-cli`

Output a brief report:

- VERIFIED: [library/service] — [version confirmed, API matches plan]
- STALE: [library/service] — [what changed, what to update in plan]
- SKIPPED: [library/service] — [2+ existing usages found, codebase is source of truth]
- UNKNOWN: [could not verify — flag for manual check]

If any STALE findings: update the plan's code snippets before execution. Subagents will copy these snippets verbatim.

### Gate Summary (read all results here)

After all parallel sub-steps complete, resolve findings in this order:

1. **4b (Plan Critic):** If REVISE → fix blockers, re-run critic. If APPROVE → proceed.
2. **4a (Security Triage):** Embed checklist into plan under "Security Acceptance Criteria."
3. **4d (External Docs):** If any STALE → update plan code snippets. If all VERIFIED → proceed.
4. **4c (UI Pre-Check):** Note violations for awareness during execution (informational, non-blocking).

Only after all four are resolved: proceed to Step 5.

---

## Step 5: Execution

⛔ **FORBIDDEN: Do not write implementation code in the main conversation context.** Every task must go through a subagent. Writing code directly in the main context fills the context window with implementation details, degrading quality on later tasks — this is exactly the failure mode subagent-driven development was designed to prevent.

**Named rationalizations to reject:** "it's a small file," "I'll be faster doing it directly," "it's just boilerplate," "this is a trivial change." ALL of these violate this rule. One task = one subagent. No exceptions.

### Choosing the Execution Strategy

**Read the plan and classify each task's coupling:**

**SEQUENTIAL (default for feature work):**
Use when tasks share types, DB schemas, import chains, or when one task's output feeds the next.

Signs that tasks MUST be sequential:

- Task B imports from a file Task A creates
- Task B uses a type/interface Task A defines
- Tasks share the same DB table or API route
- Tasks modify the same component or its direct parent

**SELECTIVE-PARALLEL (only for genuinely independent work):**
Use when tasks have zero shared state and can't conflict.

Tasks that CAN run in parallel:

- Research tasks (multiple subagents searching different topics)
- Repetitive fixes (add logging to 5 routes, fix the same UI pattern in 4 tabs)
- UI components that share NO props, NO imports, and wire together in a LATER task
- Tests for already-completed features

Tasks that MUST NOT run in parallel:

- Anything sharing types, schemas, or import chains
- Foundation tasks (types, DB, auth) and consumer tasks (routes, components)
- Tasks where both modify the same file

### Execution Flow

**For sequential tasks:**
⛔ **The orchestrator MUST NOT write implementation code directly.** It dispatches subagents, reads output, runs compile checks, and commits. If you find yourself writing component code, route handlers, or utility functions in the main context — STOP. You are violating this rule.

- Dispatch each task via the Task tool (`subagent_type: "general-purpose"`) — one fresh subagent per task
- Include in each subagent's task prompt: "If this task calls any external API, uses a library method beyond basic CRUD, or references platform-specific config, verify the current method signature and parameters via Perplexity or Firecrawl before writing the implementation. Do not trust code snippets in the plan — they may be stale."
- Compile check (`npx tsc --noEmit`) between each task — run by the orchestrator, not the subagent
- Commit after each passing task — run by the orchestrator

**For parallel-eligible tasks:**

- Use the Task tool with multiple simultaneous calls — but ONLY for the tasks classified as independent above
- After all parallel tasks complete, run the semantic conflict detector before the TypeScript check:
  `bash .claude/hooks/parallel-conflict-check.sh <commit-before-parallel-started>`
  If it reports conflicts (duplicate exports, duplicate API routes, files touched by multiple agents), resolve them before proceeding. The script exits 1 on conflict and 0 when clean.
- Then run merge verification: `npx tsc --noEmit && npx vitest run`
- If conflicts: resolve sequentially, then re-verify

**Typical pattern for a major feature:**

```
Tasks 1-7: Sequential (foundation: types → DB → routes → orchestrator)
Tasks 8-13: Selective-parallel (UI components, IF they don't share props)
Task 14: Sequential (wire everything together)
Task 15: Sequential (integration test)
```

---

## Step 6: Verification

**Post-feature size check (before verification):** Run `wc -l` on all files touched in this feature. If any now exceed 500 lines, add to the verification report: "Refactor candidate after merge: `/refactor <file>` (N lines)." Don't block verification — just surface it so the user can decide whether to clean up before or after merging.

Run the 20-point verification checklist from `.claude/rules/verification.md` before claiming the feature is done.

This requires:

- All tests pass (`npx vitest run`)
- TypeScript compiles (`npx tsc --noEmit`)
- Build succeeds (`npm run build`)
- No TODO/FIXME/PLACEHOLDER markers
- No exposed secrets
- Wiring check: every new component is rendered, every new route is called, every new field is consumed
- **Logging compliance in new API routes** — subagents don't auto-load `.claude/rules/api-routes.md`, so check every new `route.ts` for `createRouteLogger` and the 8 canonical events. This is the most common subagent compliance gap.
- **State machine audit (item 18)** — if this feature introduced or modified any `status`, `lifecycle_state`, or `state` field: verify every non-terminal state has both success AND failure exits, all state transitions are awaited with `{ error }` checked, and there are tests for error-path transitions. This is a blocking check — a state machine with happy-path-only exits ships stuck states to production.
- **Fire-and-forget detection (item 19)** — grep all modified files for `void db.`, `void supabase.`, `void .*\.update\(`. Any hit on a state-touching write is a bug that must be fixed before merge.
- **Error-path test coverage (item 20)** — any catch block that modifies a state field must have a test that forces the error and asserts the state transition persisted.

**Do NOT skip this step.** Do NOT claim "it works" without running the commands and showing the output.

---

## Step 6.25: UI Post-Check (MANDATORY — blocks merge)

**Only for features that touched UI files.** Skip for backend-only features.

After verification passes, before the security gate, call `/ui-check post:<list of files written>`.

This reads what was actually written and checks against the approved design standards (stat tokens, CARD_CLASSES, color tokens, etc.). Outputs PASS/FAIL per rule with file:line for each failure.

- **Any FAIL blocks merge.** Fix the violations and re-run `/ui-check post:<files>` until all PASS.
- The `check-ui-tokens.sh` hook already blocks individual writes, but this step catches patterns the hook can't (badge category mismatches, missing hover states, stat card composition).
- If all PASS: note it and proceed to security gate. Create the marker so the stop hook knows: `touch .claude/ralph/ui-checked`
- The full checklist is in the `/ui-check` skill.

---

## Step 6.5: Security Gate

**MANDATORY before branch completion.** Run `/security-audit staged`.

The `staged` scope scans only the files changed in this feature branch (`git diff --name-only HEAD~1`), not the whole codebase. This keeps the scan fast and focused — no false positives from existing code.

**Validate against the Security Acceptance Criteria checklist from Step 4a:**

- For each item on the checklist (SSRF guard, token encryption, XML escaping, etc.), confirm it passed the scan
- If any checklist item is missing from the diff, flag it as unimplemented

**If FAIL (any CRITICAL or HIGH):**

- List the specific findings
- Fix them before proceeding — do NOT skip to branch completion
- Re-run `/security-audit staged` after fixes to confirm PASS

**If PASS:**

- Note the verdict in the task log
- Proceed to Step 7

**Why staged, not full?**
Full-codebase scans are for periodic audits (`/security-audit full`). In the feature pipeline, scanning the diff is better: it's fast (<5s), context-specific, and catches what was _introduced_ — not what already existed. It also means the security gate is always proportional to the feature size.

---

## Step 7: Branch Completion

Choose the appropriate completion strategy and present options to the user:

- **Merge to main** — `git checkout main && git merge feat/<name> --no-ff`
- **Create a PR** — `gh pr create --title "feat: <name>" --body "..."`
- **Keep working on the branch** — note remaining tasks and current state

**The user decides.** Don't auto-merge.

**Deployment is manual — never auto-deploy from a feature branch.** `vercel.json` restricts auto-deploys to `main` only. After merging to main, the user or CI triggers the deploy explicitly via `/deploy`.

---

## Checkpoints (Where the User Must Approve)

The pipeline pauses for human input at these moments:

1. **After Step 2** (Assumption Audit) — if wrong assumptions found
2. **After Step 3** (Plan written) — "Plan complete. Running security triage + review now."
3. **After Step 4** (Review verdict) — if REVISE, show blockers before fixing; show security checklist
4. **After Step 5** (Execution complete) — "All tasks done. Running verification + security gate."
5. **After Step 6.5** (Security gate) — if FAIL, show findings and block merge until fixed
6. **After Step 7** (Branch ready) — merge/PR/continue decision

Everything else runs autonomously.

---

## Error Recovery

**If a task fails 3 times during execution:**

- Stop execution
- Show the user: what failed, what was tried, what the error says
- Ask for direction — don't keep retrying

**If verification fails after all tasks complete:**

- List every failure with file:line references
- Ask: "Fix these issues and re-verify, or investigate further?"

**If the plan review loops 3 times without APPROVE:**

- Show all remaining blockers
- Ask the user: "Override and execute anyway, or rethink the approach?"

---

## Notifications

When running autonomously on a long task, notify the user at key milestones via **both** Slack and email.

**After Step 4** (Plan review APPROVE):

- Slack: `slack_send_message(channel_id="U4XN990J0", message="Plan approved. Starting execution of N tasks.")`
- Email: `bash .claude/scripts/notify.sh "Plan approved — starting execution" "Plan approved for [feature]. Starting execution of N tasks."`

**After Step 6** (Verification complete):

- Slack: `slack_send_message(channel_id="U4XN990J0", message="Feature complete and verified. Ready for your merge/PR decision.")`
- Email: `bash .claude/scripts/notify.sh "Build complete — ready for merge" "Feature [name] is complete and verified. Ready for your merge/PR decision."`

**On error** (3 failed attempts or blocking issue):

- Slack: `slack_send_message(channel_id="U4XN990J0", message="Blocked on [task]. Need your input.")`
- Email: `bash .claude/scripts/notify.sh "Blocked — needs your input" "Blocked on [task] after 3 attempts. Need your direction."`

If Slack MCP is not available, skip Slack silently. Email runs as long as `ZAPIER_NOTIFY_WEBHOOK` is set in `.env`.

---

## What You Type

For a major feature with an existing design doc:

```
/build-feature docs/plans/2026-03-02-google-ads-ux-design.md
```

For a new feature idea without a design doc:

```
/build-feature Add a Yelp review scraper that enriches Dream 100 prospects
```

For resuming a partially-completed feature:

```
/build-feature docs/plans/2026-03-02-google-ads.md --resume
```

(The skill reads git log and existing plan files to pick up where it left off.)
