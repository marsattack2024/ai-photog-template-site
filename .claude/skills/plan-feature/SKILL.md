---
name: plan-feature
description: >
  Pre-build reasoning session that produces a design doc ready for build-feature.
  Use this skill whenever the user has a feature idea but no spec yet — when they say
  "let's plan X", "I want to build Y", "how should we approach Z", or any time a feature
  needs to be thought through before coding starts. Also trigger for "let's think through",
  "what's the best way to", "help me figure out how to build", or any early-stage feature
  conversation. This skill bridges the gap between a rough idea and a formal implementation
  plan — it stress-tests assumptions, looks up live docs, maps the real codebase, trims scope,
  and names the one risky unknown before any code gets written. Always use this before
  build-feature when starting from an idea rather than an existing design doc.
user-invocable: true
allowed-tools: Read, Write, Glob, Grep, Bash, WebSearch, mcp__perplexity__perplexity_search, firecrawl
argument-hint: <feature idea or rough description>
---

# Plan Feature

**Announce at start:** "Using plan-feature to reason through this before writing any code. Goal: a design doc that build-feature can execute without surprises."

## What This Skill Is For

The existing skills assume you arrive with a formed spec. This one handles the step before that — when you have a direction but not a plan. It formalizes the reasoning loop that good planning actually requires: stress-test the idea, look up what's real in the codebase and in external docs, trim to what actually matters, name the thing you don't know yet.

The output is a design doc at `docs/plans/YYYY-MM-DD-<feature-name>.md` that is ready to be passed directly into `/build-feature`.

---

## Phase 1: Understand the Idea Without Jumping to Solutions

Before asking any questions or looking at any code, read `$ARGUMENTS` and form a clear hypothesis about what the user actually wants — not the literal feature they described, but the underlying goal.

Then read these two files:

- `tasks/lessons.md` — internalize every rule; several will apply to this feature
- `tasks/todo.md` — understand current project state and what is already in motion

Now ask **one clarifying question** — the single thing that would most change the approach if answered differently. Not a list of questions. One. Wait for the answer before proceeding.

If `$ARGUMENTS` is empty, ask: "What are we planning? Give me a one-sentence description of what you want to build."

---

## Phase 2: Stress-Test the Idea (Assumption Invalidation)

This is the most important phase and the one most likely to be skipped. Do not skip it.

The goal is to find out what is wrong with the idea _before_ anyone writes a plan. Run these checks silently (no need to narrate each one), then surface only the findings that matter.

**Check 1 — Does this already exist?**
Grep the codebase for the core concept. Look for existing components, routes, or utilities that do something similar. It is very common to plan something that is 80% already built.

If something exists: show it to the user and ask whether to extend it or build alongside it.

**Check 2 — Does the data we need actually exist?**
If the feature requires data from Supabase, an external API, or a third-party service:

- Check `src/lib/supabase/database.types.ts` for the relevant tables and fields
- Check existing API route files for what is already being fetched
- Look for the actual shape of the data, not what we assume it is

If the data doesn't exist in the expected form: flag it as a blocker before scope discussion happens.

**Check 3 — What does this touch that we don't expect?**
For every file or module the feature will likely modify, map the consumer graph — what imports from where. A "small" change to a shared utility can have 20 consumers. Surface this now.

**Check 4 — Read `tasks/lessons.md` against this feature specifically.**
Go through lessons.md line by line and flag every rule that applies to this feature type. Do not just acknowledge them — note which specific parts of this plan they constrain.

**Check 5 — State machine & resilience analysis (if this feature has stateful transitions)**
If the feature introduces or modifies any `status`, `lifecycle_state`, or `state` field:

- List every non-terminal state the feature will create
- For each: does the design specify BOTH a success exit AND a failure exit?
- Ask: "If the browser closes / server crashes / network drops while in state X, what happens?" If the answer is "it stays stuck," flag as ❌ WRONG — the design needs a recovery mechanism.
- Check for fire-and-forget patterns: any state transition that isn't explicitly awaited + error-checked is a data consistency bug (lessons #45, #46).

Present findings as:

- ✅ CONFIRMED: [assumption that checks out]
- ❌ WRONG: [what we assumed vs. what is actually true]
- ⚠️ RISKY: [technically correct but has side effects worth knowing]
- 📚 LESSONS APPLY: [rule numbers and what they constrain here]

Ask the user to respond to any WRONG or RISKY findings before proceeding to Phase 3.

---

## Phase 3: Look Up Live External Docs

**Never trust memory for external APIs, libraries, or platform features.** Even if you are confident about a method signature or behavior, verify it. This is the step that catches version drift — the thing that was true six months ago and quietly changed.

**Grep-first rule (from lessons.md):** Before going to external docs, grep the codebase for existing usage. If 2+ files already use it successfully with the same pattern this feature needs → codebase is the source of truth, skip the external lookup.

**If the usage is new or different, look up current docs for:**

- Any external service the feature calls (Supabase Storage, Meta Graph API, Google Ads API, OpenAI, Apify, Firecrawl, Perplexity, etc.)
- Any Next.js App Router pattern not already in the codebase (server actions, route handlers, middleware)
- Any new npm package being considered

Use `mcp__perplexity__perplexity_search` for quick lookups. Use `firecrawl` to pull specific docs pages when the exact method signature matters.

What to look for specifically:

- **Current method signatures** — parameters, return types, required headers
- **Rate limits and quotas** — anything that affects how we batch or throttle
- **Deprecated fields** — things the old code may reference that no longer work
- **Breaking changes since last use** — especially for Meta and Google APIs which version aggressively
- **Auth requirements** — token formats, required permissions

