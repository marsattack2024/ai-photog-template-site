---
name: manage-seo
description: >
  Manage SEO + agent-readiness for this Next.js photography template. Use when
  adding or editing per-page meta (title, description, OG image), wiring
  structured data (JSON-LD: LocalBusiness, Person, Service, FAQPage), updating
  the sitemap when new routes ship, toggling the AI bot crawling policy,
  keeping llms.txt + llms-full.txt in sync with site content, or auditing
  canonical URLs across pages. Also covers content negotiation (the
  /md/[slug] markdown handler) and the REST + MCP agent surfaces.
---

# Manage SEO

The template ships with a full SEO + agent-readiness stack already wired —
this skill keeps it accurate as the site grows and forks evolve. **Don't
build new infrastructure here; tune what exists.**

## Where things live (memorize these — most edits land in one of them)

| File | Owns |
|---|---|
| `lib/site.config.tsx` | Brand identity, baseUrl, description, OG defaults, `aiBotPolicy` (allowSearch / allowTraining) |
| `lib/seo.ts` | `buildPageMetadata()` + `buildArticleMetadata()` — used by every page's `metadata` export |
| `lib/schema.ts` | JSON-LD builders (`buildLocalBusinessSchema`, etc.) — call from a page + render via `<JsonLd data={...} />` |
| `app/sitemap.ts` | List of real routes — **add new routes here when they ship** |
| `app/robots.txt/route.ts` | AI bot policy + Content Signals (search/ai-input/ai-train) |
| `app/llms.txt/route.ts` + `app/llms-full.txt/route.ts` | LLM-readable site map — consume `lib/llms/content.ts` |
| `lib/llms/content.ts` | Registry of pages shown to LLMs; aggregates section defaults |
| `lib/llms/page-markdown.ts` | Per-page markdown for `Accept: text/markdown` |
| `app/md/[[...slug]]/route.ts` | Routes markdown by slug — **add new pages here** alongside the markdown builder |
| `middleware.ts` | Rewrites `Accept: text/markdown` → `/md/[slug]` |
| `app/opengraph-image.tsx` | Auto-generated 1200×630 OG card from siteConfig |
| `app/api/openapi.json/route.ts` | Public REST API spec (POST /api/v1/inquiry) |
| `app/.well-known/api-catalog/route.ts` | RFC 9727 linkset advertising the API |
| `app/.well-known/agent-skills/index.json/route.ts` | Agent-callable skills index |
| `app/.well-known/mcp/server-card.json/route.ts` | MCP server card |
| `next.config.ts` | `LINK_HEADER` constant — RFC 8288 Link rels on every response |

## Common tasks

### Add a new page's metadata
1. In the new page file, export `metadata` via `buildPageMetadata({ title, description, path })` from `lib/seo.ts`. Title + description default to siteConfig; pass overrides only when the page diverges.
2. If the page has structured data (FAQ, Service, Person), call the appropriate builder from `lib/schema.ts` and render `<JsonLd data={...} />` at the top of the page.
3. Add the route to `app/sitemap.ts` with a priority (homepage 1.0, services/galleries 0.8, blog 0.7, utility 0.3).
4. Add it to `LLMS_PAGES` in `lib/llms/content.ts` so LLM agents see it.
5. If the page should be markdown-negotiable, add a builder in `lib/llms/page-markdown.ts` and register in `app/md/[[...slug]]/route.ts`'s `PAGE_MARKDOWN` map.

### Add a JSON-LD schema
Pick the right builder in `lib/schema.ts` (or add one):
- `LocalBusiness` — homepage of every studio
- `Person` — about page (photographer bio)
- `Service` — service / pricing page
- `FAQPage` — wraps the FAQs (use the same data as the FAQSection)
- `BreadcrumbList` — deep pages
- `BlogPosting` — blog posts (use `buildArticleMetadata` for the page metadata)

Render once per page: `<JsonLd data={mySchema} />`. Don't double up the same schema across pages.

### Change AI bot policy
Edit `siteConfig.seo.aiBotPolicy` in `lib/site.config.tsx`:
```ts
aiBotPolicy: {
  allowSearch: true,    // OAI-SearchBot, ChatGPT-User, Claude-User/SearchBot, PerplexityBot
  allowTraining: false, // GPTBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended, etc.
}
```
Robots.txt + Content Signals re-render on next build. Default is "allow search citations, block training scrape" — that's the right default for photographers.

### Update sitemap after adding/removing a route
`app/sitemap.ts` is hand-maintained (not derived). Add or remove the entry. Priority matters less than freshness — keep it honest.

### Update llms.txt when content shifts
Anything in `siteConfig.brand`, `siteConfig.seo`, or the section DEFAULT_*'s automatically flows through. Only edit `lib/llms/content.ts`'s `LLMS_PAGES` array when a new route lands.

### Per-page OG image override
By default every page gets the auto-generated card from `app/opengraph-image.tsx`. Override:
- Per route: drop `opengraph-image.tsx` inside the route segment (e.g. `app/(site)/about/opengraph-image.tsx`) with its own builder.
- Per metadata: pass `image: "/path.jpg"` to `buildPageMetadata()`.

## SEO audit checklist

When asked "is the SEO good?" — run through:

- [ ] Every page exports `metadata` (or inherits from layout)
- [ ] Each page has exactly one `<h1>` (the Hero is the homepage's h1)
- [ ] Heading hierarchy h1 → h2 → h3 with no skipping
- [ ] Canonical URLs set on every page (via `buildPageMetadata({ path })`)
- [ ] All images use `next/image` with explicit `alt` (alt required, never decorative for content imagery)
- [ ] `sizes` attribute set on responsive images
- [ ] Hero image marked `priority`; nothing else in the hero (no `priority` on below-fold)
- [ ] WebP/AVIF formats produced (next/image handles this automatically when source is JPG/PNG — but prefer WebP source files for smaller payload)
- [ ] Sitemap reflects all routes — no 404s, no dead entries
- [ ] robots.txt has Content Signals + per-bot rules (verify in build output)
- [ ] llms.txt + llms-full.txt resolve and contain real content
- [ ] JSON-LD validates (use Google Rich Results Test on prod URL)
- [ ] OG image renders correctly (`curl https://yoursite.com/opengraph-image` returns PNG)
- [ ] Twitter card validates
- [ ] No placeholder text (`[Studio Name]`, `[Client Name]`) in production metadata

## What this skill is NOT

- Not for building NEW SEO infrastructure (already done — see file map above).
- Not for content writing — that's `photo-studio-website-copywriter` or
  `boudoir-copywriter`.
- Not for the actual contact form / CRM wiring — that's the existing GHL integration in `lib/ghl/`.
- Not for analytics (GA4, GTM) — separate concern, see `gtm-tracking` skill if added.

## Verify before declaring done

```bash
npm run build              # confirms all routes render
curl -I http://localhost:3000/         | grep -i link   # Link header present
curl http://localhost:3000/robots.txt  | head -5        # robots policy present
curl http://localhost:3000/sitemap.xml | head -10       # sitemap renders
curl http://localhost:3000/llms.txt    | head           # llms.txt renders
curl -I http://localhost:3000/opengraph-image           # OG returns 200 image/png
```
