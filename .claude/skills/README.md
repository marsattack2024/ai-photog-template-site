# Project Skill Map

This project uses `.claude/skills` as the source of truth. `.agents/skills` and
`.codex/skills` are symlinks to the same folder.

## Operator Entrypoints

- `build-page` - build or revise a page in the Next.js site.
- `build-funnel` - build a conversion path, campaign funnel, quiz, ad-to-page
  flow, reactivation campaign, or studio marketing system.
- `intake` - turn a loose client brief into a build plan.
- `launch-checklist` - final pre-launch verification.
- `memory-maintenance` - keep project instructions and lessons lean.
- `deliverable-format` - decide whether output belongs in chat, Markdown,
  Google Docs, TypeScript config, or project files.

## Page And Site Specialists

- `site-builder` - implement pages/sections in the Next.js + Supabase template.
- `frontend-design` - visual design and component polish.
- `tailwind-design-system` - tokens, shared styling, spacing, typography.
- `asset-intake` - organize and evaluate images/brand assets.
- `visual-qa` - browser and responsive quality pass.
- `supabase-cms` - schema, seed content, RLS, forms, CMS reads/writes.

## Copy And Campaign Specialists

- `photo-studio-website-copywriter` - general photography website copy.
- `boudoir-copywriter` - boudoir-specific website, ad, email, and funnel copy.
- `funnel-design` - simple website inquiry paths and CTA strategy.
- `typeform-quiz-popup-builder` - Typeform quiz popup copy and structure.
- `google-ads-photographers` - Google Search campaigns for photographers.
- `studio-reactivation` - dead lead / old inquiry campaigns.
- `studio-booking-event` - in-studio booking events or open-house systems.
- `studio-gtm-strategy` - full end-to-end marketing system. Use only when the
  request is broader than one page, one quiz, or one campaign asset.

## Engineering Support

- `debug` - evidence-first debugging.
- `react-best-practices` - React/Next performance guidance.
- `security-audit` - secrets, RLS, public writes, route/form safety.
- `safe-commit` - intentional verified commits.
- `read-screenshot` - find and inspect recent local visual references.
- `webapp-testing` - local browser checks and screenshots.
- `memory-maintenance` - update only durable, non-obvious lessons.

## Output Format Defaults

- Use `deliverable-format` whenever the task produces copy, strategy, audits,
  funnel plans, campaign assets, page plans, or handoff notes.
- Substantial client-facing drafts should be Google-Doc-ready Markdown by
  default.
- If a Google Docs connector is available and the user wants a shareable review
  artifact, create a Google Doc and return the link.
- Repo implementation notes, task summaries, and launch checks can stay in
  Markdown.
- Code changes go directly into the project files.

## Research Rule

When behavior depends on current platform or library behavior, check current
official docs or web sources. Do not rely on memory for Next.js, React, Tailwind,
Supabase, Vercel/hosting, Framer Motion, Google Ads, Typeform, or tracking.

## Memory Rule

`CLAUDE.md` and `AGENTS.md` are stable operating instructions. `tasks/lessons.md`
is only for short lessons discovered through real project mistakes that are not
obvious from the codebase. Do not store generic framework facts, stale migration
history, or notes that should be verified from current docs.
