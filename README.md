# Premium Photography Studio Template

Next.js 15 + Tailwind v4 template for boutique photography studio websites. Token-driven design system, real GoHighLevel contact form, full agent-readiness (robots.txt with AI bot policy, sitemap, llms.txt, REST API, MCP server, OpenAPI spec). Forks → ships in an afternoon.

---

## What this is

A working photographer site you fork per client. Generic by default, brand-swappable in one config file. Every section is a reusable component fed by a centralized content registry.

**Routes that ship today:**
- `/` — homepage (hero → social proof ribbon → empathy intro → testimonials → image quote → process → dark "Meet" inversion → why book → includes → image quote → gallery → testimonials carousel → urgency → contact → image quote → FAQ → booking CTA → footer)
- `/thank-you` — post-form confirmation (noindex)
- `/robots.txt`, `/sitemap.xml` — crawler defaults with AI bot policy + Content Signals
- `/llms.txt`, `/llms-full.txt` — content map for AI agents
- `/api/v1/inquiry` — JSON REST endpoint for agent-submitted inquiries
- `/api/mcp`, `/.well-known/mcp/server-card.json` — MCP server with `submit_inquiry` tool
- `/api/openapi.json`, `/.well-known/api-catalog`, `/.well-known/agent.json`, `/.well-known/agents.json`, `/.well-known/agent-skills/index.json` — agent discovery surfaces
- `/api/revalidate` — secret-gated on-demand cache invalidation (Supabase webhooks)
- `/md/[slug]` — markdown negotiation (Accept: text/markdown serves clean markdown of any page)
- `/opengraph-image`, `/icon`, `/apple-icon` — auto-generated social share card + favicons

---

## Stack

- **Next.js 15.5** App Router · React 19 · TypeScript 5.9
- **Tailwind CSS v4.3** (CSS-first `@theme` tokens, no config file)
- **Framer Motion 12** with `<LazyMotion features={domAnimation} strict>` + global `MotionConfig reducedMotion="user"`
- **GoHighLevel** for CRM (contact form → GHL upsert)
- **Supabase** migrations included in `supabase/` as starter schema (TS bridges intentionally not shipped — install `@supabase/supabase-js` only when a fork wires the CMS)
- **`@modelcontextprotocol/sdk`** for the MCP server

---

## Quickstart

```bash
git clone <fork-url>
cd <fork-name>
npm install
cp .env.example .env.local   # edit the values
npm run dev                  # http://localhost:3000
```

Visit `http://localhost:3000` — you should see a complete photographer site with `[Studio Name]` placeholders. The site renders without any env vars set; the contact form silently no-ops until `GHL_PIT_TOKEN` + `GHL_LOCATION_ID` are wired.

---

## Fork workflow (for a new client)

Edit these files **in this order** and you're shippable in under an hour.

### 1. `lib/site.config.tsx` — brand identity + page-level content

Single source of truth for everything that changes per client:

```ts
export const siteConfig: SiteConfig = {
  brand: {
    name: "Studio Name",         // appears in <title>, footer, OG image
    tagline: "...",              // appears in OG image
    email: "hello@...",
    phone: "...",                // optional
    location: { city, state },   // optional
  },
  seo: {
    baseUrl: "https://yourdomain.com",  // also driven by env var
    description: "...",
    aiBotPolicy: { allowSearch: true, allowTraining: false },
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/..." },
    // ...
  ],
  hero: {
    eyebrow, headline (JSX), subline,
    ctaLabel, ctaHref,
    imageSrc: "/images/hero.jpg",
    imageAlt: "...",
  },
  bookingCTA: { headline, body, ctaLabel?, ctaHref? },  // optional
  announcement: { text, ctaLabel?, ctaHref? },          // optional thin top bar
  images: {
    portrait: { src, alt },          // MeetPhotographer default
    imageQuotes: [                   // 3 breakers used between cream sections
      { src, alt, position?, quote, attribution?, align? },
      ...
    ],
  },
};
```

### 2. `lib/content.config.ts` — section content arrays

FAQs, process steps, what's included, why-book reasons, two testimonial sets. All typed, all overridable per-section via props if you need page-level variations.

### 3. Drop images into `/public/`

Conventions (none are enforced — just consistent):
- `/public/images/hero.jpg` (or `.webp`) — at least 2000px wide; subject not centered
- `/public/images/portrait.jpg` — photographer headshot, 4:5 aspect
- `/public/images/quotes/*.jpg` — image-quote breakers, landscape, subject toward one edge
- `/public/images/gallery/*.jpg` — gallery grid items

