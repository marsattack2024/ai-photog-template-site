---
name: build-page
description: >
  Operator entrypoint for creating or revising a page in this photography
  website template. Use when the user asks to build a homepage, service page,
  landing page, about page, gallery page, contact page, thank-you page, or page
  section and expects the work to end up in the Next.js site.
---

# Build Page

The practical "build the page" workflow. Routes to specialist skills, applies
the template's existing patterns, doesn't reinvent infrastructure.

## Edit surfaces (memorize these — they're where 95% of fork work lands)

| File | What it owns |
|---|---|
| `lib/site.config.tsx` | Brand identity, hero copy, socials, announcement bar, booking CTA, **`siteConfig.images`** (canonical asset paths: portrait, imageQuotes) |
| `lib/content.config.ts` | Section content arrays (faqs, processSteps, includesItems, whyBookReasons, featuredTestimonials, carouselTestimonials) |
| `app/(site)/page.tsx` | Homepage composition — section order and which sections render |
| `app/(site)/<route>/page.tsx` | Other pages — each calls `buildPageMetadata` from `lib/seo.ts` |
| `app/globals.css` | Theme tokens (primitives + semantic) — swap `--primitive-*` for full rebrand |

**A fork should rarely edit anything else.** If you find yourself editing a
section component file (`components/sections/Hero.tsx` etc.), step back and
ask: should this be a new prop on the existing component, or a new variant?

## Available section components

All in `components/sections/`. Each takes props with sensible defaults pulled
from `siteConfig` or `content.config`.

| Component | Variants / key props |
|---|---|
| `Hero` + `HeroOverlay` | Full hero with image, eyebrow, headline (ReactNode), subline, single CTA |
| `SocialProofStrip` | Dark thin strip with stats |
| `MeetPhotographer` | `variant: "light" \| "dark"` — use dark to break cream-heavy stretches |
| `ProcessSteps` | `steps[]` (any count, defaults to 3) |
| `WhyBook` | `reasons[]` (any count, 3-col responsive grid) |
| `IncludesGrid` | `items: string[]` checklist |
| `GalleryGrid` | Masonry-style grid (per-image heights intentional) |
| `TestimonialCards` | One-up carousel with circular headshot + stars |
| `TestimonialsCarousel` | Dark 3-up cards |
| `TestimonialsGrid` | Light grid layout |
| `ImageQuote` | **Visual breaker** — full-width image + overlaid quote. `align: "left" \| "center" \| "right"`. **DO NOT place adjacent to dark sections** — overlay loses its cutting effect. Sandwich between cream sections. |
| `EmpathyBlock` | `variant: "brief" \| "narrative"` — narrative supports `pullQuote` + `signature` for letter-style copy |
| `SessionScenes` | Session-type cards w/ hover zoom. `variant: "light" \| "dark"`. Pass `scenes[]` from siteConfig or page-local |
| `UrgencyBlock` | Accent-color band |
| `BookingUrgencyCTA` | Compact dark scarcity strip (typically right above footer) |
| `ContactForm` | Wired to `submitInquiry` → GHL. Honeypot included. |
| `SplitSection` + `AboutTeaser` | 50/50 image + content layouts |

`Footer` and `Navbar` live in `components/layout/` and are rendered globally
by `app/(site)/layout.tsx` — fed from siteConfig automatically.

## Route the work to specialist skills

- `intake` → when the brief is incomplete or this is a new client/site
- `asset-intake` → when images, brand assets, or galleries drive the page
- `photo-studio-website-copywriter` → general multi-genre web copy (uses
  StoryBrand, references `docs/P2P Copy Bible.md`)
- `boudoir-copywriter` → boudoir-specific (deeper psychology, Bible-aware)
- `copywriting` → quick copy edits, brief CTAs, small rewrites
- `site-builder` → broader site structure changes (multiple pages, navigation)
- `frontend-design` → visual composition + premium editorial quality
- `tail-wind-design` → Tailwind v4 token edits, color tweaks, spacing rhythm
- `manage-seo` → per-page metadata, JSON-LD, sitemap, llms.txt, AI bot policy
- `react-best-practices` → component refactors, hook usage, performance
- `supabase-cms` → ONLY if Supabase is wired (template ships without; blog
  + galleries deferred)
- `visual-qa` → mandatory pass before declaring a page polished
- `webapp-testing` → browser smoke test (responsive, console, form behavior)
- `launch-checklist` → only when the page is part of a ship/release gate

## Operating principles

- **Read first.** Open `lib/site.config.tsx`, `lib/content.config.ts`, the
  target page, the section components you'll touch. Don't edit blindly.
- **siteConfig is canonical.** Brand name, images, baseUrl, socials all flow
  from there. Don't hardcode magic strings in page.tsx.
- **content.config is the section content source.** New FAQs, process steps,
  testimonials go there — not into the section component file.
- **Reuse before invent.** Check the section list above before creating new
  components. Most needs fit an existing component + prop.
- **Image-first principle (from project memory).** When hero text and image
  conflict on mobile, reduce text FIRST (hide eyebrow, drop subline, hide
  secondary CTA) before moving/cropping the image. The image is the asset.
- **WebP preferred for new images.** `next/image` will serve WebP/AVIF
  automatically, but smaller source = smaller artifact + better cache hits.
- **Every image needs `alt`.** Treat alt as SEO + accessibility, not a
  formality. Describe what's in the frame, not "image of."
- **`sizes` attribute** on every `next/image` for responsive breakpoints.
- **`priority` on the hero image only.** Nothing else above the fold should
  use priority — too many cancels the optimization.
- **Tokens, not literals.** New padding, color, motion timing → pull from
  `globals.css` `@theme` tokens or `lib/motion.config.ts`. Don't add new
  arbitrary Tailwind values without a token reason.
- **Reduced motion is global.** `<MotionConfig reducedMotion="user">` wraps
  the app + CSS `@media` handles transitions. Don't bypass.
- **Keep copy generic to studio genre + brief.** No internal agency,
  coaching, or marketing-system language in visitor-facing copy.
- **Search current official docs** when Next.js 15, Tailwind v4, Framer
  Motion 12, or `@modelcontextprotocol/sdk` behavior is uncertain.

## Verify before declaring done

```bash
npm run typecheck
npm run build
```

Then load the page in a browser at mobile (375px) AND desktop (1440px)
widths. Check: hero subject not under text, no horizontal scroll, all
images load, contact form submits.

For SEO completeness, hand off to `manage-seo`.
For visual polish, hand off to `visual-qa`.

## Output

When finished, report:
- Page or route changed
- Copy/source assumptions (pulled from siteConfig? content.config? new?)
- Components reused vs created (and why if created)
- Verification run (commands + browser widths checked)
- Any missing assets, proof, or launch blockers
- Next recommended skill (visual-qa? manage-seo? launch-checklist?)
