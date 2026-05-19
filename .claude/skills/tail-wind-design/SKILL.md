---
name: tailwind-design-system
description: >
  Use when editing Tailwind CSS, theme tokens, spacing, typography, colors, or
  shared UI styles in this photography-site template. Keep guidance tied to the
  current project setup and verify Tailwind behavior from current docs when in
  doubt.
---

# Tailwind Design System

Use this for styling changes in the template. The goal is editorial photography
site polish, not SaaS component standardization.

## Principles

- Keep the Tailwind version already installed. Do not switch versions mid-build.
- Use the existing token location and naming pattern instead of inventing a
  second theme layer.
- Favor shared tokens, shared section patterns, and reusable UI primitives when
  a styling decision repeats.
- Keep one-off styling acceptable when it is truly unique to a single editorial
  composition.
- Check current Tailwind documentation when behavior is unclear, version-bound,
  or recently changed.

## Styling Priorities

- Typography hierarchy: distinctive serif display, readable sans body, restrained
  labels.
- Image-first rhythm: stable aspect ratios and intentional crops.
- Whitespace: generous section padding without mobile overflow.
- Buttons: outline/ghost styles with calm hover fill transitions.
- Motion: subtle scroll entrance or parallax only when it supports the story.
- Accessibility: readable contrast, visible focus, real button/link semantics.

## Avoid

- A second component system.
- Default SaaS/dashboard cards as the dominant page structure.
- Generic blue/purple gradients or Inter-default visual language.
- Hardcoded repeated color/spacing strings that should become shared tokens.
