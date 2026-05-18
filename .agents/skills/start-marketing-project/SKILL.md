---
name: start-marketing-project
description: Initialize and run a complete marketing project. Runs all 4 phases from research through measurement planning.
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: <marketing goal description>
---

# Start Marketing Project

You are starting a new marketing project. The goal is: $ARGUMENTS

## Current State
- Existing docs: !`ls docs/ 2>/dev/null || echo "no docs yet"`
- Existing assets: !`ls assets/ 2>/dev/null || echo "no assets yet"`

## Phase 1: Market Research
Read template at `docs/templates/marketing/market-research.md`.
Output: `docs/market-research.md`

Must include:
- 5+ competitors (name, URL, positioning, strengths, weaknesses, pricing)
- Target persona (specific: name, age, job, daily life, pain points — not generic demographics)
- 3 positioning angles (how we differentiate)
- 5+ objections with responses
- 3+ dominant emotions (fear, desire, frustration — with specific triggers)

**Verify**: All sections filled, persona is specific, no placeholder text.

## Phase 2: Funnel Architecture
Read template at `docs/templates/marketing/funnel-architecture.md`.
Output: `docs/funnel-architecture.md`

Must include:
- Traffic source / entry point
- Lead magnet / hook (what they get for their email)
- Core promise and mechanism (why this works)
- Offer stack (main offer + bonuses + guarantee)
- Primary CTA (specific wording)
- Conversion metric target

**Verify**: Offer is specific, CTA is actionable, mechanism is clear.

## Phase 3: Asset Creation
Output: `assets/` directory

Create:
- `assets/landing-page.md`: 5 headline variations, subheadline, mechanism section, proof placeholders, offer, FAQ (5+), CTA
- `assets/email-sequence.md`: 7-email nurture skeleton with subject lines, open loops, CTA per email
- `assets/ad-copy.md`: 10 hooks, 5 angles, 3 CTA types, 3 sample ad scripts

**Verify**: No generic copy. Everything references the specific persona, offer, and mechanism from Phases 1-2.

## Phase 4: Measurement Plan
Read template at `docs/templates/marketing/measurement-plan.md`.
Output: `docs/measurement-plan.md`

Must include:
- Primary metric + target number
- Secondary metrics (3-5)
- Attribution method
- UTM structure with naming convention
- Test duration and minimum sample size
- Kill criteria (when to stop/pivot)

**Verify**: Metrics are specific numbers, not "improve conversion."

## Phase 5: Report
Generate morning report at `docs/morning-report.md`.
Commit all deliverables.
