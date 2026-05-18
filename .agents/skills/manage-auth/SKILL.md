---
name: manage-auth
description: Manage Supabase authentication — toggle auth on/off, create users, add signup, modify RLS policies, debug auth issues, and configure Supabase dashboard settings. Use when touching auth, middleware, login, signup, RLS, or user management.
user-invocable: true
allowed-tools: Read, Edit, Write, Bash, Glob, Grep, WebFetch, Task
argument-hint: <action> — e.g. "toggle-on", "add-signup", "create-user", "check-rls", "debug"
---

# Manage Supabase Authentication

Action: $ARGUMENTS

## Architecture Reference

This project uses Supabase Auth with Next.js 16 App Router. The implementation follows official Supabase SSR patterns verified against docs on 2026-03-02.

### Key Files
| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser client — `createBrowserClient` from `@supabase/ssr` |
| `src/lib/supabase/server.ts` | Server client — `createServerClient` with cookie handling (getAll/setAll) |
| `src/lib/supabase/middleware.ts` | Session refresh — calls `getUser()` to revalidate JWT |
| `src/lib/supabase/admin.ts` | Admin client — `createClient` with service role key, bypasses RLS |
| `src/lib/supabase/index.ts` | Backward-compat Proxy for browser client imports |
| `src/middleware.ts` | Route protection, `AUTH_ENABLED` toggle, request ID correlation |
| `src/lib/auth.ts` | `getCurrentUser()` + `withAuth()` HOF for API routes |
| `src/app/login/page.tsx` | Email/password sign-in + orphan project backfill |
| `src/app/auth/error/page.tsx` | Auth error fallback page |
| `supabase/migrations/20260302_add_user_id_and_cascades.sql` | user_id column + CASCADE deletes |
| `supabase/migrations/20260302_add_auth_rls_policies.sql` | RLS policies scoped to auth.uid() |

### Auth Toggle
- `AUTH_ENABLED=false` (default) — middleware passes everything through, no login required
- `AUTH_ENABLED=true` — middleware enforces login, redirects to `/login`
- `NEXT_PUBLIC_AUTH_ENABLED=true` — shows Sign Out button in sidebar

### Verified Patterns (from Supabase docs, 2026-03-02)
- **Server/middleware**: Always use `getUser()`, never `getSession()` — `getUser()` revalidates the JWT against Supabase Auth server
- **Browser**: Use `createBrowserClient` — no cookie config needed (browser handles it)
- **Server**: Use `createServerClient` with `cookies: { getAll, setAll }` from `next/headers`
- **Admin**: Use `createClient` from `@supabase/supabase-js` with `SUPABASE_SERVICE_ROLE_KEY`
- **RLS**: Use `auth.uid() = user_id` for direct ownership, subquery through `projects` table for child tables

---

## Actions

