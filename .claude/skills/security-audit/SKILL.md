---
name: security-audit
description: Scan the codebase for security vulnerabilities — exposed secrets, insecure patterns, dependency issues, and misconfigurations. Read-only, reports findings without modifying files.
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep
argument-hint: <scope — "full", "staged", "triage:<plan-description>", or a file path>
---

# Security Audit

Scope: $ARGUMENTS (default: "full" if no argument provided)

---

## Scopes

| Scope | When to use | What it scans |
|-------|------------|---------------|
| `full` | Before a release, periodic audit | All source files |
| `staged` | End of every feature branch (pre-merge gate) | `git diff --name-only HEAD~1` + `git diff --cached` |
| `triage:<description>` | During plan review — before execution starts | No files; reads plan description, outputs a security checklist |
| `<file path>` | Spot-check a specific route or module | That file or directory only |

---

## Mode: `triage:<plan-description>`

**Proactive mode — use it during plan review, before any code is written.**

Given a description of what will be built, identify which security surfaces are relevant and output a focused checklist. Embed this checklist in the implementation plan as acceptance criteria — not a post-hoc report.

| Surface | Triggered when plan mentions... |
|---------|--------------------------------|
| SSRF | crawling, scraping, scanning user-registered URLs, webhooks that call back to a URL stored in DB |
| Token encryption | OAuth tokens, refresh_token, access_token, API key stored in DB |
| XML/HTML injection | TwiML, XML generation, JSON-LD schema injection, innerHTML |
| HMAC state | OAuth flow, state parameter, callback URL |
| RLS completeness | New DB table, new Supabase migration |
| Runtime declaration | Routes using crypto, Twilio, Google Ads, other Node.js SDKs |
| Body caps | Public endpoints (no `withAuth`), pixel/webhook/telemetry routes |
| Schema injection | JSON-LD, script tag injection, pixel.js DOM mutation |

**Output format for triage:**
```
SECURITY SURFACE TRIAGE
=======================
Feature: [description]

REQUIRED BEFORE MERGE:
[ ] SSRF guard — DNS-resolve user domains before fetch; block RFC-1918 + loopback
[ ] Token encryption — AES-256-GCM encrypt access_token + refresh_token before DB write
[etc — only surfaces marked RELEVANT]

NOT APPLICABLE: [list of surfaces not triggered]

Embed these as a checklist in the implementation plan under "Security Acceptance Criteria".
```

---

## Mode: `staged` or `full` (scanning mode)

### Check 1 — Exposed Secrets
Grep all source files (excluding `node_modules/`, `.next/`, `dist/`) for:
- API keys: `sk-`, `AKIA`, `ghp_`, `xox[baprs]-`, `sb_publishable_`
- Hardcoded credentials: password, api_key, secret, token assignments with literal values
- Private keys: PEM-encoded headers
- Connection strings with embedded passwords
- Supabase service role keys in client-accessible code

**IMPORTANT**: Redact actual values in the report — show location and pattern, not the secret.

---

### Check 2 — Gitignore Coverage
Verify `.gitignore` includes: `.env`, `.env.*`, `.env.local`, `node_modules/`, `dist/`, `build/`, `.next/`, `secrets/`, `*.pem`, `*.key`.

---

### Check 3 — Staged Files
Run `git diff --cached --name-only` — verify no `.env`, `secrets/`, `*.pem`, `*.key` files are staged.

---

### Check 4 — Dependency Vulnerabilities
Run `npm audit --json`. Report HIGH and CRITICAL only. Severity counts + top 3 critical packages.

---

