---
name: frontend-design
description: >
  Use when designing or refining frontend pages and components for this
  photography-site template. Focus on premium editorial quality, responsive
  composition, reusable components, and current framework documentation when
  implementation details are uncertain.
---

# Frontend Design

Use this for visual implementation work that affects what visitors see. The
standard is a polished photography studio website, not a generic web app.

## Design Approach

- Start from the client genre, imagery, offer, and emotional buying context.
- Make photography the primary visual asset.
- Pair expressive type with clean readable body text.
- Build section rhythm with enough whitespace for the images and copy to breathe.
- Reuse existing layout, section, and UI primitives before adding new ones.
- When a pattern repeats, promote it into a shared component or token.
- Keep unique editorial moments possible; not every visual decision needs to
  become an abstraction.

## Implementation Guardrails

- Use `next/image` for images and `next/font/google` for fonts.
- Follow the current project structure and installed package versions.
- Search current documentation for framework/library behavior that may have
  changed, especially Next.js, React, Tailwind, Framer Motion, and Supabase.
- Keep mobile composition first: no clipped text, hidden CTAs, cramped forms, or
  awkward image crops.
- Avoid introducing new UI libraries unless the user explicitly asks.

## Visual Review

Before calling a visual change done, check:

- first viewport clarity
- image crop quality
- heading scale on mobile and desktop
- CTA visibility
- spacing rhythm
- contrast and focus states
- consistency with existing tokens/components
