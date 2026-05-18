---
name: wrap-up
description: End-of-session routine. Commits code, routes learnings to the right memory location, runs a session retrospective to find self-improvement opportunities, and cleans up tasks. Use when the user says "wrap up", "done for now", "end session", "close out", or invokes /wrap-up.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, TaskList, TaskUpdate, TaskCreate
argument-hint: (no arguments needed)
---

# Session Wrap-Up

**Announce at start:** "Running end-of-session wrap-up: ship → remember → retrospective → cleanup."

Run three phases in order. Auto-apply everything without asking for approval on each item. Present a consolidated report at the end.

---

## Phase 1: Ship It

Use existing tools — don't reinvent the commit or deploy flow.

### 1a. Commit Uncommitted Work

Run `git status` in the project root.

**If uncommitted changes exist:**
- Stage relevant files (never stage .env or credentials)
- Commit with a conventional commit message summarizing what changed
- Push to the **current branch only** — never force-push, never merge to main, never `git checkout main` during wrap-up. Leave merging to the user.

**If clean:** Skip to 1b.

### 1b. Task Cleanup

Run `TaskList` to see all tasks.

- Mark any `in_progress` tasks that are actually done as `completed`
- For orphaned/stale tasks: mark as `completed` with a note, or delete if irrelevant
- Don't create new tasks during wrap-up

### 1c. File Placement Check

Quick scan for files created during the session that landed in the wrong place:
- Design docs should be in `docs/plans/`
- Test files should be alongside their source or in a `__tests__/` directory
- If anything is misplaced, move it and note in the report

### 1d. Notion Board Sync

Update the GSD board in Notion to reflect what actually happened this session.

**Steps:**
1. Review conversation history and identify which items changed status (completed, started, blocked)
2. Skip personal items (Book Project, Ski Slope Pillar Content)
3. For each changed item, run the update command:
   ```bash
   npx tsx .Codex/tools/notion-gsd.ts update "Feature Name" --status "Done" --progress "100%"
   npx tsx .Codex/tools/notion-gsd.ts update "Feature Name" --status "In Progress" --progress "50%"
   npx tsx .Codex/tools/notion-gsd.ts update "Feature Name" --status "Pending" --progress "0%"
   npx tsx .Codex/tools/notion-gsd.ts update "Feature Name" --status "Blocked" --blocking "Reason here"
   ```
4. If a completed item isn't in the board yet, add it first:
   ```bash
   npx tsx .Codex/tools/notion-gsd.ts add "Feature Name" --status "Done" --category "GTM" --priority "High" --progress "100%"
   ```
5. Confirm with a final status check:
   ```bash
   npx tsx .Codex/tools/notion-gsd.ts status
   ```

**Status values:** `TBD | Pending | In Progress | Blocked | Done`
**Note:** Notion uses "Done" (not "Usable") for completed items.

This step is always no-op if nothing changed status this session. No sync needed unless items moved.

---

## Phase 2: Remember & Route

This phase decides WHERE each learning from the session belongs. We have five memory locations — use the right one.

### Memory Routing Decision Framework

For each piece of knowledge worth persisting, apply this decision tree:

```
Is it a permanent project convention or rule?
  ├─ Yes, applies to all files → AGENTS.md
  ├─ Yes, scoped to specific file types → .Codex/rules/ with paths: frontmatter
  └─ No ↓

Is it a pattern, insight, or debugging tip Codex discovered?
  ├─ Yes → Auto memory (MEMORY.md or topic file in memory/)
  └─ No ↓

Is it personal/ephemeral context (local URLs, current focus, WIP state)?
  ├─ Yes → Codex.local.md
  └─ No ↓

Is it a learned mistake or anti-pattern?
  ├─ Yes → tasks/lessons.md (with a rule that prevents recurrence)
  └─ No → Probably not worth persisting. Skip it.
```

### What to Check

1. **Read `tasks/lessons.md`** — did anything happen this session that should become a new rule?
2. **Read `MEMORY.md`** — is anything in auto memory outdated or contradicted by today's work?
3. **Check `.Codex/rules/`** — should any session learning become a path-scoped rule?
4. **Check `AGENTS.md`** — does anything need updating (test count, file paths, inventory)?

### Apply Changes

- Update the appropriate file(s) directly
- For `.Codex/rules/`: include `paths:` frontmatter if the rule only applies to specific file types
- For `MEMORY.md`: keep it under 200 lines (move details to topic files)
- Commit all memory/docs changes: `git commit -m "docs: session wrap-up — update [files changed]"`

### lessons.md — Quality Rules (non-negotiable)

**Before writing any lesson:**

1. **Read the full current lessons.md — and actively look for overlap before proposing anything.** For EVERY candidate lesson, grep for keywords in the existing rules. Ask: "Does any existing rule already cover this mistake or imply the fix?" If the answer is "partially yes," edit that rule to incorporate the new insight — do NOT add a new rule. The default action is merge, not append. A new rule is only warranted when no existing rule comes close. Most lessons that feel new are actually one incident of a pattern already documented.

