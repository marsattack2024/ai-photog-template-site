---
name: debug
description: Structured debugging pipeline for any bug, error, or unexpected behavior in this codebase. Use this skill whenever something is broken — build failures, test failures, runtime errors, API errors, UI glitches, or type errors. Invoke it before attempting any fix: it classifies the bug, fires a mandatory research gate for library/API/platform errors, traces the root cause, checks blast radius, tracks fix attempts, and verifies the fix sticks. Do NOT skip this skill and go straight to editing files — the research gate alone has saved multiple multi-hour debugging spirals. Trigger phrases: "this is broken", "fix this error", "why is X failing", "getting a [error message]", "can't get X to work", "something is wrong with", or any time you're about to grep-and-guess.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
argument-hint: <error message, description, or "screenshot" to auto-find>
---

# Debug

**Announce at start:** "Using /debug: Reproduce → Classify → [Research Gate if external] → Hypothesis Ranking → Root Cause Confirmation → ⛔ APPROVAL GATE → Fix (global) → Verify → Lessons."

## Pipeline

```
Step 0: Reproduce & Collect Evidence
Step 1: Classify the Bug (INTERNAL / EXTERNAL / ENVIRONMENT)
Step 2: Research Gate          ← fires only for EXTERNAL bugs
Step 2.5: Hypothesis Ranking   ← NEW
Step 3: Root Cause Confirmation ← confirm working theory
Step 3.5: ⛔ APPROVAL GATE      ← mandatory pause before any file edit
Step 4: Fix (global scope + checklist)
Step 5: Verify Fix
Step 6: Lessons Capture        ← only for non-trivial root causes
```

---

## Step 0: Reproduce & Collect Evidence

Before touching any code, establish what's actually broken. The most common debugging mistake is reading an error and immediately opening a file to fix it — without confirming the error is even reproducible.

1. **Parse the input:**
   - Error message provided → extract: file path, line number, error type, stack frames
   - Screenshot provided → invoke `read-screenshot` skill to extract text first
   - Vague description only → ask for the exact error message or exact steps to reproduce before continuing

2. **Reproduce it:**
   - Type error → `npx tsc --noEmit`
   - Test failure → `npx vitest run <test-file>` (or `npx vitest run` for full suite)
   - Build failure → `npm run build`
   - Runtime error → check `logs/activity.log`; if API route, check Vercel logs via `vercel logs`
   - UI glitch → read the component file + check browser console description from user

3. **Capture the full error** — not just the first line. Stack traces, HTTP status codes, module paths all matter. Write down:
   - Exact error message
   - File and line number (if available)
   - Whether the error is consistent or intermittent

---

## Step 1: Classify the Bug

Read the full error and classify it. This determines whether the Research Gate fires.

| Category        | Signals                                                                                                                                      | Research Gate?                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **INTERNAL**    | Error points into `src/` — wrong variable, missing import, logic bug, broken wiring, bad type cast                                           | No                                   |
| **EXTERNAL**    | Error names an npm package, mentions an HTTP status from a third-party service, stack trace enters `node_modules/`, library method not found | **Yes — mandatory**                  |
| **ENVIRONMENT** | Missing env var, wrong config, works-locally-fails-in-prod, CORS, DNS, Edge/Node runtime mismatch                                            | Maybe (check if platform docs apply) |

**Classification rules (in priority order):**

- Stack trace exits `src/` into `node_modules/` → EXTERNAL
- Error names an npm package name explicitly → EXTERNAL
- HTTP 4xx/5xx from Google, Meta, Supabase, Twilio, OpenAI, Vercel → EXTERNAL
- "works locally but not in production" → ENVIRONMENT (with Vercel platform docs check)
- Error is entirely in `src/` files with no library names → INTERNAL

State your classification clearly: `Classification: EXTERNAL — error names '@supabase/ssr'`

---

## Step 2: Research Gate (EXTERNAL and some ENVIRONMENT bugs)

