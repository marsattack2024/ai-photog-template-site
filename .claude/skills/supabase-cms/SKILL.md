---
name: supabase-cms
description: >
  Manage the lightweight Supabase CMS for this photography-site template:
  migrations, seed data, RLS, public content reads, inquiry inserts, services,
  galleries, posts, testimonials, and site config.
---

# Supabase CMS

Use this when touching database schema, seed content, CMS reads, contact
submissions, RLS policies, or Supabase environment configuration.

## Current CMS Shape

Core tables are defined under `supabase/migrations/`:

- `site_config`
- `services`
- `galleries`
- `gallery_images`
- `posts`
- `testimonials`
- `inquiries`

## Rules

- Keep the schema brochure-site simple.
- Do not add auth/admin complexity unless the task explicitly asks for it.
- Check current Supabase docs before changing auth, RLS, storage, migrations, or
  environment-variable assumptions.
- Public read policies should only expose published or active content.
- Public insert should be limited to inquiries.
- Service-role keys must only be used in server-only files.
- Use `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for public
  reads, and `SUPABASE_SERVICE_ROLE_KEY` only for server actions or route
  handlers that require privileged writes.

## Implementation Workflow

1. Read current migrations and data helpers before changing schema.
2. Add an idempotent migration for schema changes.
3. Update TypeScript validators or data helpers when fields change.
4. Preserve RLS expectations.
5. Verify with `npm run typecheck` and `npm run build` when app code changes.

## Contact/Inquiries

For inquiry flows:

- Validate input server-side.
- Insert only expected fields.
- Redirect or navigate to `/thank-you`.
- Avoid storing sensitive private details that are not needed for booking.

## Output

Summarize:

- Tables/policies changed
- App files updated
- Env vars required
- Verification run
