---
name: deliverable-format
description: >
  Choose the right output format for non-technical operators, designers,
  copywriters, and reviewers working on this photography website template. Use
  when a task produces copy, strategy, audits, funnel plans, page plans,
  campaign assets, or handoff notes.
---

# Deliverable Format

Use this as the shared output rule for client-facing and team-facing work.
The goal is to make outputs reviewable by non-technical people without making
developers transcribe code-shaped work by hand.

## Defaults

- **Substantial client-facing drafts**: write Google-Doc-ready Markdown with
  clear `#` and `##` headings, short sections, bullets where useful, and no
  code fences unless the user requested technical output.
- **Google Doc requested or obviously useful**: if the Google Drive / Docs
  connector is available, create the Doc and return the link. If it is not
  available, produce Google-Doc-ready Markdown in the response and say the
  connector is not available in this session.
- **Quick copy edits**: respond directly in chat unless the user asks for a
  file or doc.
- **Implementation-ready copy for this template**: output the TypeScript object
  or JSX-shaped snippet the destination file expects, only when the next step is
  clearly a code edit.
- **Repo notes, QA findings, launch checks, and implementation plans**: keep as
  Markdown.
- **Actual site changes**: edit the project files directly and summarize what
  changed.

## Make It Easy To Review

- Use plain headings that map to the page, funnel, or campaign structure.
- Label assumptions and missing proof with `TODO: confirm`.
- Do not bury the final draft under long rationale. Put the usable deliverable
  first; add notes after it only when needed.
- Avoid giant tables for copy review. Use tables only for compact audits,
  option comparisons, or asset inventories.

## Current-Docs Rule

When format depends on a live platform, connector, ad platform, Typeform,
Google Docs, Supabase, Vercel, or Next.js behavior, check current official
documentation or available connector state instead of relying on memory.
