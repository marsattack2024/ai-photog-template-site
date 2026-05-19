---
name: launch-checklist
description: >
  Final pre-launch verification for a photography studio website built from this
  template. Use before Vercel deploy, client handoff, DNS cutover, or production
  launch.
---

# Launch Checklist

Use this when the site is close to shipping. Runs as a gate, not a guide —
all blockers must clear before launching.

If deployment target, framework behavior, image optimization, or any external
integration is unclear, verify against current official docs before relying on
older project notes.

## Required commands

```bash
npm run typecheck
npm run build
```

Both must exit 0. The production build is the truth — if it succeeds, the
deploy will too.

## Verification gates

### Build + render
- [ ] `npm run build` exits 0
- [ ] All routes appear in build output, including:
      `/`, `/thank-you`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
      `/llms-full.txt`, `/opengraph-image`, `/md/[[...slug]]`, `/api/v1/inquiry`,
      `/api/openapi.json`, `/api/mcp`, `/.well-known/*`
- [ ] `npm run dev` then load `http://localhost:3000/` — homepage renders, no
      console errors, no missing images, no 404 for any linked asset
- [ ] Mobile viewport (375px) is polished — hero readable, no horizontal
      scroll, tap targets ≥ 44×44, text doesn't overlap hero subject
- [ ] Tablet viewport (768px) is polished

### Content + branding
- [ ] `lib/site.config.tsx` brand fields filled in (no `[Studio Name]`
      placeholder leaks)
- [ ] `lib/content.config.ts` FAQs, process steps, testimonials, why-book,
      includes all match the studio (or are deliberately generic for template)
- [ ] No `[Client Name]` placeholder copy in production
- [ ] Hero image is the studio's actual brand image, not `/placeholder/*.svg`
      or `/images/hero.jpg` template default
- [ ] Portrait image (`siteConfig.images.portrait`) is the photographer
- [ ] Image-quote breaker images (`siteConfig.images.imageQuotes`) are real
      client photos, not template stock
- [ ] All images use `next/image` (no raw `<img>`) — grep `grep -rn "<img"
      components/ app/`
- [ ] WebP preferred over JPG/PNG for new images (next/image converts
      automatically but source size matters)
- [ ] Fonts load through `next/font/google` (Playfair + DM Sans)
- [ ] Favicon present: `app/icon.svg` AND `app/apple-icon.tsx` (or fallback
      `app/favicon.ico`) — broken tab is launch-blocker

### SEO + agent-readiness
- [ ] `app/sitemap.ts` lists every public route and nothing dead
- [ ] `app/robots.txt/route.ts` renders with AI bot policy + Content Signals
      (`curl /robots.txt | grep -i content-signal`)
- [ ] `siteConfig.seo.aiBotPolicy` matches the client's intent (default:
      `allowSearch: true, allowTraining: false`)
- [ ] `/llms.txt` and `/llms-full.txt` resolve and contain the studio's info
- [ ] OG image renders (`curl -I http://localhost:3000/opengraph-image`
      returns `200 image/png`)
- [ ] Per-page `<title>` correct in every route (view source)
- [ ] Exactly one `<h1>` per page (Hero is the homepage's h1)
- [ ] JSON-LD validates — Google Rich Results Test on prod URL
- [ ] No service-role key imported into any client component (grep for
      `SUPABASE_SERVICE_ROLE_KEY` in `components/`)

### Contact form (GHL)
- [ ] `GHL_PIT_TOKEN` set in Vercel env (Production AND Preview)
- [ ] `GHL_LOCATION_ID` set in Vercel env
- [ ] Live form test: submit a fake inquiry from the deployed preview URL,
      confirm it appears in the studio's GHL contacts within 30 seconds with
      the right tag (`web form` + `session-<type>` if sessionType passed)
- [ ] REST endpoint test (for agent submissions):
      ```bash
      curl -X POST https://yoursite.com/api/v1/inquiry \
        -H "Content-Type: application/json" \
        -d '{"name":"Launch Test","email":"launchtest@example.com","source_agent":"manual"}'
      ```
      Expect `{ "ok": true, "contactId": "..." }`. Then delete the test
      contact from GHL.
- [ ] `/thank-you` route loads cleanly

### Environment variables (Vercel)
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] `NEXT_PUBLIC_SITE_NAME` set to studio name
- [ ] `NEXT_PUBLIC_SITE_DESCRIPTION` set
- [ ] `GHL_PIT_TOKEN` set
- [ ] `GHL_LOCATION_ID` set
- [ ] `REVALIDATE_SECRET` set (if revalidation webhook used)
- [ ] Supabase vars present IF used (template doesn't require them; blog
      scaffolding is deferred)

### Supabase (only if connected — template ships without)
- [ ] RLS allows public reads on published content; inquiry inserts only
- [ ] No service-role key in client components
- [ ] Migrations applied

### Domain + DNS
- [ ] Domain attached to Vercel project
- [ ] DNS A/CNAME records propagated (test with `dig yourdomain.com`)
- [ ] HTTPS certificate provisioned
- [ ] `NEXT_PUBLIC_SITE_URL` matches the actual production URL

## Launch Decision

Report one of:

- **Ready to launch** — every gate green
- **Ready after listed fixes** — list each blocker with the exact file/command
  to fix it
- **Not ready** — fundamental gap (form not wired, brand assets missing,
  build failing)

Include:
- Exact commands run + their output (or "passed silently")
- Any manual checks the human must do in Vercel / GHL / DNS / the client's
  inbox
- Recommend running `manage-seo` audit and `visual-qa` skill if either is
  outstanding before declaring ready

## Related skills

- `manage-seo` — pre-launch SEO audit pass
- `visual-qa` — pre-launch UI polish review
- `security-audit` — pre-launch security scan
- `webapp-testing` — local browser smoke tests
- `vercel:deploy` — actual deploy command once gate passes