### toggle-on
Turn auth ON for local development:
1. Add to `.env.local`: `AUTH_ENABLED=true` and `NEXT_PUBLIC_AUTH_ENABLED=true`
2. Ensure `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
3. Verify a user exists: check Supabase Dashboard > Auth > Users
4. If no user: create one via Dashboard "Add User" button (email + password)
5. Restart dev server (`npm run dev`)
6. Test: visit any page — should redirect to `/login`

### toggle-off
Turn auth OFF (default for local dev):
1. Remove or set `AUTH_ENABLED=false` in `.env.local`
2. Remove or set `NEXT_PUBLIC_AUTH_ENABLED=false`
3. Restart dev server
4. Test: visit any page — should load directly without login

### create-user
Create a new user for testing:
- **Option A — Supabase Dashboard**: Auth > Users > "Add User" > enter email + password
- **Option B — SQL** (via Supabase SQL Editor):
  ```sql
  -- Only use this for development/testing
  SELECT supabase.auth.create_user('{
    "email": "test@example.com",
    "password": "testpassword123",
    "email_confirm": true
  }');
  ```
- **Option C — signUp API** (requires signup in code):
  ```typescript
  const { data, error } = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'testpassword123',
  });
  ```

### add-signup
Add user registration to the login page:
1. Read `src/app/login/page.tsx`
2. Add a `mode` state: `"signin" | "signup"`
3. Toggle link: "Don't have an account? Sign up" / "Already have an account? Sign in"
4. In signup mode, call `supabase.auth.signUp({ email, password })`
5. Handle email confirmation: show "Check your email" message
6. **Supabase Dashboard**: Auth > Providers > toggle "Require email confirmation" OFF for dev

### check-rls
Verify RLS policies are correctly configured using the **five-operation audit pattern (lesson #104)**.

For each table in each migration below, verify ALL of these are present — or explicitly documented as intentional:
- `SELECT` with `USING` clause
- `INSERT` with `WITH CHECK` clause (not just `USING`)
- `UPDATE` with **both** `USING` AND `WITH CHECK` (missing `WITH CHECK` allows unauthorized FK writes)
- `DELETE` with `USING` clause
- Admin-client-only write paths must have: `-- INTENTIONAL: admin client only`

Key migrations to audit:
- `supabase/migrations/20260302_add_auth_rls_policies.sql` — core project/generation tables
- `supabase/migrations/20260305_add_gbp_tables.sql` + `_missing_rls.sql` + `_rls_fixes.sql` — GBP tables
- `supabase/migrations/20260305_seo_pixel_tables.sql` — SEO tables
- `supabase/migrations/20260305_call_reviewer.sql` — Call Reviews tables

Common gaps found historically: UPDATE without `WITH CHECK`, missing DELETE, child tables with SELECT only.

Quick automated scan via Supabase security advisor:
```
mcp__claude_ai_Supabase__get_advisors(project_id: "crhikowbnhzuuaapdnwv", type: "security")
```

Or run `/security-audit full` for a comprehensive in-code scan (Check 10 covers RLS completeness).

### debug
Debug auth issues:
1. Check middleware logs: `grep -i "auth:" logs/` or check Vercel Log Drains
2. Check for session cookie: browser DevTools > Application > Cookies > look for `sb-*` cookies
3. Verify JWT: `supabase.auth.getUser()` in browser console
4. Check RLS: temporarily add logging to API route, check if Supabase returns empty vs error
5. Common issues:
   - **Infinite redirect**: middleware redirecting to `/login` which redirects back — check PUBLIC_ROUTES
   - **401 on API**: `withAuth()` rejecting — check `AUTH_ENABLED` is consistent between middleware and route
   - **Empty data**: RLS filtering everything — check user_id on projects table, run backfill
   - **Session expired**: middleware should auto-refresh — check `updateSession()` is called

### supabase-settings
Configure Supabase Dashboard for auth:
1. **Auth > Providers**: Email provider is ON by default. Toggle "Require email confirmation" OFF for dev.
2. **Auth > URL Configuration**:
   - Site URL: `http://localhost:3000` (dev) or your Vercel domain (prod)
   - Redirect URLs: add `http://localhost:3000/**` and `https://your-app.vercel.app/**`
3. **Auth > Users**: Create initial user(s) via "Add User" button
4. **Settings > API**: Copy `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Env Vars Required

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` + Vercel | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` + Vercel | Public/anon API key |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` + Vercel | Admin key (bypasses RLS) |
| `AUTH_ENABLED` | `.env.local` + Vercel | `false` for dev, `true` for prod |
| `NEXT_PUBLIC_AUTH_ENABLED` | `.env.local` + Vercel | Shows/hides Sign Out button |

---

## Current Auth State

Auth is fully implemented and active. For current state (tables, RLS policies, org roles, existing users), read `MEMORY.md` — specifically the "Multi-Tenant Auth Architecture" section.

The activation checklist below is historical — it documents what was completed.

---

## Activation Checklist (Historical — Already Completed)

### Phase 1: Database (migration)
- [ ] **1a. Add `user_id` to `projects`** — `ALTER TABLE projects ADD COLUMN user_id uuid REFERENCES auth.users(id);` (nullable first)
- [ ] **1b. Add CASCADE deletes** — all 10+ FK relationships should CASCADE on project delete
- [ ] **1c. Add `user_id` index** — `CREATE INDEX idx_projects_user_id ON projects(user_id);`

