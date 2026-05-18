---
name: refactor
description: >
  Structured refactoring of large files (500+ lines) into smaller, well-bounded modules.
  Use this skill when: a file exceeds 500 lines, a component mixes multiple responsibilities,
  the user says "this file is too big", "break this up", "split this out", "refactor",
  "clean up", or "this is getting unwieldy". Also trigger when any task plan touches a file
  over 500 lines and behavior will not change. This skill produces behavior-preserving,
  test-backed, small PRs — not speculative rewrites. It is the OPPOSITE of "clean this up" —
  it is a disciplined decomposition with verification at every step.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
argument-hint: <file path or component name to refactor>
---

# Refactor — Structured File Decomposition

**Target:** $ARGUMENTS

This skill decomposes large files into smaller, well-bounded modules without changing behavior.
It follows the explore → plan → implement → verify loop from Google's CL practices and
Anthropic's Codex guidance.

---

## Step 0: Branch Gate

**Never run a refactor on `main` or `master`.** Refactors modify source files — they belong on a branch even though behavior is preserved.

1. Check current branch: `git branch --show-current`
2. If on `main` or `master`, create a refactor branch:
   ```bash
   git checkout -b refactor/<short-file-name>
   ```
   Example: `/refactor src/components/meta-ads/MetaAdsTab.tsx` → `git checkout -b refactor/meta-ads-tab`
3. If already on a feature branch: continue — do not create another branch.

---

## Ground Rules (Non-Negotiable)

1. **Behavior stays the same.** If tests pass before, they pass after. If no tests exist, write characterization tests BEFORE refactoring.
2. **One self-contained change per commit.** Never batch multiple extractions into a single commit.
3. **Verify after every change.** Run `npx vitest run`, `npx tsc --noEmit`, and `npm run build` after each extraction. If anything fails, revert immediately.
4. **No speculative abstractions.** Extract only what is repeated, semantically duplicated, or clearly a separate concern. Three similar lines are fine — don't invent a generic wrapper.
5. **Separate refactoring from feature work.** This skill does NOT add features, change APIs, or modify behavior. If a feature change is needed to enable the refactor, do it in a prior commit.
6. **Small PRs.** Aim for ~100 lines changed per commit. A 1000-line refactoring PR is almost always wrong — break it into 5-10 smaller ones.

---

## Phase 1: Explore (Read-Only)

Before touching any code, understand the file completely.

### Step 1 — Measure the Problem

```bash
# Count lines in the target file
wc -l <target-file>

# Find all files over 500 lines in the project
find src/ -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -rn | head -20

# Check what imports this file (downstream consumers)
grep -rn "from.*<module-name>" src/ --include="*.ts" --include="*.tsx" | grep -v __tests__ | grep -v node_modules

# Check what this file imports (upstream dependencies)
head -80 <target-file>
```

### Step 2 — Map Responsibilities

Read the entire target file. Identify distinct responsibilities by looking for:

- **Separate state domains** — groups of `useState`/`useEffect` that don't interact with each other
- **Render sections** — large JSX blocks that could be their own component
- **Utility functions** — pure functions mixed into a component file
- **API/data fetching logic** — `fetch` calls, Supabase queries, data transforms
- **Event handlers** — complex handlers that could be custom hooks
- **Type definitions** — interfaces/types that are consumed elsewhere
- **Constants/config** — magic numbers, option arrays, label maps

For each responsibility, note:
- Approximate line range (e.g., "lines 120-280: prospect detail sheet")
- What state it reads/writes
- What props it would need if extracted
- Whether it has its own side effects

### Step 3 — Check Test Coverage

```bash
# Find existing tests for this module
find src/ -path "*__tests__*" -name "*.test.*" | xargs grep -l "<module-name>" 2>/dev/null

# Run existing tests to establish baseline
npx vitest run --reporter=verbose 2>&1 | tail -30
```

If tests exist: note the count and all passing. This is your preservation baseline.
If no tests exist: **STOP. Write characterization tests before proceeding.** (See Phase 1.5 below.)

