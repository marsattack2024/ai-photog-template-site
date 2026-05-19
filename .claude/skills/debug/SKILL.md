---
name: debug
description: >
  Structured debugging for this Next.js + Supabase photography-site template.
  Use for build failures, type errors, runtime errors, broken forms, broken
  images, bad Supabase reads/writes, layout bugs, or deploy issues.
---

# Debug

Use evidence before edits. Reproduce the issue, classify it, confirm the root
cause, then fix narrowly and verify.

## Workflow

1. Reproduce:
   - Type errors: `npm run typecheck`
   - Build errors: `npm run build`
   - Runtime UI bugs: run `npm run dev` and inspect the route
   - Form/CMS bugs: inspect `app/actions`, `app/api`, `lib/supabase*`, and RLS
2. Classify:
   - Internal: component, route, data helper, validator, CSS, asset path
   - External: Next.js, React, Supabase, Framer Motion, Vercel, package behavior
   - Environment: missing env vars, Vercel config, Supabase project/RLS, domain
3. For external, platform, or version-sensitive issues, check official docs or
   current web sources before guessing. Do not rely on memory for Next.js,
   React, Tailwind, Supabase, Framer Motion, Vercel, or hosting behavior that
   may have changed.
4. Rank likely causes and confirm the top one with code or command evidence.
5. Make the smallest fix that addresses the root cause.
6. Verify with the narrowest command, then broader `typecheck`/`build` when
   warranted.

## Common Surfaces

- `next/image` remote/local asset configuration
- `next/font/google` usage in `app/layout.tsx`
- Server/client component boundary mistakes
- Supabase env vars:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`
- Public inquiry insert blocked by RLS
- Contact form validation or redirect to `/thank-you`
- Tailwind v4 token or CSS import mistakes
- CSP or remote image domain issues in `next.config.ts`

## Output

State:

- Reproduction result
- Root cause
- Files changed
- Verification run
- Remaining risk if any
