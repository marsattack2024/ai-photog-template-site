# Debug Session — Google Ads OAuth 500 in Production

**Using /debug: Reproduce → Classify → [Research Gate if external] → Root Cause → Fix → Verify → Lessons.**

---

## Pipeline Announcement

Steps executed:
1. Step 0: Reproduce & Collect Evidence
2. Step 1: Classify the Bug
3. Step 2: Research Gate (environment check — Vercel platform docs context loaded from project knowledge)
4. Step 3: Root Cause Analysis
5. Step 4: Fix (proposed — text only, no files modified)
6. Step 5: Verify Fix (checklist)
7. Step 6: Lessons Capture

---

## Step 0: Reproduce & Collect Evidence

**Bug description parsed:**

- Symptom: 500 error immediately after user clicks "Connect to Google Ads" in production
- The error fires on the `/api/google-ads/connect` route (the route that builds the OAuth consent URL and redirects to Google)
- The callback route (`/api/google-ads/callback`) is never reached — Google never receives the redirect because the 500 fires before the browser is sent to Google
- Works 100% on localhost; fails 100% in production on Vercel
- No specific error message or stack trace was provided by the user

**Evidence collected from codebase:**

| Item | Finding |
|------|---------|
| `/api/google-ads/connect/route.ts` | Calls `buildConsentUrl(projectId)` — this function reads 3 env vars at call time: `GOOGLE_ADS_STATE_SECRET`, `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_REDIRECT_URI`. If ANY of these is missing or empty it throws. |
| `/api/google-ads/callback/route.ts` | Reads `GOOGLE_ADS_STATE_SECRET` via `verifyState()`. Also reads `NEXT_PUBLIC_APP_URL`. Both declared `export const runtime = 'nodejs'`. |
| `src/lib/google-ads/auth.ts` (`buildConsentUrl`) | Line 33–35: `if (!stateSecret) throw new Error("GOOGLE_ADS_STATE_SECRET env var is required")` — **throws synchronously**. Line 44: `process.env.GOOGLE_ADS_CLIENT_ID!` — non-null assertion, crashes if undefined. Line 44: `process.env.GOOGLE_ADS_REDIRECT_URI!` — same risk. |
| `src/lib/google-ads/encryption.ts` (`getKey`) | `if (!keyHex) throw new Error(...)` — throws if `GOOGLE_ADS_TOKEN_ENCRYPTION_KEY` is missing. Used in callback route, not connect route. |
| `.env.local` | `GOOGLE_ADS_REDIRECT_URI=http://localhost:3000/api/google-ads/callback` — **hardcoded to localhost**. `NEXT_PUBLIC_APP_URL=http://localhost:3000` — also localhost. Both values correct for local dev; both wrong for production. |
| `runtime` declarations | Both `connect/route.ts` and `callback/route.ts` have `export const runtime = 'nodejs'` — correct. No Edge Runtime mismatch. |
| `vercel.json` | `"src/app/api/google-ads/**": { "maxDuration": 60 }` — 60s timeout, not a problem here. |
| `next.config.ts` | No relevant restrictions on the OAuth routes. |
| `middleware.ts` | `/api/google-ads/callback` is NOT in `PUBLIC_ROUTES`. This means the callback hits the auth middleware — Supabase session check runs. If the browser session cookie doesn't survive the Google redirect round-trip, `withAuth` in `callback/route.ts` would reject the request. |

---

## Step 1: Classify the Bug

**Classification: ENVIRONMENT** — "works locally but fails 100% in prod" is the canonical ENVIRONMENT signal. No stack trace names an npm package; no library method signature mismatch is suspected. The failure is at the boundary between local config and Vercel-deployed config.

**Sub-classification within ENVIRONMENT:** Two candidate causes, in order of probability:

1. **Missing or misconfigured env vars in Vercel** — `GOOGLE_ADS_REDIRECT_URI` is set to `http://localhost:3000/...` locally; that value was never updated for production. If Vercel was deployed with the local `.env.local` values (or if the production env vars were never set), every one of the env-var guards throws on the server before the redirect fires.