Update `siteConfig.images.*` paths to match what you drop in.

### 4. Theme (color palette)

Two options:

**Option A — global swap** (recommended for most forks): edit the six `--primitive-*` values in `app/globals.css`:
```css
:root {
  --primitive-ink:    oklch(15% 0.005 280);
  --primitive-cream:  oklch(97% 0.008 90);
  --primitive-accent: oklch(68% 0.10 80);
  --primitive-accent-text: oklch(50% 0.10 80);
  --primitive-muted:  oklch(52% 0.010 280);
  --primitive-border: oklch(88% 0.006 280);
}
```
Use [oklch.com](https://oklch.com/) to pick perceptually consistent values.

**Option B — per-page override**: wrap a page in `<div style={tokens}>` where `tokens` is a JS object of `--primitive-*` overrides. See `lib/themes/README.md` + `lib/themes/example-warm-luxe.tokens.ts` for the pattern.

### 5. Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Var | Required for | Where to get |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitemap, OG, canonical URLs | Your production domain |
| `NEXT_PUBLIC_SITE_NAME` | Browser title fallback | The studio name |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | Meta description fallback | One-sentence pitch |
| `GHL_PIT_TOKEN` | Contact form submission | GHL → Settings → Private Integrations → New |
| `GHL_LOCATION_ID` | Contact form submission | GHL → Settings → Business Profile |
| `REVALIDATE_SECRET` | On-demand cache revalidation | `openssl rand -hex 32` |

Without GHL vars the form returns `integration_not_configured` silently — set them before going live.

### 6. Test the contact form

Local:
```bash
npm run dev
# Open http://localhost:3000 → scroll to contact → fill + submit
# Verify the contact appears in your GHL inbox within ~10 seconds
```

Programmatic (for agent testing):
```bash
curl -X POST http://localhost:3000/api/v1/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Client","email":"test@example.com","sessionType":"portrait","source_agent":"manual"}'
# Expected: { "ok": true, "contactId": "..." }
```

### 7. Deploy

```bash
vercel link                # link the fork to a Vercel project
vercel env pull            # mirror remote env vars locally
vercel --prod              # ship
```

Or use the GitHub integration: push to `main` → Vercel auto-deploys. Set the same env vars on Vercel → Project Settings → Environment Variables.

---

## File map (where things live)

```
app/
  (site)/
    layout.tsx              global StickyBar + Navbar + Footer wrap
    page.tsx                homepage composition (which sections, in what order)
    thank-you/page.tsx      post-form confirmation
  api/
    v1/inquiry/route.ts     POST endpoint for agent inquiries (JSON in/out)
    mcp/route.ts            MCP server (one tool: submit_inquiry)
    openapi.json/route.ts   OpenAPI 3.1 spec
    revalidate/route.ts     on-demand cache invalidation
  .well-known/              api-catalog, agent-skills, mcp manifest
  md/[[...slug]]/route.ts   markdown views for Accept: text/markdown
  opengraph-image.tsx       auto-generated OG card (from siteConfig)
  robots.txt/route.ts       AI bot policy + Content Signals
  sitemap.ts                real routes only
  llms.txt/route.ts         curated content map
  llms-full.txt/route.ts    full content for AI agents
  layout.tsx                root layout (fonts, metadata, MotionConfig)
  globals.css               Tailwind v4 @theme tokens + reduced-motion overrides

components/
  layout/
    Navbar.tsx              top nav with hamburger drawer
    Footer.tsx              global footer
    StickyBar.tsx           optional announcement strip
  sections/
    Hero.tsx, HeroOverlay.tsx
    MeetPhotographer.tsx    variant: "light" | "dark"
    ProcessSteps.tsx
    WhyBook.tsx
    IncludesGrid.tsx
    GalleryGrid.tsx
    SocialProofStrip.tsx
    TestimonialCards.tsx, TestimonialsCarousel.tsx, TestimonialsGrid.tsx
    ImageQuote.tsx          full-width breaker (image + quote overlay)
    EmpathyBlock.tsx        variant: "brief" | "narrative"
    SessionScenes.tsx       session-type cards (variant: "light" | "dark")
    UrgencyBlock.tsx
    BookingUrgencyCTA.tsx
    ContactForm.tsx         wired to submitInquiry → GHL
    SplitSection.tsx
    AboutTeaser.tsx
    types.ts                shared types (FAQ, ProcessStep, etc.)
  seo/JsonLd.tsx            structured data renderer
  ui/AnimateOnScroll.tsx    IntersectionObserver entrance wrapper
  ui/Button.tsx

lib/
  site.config.tsx           ★ brand + page-level content (edit per fork)
  content.config.ts         ★ section content arrays (edit per fork)
  themes/                   per-page palette overrides + docs
  motion.config.ts          motion durations / easings / offsets (TS constants)
  motion.ts                 Framer variants
  ghl/                      GoHighLevel API client + upsertContact
  llms/                     llms.txt + per-page markdown builders
  seo.ts                    buildPageMetadata / buildArticleMetadata
  schema.ts                 JSON-LD builders (LocalBusiness, Person, etc.)
  validators.ts             Zod schema for inquiry form
  (no supabase.ts — add when a fork wires the CMS)

public/                     static assets (hero, portrait, gallery, etc.)
```

★ = the two files a fork actually edits.

---

## Design system

All component spacing, colors, typography, and motion timing come from CSS custom properties defined in `app/globals.css` under the `@theme` block:

- **Colors** — semantic tokens (`--color-ink`, `--color-accent`, `--color-cream`) plus overlays (`--color-overlay-dark-*`, `--color-on-dark-*`) and on-dark variants
- **Spacing** — section padding (`--space-section-y`), heading rhythm (`--space-heading-eyebrow-gap`, `--space-heading-body-gap`), button padding, min-heights
- **Motion** — durations (`--motion-duration-{xs..hero}`), easings (`--motion-ease-out`), offsets, stagger timings. Mirrored as TS constants in `lib/motion.config.ts` because Framer Motion can't read CSS vars at runtime.
- **Typography** — `--font-serif`, `--font-sans`, `--tracking-eyebrow`, `--leading-hero`

`prefers-reduced-motion` collapses all CSS transitions globally via `@media` rule + Framer respects it via `<MotionConfig reducedMotion="user">`.

---

## Agent-readiness

The template ships fully agent-discoverable end-to-end:

1. Agent hits any page → `Link` header advertises `/.well-known/api-catalog`
2. Catalog (RFC 9727 linkset) → points to `/api/openapi.json` + `/llms-full.txt`
3. OpenAPI spec describes `POST /api/v1/inquiry` with JSON schemas
4. Agent POSTs inquiry → contact lands in GHL with `source-agent:<name>` tag

Parallel paths:
- `/llms.txt` + `/llms-full.txt` — site map for AI search
- `/md/[slug]` + middleware — same pages served as markdown when `Accept: text/markdown`
- `/api/mcp` — MCP server with `submit_inquiry` tool (Claude Desktop discoverable via `/.well-known/mcp`)
- `/robots.txt` — AI bot policy: search bots allowed (citation-friendly), training bots blocked

Toggle per-bot allow/block via `siteConfig.seo.aiBotPolicy`.

---

## Dev commands

```bash
npm run dev          # http://localhost:3000
npm run build        # production build (run before every deploy)
npm run typecheck    # tsc --noEmit
```

---

## Troubleshooting

**Contact form silently does nothing.**
GHL env vars not set. Check `vercel env ls` or `.env.local`. The server action returns success on missing config to avoid leaking secrets; check server logs for `[ghl] integration_not_configured`.

**OG image is blank / wrong fonts.**
`app/opengraph-image.tsx` renders at the edge using system serif. To swap in Playfair, fetch the WOFF inside the handler — adds ~200ms to OG generation, usually not worth it.

**Hero image overlaps subject's face on mobile.**
The hero applies `object-[center_15%] md:object-[62%_15%]`. If your image needs different positioning, edit the `Hero` component or pass a custom override. **Principle:** reduce text on mobile first (hide eyebrow, drop subline) before cropping the image — the image is the asset.

**Build fails after editing site.config.tsx.**
Check for JSX errors in `hero.headline` or `bookingCTA.headline` — those are `React.ReactNode`, mismatched JSX tags break TS compile.

**Stale dev server after rapid edits.**
Kill the dev process and `find .next -mindepth 1 -delete && npm run dev`. Webpack HMR can drift; production build is unaffected.

---

## What's intentionally not in scope

- Blog (no routes; `supabase/migrations/0001_schema.sql` has a `posts` table ready when a fork wants one)
- Multi-tenant / workspace isolation (single site per fork)
- OAuth / OIDC discovery, Web Bot Auth signing (not photographer-relevant)
- CMS (edit code; this is a template, not a SaaS)
- Image upload UI (drop files in `/public/`)

Pick a deferred item up only when a real client asks for it. Don't pre-build.
