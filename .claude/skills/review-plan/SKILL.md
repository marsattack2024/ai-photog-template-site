---
name: review-plan
description: Adversarial plan review before execution. Spawns a fresh-context critic agent to find holes, lessons violations, and codebase conflicts in any implementation plan. MANDATORY before approving any plan via ExitPlanMode or before execution handoff.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
argument-hint: <path-to-plan.md or "latest">
---

# Review Plan

**Announce at start:** "Using review-plan to run an adversarial review of the implementation plan before execution."

## Why This Exists

A planner that reviews its own plan is grading its own homework. This skill spawns a **fresh-context subagent** (the plan-critic) that has zero memory of generating the plan. It receives only the plan text, the codebase, and `tasks/lessons.md` — then tears the plan apart.

## When To Use

- **After Step 3 of `/build-feature`** produces an implementation plan — before the execution handoff
- **After `EnterPlanMode`** produces a plan — before calling `ExitPlanMode`
- **After the planner agent** completes planning — before the executor starts
- **Manually** via `/review-plan <path>` when you want a second opinion on any plan

## Process

### Step 1: Locate the Plan

If `$ARGUMENTS` is "latest" or empty:
- Check `docs/plans/` for the most recently modified `.md` file
- If no plans exist there, ask the user to specify the plan

If `$ARGUMENTS` is a file path:
- Read that specific file

If no plan is found, STOP and tell the user: "No plan found. Provide a path or write a plan first."

### Step 2: Read the Plan

Read the full plan content. Note:
- Total number of tasks/steps
- Files to be created or modified
- Any external dependencies mentioned

### Step 3: Spawn the Plan Critic

Launch a **Task** subagent with `subagent_type: "plan-critic"`.

The prompt must include:
1. The FULL plan text (copy it into the prompt — the critic has no file context from this session)
2. A note to read `tasks/lessons.md` and cross-reference every rule
3. A note to verify file paths and check for codebase conflicts

**Critical:** Do NOT include any context about WHY decisions were made. The critic should see only the plan, not the conversation that produced it.

### Step 4: Present the Review

Show the critic's full output to the user. Frame it clearly:

```
## Plan Review Results

[critic output here]

**Verdict: APPROVE / REVISE**
```

### Step 5: Handle the Verdict

**If APPROVE:**
- Tell the user: "Plan passed review. Ready for execution."
- Proceed to execution handoff (subagent-driven or parallel session)

**If REVISE:**
- List each blocker with the recommended fix
- Ask the user: "Should I revise the plan to address these blockers?"
- If yes: update the plan document, then **re-run this skill** on the revised plan
- If no (user overrides): note that the user chose to proceed despite blockers

### Step 6: Log the Review

Append a review section to the plan document:

```markdown
---

## Plan Review (automated)

**Reviewed:** [timestamp]
**Verdict:** [APPROVE/REVISE]
**Blockers found:** [N]
**Risks noted:** [N]
**Lessons violations:** [list rule numbers]

[If REVISE: what was changed in response]
```

## Review Loop

If the plan is revised, it MUST be re-reviewed. The loop:

```
Write plan → Review → REVISE? → Fix blockers → Re-review → APPROVE? → Execute
```

Maximum 3 review cycles. If the plan still has blockers after 3 cycles, escalate to the user for manual decision.

## Key Principles

- **Fresh context is non-negotiable** — the critic must run in a separate subagent, not inline
- **Every lessons.md rule gets checked** — not a sample, ALL of them
- **Blockers require specific fixes** — "this is wrong" is not enough, "change X to Y because rule N" is
- **The critic cannot modify files** — it can only read and report
- **User can override** — REVISE is a strong recommendation, not a hard block
