# Bug Investigation: Google Ads OAuth 500 on Vercel (Works Locally)

## Investigation Summary

I read the following files:
- `src/app/api/google-ads/connect/route.ts`
- `src/app/api/google-ads/callback/route.ts`
- `src/lib/google-ads/auth.ts`
- `src/lib/google-ads/encryption.ts`
- `src/lib/crypto/aes-gcm.ts`
- `src/lib/auth.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/middleware.ts`
- `src/middleware.ts`
- `.env.example`
- `vercel.json`
- `next.config.ts`

---

## Root Cause: The Callback Route Is a Protected Route But Receives an Unauthenticated Google Redirect

### The OAuth Flow

1. User clicks "Connect" in the UI.
2. Browser navigates to `/api/google-ads/connect?projectId=...`.
3. The `connect` route (wrapped in `withAuth`) verifies the user session, calls `buildConsentUrl()`, and redirects the browser to Google's consent page at `accounts.google.com`.
4. User approves on Google's side.
5. Google redirects the browser back to the configured `GOOGLE_ADS_REDIRECT_URI` — which is `/api/google-ads/callback`.
6. The `callback` route is wrapped in `withAuth`. `withAuth` calls `getCurrentUser()` which calls `supabase.auth.getUser()` using the session cookie.

### Why It Fails in Production

The Supabase auth session is stored in a cookie on the app's domain (`machine.photographytoprofits.com`). When Google redirects the browser back to the callback URL, the browser carries that cookie. **However**, Next.js middleware runs first, before the callback route handler executes.

Looking at `src/middleware.ts` line 5:

```ts
const PUBLIC_ROUTES = ["/login", "/signup", "/auth/error", "/render", "/api/render", "/api/creatives/render-batch", "/preview", "/privacy", "/terms", "/waitlist", "/q", "/api/quiz"];
```

`/api/google-ads/callback` is **not** in `PUBLIC_ROUTES`. It falls through to the protected-route check at line 39:

```ts
if (!user) {
  ...
  return NextResponse.redirect(url);  // redirects to /login
}
```

**On localhost**, Supabase session cookies are typically set without `SameSite=None; Secure` restrictions because both the app and the Google redirect target are on `localhost:3000`. The cookie survives the cross-site redirect from Google.

**On Vercel/production**, the Supabase SSR cookie is a `SameSite=Lax` cookie (the default for `@supabase/ssr`). `SameSite=Lax` means the cookie IS sent on top-level GET navigations from an external site (like a Google redirect). So the cookie should arrive. However, there are two scenarios that produce a 500 specifically:

#### Scenario A: Missing Env Vars (Most Likely Cause of 500)

Examining `.env.example`, it is **missing both critical secrets**:

```
# These are NOT in .env.example:
GOOGLE_ADS_STATE_SECRET=...
GOOGLE_ADS_TOKEN_ENCRYPTION_KEY=...
```

They exist in `.env.local` (local dev file, never committed). If these two env vars were never added to Vercel's environment variables dashboard, the production deployment is running without them.

In `src/lib/google-ads/auth.ts`, `buildConsentUrl()` and `verifyState()` both do:

```ts
const stateSecret = process.env.GOOGLE_ADS_STATE_SECRET;
if (!stateSecret) {
  throw new Error("GOOGLE_ADS_STATE_SECRET env var is required");
}
```

And in `src/lib/google-ads/encryption.ts`, `getKey()` does:

```ts
const keyHex = process.env.GOOGLE_ADS_TOKEN_ENCRYPTION_KEY;
if (!keyHex) {
  throw new Error("GOOGLE_ADS_TOKEN_ENCRYPTION_KEY env var is required");
}
```

If either of these throw inside a route handler, Next.js catches the unhandled throw and returns a **500**. The connect route calls `buildConsentUrl()` — if `GOOGLE_ADS_STATE_SECRET` is missing, it throws inside `withAuth`'s callback, producing a 500 immediately when the user clicks "Connect". The callback URL **never gets hit** because the error happens at the redirect-out step, not the redirect-back step.

This matches the symptom exactly: "500 error right after the user clicks 'Connect' — the callback URL never gets hit."

#### Scenario B: GOOGLE_ADS_REDIRECT_URI Still Points to Localhost

The `.env.example` hardcodes:

```
GOOGLE_ADS_REDIRECT_URI=http://localhost:3000/api/google-ads/callback
```

If Vercel's environment has this value (or it was never overridden to the production URL), Google would redirect to `http://localhost:3000/...` instead of `https://machine.photographytoprofits.com/api/google-ads/callback`. Google would also reject the redirect with an `redirect_uri_mismatch` error — but this would manifest as an error on Google's side before any callback, matching "callback URL never gets hit."

