---
name: site-builder
description: >
  Build or modify premium photography-studio websites in this Next.js + Supabase
  template. Use when creating pages, sections, layouts, navigation, galleries,
  service pages, contact flows, or full client sites for photographers and
  creative service studios.
---

# Site Builder

Use this skill for implementation work on this reusable photography-site
template. The goal is a premium editorial website, not a SaaS dashboard or a
generic landing page.

## Stack Contract

- Framework: Next.js App Router in `app/`
- Styling: existing Tailwind version only; verify current Tailwind docs when
  version-specific behavior matters
- Images: `next/image` only
- Fonts: `next/font/google` only
- Motion: Framer Motion for subtle scroll and parallax effects
- Data: Server Components or server actions for initial content; Supabase for CMS
- Deploy target: Vercel unless the project changes architecture; if considering
  another host, check current platform docs before planning around memory

## Workflow

1. Read `AGENTS.md`, `package.json`, and the relevant files under `app/`,
   `components/`, `lib/`, and `supabase/`.
2. Identify the target client/site genre: boudoir, wedding, family, branding,
   newborn, senior, creative service, or generic studio.
3. Reuse existing primitives before creating new ones:
   `components/ui`, `components/layout`, `components/sections`, `lib/motion.ts`,
   `lib/data.ts`, `lib/seo.ts`, and Supabase helpers.
4. Build sections in a clear rhythm:
   hero -> emotional intro -> proof -> services/process -> gallery -> testimonials
   -> CTA -> footer.
5. Use large real photography as the dominant visual signal. Avoid placeholder
   compositions once real assets exist.
6. Keep the page mobile-first. Stack content cleanly, reduce oversized display
   type, and preserve image crop quality.
7. Check current official docs or web sources when behavior is uncertain,
   version-sensitive, or deployment-specific.
8. Verify with `npm run typecheck` and `npm run build` when the scope touches
   routes, data, forms, or shared components.

## Design Rules

- Pair a serif display font with a readable sans font.
- Use italic accents sparingly inside headings.
- Use ghost or outline buttons with calm 300-500ms hover transitions.
- Prefer generous whitespace and asymmetric editorial grids.
- Avoid purple gradients, Inter defaults, generic AI copy, cramped cards, and
  dashboard styling.
- Cards are for repeated content and framed tools only. Do not turn every
  section into a floating card.

## Next.js Rules

- Use the current Next.js metadata and routing patterns for this project.
- Use route handlers in `app/api/**/route.ts` and server actions in
  `app/actions/`.
- Do not introduce client-side fetching for initial page content.
- Do not add MUI, Chakra, Bootstrap, shadcn, or a second design system.

## Supabase Rules

- Read public content through anon-safe helpers when possible.
- Use service-role clients only in server-only files and server actions.
- Public writes should be limited to inquiry/contact flows.
- Keep RLS simple: public read on published/active content, public insert for
  inquiries, authenticated write for future admin use.

## Output Standard

When finishing, summarize:

- What page/section/data flow changed
- Verification run
- Any missing client assets or launch blockers
