---
name: create-prd
description: Generate a Product Requirements Document from a project goal.
user-invocable: true
allowed-tools: Read, Write, Glob
argument-hint: <project goal>
---

# Create PRD

Goal: $ARGUMENTS

## Process
1. Read the template at `docs/templates/prd.md`
2. Fill in every section based on the goal
3. Write the completed PRD to `docs/prd.md`

## Requirements
- **Project Goal**: One clear sentence
- **Problem Statement**: Who has this problem? How are they solving it today? Why is that insufficient?
- **Target Users**: Specific persona (not "developers" — be precise about experience level, context, pain)
- **Core Requirements**: P0 = strict MVP only. P1 = nice to have. P2 = future.
- **Success Criteria**: Measurable (e.g., "API responds in <200ms", "3 integration tests pass")
- **Out of Scope**: Explicitly list what we are NOT building
- **Security Surfaces** *(required for any feature that involves data, auth, external APIs, or user input)*:
  Answer each question briefly. "N/A" only if genuinely not applicable:
  - Does this feature store credentials or OAuth tokens? → Encryption at rest required (lesson #102)
  - Does this feature add new DB tables? → RLS five-operation audit required (lesson #104)
  - Does this feature fetch URLs from user input or DB? → SSRF guard required (lesson #99)
  - Does this feature expose unauthenticated endpoints? → Body caps + auth documentation required (lesson #101)
  - Does this feature use HMAC signing? → Dedicated env var, no fallback (lesson #53)
  - Does this feature generate XML or inject into HTML? → Escape utilities required (lesson #100)
  This section becomes the input to `/security-audit triage` during plan review.

## Rules
- Keep MVP scope ruthlessly small. If in doubt, it's P1 or P2.
- Every P0 requirement must be testable.
- No vague requirements like "good performance" — use numbers.
- Security Surfaces section is required whenever the feature touches data, auth, or external services. Blank = rejected.