2. **OAuth Redirect URI mismatch** — Even if the Vercel env vars are set, if `GOOGLE_ADS_REDIRECT_URI` still points to `http://localhost:3000/api/google-ads/callback`, Google OAuth will reject the callback with `redirect_uri_mismatch` — but that error happens at the Google callback stage, not at the connect stage. Since the user reports the 500 fires before the callback is ever reached, this is secondary to the env var issue.

3. **GOOGLE_ADS_STATE_SECRET missing or differing between environments** — If `GOOGLE_ADS_STATE_SECRET` is absent in Vercel, `buildConsentUrl()` throws `"GOOGLE_ADS_STATE_SECRET env var is required"` at line 34-35 of `auth.ts`. This would produce a 500 immediately.

**Why the callback is never reached:** The connect route builds the consent URL and redirects the browser to Google. If `buildConsentUrl()` throws before returning the URL, Next.js surfaces an unhandled server error as HTTP 500 — the redirect never fires, so Google never gets involved and the callback never runs.

---

## Step 2: Research Gate

Classification is ENVIRONMENT. Vercel platform docs check applies:

**Vercel env var scoping facts (from project knowledge + training):**
- Env vars set in `.env.local` are **never deployed to Vercel** automatically — `.env.local` is gitignored by design
- Vercel has three scopes per env var: Production, Preview, Development — each must be set independently in the Vercel dashboard or via `vercel env add`
- `NEXT_PUBLIC_*` vars are embedded at build time in Vercel; server-only vars (like `GOOGLE_ADS_STATE_SECRET`) are injected at runtime — both must be set in the Vercel project settings
- The Vercel project name for this codebase is `p2p-ads-engine` (not `p2p-ads-generator`) — env vars must be checked in that project specifically

**No library version research needed** — this is a pure config issue, not an npm package behavior change.

---

## Step 3: Root Cause Analysis

**Primary root cause:**

```
Root cause: GOOGLE_ADS_REDIRECT_URI and/or GOOGLE_ADS_STATE_SECRET are missing
or set to localhost values in the Vercel production environment, causing
buildConsentUrl() to throw before the OAuth redirect is issued.
```

**Evidence chain:**

1. `.env.local` line 19: `GOOGLE_ADS_REDIRECT_URI=http://localhost:3000/api/google-ads/callback` — this is the local value. Vercel does not read `.env.local`.

2. `src/lib/google-ads/auth.ts` `buildConsentUrl()`, lines 33–35:
   ```typescript
   const stateSecret = process.env.GOOGLE_ADS_STATE_SECRET;
   if (!stateSecret) {
     throw new Error("GOOGLE_ADS_STATE_SECRET env var is required");
   }
   ```
   If this env var is absent in Vercel, the function throws synchronously. The `withAuth` HOF wrapping the connect route does not catch synchronous throws from the handler body — Next.js catches the unhandled error and returns HTTP 500.

3. `buildConsentUrl()` also reads `process.env.GOOGLE_ADS_CLIENT_ID!` and `process.env.GOOGLE_ADS_REDIRECT_URI!` with non-null assertions. Missing values produce `undefined`, which is silently passed to `URLSearchParams` as the string `"undefined"` — a subtler failure that wouldn't 500, but would cause Google to reject the OAuth request with `redirect_uri_mismatch`.

4. Both OAuth routes have `export const runtime = 'nodejs'` — this is correct and not the cause.

5. The middleware does NOT protect `/api/google-ads/connect` from reaching the route handler itself — middleware runs before the route but only gates the session; the route's own `withAuth` wrapper handles auth. The 500 is happening inside the route handler, not at the middleware layer.

**Secondary risk (discovered):**

`/api/google-ads/callback` is not in `PUBLIC_ROUTES` in `middleware.ts`. When Google redirects back to the callback URL in production, the browser must carry the Supabase session cookie for the `withAuth` guard on the callback route to pass. If cookies don't survive the Google round-trip (e.g., `SameSite=Strict`, domain mismatch, or HTTPS-only cookie sent to an HTTP redirect), the callback route returns a redirect to `/login` rather than processing the code. This is a secondary concern — the primary 500 fires before Google is even contacted.

---

## Step 4: Fix (Proposed — Investigation Checklist + What to Change)