### Step 4 — Produce the Exploration Report

Output a structured summary before planning:

```
REFACTOR EXPLORATION: <filename>
=================================
Total lines: N
Responsibilities found: N

1. [NAME] (lines X-Y, ~N lines)
   State: reads [list], writes [list]
   Side effects: [list or "none"]
   Extraction difficulty: low | medium | high
   Reason: [why this is a separate concern]

2. [NAME] (lines X-Y, ~N lines)
   ...

Test baseline: N tests passing across M files
Downstream consumers: [list of files that import this module]
Proposed extraction order: [ordered list, easiest/least-coupled first]
```

**CHECKPOINT: Present this report to the user. Do NOT proceed to Phase 2 without approval.**

---

## Phase 1.5: Write Characterization Tests (If Needed)

Only enter this phase if the target file has zero or insufficient test coverage.

Characterization tests lock current behavior — they don't assert correctness, they assert "this is what the code does now." The goal is to catch unintentional changes during refactoring.

For **UI components**: Test that they render without crashing, that key elements are present, and that critical interactions trigger expected state changes.

For **utility functions**: Test with real inputs from the codebase (grep for actual call sites to find realistic arguments).

For **API routes**: Test the request→response shape with mocked dependencies.

Write these tests in a new file: `src/lib/__tests__/<module-name>.characterization.test.ts`

After writing: run `npx vitest run` and confirm all new tests pass. Commit:
```bash
git add src/lib/__tests__/<module>.characterization.test.ts
git commit -m "test: add characterization tests for <module> before refactor"
```

---

## Phase 2: Plan

### Step 5 — Define Extraction Order

Order extractions by:
1. **Types/interfaces first** — zero behavior risk, unblocks everything
2. **Pure utility functions next** — no side effects, easy to test in isolation
3. **Custom hooks** — encapsulate state + effects as a unit
4. **Sub-components** — visual extractions, may need prop drilling
5. **Data/API layers last** — highest coupling risk

For each extraction, define:
- **Source**: exact line range in the original file
- **Destination**: new file path (follow existing project conventions)
- **API surface**: what the original file will import from the new module
- **Invariant**: what must remain true after this extraction (e.g., "all 225 tests still pass")

### Step 6 — Size Check

Each planned extraction should change roughly 50-150 lines. If an extraction is larger than 200 lines, break it into sub-steps:
1. Move types/interfaces first
2. Move the function/component body second
3. Update imports at call sites third

### Step 7 — Write the Plan

Write to `tasks/todo.md`:

```markdown
## Refactor: <filename>

### Extraction 1: <name>
- [ ] Create `<new-file-path>` with types/functions from lines X-Y
- [ ] Update imports in `<original-file>`
- [ ] Run tests, tsc, build
- [ ] Commit: `refactor: extract <name> from <original-file>`

### Extraction 2: <name>
- [ ] ...
```

**CHECKPOINT: Present plan to user. Get approval before Phase 3.**

---

## Phase 3: Implement

### Step 8 — Execute One Extraction at a Time

For each planned extraction:

**A. Create the new file:**
- Copy the relevant code to the new file
- Add necessary imports
- Export the public API

**B. Update the original file:**
- Replace the moved code with an import from the new file
- Remove now-unused imports from the original
- Ensure the original file's public API is unchanged

**C. Update any other consumers:**
- If other files imported the moved code from the original, update their imports
- Grep to be sure: `grep -rn "from.*<original-module>" src/`

**D. Verify (MANDATORY after every extraction):**

```bash
# Type check
npx tsc --noEmit

# Tests
npx vitest run

# Build
npm run build

# Confirm no regressions
echo "Tests: $(npx vitest run 2>&1 | grep -o '[0-9]* tests.*')"
```

If ANY step fails: **revert immediately** with `git checkout -- .` and diagnose before retrying.

**E. Commit:**

```bash
git add <new-file> <modified-files>
git commit -m "refactor: extract <name> from <original-file>"
```

### Step 9 — Repeat for Each Extraction

Move to the next extraction only after the previous one is committed and verified.
Track progress in `tasks/todo.md` by checking items off.

