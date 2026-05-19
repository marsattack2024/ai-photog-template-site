---
name: build-page
description: >
  Operator entrypoint for creating or revising a page in this photography
  website template. Use when the user asks to build a homepage, service page,
  landing page, about page, gallery page, contact page, thank-you page, or page
  section and expects the work to end up in the Next.js site.
---

# Build Page

Use this as the practical "build the page" workflow. It links the specialist
skills without turning the task into a broad software feature project.

## Route The Work

- Use `intake` when the brief is incomplete or this is a new client/site.
- Use `asset-intake` when images, brand assets, or galleries drive the page.
- Use `photo-studio-website-copywriter` for general photography website copy.
- Use `boudoir-copywriter` when the page is boudoir-specific.
- Use `site-builder`, `frontend-design`, and `tailwind-design-system` for the
  implementation.
- Use `supabase-cms` when the page needs CMS content, schema, seed data, forms,
  galleries, services, posts, or testimonials.
- Use `visual-qa` before calling the page polished.
- Use `launch-checklist` only when the page is part of a ship/release gate.

## Operating Principles

- Read the existing page, components, tokens, and content model before editing.
- Search current official docs when Next.js, Tailwind, Supabase, Framer Motion,
  image handling, or deployment behavior is uncertain.
- Reuse existing section patterns and shared components where they fit.
- Refactor repeated page patterns into shared components or tokens when reuse is
  real, not theoretical.
- Keep one-off editorial art direction possible. Do not abstract every visual
  moment just because it is unique.
- Keep the page generic to the studio genre and brief. Do not leak internal
  agency, coaching, or marketing-system language into visitor-facing copy.

## Output

When finished, report:

- Page or route changed
- Copy/source assumptions
- Components or tokens reused/created
- Verification run
- Any missing assets, proof, or launch blockers
