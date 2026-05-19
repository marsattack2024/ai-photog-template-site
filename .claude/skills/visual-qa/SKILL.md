---
name: visual-qa
description: >
  Review photography-studio website UI quality before shipping. Use after visual
  changes, new pages, responsive edits, image swaps, typography changes, or
  before launch. Focuses on premium editorial quality, not dashboard token rules.
---

# Visual QA

Use this as the final design pass for this template. The point is to catch what
hurts trust: weak image crops, cramped spacing, generic type, hidden CTAs, and
mobile layout problems.

## Setup

1. Start the local dev server with the project package manager.
2. Open the relevant page in a browser.
3. Check at least desktop and mobile widths.
4. Capture screenshots when a visual issue is subjective or hard to describe.

## Checklist

- First viewport clearly communicates the studio, genre, location, and desired
  action.
- Photography is large, crisp, intentionally cropped, and not hidden behind dark
  overlays unless the genre calls for it.
- Serif/sans pairing feels intentional. No Inter/default-template look.
- Heading scale fits containers at mobile and desktop.
- Buttons are easy to find, use specific CTA text, and have calm hover states.
- Sections breathe. No crowded grids or card-heavy SaaS layouts.
- Mobile stacks preserve reading order and image context.
- Testimonials and proof are easy to scan.
- Contact form is reachable, understandable, and submits to the intended flow.
- No raw `<img>`, broken image, layout shift, or unreadable contrast.

## Output

Report:

- Pass/fail launch judgment
- Top 5 fixes by impact
- Screens or routes checked
- Any unresolved asset/copy risk

If making fixes, keep them scoped to the visual issue and rerun the relevant
viewport checks afterward.
