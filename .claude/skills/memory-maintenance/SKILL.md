---
name: memory-maintenance
description: >
  Maintain CLAUDE.md, AGENTS.md, tasks/lessons.md, and project memory in a lean
  way. Use during wrap-up, after repeated bugs, after architecture changes, or
  when the user asks what should be remembered.
---

# Memory Maintenance

Use this to decide what belongs in project instructions, lessons, or memory.
The standard is lean: record only what future agents cannot reliably infer from
the current codebase, docs, package files, or official documentation.

## Where Things Belong

- `CLAUDE.md` / `AGENTS.md`: stable project operating instructions and durable
  constraints for Claude/Codex.
- `tasks/lessons.md`: short lessons from real bugs or corrections in this
  project.
- Skill files: reusable workflows and routing rules.
- External memory: cross-session/user preferences or history that does not
  belong in the repo.

## Keep

Add a lesson only when it is:

- discovered through a real mistake, bug, failed build, bad deployment, or user
  correction;
- likely to prevent the same mistake later;
- not obvious from reading current code or `package.json`;
- not just current framework documentation;
- still true for this project.

## Do Not Keep

Do not write lessons for:

- generic best practices;
- facts visible in the current file tree;
- old framework migrations that no longer apply;
- speculative ideas;
- long play-by-play summaries;
- stale details that should be checked in current docs instead.

## Lesson Format

Use one sentence when possible:

```md
- **Short title** — Concrete rule and why it matters.
```

If a lesson needs more than two sentences, it probably belongs in a skill,
README, implementation doc, or not at all.

## Wrap-Up Behavior

At wrap-up:

1. Review the actual changes and failures from this session.
2. Ask: "Would a future agent fail without this note?"
3. Add, update, or remove only the minimal lesson text needed.
4. Prefer deleting stale lessons over preserving historical clutter.
5. If behavior depends on current Next.js, React, Tailwind, Supabase, Vercel,
   Google Ads, Typeform, or platform rules, say to check current docs instead
   of encoding brittle instructions.