**Do not attempt a fix before completing this step for EXTERNAL bugs.** This step exists because guessing at library behavior from training data is how debugging spirals happen — three wrong attempts at a fix that the docs would have solved in 10 seconds.

```
1. Find the exact version:
   grep "<package-name>" package.json

2. Search with the exact error message:
   mcp__perplexity__perplexity_search("<exact error message> <package> <version>")

3. If Perplexity returns a known issue or migration guide:
   → Use firecrawl:firecrawl-cli to read the specific docs page

4. If Perplexity returns nothing useful:
   → Search GitHub issues: gh issue list --repo <org>/<repo> --search "<error>"
   → Check CHANGELOG.md between current version and latest

5. State your finding in one of these formats:
   - KNOWN ISSUE: [description + official fix]
   - VERSION MISMATCH: [your version X, behavior changed in Y]
   - API CHANGE: [method/param deprecated or signature changed]
   - NO MATCH: [proceed to root cause with docs context loaded]
```

For **ENVIRONMENT bugs**: if the issue is "works locally, fails in prod" — also check Vercel runtime docs for the specific error pattern before digging into code.

---

## Step 2.5: Hypothesis Ranking

**Generate 3–5 candidate hypotheses for what is causing the bug, ranked by probability.**

For each hypothesis, output in this exact format:

```
Hypothesis N — [Short name] — Probability: XX%
  Why likely: [what in the evidence points here]
  Why unlikely: [what contradicts this hypothesis]
  If true, error would also show: [secondary symptom / error code to look for]
  Requires external docs: YES / NO
```

**Rules for this step:**

- Hypotheses must be ranked descending by probability. They must sum to 100% (or close — rounding is fine).
- The top-ranked hypothesis becomes the working theory fed into Root Cause Analysis.
- Hypotheses must reason from first principles (data flow, contract, timing, encoding) — not from pattern matching alone.
- If the Research Gate fired (EXTERNAL bug), all hypotheses must reference the docs findings from Step 2.
- Never skip this step — multiple hypotheses prevent confident wrong fixes.

**Example output:**

```
Hypothesis 1 — Expired token not refreshed before API call — Probability: 55%
  Why likely: error is 401 at Google API; access_token was read before the refresh check in auth.ts
  Why unlikely: refresh logic exists in src/lib/google/auth.ts and is called in most routes
  If true, error would also show: a 200 on the first request after login, 401 only after ~60min
  Requires external docs: YES — Google OAuth token lifetime

Hypothesis 2 — Field renamed in API v2 response — Probability: 25%
  Why likely: Google Ads API was upgraded to v18 in the last commit; field access pattern uses old name
  Why unlikely: field is used in 3 other routes that aren't failing
  If true, error would also show: undefined on the specific field, not a 401
  Requires external docs: YES — Google Ads v18 changelog

Hypothesis 3 — Race condition in concurrent requests — Probability: 20%
  Why likely: error is intermittent; happens when user clicks button twice quickly
  Why unlikely: no shared mutable state in the request handler
  If true, error would also show: only on double-click or rapid fire, not single requests
  Requires external docs: NO
```

---

## Step 3: Root Cause Confirmation

**Start by stating the working theory:**

`"Working theory: Hypothesis N — [name]"`

Now trace the data flow backwards to validate that specific theory. The trace must either confirm or refute the hypothesis.

**For INTERNAL bugs:**