**This is a text-only proposed fix. No files were modified.**

### Investigation Checklist (run in this order)

**Check 1 — Verify which env vars are set in Vercel:**
```bash
vercel env ls --project p2p-ads-engine
```
Look for ALL of these in the Production scope:
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_REDIRECT_URI`
- `GOOGLE_ADS_STATE_SECRET`
- `GOOGLE_ADS_TOKEN_ENCRYPTION_KEY`
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `NEXT_PUBLIC_APP_URL`

Any that are missing → that is the root cause. Add them.

**Check 2 — Verify the value of GOOGLE_ADS_REDIRECT_URI in Vercel:**
```bash
vercel env pull --project p2p-ads-engine --environment production /tmp/prod-env-check.txt
grep GOOGLE_ADS_REDIRECT_URI /tmp/prod-env-check.txt
```
The value MUST be the production URL, not localhost:
- Correct: `https://machine.photographytoprofits.com/api/google-ads/callback`
- Wrong (breaks prod): `http://localhost:3000/api/google-ads/callback`

**Check 3 — Verify NEXT_PUBLIC_APP_URL in Vercel:**
The callback route uses `NEXT_PUBLIC_APP_URL` to build redirect-back URLs. Must be:
- `https://machine.photographytoprofits.com`
Not:
- `http://localhost:3000`

**Check 4 — Verify the Google Cloud Console OAuth settings:**
In the Google Cloud Console for the OAuth client used by `GOOGLE_ADS_CLIENT_ID`:
- Go to APIs & Services → Credentials → the OAuth 2.0 client
- Under "Authorized redirect URIs", confirm `https://machine.photographytoprofits.com/api/google-ads/callback` is listed
- If only `http://localhost:3000/api/google-ads/callback` is listed, add the production URL

**Check 5 — Pull Vercel function logs to confirm the actual error:**
```bash
vercel logs --project p2p-ads-engine --filter "google-ads"
```
The log will contain one of:
- `"GOOGLE_ADS_STATE_SECRET env var is required"` → Check 1 finding: env var missing
- `"GOOGLE_ADS_TOKEN_ENCRYPTION_KEY env var is required"` → same
- `"redirect_uri_mismatch"` → Check 2 or 4 finding: wrong redirect URI

### What Should Change

**Change 1 (required): Add all missing env vars to Vercel Production scope**

Via Vercel dashboard → Project `p2p-ads-engine` → Settings → Environment Variables, or via CLI:
```bash
vercel env add GOOGLE_ADS_REDIRECT_URI production
# Enter value: https://machine.photographytoprofits.com/api/google-ads/callback

vercel env add NEXT_PUBLIC_APP_URL production
# Enter value: https://machine.photographytoprofits.com
```
Repeat for any other missing vars found in Check 1.

**Change 2 (required): Update GOOGLE_ADS_REDIRECT_URI to production URL**

The local value `http://localhost:3000/api/google-ads/callback` must become `https://machine.photographytoprofits.com/api/google-ads/callback` in the Vercel Production environment. The local `.env.local` value stays as-is for local development.

**Change 3 (required): Add production redirect URI to Google Cloud Console**

The Google OAuth client must have `https://machine.photographytoprofits.com/api/google-ads/callback` listed as an authorized redirect URI. Google will reject any redirect_uri not in this allowlist with `redirect_uri_mismatch`, which would then surface as the callback failing even after the connect route is fixed.

**Change 4 (code hardening — recommended but not required to fix the immediate 500):**

In `src/lib/google-ads/auth.ts` `buildConsentUrl()`, replace the non-null assertions on lines 43–44 with explicit guards to make missing env vars produce a clear error rather than the string `"undefined"` being silently passed to Google:

```typescript
// Current (silent failure if env var missing):
client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
redirect_uri: process.env.GOOGLE_ADS_REDIRECT_URI!,

// Should be (explicit guard matching the stateSecret guard pattern already in use):
const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
if (!clientId) throw new Error("GOOGLE_ADS_CLIENT_ID env var is required");
const redirectUri = process.env.GOOGLE_ADS_REDIRECT_URI;
if (!redirectUri) throw new Error("GOOGLE_ADS_REDIRECT_URI env var is required");
```