This is a secondary/contributing cause but worth checking.

#### Scenario C: NEXT_PUBLIC_APP_URL Wrong or Missing

In `callback/route.ts` line 25:

```ts
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
```

This is used for the success/error redirect back to the project page. If `NEXT_PUBLIC_APP_URL` is missing in Vercel, the callback would silently redirect to `http://localhost:3000/project/...` after processing — but this wouldn't cause a 500. Lower priority.

---

## The Most Probable Root Cause (Single Sentence)

`GOOGLE_ADS_STATE_SECRET` and/or `GOOGLE_ADS_TOKEN_ENCRYPTION_KEY` were never added to the Vercel environment variables dashboard, so `buildConsentUrl()` throws an unhandled error the instant the user clicks "Connect," producing a 500 before Google is ever contacted — which is why the callback URL is never reached.

---

## Proposed Fix Checklist

### Step 1: Verify Vercel Env Vars (Do This First)

Run from your terminal:

```bash
vercel env ls --project p2p-ads-engine
```

Look for these 5 variables. Every one of them must be present for the Google Ads OAuth flow to work in production:

| Variable | Purpose | Common issue |
|---|---|---|
| `GOOGLE_ADS_STATE_SECRET` | HMAC key for CSRF state signing | Almost certainly missing — not in `.env.example` |
| `GOOGLE_ADS_TOKEN_ENCRYPTION_KEY` | AES-256-GCM key for token storage | Almost certainly missing — not in `.env.example` |
| `GOOGLE_ADS_CLIENT_ID` | OAuth app client ID | Likely present |
| `GOOGLE_ADS_CLIENT_SECRET` | OAuth app client secret | Likely present |
| `GOOGLE_ADS_REDIRECT_URI` | Must be the **production** URL | Check value — `.env.example` defaults to localhost |

For any missing variable, add it via:

```bash
vercel env add GOOGLE_ADS_STATE_SECRET production --project p2p-ads-engine
vercel env add GOOGLE_ADS_TOKEN_ENCRYPTION_KEY production --project p2p-ads-engine
```

### Step 2: Fix GOOGLE_ADS_REDIRECT_URI Value in Vercel

The value in Vercel must be:
```
https://machine.photographytoprofits.com/api/google-ads/callback
```

Not the localhost value from `.env.example`.

Also verify this exact URI is listed as an **Authorized redirect URI** in the Google Cloud Console OAuth 2.0 Client credentials for this app (Google rejects mismatches at the consent screen, which would also prevent the callback from being hit).

### Step 3: Fix .env.example (Documentation Debt)

Add both missing secrets to `.env.example` so future deploys don't repeat this:

```
# Google Ads CSRF + Encryption (REQUIRED — generate fresh values for prod)
GOOGLE_ADS_STATE_SECRET=your_64_char_hex_hmac_secret
GOOGLE_ADS_TOKEN_ENCRYPTION_KEY=your_64_char_hex_aes_key
```

Generate production values with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Run twice — once for each key.

### Step 4: Redeploy and Verify

After adding all env vars:

```bash
vercel --project p2p-ads-engine
```

Then test the connect flow. The 500 should be gone. If a different error appears after this fix, check Vercel function logs for the `google-ads-connect` and `google-ads-callback` route loggers.

### Step 5 (Secondary): Confirm the Callback Route Does Not Need to Be in PUBLIC_ROUTES

The `withAuth` wrapper on the callback route requires the Supabase session cookie to be present when Google redirects back. This works with `SameSite=Lax` (the default) because the redirect from Google is a top-level GET navigation, which Lax cookies permit.

However, if you ever observe a "Unauthorized" 401 at the callback (a separate symptom from the current 500), the fix would be to add `/api/google-ads/callback` to `PUBLIC_ROUTES` in `src/middleware.ts` and move auth enforcement inside the callback handler itself (which already does `verifyProjectOwnership` via the state parameter's CSRF protection). The callback already has strong CSRF protection via HMAC-signed state — relying on `withAuth` is defense-in-depth, not the primary security mechanism.

---

## Summary

The 500 fires at the `/api/google-ads/connect` step (before Google is ever contacted) because `buildConsentUrl()` throws when `GOOGLE_ADS_STATE_SECRET` is missing. The callback URL is never reached because the redirect to Google never happens. Both `GOOGLE_ADS_STATE_SECRET` and `GOOGLE_ADS_TOKEN_ENCRYPTION_KEY` are absent from `.env.example`, making them very likely to be missing from Vercel's environment. Fix: add both env vars to Vercel, update `GOOGLE_ADS_REDIRECT_URI` to the production URL, and update `.env.example` to document them.