1. Read the file at the error's line number — the actual file, not a description of it
2. Trace the data flow backward: where does the failing value come from?
3. Grep for all callers/consumers: `grep -rn "functionName\|importedThing" src/ --include="*.ts" --include="*.tsx"`
4. Check for type mismatches hidden by `as` casts — these compile silently but fail at runtime
5. Check recent changes: `git log --oneline -10 -- <file>` — did a recent commit introduce this?
6. **State machine trace (if the bug involves a status/lifecycle/state field):**
   - List every valid state and every code path that transitions between them
   - For each non-terminal state: does it have BOTH a success exit AND a failure exit?
   - Grep for `void` on any DB write that touches this field — fire-and-forget state writes are the #1 cause of stuck states
   - Ask: "What happens to this field if the server crashes / browser closes right now?"
   - If the answer is "it stays stuck forever" → the root cause is a missing state transition, not a UI logic bug. Fix the state machine, not the symptom.

**For EXTERNAL bugs (armed with Step 2 research):**

1. Compare the code's API usage against the docs pulled in Step 2
2. Are we passing deprecated parameters? Using a removed method? Wrong version pinned?
3. If version mismatch: `npm outdated <package>` — is upgrading safe?

**For ENVIRONMENT bugs:**

1. Confirm env vars exist (don't print values): `grep -l "VAR_NAME" .env.local`
2. If deploy-specific: check `next.config.ts`, `vercel.json`, and `export const runtime` declarations
3. If CORS: check API route headers and `middleware.ts`
4. If Edge Runtime error: check for Node.js-only imports (`crypto`, `fs`, SDK clients) — they need `export const runtime = 'nodejs'`

**Decision logic:**

- If the trace CONFIRMS the working theory: state `Root cause confirmed: [one sentence]` and proceed to Step 3.5.
- If the trace CONTRADICTS the working theory: document the contradiction: `"Hypothesis N disproven — switching to Hypothesis M."` and restart the trace for the new hypothesis.
- If none of the hypotheses fit the evidence after multiple traces: state `Root cause unconfirmed after [N] traces — escalating to user.` and STOP.

---

## Step 3.5: ⛔ APPROVAL GATE

**This is a mandatory pause. No files may be modified until the user explicitly approves.**

Output this block to the user:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEBUG FINDINGS — APPROVAL REQUIRED BEFORE FIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Root Cause: [one sentence]
Confidence: [high / medium / low + why]

Fix Classification: [PROPER FIX | BYPASS — choose one]
  PROPER FIX = addresses the root design flaw (missing state transition, broken contract, wrong abstraction)
  BYPASS = works around the symptom without fixing the underlying design (try/catch wrapper, null guard, UI redirect, fallback default)
  If BYPASS: why is a proper fix not feasible right now? What tech debt ticket must be created?

Top Hypothesis: [name, XX%]
Runner-up: [name, XX%]

Evidence Trail:
  1. [file:line — what it shows]
  2. [file:line — what it shows]
  3. [external doc section if applicable]

Relevant Documentation:
  [URL or section title and the key rule it establishes — e.g., "Google OAuth docs §5.2: access tokens expire after 3600s"]

State Machine Impact: [YES | NO]
  If YES:
  - Current states: [list all valid states for the affected field]
  - Missing transitions: [which state has no exit path on error?]
  - Fire-and-forget writes: [any void/unawaited state mutations found?]
  - Recovery mechanism: [what happens on next request if state is stuck?]

Blast Radius:
  Files affected: [list of files the fix will touch]
  Pattern count: [N other places in the codebase with the same pattern]
  Scope recommendation: [LOCAL (just this file) | GLOBAL (fix all N instances)]

Proposed fix approach:
  [2–3 sentences — what will change and why it's future-proof]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Awaiting approval. Reply "go" or ask questions before I touch any files.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Forbidden rationalizations (NEVER proceed without user approval):**

- "The fix is obvious, the user won't mind."
- "I already showed them the plan, that counts."
- "It's just one line, I'll mention it after."

---

## Step 4: Fix (with Global Scope + Checklist)

**Only proceed after the user approves in Step 3.5.**

**Before writing a single line of code, complete this checklist:**

```
Fix checklist:
[ ] Is this pattern used in N other files? (if N > 1, fix all or create shared util)
[ ] Does this fix match existing project conventions? (check src/lib for analogues)
[ ] Is there already a helper/utility in src/lib/ that solves this? (reuse, don't reinvent)
[ ] Will this fix work if the codebase scales? (no hardcoded assumptions, no one-offs)
[ ] Does this introduce any security surface? (if yes: /security-audit triage before applying)
[ ] STATE MACHINE CHECK: Does the bug involve a state/status/lifecycle field? If yes:
    - Does every non-terminal state have BOTH a success AND failure exit path?
    - Are all state transitions awaited with { error } checked? (grep for void on state writes)
    - What happens if the browser closes / server crashes mid-transition?
    - Fix the state machine design, not just the symptom.
[ ] FIRE-AND-FORGET CHECK: grep modified files for `void db.`, `void supabase.`, `void .*\.update\(`.
    Any hit on a state-touching write is a bug — fix it as part of this change.
```

**Global scope rule:** If the same bug pattern exists in N ≥ 2 files, fix ALL of them in the same commit. The report at the Approval Gate must state this upfront. A local patch that leaves 3 clones unfixed is not a fix — it's a deferral.

**Utility extraction rule:** If the fix requires introducing a new helper that doesn't exist in `src/lib/`, create it there. Do not inline complex logic into a single route or component — that's how we got here.

**Track fix attempts explicitly:**

```
Attempt 1/3: [what I'm changing and why I believe this is the root cause]
Result: pass / fail — [new error if fail]

Attempt 2/3: [revised hypothesis — what the first attempt revealed]
Result: pass / fail

Attempt 3/3: [final attempt]
Result: pass / fail
```

**If 3 attempts are exhausted — STOP.** Do not try a 4th guess. Report to the user:

- What was tried (all 3 attempts)
- What each attempt revealed
- Current best hypothesis about root cause
- Suggested next investigation (different tool, different approach, user input needed)

---

## Step 5: Verify Fix

A fix isn't done until the original error is gone AND nothing new broke.

1. **Reproduce the original error** — run the exact same command/test that failed in Step 0. Confirm it no longer fails.
2. **Type check:** `npx tsc --noEmit`
3. **Full test suite:** `npx vitest run`
4. **If the fix touched a UI component:** run `/ui-check post:<file>` — fixes sometimes introduce token violations
5. **If the fix modified an API route:** verify `export const runtime = 'nodejs'` is present if the route imports crypto, Supabase auth, or any integration lib
6. **If the fix was EXTERNAL (library update/config change):** do a real end-to-end test of the affected flow, not just a type check

---

## Step 6: Lessons Capture

Skip this for trivial bugs (typos, missing imports, obvious wiring errors). Do this for root causes that were non-obvious or could recur.

```
If the root cause was:
- A stale API assumption → add to tasks/lessons.md:
  "Library X: [method/param] changed in version Y — [what to do instead]"

- A recurring pattern → add a prevention rule:
  "Always [do X] when [situation Y] — this has caused [Z] twice"

- A gap in tooling → suggest a hook or check:
  "A PostToolUse check for [pattern] would have caught this"
```

Commit format: `git commit -m "fix: <what was broken> — <root cause in 5 words>"`

---

## Quick Reference: This Codebase's Verification Commands

```bash
npx tsc --noEmit          # type check
npx vitest run            # full test suite (875 tests)
npx vitest run <file>     # single test file
npm run build             # full build (catches runtime issues tsc misses)
```

**Runtime declaration rule:** Any route that imports (directly or transitively) from `src/lib/crypto/`, `src/lib/google-ads/`, `src/lib/meta-ads/`, `src/lib/gbp/`, `src/lib/call-reviews/`, or Supabase auth — needs `export const runtime = 'nodejs'` at the top.

**Research tools:** `mcp__perplexity__perplexity_search` for quick lookups, `mcp__perplexity__perplexity_research` for deep investigation, `firecrawl:firecrawl-cli` for reading specific docs pages.
