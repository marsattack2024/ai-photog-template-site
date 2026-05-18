---
name: deploy
description: Deploy to Vercel — runs preflight checks, deploys to production, and verifies the deployment is healthy. Supports rollback.
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, Skill
argument-hint: <"production" | "status" | "rollback">
---

# Deploy to Vercel

Mode: $ARGUMENTS (default: "production")

## Modes

- **production** — full preflight + deploy to production (default)
- **status** — check current deployment status
- **rollback** — promote previous deployment back to production

---

## Step 1 — Preflight

Run `/verify-deployment` first. It checks: TypeScript, tests, build, env vars, auth config, logging, security, Edge compatibility, and RLS.

**If verify-deployment reports ANY failures, STOP. Fix them before deploying.**

## Step 2 — Git Status

```bash
git status
git log --oneline -3
```

Confirm:
- On the `main` branch
- All changes committed (no unstaged changes)
- Branch is pushed to origin: `git log origin/$(git branch --show-current)..HEAD --oneline`

If unpushed commits exist, push first:
```bash
git push origin $(git branch --show-current)
```

## Step 3 — Deploy

### Production
```bash
vercel --prod
```
Or via git push (Vercel auto-deploys from main):
```bash
git push origin main
```

## Step 4 — Post-Deploy Verification

### Check deployment status
```bash
vercel ls --limit 3
```
Confirm latest deployment shows "Ready" status.

### Smoke test checklist (instruct user to verify)
- [ ] Login works (email/password)
- [ ] Dashboard loads, sidebar renders with correct role
- [ ] Ad generation completes
- [ ] Google Ads tab loads (connection card visible)
- [ ] Meta Ads tab loads (connection card visible)
- [ ] No console errors in browser devtools

### Function timeout reminder
- Vercel Hobby plan: 10s max function timeout — Opus calls WILL time out
- Vercel Pro plan ($20/mo): 300s max — required for this app
- Confirm the project is on Pro before going live

## Step 5 — Rollback (if deploy broke something)

```bash
# List recent deployments
vercel ls --limit 10

# Promote a previous deployment back to production
vercel promote [deployment-url]
```

Or via dashboard: Deployments tab > find last good deploy > "..." > "Promote to Production"

---

## Status Check (for /deploy status)

```bash
vercel ls --limit 5
vercel inspect $(vercel ls --limit 1 --json | jq -r '.[0].url') 2>/dev/null || echo "Use vercel dashboard to inspect"
```

---

## OAuth Redirect URI Reminder

After first production deploy, verify these point to the production domain (not localhost):
- **Google**: Cloud Console > OAuth 2.0 credentials > Authorized redirect URIs
- **Meta**: Developer Portal > Facebook Login > Valid OAuth Redirect URIs

---

## Rules
- NEVER deploy with failing preflight checks
- NEVER skip verify-deployment — it catches real issues
- ALWAYS push to origin before deploying
- ALWAYS check deployment status after deploy completes
- For rollback, prefer `vercel promote` over redeploying old code
