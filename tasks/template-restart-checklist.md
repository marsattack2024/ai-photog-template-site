# Template Restart Checklist

When forking this template for a new client, work top-to-bottom. Generic defaults ship with the template — every item below is something that **must be replaced** before launch, or the site will publicly advertise the wrong brand to humans, search engines, and AI agents.

## 1. Brand & contact

- [ ] `lib/site.config.tsx` — `brand.name`, `brand.tagline`, `brand.phone`, `brand.email`, `brand.location`
- [ ] `lib/site.config.tsx` — `seo.baseUrl` (canonical, no trailing slash)
- [ ] `lib/site.config.tsx` — `seo.description` (≤ 160 chars, used by meta + LLM surfaces)
- [ ] `lib/site.config.tsx` — `socials[]`, `footerLinks[]`
- [ ] `lib/site.config.tsx` — `seo.aiBotPolicy` (default: allow search, block training — confirm per client)

## 2. Content

- [ ] `lib/content.config.ts` — `processSteps`, `includesItems`, `whyBookReasons`, `faqs`, testimonials
- [ ] `lib/llms/content.ts` — verify the LLM summary still reads correctly with the new brand values (most fields are pulled from `siteConfig` automatically; check any hardcoded phrasing)
- [ ] Hero, About, image-quote copy across `components/sections/`

## 3. Assets

- [ ] Replace everything under `/public/` with client images (WebP preferred)
- [ ] Update `imageSrc` / `imageAlt` references in `siteConfig.images`
- [ ] Confirm `/public/favicon.ico`, `/public/apple-touch-icon.png`, OG image source

## 4. Environment variables (Vercel)

- [ ] `NEXT_PUBLIC_SITE_URL` — production canonical
- [ ] `NEXT_PUBLIC_SITE_NAME`
- [ ] `GHL_PIT_TOKEN`, `GHL_LOCATION_ID` — contact form CRM
- [ ] `NEXT_PUBLIC_GTM_ID` and/or `NEXT_PUBLIC_GA_ID` — analytics
- [ ] Supabase keys if the CMS layer is in use

## 5. Agent / AEO surfaces — verify after content edits

These are auto-generated from `siteConfig`, but check each renders the new client's brand before launch:

- [ ] `/llms.txt` — brand name, canonical URLs, contact path, API endpoint
- [ ] `/llms-full.txt` — full page summaries
- [ ] `/robots.txt` — AI bot policy reflects `aiBotPolicy` setting
- [ ] `/sitemap.xml` — every public route present, no dev/preview URLs
- [ ] `/api/openapi.json` — `info.title`, `servers[0].url` point at client domain
- [ ] `/.well-known/agent.json` — brand name + endpoints
- [ ] `/.well-known/agents.json` — agent label
- [ ] `/.well-known/mcp/server-card.json` — `serverInfo.description` reads naturally with client brand
- [ ] `/.well-known/api-catalog` — anchor URL matches production base
- [ ] `/md/` and `/md/thank-you` — markdown views render with client brand

### Quick verification one-liner (after `npm run dev`):

```bash
for path in /llms.txt /robots.txt /sitemap.xml /api/openapi.json \
  /.well-known/agent.json /.well-known/agents.json \
  /.well-known/mcp/server-card.json /.well-known/api-catalog \
  /md/ /md/thank-you; do
  echo "=== $path ==="
  curl -s -o /dev/null -w "%{http_code}  %{content_type}\n" \
    -H "Accept: $([[ $path == /md/* ]] && echo text/markdown || echo */*)" \
    "http://localhost:3000$path"
done
```

Every line should be `200`. Spot-check the bodies of `agent.json` and `llms.txt` for the right brand name.

## 6. Markdown negotiation

The middleware rewrites `Accept: text/markdown` to `/md/[slug]`. Only registered slugs return content:

- [ ] If new HTML routes are added (about, services, galleries, blog, contact), add matching builders in `lib/llms/page-markdown.ts` and register them in `app/md/[[...slug]]/route.ts` `PAGE_MARKDOWN`

```bash
# Verify negotiation works against the running dev server:
curl -sI -H "Accept: text/markdown" http://localhost:3000/ | grep -i content-type
# → content-type: text/markdown; charset=utf-8
```

## 7. Pre-launch

- [ ] `npm run typecheck` clean
- [ ] `npm run build` clean
- [ ] Submit inquiry through the live form → confirm row lands in CRM
- [ ] Submit inquiry via `POST /api/v1/inquiry` with a test payload → same
- [ ] Lighthouse / visual QA pass