2. **Apply the quality gate.** A rule earns a place in lessons.md only if ALL of these are true:
   - It describes a class of mistakes, not a single incident ("never copy-paste disabled conditions without re-checking variable names" — not "I got the disabled condition wrong on the version nav")
   - It would prevent a real bug if Codex read it before writing code
   - It is not already implied by another rule

3. **Write in the project format:** `**Bold title (≤6 words)** — [what to do or not do, 1–2 sentences max]`
   - Good: `**Version append, never overwrite** — Read existing → append new entry → write back. Never construct the same array in both route and component.`
   - Bad: `**Don't overwrite version history like I did in the LP generator when I forgot to read the existing versions array from the database before writing the new one back which caused version 1 to always be overwritten** — This happened because...`

4. **Strip project-specific names.** Lessons must generalize. No function names (`buildWebsiteIntelSection`), component names (`EmailSequenceTab`), or file paths that will go stale. Use the concept, not the instance.
   - Bad: "Always check `buildWebsiteIntelSection()` limits match extraction limits"
   - Good: "Keep extraction and injection limits consistent — asymmetry creates invisible waste"

5. **Volume cap: target ≤ 90 rules.** If lessons.md already has 90+ rules, prune or merge before adding. Look for rules that address the same underlying mistake and collapse them into one stronger rule.

---

## Phase 3: Session Retrospective (The Self-Improvement Engine)

This is the phase that makes the system smarter over time. Review the FULL conversation history and look for patterns.

### What to Look For

**Skill Gaps** — Things Codex got wrong, needed multiple attempts, or struggled with:
- Wrong assumptions about how code works
- Incorrect file paths or function names
- Misunderstanding the user's intent
- Generating code that didn't compile or pass tests on first try
- *Action: Write a rule in lessons.md or .Codex/rules/ that prevents recurrence*

**Friction** — Things the user had to ask for explicitly that should have been automatic:
- "Don't forget to run tests" → should already be in the workflow
- "Check the imports" → should be in blast radius check
- "Update the types too" → should be in field propagation rule
- *Action: Add to AGENTS.md workflow rules or create a new .Codex/rules/ file*

**Missing Knowledge** — Facts about the project that Codex didn't know but should have:
- File locations, component relationships, API patterns
- User preferences that came up in conversation
- Project-specific constraints (platform limits, runtime restrictions)
- *Action: Add to MEMORY.md or the appropriate .Codex/rules/ file*

**Refactor Candidates** — Files that grew past 500 lines or have sibling duplication:

Run a quick size check on all files touched this session:
```bash
git diff --name-only HEAD~1 2>/dev/null | xargs wc -l 2>/dev/null | sort -rn | head -10
```
For any file now >500 lines, add to the report: "Refactor candidate: `/refactor <file>` (N lines)." Higher priority if sibling files share identical `useState`/hook/handler patterns — note "Sibling duplication — extract shared hook before next feature." Don't refactor during wrap-up. Just surface candidates.

**Automation Candidates** — Repetitive patterns that should become skills, hooks, or rules:
- Same 3-step process repeated multiple times → candidate for a skill
- Manual check that should be automatic → candidate for a hook
- Pattern that keeps coming up → candidate for a rule
- *Action: Document in MEMORY.md with a note: "Candidate for skill/hook/rule: [description]"*

### Apply Findings

Auto-apply ALL actionable findings immediately:
1. Write the rule, memory note, or skill spec
2. Commit: `git commit -m "docs: session retrospective — [summary of improvements]"`

### Do NOT Apply

- Don't create skills during wrap-up — just document the spec for later
- Don't refactor code during wrap-up — note it as a task for next session
- Don't make architectural changes — flag them for the user

---

## Report

After all phases complete, present a single consolidated report:

```
## Session Wrap-Up Report

### Shipped
- [commit hash] [commit message]
- [N] tasks closed, [N] stale tasks cleaned up
- [any file placement fixes]

### Memory Updates
- [file] — [what was added/changed and why]
- [file] — [what was added/changed and why]

### Retrospective Findings

Applied:
1. ✅ [Category]: [What happened] → [Where it was written] [What the rule says]
2. ✅ [Category]: [What happened] → [Where it was written] [What the rule says]

No action needed:
3. [Category]: [What was observed] — [Why no action: already documented / too minor / etc.]

### Candidates for Next Session
- [Any skills, hooks, or refactors that should happen next time]
```

---

## When Nothing Happened

If the session was a simple Q&A or research conversation with no code changes, no mistakes, and nothing worth remembering:

```
## Session Wrap-Up Report

Nothing to ship, remember, or improve from this session.
```

Don't force findings that aren't there.

---

## Phase 4: Notify

After all phases complete, send an email summary:

```bash
source .env 2>/dev/null || true
bash .Codex/scripts/notify.sh \
  "Session wrap-up complete" \
  "Wrap-up done. Shipped: [N commits]. Memory updates: [files]. Retrospective: [N findings applied]."
```

If `ZAPIER_NOTIFY_WEBHOOK` is not set, this is a no-op — skip silently.