Output for this phase:

- VERIFIED: [service/library] — confirmed current, matches plan
- STALE: [service/library] — [what changed, what to update]
- SKIPPED: [service/library] — existing codebase usage confirmed, no lookup needed
- BLOCKED: [service/library] — cannot verify, flag for manual check before execution

If any STALE findings: note the correct current behavior. The plan will use this, not the old version.

---

## Phase 4: Scope Triage

Present the feature as you currently understand it, broken into clear pieces. Then do explicit triage — not what feels right, but what is actually necessary for the feature to be useful on day one.

**P0 — Must have (blocks all value if missing):**
These are the things without which the feature does not exist. Be ruthless. A typical feature has 2-4 P0 items, not 10.

**P1 — Should have (adds significant value, can ship without temporarily):**
Things that make it good. These go in the plan as noted but out of MVP scope.

**P2 — Nice to have / future iteration:**
Log these but do not plan them. They're future tickets.

**Cut entirely:**
Name things that came up in conversation that sound good but do not belong in this feature at all.

Ask the user to confirm the triage before writing anything. If they push back on P0 scope, negotiate — but any P0 expansion must come with a corresponding cut somewhere else.

---

## Phase 5: Name the One Risky Unknown

Every non-trivial feature has one thing that cannot be fully resolved in planning. Something that will only become clear once someone actually tries to build it. Name it explicitly.

Format:

```
## The Known Unknown
[One sentence describing the uncertainty]

Options if it goes wrong:
- Option A: [fallback approach]
- Option B: [scope reduction]

Recommendation: [spike first / accept the risk / de-risk with a small proof-of-concept]
```

If there are multiple unknowns, rank them and name only the top one as THE risk. The others go in a "secondary risks" list. Having one named primary risk keeps the team focused.

---

## Phase 6: Write the Design Doc

Only after Phases 1-5 are complete.

Write to `docs/plans/YYYY-MM-DD-<feature-name>.md`. This document is the handoff to `/build-feature` — it must be complete enough that execution can start without any additional clarifying conversations.

### Required Sections

```markdown
# [Feature Name]

_Date: YYYY-MM-DD | Status: Ready for build-feature_

## What This Is

One paragraph. The goal, the user benefit, the scope boundary.
Not implementation detail — the "what and why."

## What We Verified (Phase 2-3 Summary)

- Data confirmed: [what fields/tables/endpoints actually exist]
- Lessons applied: [rule numbers that constrain this feature]
- External docs: [VERIFIED/STALE findings and what was corrected]
- Existing code to reuse: [file paths]

## Scope

### P0 (MVP — must ship)

- [item with success definition]
- [item with success definition]

### P1 (next iteration)

- [item]

### Out of scope

- [explicitly cut items]

## Architecture

Where things live in the codebase:

- New files: [paths]
- Modified files: [paths + what changes]
- New DB tables/columns: [schema or "none"]
- New API routes: [method + path]
- New external calls: [service + endpoint]

## Security Surfaces

Answer each briefly. "N/A" only if genuinely not applicable.

- [ ] New DB table → RLS 5-operation audit required?
- [ ] Public/unauthenticated endpoint → body caps + auth docs required?
- [ ] User-supplied URL → SSRF guard required?
- [ ] OAuth / tokens stored → AES-256-GCM encryption required?
- [ ] HMAC signing → dedicated env var, no fallback?
- [ ] XML or HTML injection surface → escape utilities required?

## State Machine (if this feature introduces state/status/lifecycle fields)

Skip this section if the feature has no stateful transitions. Include it if any field
tracks progress through stages (status, lifecycle_state, state, etc.).

### State Diagram

List every valid state and every valid transition:
```

[initial] → collecting_answers → generating_docs → completed
↓
failed

```

### Transition Guarantees
For each non-terminal state, answer both:
- **Success exit**: what code path moves it forward? Is the write awaited with { error } checked?
- **Failure exit**: what code path moves it to a terminal state on error? Is the write awaited?
- **Crash recovery**: if the server dies / browser closes in this state, what happens on next request?

If any non-terminal state has no failure exit → it's a stuck-state bug waiting to happen.
Add a recovery mechanism (timeout cleanup, stale-state detection, or explicit re-entry logic).

### Fire-and-Forget Audit
- [ ] All state transitions use `await` + `{ error }` destructuring (never `void`)
- [ ] Catch blocks that update state are awaited and error-checked
- [ ] Error-path state transitions have test coverage

## The Known Unknown
[From Phase 5]

## Success Definition
Binary. Either this is true or the feature is not done:
- [ ] [measurable criterion — real data renders, not mock]
- [ ] [measurable criterion]
- [ ] TypeScript compiles clean, no new lint errors
- [ ] Verified in browser on a real session, not just unit tests
```

---

## Handoff

After writing the doc, tell the user:

> "Design doc written to `docs/plans/[filename]`. Ready to hand off to build-feature. Run: `/build-feature docs/plans/[filename]`"
>
> "The one thing to watch: [restate the known unknown in one sentence]."

Do not start execution. Do not write any implementation files. This skill's job ends with the design doc.

---

## When to Abort and Come Back Later

Stop and tell the user if:

- Phase 2 reveals that a core assumption is WRONG and the user doesn't want to adjust scope
- Phase 3 finds that a required external API has changed in a way that makes the original approach non-viable
- The scope triage cannot get P0 below 3-4 items without the user overriding every cut

Aborting is not failure — it means the planning process worked. Better to find the blocker now than halfway through execution.
