---
name: landing-style
version: 1.0.0
description: >
  Use when building marketing landing pages for Photography to Profits (P2P) —
  hero, proof bar, problem/solution, testimonials, FAQ, waitlist/modals. Not for
  software UI, dashboard, or app screens. Triggers: "landing page," "sales page,"
  "waitlist page," "P2P landing," "brand landing," "marketing page." Enforces brand
  colors (gold, cream, warm gray), typography (Playfair Display + DM Sans), spacing,
  components (gold button, ghost button, proof cards, nav, modal), and animation
  (easing, scroll reveal, keyframes). Always read references/brand-and-build.md
  before implementing.
keywords: landing-page, p2p, photography-to-profits, brand, marketing, hero, CTA
---

# Landing Style (P2P Marketing Pages)

Use this skill **only for marketing/landing pages** — hero, proof bar, problem section, guide, testimonials, FAQ, closing CTA, waitlist modal. **Do not use** for dashboard, app UI, settings, or software feature pages.

## When to Use

- Building or editing a **landing page** (e.g. homepage, waitlist, sales page).
- Implementing **P2P brand** visuals: colors, type, spacing, buttons, cards, nav, modal.
- Adding **sections** that follow the documented structure (anchor IDs, background alternation, scroll reveal).

## When Not to Use

- Dashboard screens, app layouts, settings, or any **software** page.
- Generic “website” without the P2P brand system.

## Quick Reference

| Area | Rule |
|------|------|
| **Brand** | Photography to Profits. Tagline: _Your work is good enough. Your system isn't._ Audience: portrait studio owners (boudoir, newborn, maternity, family). Tone: direct, empathetic, authoritative. |
| **Fonts** | **Playfair Display** (headlines, blockquotes, stats). **DM Sans** (body, UI, buttons, nav). No other fonts. |
| **Primary color** | Gold `#C9A84C` — CTAs, accents, overlines. Cream `#FAF9F6` — page background. Near Black `#1A1A1A` — dark sections, text. |
| **CTA** | Gold button (pill 100px radius desktop, 12px mobile). Ghost button for secondary. Letter-spacing, uppercase, DM Sans 600. |
| **Easing** | `cubic-bezier(0.16, 1, 0.3, 1)` for all transitions. |
| **Breakpoint** | 768px. Mobile: stacked layout, hamburger nav, bottom-sheet modal, reduced padding. |
| **Nav** | Fixed, scroll-to-anchor (use `<button>` + scroll, not `<a href="#">`). Section IDs: `how-it-works`, `inside-the-system`, `faq`. |

## Must-Do Before Implementing

1. **Read the full spec:** [references/brand-and-build.md](references/brand-and-build.md) — colors, type scale, spacing, shadows, components (gold button, ghost button, proof cards, form inputs, nav, hamburger, overline, FAQ accordion, modal), animation keyframes, mobile rules, page structure and anchor IDs, background alternation, voice and copy rules.
2. **Apply consistently:** Use the exact hex values, font pairings, border-radius, and spacing from the reference. No extra fonts or off-palette colors.
3. **Avoid anti-patterns:** No cold blues/purples, no centering long body copy, no gold gradient on more than one line per section, no `<a href="#">` for nav, no 3D transforms on mobile, no generic placeholder copy.

## Reference

- **references/brand-and-build.md** — Complete Photography to Profits brand and build guidelines: identity, colors, typography, spacing, radius, shadows, animation, component specs (buttons, cards, forms, nav, modal, FAQ), mobile rules, page structure, voice, and “what not to do.”