### Check 5 — OWASP Basics
Grep for:
- Dynamic code execution: `new Function(` — code injection risk
- `innerHTML =` without sanitization — XSS
- SQL string concatenation — injection
- `http://` in production routes (not localhost/test)
- `getSession()` instead of `getUser()` — Supabase stale token risk (lesson #27 — getUser() always)

---

### Check 6 — SSRF: Server-Side Request Forgery (lesson #63 — SSRF guard)
Grep for `fetch(` calls in API routes where the URL comes from request body, DB query results, or user-supplied fields.

For each match, check if a DNS guard (`resolve4`, `isPrivateOrLocalhost`, `assertExternalUrl`) exists **before** the fetch call.

Flag as HIGH if a fetch call uses a user-supplied URL with no DNS/private-IP guard.

---

### Check 7 — Token Encryption at Rest (lesson #66 — AES-256-GCM encryption)
Grep for `.upsert(`, `.insert(`, `.update(` calls containing `access_token`, `refresh_token`, `auth_token`, `api_key`, or `secret_key`.

For each match, check if an `encrypt`, `encryptToken`, or AES-GCM call wraps the value before the DB write.

Flag as HIGH if a token/key is written to the DB without visible encryption.

---

### Check 8 — XML / TwiML Injection (lesson #64 — XML/HTML escape)
Grep for template literals containing XML tags (`<Response>`, `<Dial>`, `<Number>`, `<Sip>`) that also interpolate a variable (`${someVar}`).

For each match, check if the variable is wrapped in an escape function (`escapeTwiml`, `escapeXml`, or equivalent replacing `&`, `<`, `>`, `"`) before interpolation.

Also grep for `schemaScript.textContent =` — verify the value is sanitized (no `<script` allowed through).

Flag as CRITICAL if user-supplied values are interpolated into XML without escaping.

---

### Check 9 — HMAC State: No Fallback Chains (lesson #32 — HMAC no fallback)
Grep for `createHmac` calls. For each:
- Check the secret uses `process.env.SPECIFIC_VAR` with no `||` fallback to another var or string
- Check there is a guard that throws when the env var is undefined

Flag as HIGH if the HMAC secret falls back to another variable or has no missing-var guard.

---

### Check 10 — RLS Completeness: Five-Operation Audit (lesson #67 — RLS audit)
For each migration file in `supabase/migrations/`:
- Find tables with `ENABLE ROW LEVEL SECURITY`
- List which operations have policies: SELECT, INSERT, UPDATE, DELETE
- Check that UPDATE policies have `WITH CHECK` (not only `USING`)
- Check intentional admin-only writes are commented: `-- INTENTIONAL: admin client only`

Flag as HIGH for tables missing DELETE or UPDATE WITH CHECK (unless commented as intentional).
Flag as MEDIUM for tables missing INSERT policy.

---

### Check 11 — Node.js Runtime Declaration (lesson #26 — runtime declaration)
Grep for API routes in `src/app/api/` that import `crypto`, `dns`, `twilio`, `google-ads-api`, `fs`, or `child_process`.

For each match, check if the file has `export const runtime = 'nodejs'` at the top.

Flag as MEDIUM if a route uses Node.js-native APIs without an explicit runtime declaration.

---

### Check 12 — Body Caps on Public Endpoints (lesson #65 — Content-Length cap)
Grep for `export async function POST` in routes without `withAuth` import (unauthenticated handlers).

For each match:
- Check if a `Content-Length` check exists before `await request.json()`
- Check if free-text fields are `.slice()`-capped after parsing

Flag as MEDIUM if a public POST handler has no body-size guard.

---

### Check 13 — Auth Coverage
- Check API routes in `src/app/api/` use `withAuth()` or `withPlatformAdmin()` — except documented public routes (`/api/pixel/v1/*`, `/api/call-reviews/webhook/*`)
- Check for service-role client usage outside `src/lib/supabase/admin.ts`
- Verify `src/middleware.ts` protects expected path prefixes

---

## Output Format

```
SECURITY AUDIT REPORT
=====================
Date: [timestamp]
Scope: [full|staged|triage|path]
Files Scanned: [count]

CRITICAL: [count]
HIGH: [count]
MEDIUM: [count]
LOW: [count]
INFO: [count]

--- FINDINGS ---

[SEVERITY] [Check #] [Category] — [file:line]
  Found: [what pattern matched — REDACT actual secrets]
  Risk: [what attack this enables]
  Fix: [exact action, referencing the relevant lesson #]

--- SUMMARY ---

VERDICT: PASS | FAIL
[FAIL = any CRITICAL or HIGH finding]
[If FAIL: numbered list of exactly what must be fixed before merge]
```

---

## Rules

- **Read-only.** Never modify files.
- **FAIL** on any CRITICAL or HIGH finding.
- **Be specific**: file path + line number + offending pattern (redact secret values).
- **Triage mode** outputs requirements, not findings — no PASS/FAIL verdict.
- Test files and mocks: downgrade to INFO, not a real vulnerability.
- Documented public endpoints (pixel, webhooks): note as INFO if intentional.
- Dependency vulns: HIGH and CRITICAL only — skip low/moderate unless asked.