### Phase 2: Backfill existing data
- [ ] **2a. Create a user** in Supabase Dashboard > Auth > Users
- [ ] **2b. Backfill all existing projects** — `UPDATE projects SET user_id = '<your-user-uuid>' WHERE user_id IS NULL;`
- [ ] **2c. Verify all rows populated** — `SELECT count(*) FROM projects WHERE user_id IS NULL;` (must be 0)
- [ ] **2d. Add NOT NULL constraint** — `ALTER TABLE projects ALTER COLUMN user_id SET NOT NULL;`

### Phase 3: RLS policies (replace USING (true))
Replace every `USING (true)` policy with real ownership checks:

- [ ] **3a. `projects`** — `USING (user_id = auth.uid())`
- [ ] **3b. `generations`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3c. `generation_items`** — inherit through `generation_id` → `generations` → `projects`
- [ ] **3d. `dream_100_lists`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3e. `dream_100_prospects`** — inherit through `list_id` → `dream_100_lists` → `projects`
- [ ] **3f. `dream_100_messages`** — inherit through `prospect_id` → `dream_100_prospects` → `dream_100_lists` → `projects`
- [ ] **3g. `dream_100_outreach`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3h. `quizzes`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3i. `email_sequences`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3j. `landing_pages`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3k. `google_ads_connections`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3l. `google_ads_pushes`** — inherit through `connection_id` → `google_ads_connections` → `projects`
- [ ] **3m. `meta_ads_connections`** — `USING (project_id IN (SELECT id FROM projects WHERE user_id = auth.uid()))`
- [ ] **3n. `meta_ads_pushes`** — inherit through `connection_id` → `meta_ads_connections` → `projects`

### Phase 4: Test with auth on
- [ ] **4a. Set `AUTH_ENABLED=true`** and `NEXT_PUBLIC_AUTH_ENABLED=true` in `.env.local`
- [ ] **4b. Restart dev server**
- [ ] **4c. Verify redirect** — visiting any page redirects to `/login`
- [ ] **4d. Log in** — use the user created in 2a
- [ ] **4e. Verify data access** — only your projects visible, not other users'
- [ ] **4f. Test Google/Meta Ads tabs** — connections should only show for your projects
- [ ] **4g. Test cross-user isolation** — create a second user, verify they see nothing

### Phase 5: Deploy
- [ ] **5a. Run `/verify-deployment`** before deploying
- [ ] **5b. Set env vars on Vercel** — `AUTH_ENABLED=true`, `NEXT_PUBLIC_AUTH_ENABLED=true`, `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **5c. Deploy** — monitor Vercel logs for auth errors
- [ ] **5d. Run security advisor** — `mcp__claude_ai_Supabase__get_advisors(type: "security")` to check for missing RLS

---

## How the Ownership Chain Works (When Active)

```
auth.users (Supabase Auth)
  └── projects.user_id = auth.uid()
        ├── generations.project_id ──→ generation_items.generation_id
        ├── dream_100_lists.project_id ──→ dream_100_prospects.list_id ──→ dream_100_messages.prospect_id
        ├── dream_100_outreach.project_id
        ├── quizzes.project_id
        ├── email_sequences.project_id
        ├── landing_pages.project_id
        ├── google_ads_connections.project_id ──→ google_ads_pushes.connection_id
        └── meta_ads_connections.project_id ──→ meta_ads_pushes.connection_id
```

Every child table inherits user scope through the FK chain to `projects.user_id`. If a user doesn't own the project, RLS blocks access to everything under it — including their Google/Meta Ads connections, OAuth tokens, and push history.

---

## Rules
- NEVER store service role key in client-side code or `NEXT_PUBLIC_` vars
- NEVER use `getSession()` in server code — always `getUser()`
- NEVER bypass RLS in API routes — use admin client ONLY for specific admin tasks
- Always test with `AUTH_ENABLED=true` before deploying to production
- Orphan project backfill runs once on first login — safe to keep permanently
- Backfill data BEFORE adding NOT NULL constraints (lesson #36)
- Use `mcp__claude_ai_Supabase__*` for all DB operations, never `mcp__supabase__*`
