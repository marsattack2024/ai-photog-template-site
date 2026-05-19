---
name: launch-checklist
description: >
  Final pre-launch verification for a photography studio website built from this
  template. Use before Vercel deploy, client handoff, DNS cutover, or production
  launch.
---

# Launch Checklist

Use this when the site is close to shipping.

If deployment target, framework behavior, image optimization, or Supabase
configuration is unclear, verify against current official docs before relying on
older project notes.

## Required Checks

Run:

```bash
npm run typecheck
npm run build
```

Then verify:

- Homepage and key routes load
- Mobile first viewport is polished
- All images render through `next/image`
- Fonts load through `next/font/google`
- Metadata exists for primary pages
- `app/sitemap.ts` and `app/robots.ts` reflect the site
- Contact form validates and reaches the intended backend
- `/thank-you` works
- Supabase env vars are present where needed
- RLS allows public reads and inquiry inserts only where intended
- No service-role key is imported into client components
- No obvious placeholder copy or placeholder imagery remains

## Launch Decision

Report one of:

- `Ready to launch`
- `Ready after listed fixes`
- `Not ready`

Include exact blockers, commands run, and any manual checks the human must do in
Vercel, Supabase, DNS, or the client CRM.