---

## Phase 4: Verify & Report

### Step 10 — Final Verification

After all extractions are complete:

```bash
# Full test suite
npx vitest run --reporter=verbose

# Type check
npx tsc --noEmit

# Production build
npm run build

# Line count comparison
echo "BEFORE: <original-count> lines"
wc -l <original-file>
echo "New files:"
wc -l <list-of-new-files>

# Confirm no TODO/FIXME introduced
grep -rn "TODO\|FIXME\|PLACEHOLDER\|HACK" <all-touched-files>

# Confirm no behavior change (test count should be same or higher)
```

### Step 11 — Report

```
REFACTOR COMPLETE: <filename>
==============================
Before: N lines in 1 file
After:  M lines across K files (largest: L lines)
Reduction: N-M lines removed from original (X% smaller)

Extractions:
  1. <name> → <new-path> (N lines)
  2. <name> → <new-path> (N lines)
  ...

Tests: X passing (was Y before — should be >= Y)
Commits: K refactor commits
Behavior changes: NONE (by design)

Suggested follow-ups:
  - [any remaining large files]
  - [any new abstractions that could be shared]
```

---

## Decision Trees

### "Should I extract this?"

```
Is it duplicated in 2+ places?
  → YES: Extract. Semantic duplication = shared component.
  → NO: Continue ↓

Is it a clearly separate concern (own state, own side effects)?
  → YES: Extract. Single responsibility.
  → NO: Continue ↓

Is the file over 500 lines AND this block is 100+ lines?
  → YES: Extract for readability. Large blocks hurt comprehension.
  → NO: Leave it. Extraction for extraction's sake is not a refactor.
```

### "Should I create a shared component?"

```
Is the duplication semantic (same concept) or just textual (similar-looking code)?
  → Textual only: Do NOT extract. Two things that look alike today may diverge tomorrow.
  → Semantic: Continue ↓

Can I define a clean, small API (≤5 props)?
  → NO: Leave separate. A 15-prop shared component is worse than duplication.
  → YES: Continue ↓

Will at least 2 consumers use it without needing flags/conditionals?
  → NO: Leave separate. A component with `if (variant === 'A')` everywhere is not shared.
  → YES: Extract it. This is a real abstraction.
```

### "When should I NOT refactor?"

- The code is ugly but stable, local, and rarely touched → Leave it
- The change would require modifying 10+ files → Needs a broader plan, not this skill
- Tests don't exist and can't be written quickly → Write tests first (Phase 1.5), refactor later
- The refactor is mixed with a feature change → Do the feature in a separate PR first
- You're unsure if the abstraction is right → Wait. Premature abstraction is more expensive than duplication.

---

## Anti-Patterns (Things This Skill Prevents)

| Anti-Pattern | What Goes Wrong | This Skill's Guard |
|---|---|---|
| "Clean this up" with no plan | Random changes, broken imports, lost behavior | Phase 1 exploration + Phase 2 plan required before any code changes |
| Giant refactoring PR | Unreviewable, hard to rollback, high failure rate | One extraction per commit, ~100 lines each |
| Refactoring without tests | No way to know if behavior changed | Phase 1.5 — characterization tests before any extraction |
| Speculative abstraction | "We might need this later" → premature generic component | Decision trees require concrete duplication or clear separation |
| Mixed refactor + feature | Impossible to review, impossible to rollback cleanly | Ground rule #5 — separate commits, separate PRs |
| Refactoring dead code | Polishing code nobody calls | Phase 1 Step 1 — check downstream consumers first |

---

## When NOT to Use This Skill

- **Trivial cleanup** (rename a variable, fix an import): Just do it. No skill needed.
- **Feature work that happens to touch a large file**: Use the normal coding workflow. Refactor first in a prep PR if the file shape blocks the feature.
- **Architecture redesign** (changing data flow, merging services, new patterns): That's a PRD + architecture doc, not a refactoring skill.
- **Files under 300 lines**: Probably fine as-is unless responsibilities are clearly tangled.