This change is low blast radius (1 file: `src/lib/google-ads/auth.ts`; consumers: `connect/route.ts` already handles the throw via Next.js error handling). It makes future env var misconfiguration produce a clear, actionable error log rather than a cryptic OAuth failure.

### Blast Radius Check

Files that would change for the code hardening fix:
- `src/lib/google-ads/auth.ts` (1 file, isolated change inside `buildConsentUrl()`)
- No type changes, no interface changes, no shared constant changes

Blast radius: 1 file affected. Apply directly — no mini-plan needed.

---

## Step 5: Verify Fix

After adding the env vars to Vercel and redeploying:

1. **Test the connect route directly:** Navigate to `https://machine.photographytoprofits.com/api/google-ads/connect?projectId=<real-project-id>` while authenticated. Should redirect to `accounts.google.com`. If it does, the 500 is resolved.

2. **Complete the OAuth flow end-to-end:** Click through the Google consent screen. Verify the callback URL is `https://machine.photographytoprofits.com/api/google-ads/callback`. Confirm the connection is saved in the DB and the UI shows "Connected."

3. **Type check (if code hardening is applied):**
   ```bash
   npx tsc --noEmit
   ```

4. **Verify runtime declaration still present after any edits:**
   Both `connect/route.ts` and `callback/route.ts` must still have `export const runtime = 'nodejs'` — they import from `src/lib/google-ads/auth.ts` which uses `crypto` (a Node.js-only module).

5. **Check Vercel function logs post-deploy:**
   ```bash
   vercel logs --project p2p-ads-engine --filter "google-ads-connect"
   ```
   Should see `oauth:start` log events for each connect attempt with no error after.

---

## Step 6: Lessons Capture

**Lesson (matches existing lesson #41 pattern — reinforcing it):**

The env var gap between `.env.local` (localhost values) and Vercel Production (must be separate, production values) is the #1 silent misconfiguration in this stack. It compiles clean, passes all tests, works perfectly locally, and fails 100% in prod with a cryptic 500 that doesn't name the env var unless you read the function source.

**Prevention rule to add to `tasks/lessons.md`:**

> **OAuth integrations: maintain a prod-env checklist in the feature doc** — When shipping any new OAuth integration (Google Ads, Meta, GBP, etc.), append a "Production Env Vars" checklist to the feature's plan doc: list every env var the integration reads, its expected format, and whether the localhost value must differ from production (e.g., `GOOGLE_ADS_REDIRECT_URI` is `localhost:3000` locally but must be the Vercel domain in prod). Run `vercel env ls` as part of the deploy verification step — treat a missing prod env var the same as a failing test. Never mark an OAuth integration as "done" until a real production connection has been completed end-to-end.

**Secondary prevention (code hardening):**

Any function in `src/lib/google-ads/auth.ts` that reads env vars with `!` assertions should be converted to explicit `if (!var) throw new Error(...)` guards — consistent with the pattern already applied to `GOOGLE_ADS_STATE_SECRET`. This makes the error message in Vercel logs immediately actionable: "GOOGLE_ADS_REDIRECT_URI env var is required" is infinitely more useful than a generic Next.js 500.

---

## Summary

| Item | Finding |
|------|---------|
| Classification | ENVIRONMENT — works locally, fails 100% in production |
| Primary root cause | `GOOGLE_ADS_REDIRECT_URI` (and likely other Google Ads env vars) not set or set to localhost values in Vercel Production environment |
| Secondary risk | Callback route not in `PUBLIC_ROUTES` — Supabase cookie must survive the Google redirect round-trip for `withAuth` to pass on the callback |
| Runtime declarations | Correct — both routes have `export const runtime = 'nodejs'` |
| Code logic | Correct — `buildConsentUrl()`, `verifyState()`, and `exchangeCodeForTokens()` are all sound |
| Fix category | Config-only (env vars in Vercel) + Google OAuth client authorized redirect URI update |
| Files to change in code | 1 optional hardening change in `src/lib/google-ads/auth.ts` (explicit guards for `CLIENT_ID` and `REDIRECT_URI`) |
| Verification | Run the OAuth flow end-to-end in production after env var update |
