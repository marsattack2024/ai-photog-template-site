---
name: verify-deployment
description: Pre-deployment verification checklist for Vercel. Checks env vars, build, auth config, logging, RLS policies, and Edge Runtime compatibility. Run before any production deploy.
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, Task
argument-hint: [environment] — e.g. "production", or blank for full check
---

# Verify Deployment Readiness

Target environment: $ARGUMENTS (default: full check)

## Pre-Flight Checklist

Run through every section. Report PASS/FAIL for each item.

### 1. Build Verification
```bash
cd "$CLAUDE_PROJECT_DIR"
npx tsc --noEmit && echo "PASS: TypeScript" || echo "FAIL: TypeScript"
npx vitest run && echo "PASS: Tests" || echo "FAIL: Tests"
npm run build && echo "PASS: Build" || echo "FAIL: Build"
```
All three must pass before proceeding.

### 2. Environment Variables
Check `.env.local` has all required vars (values redacted):
```bash
for var in NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY ANTHROPIC_API_KEY PERPLEXITY_API_KEY FIRECRAWL_API_KEY APIFY_API_TOKEN; do
  grep -q "^${var}=" .env.local && echo "PASS: $var" || echo "FAIL: $var missing"
done
```

Check `.env.example` documents all vars:
```bash
for var in NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY AUTH_ENABLED NEXT_PUBLIC_AUTH_ENABLED ANTHROPIC_API_KEY PERPLEXITY_API_KEY FIRECRAWL_API_KEY APIFY_API_TOKEN; do
  grep -q "$var" .env.example && echo "PASS: $var in example" || echo "FAIL: $var missing from .env.example"
done
```

### 3. Auth Configuration

**For production (`AUTH_ENABLED=true`):**
- [ ] Supabase Dashboard > Auth > Users: at least one user exists
- [ ] Supabase Dashboard > Auth > URL Configuration > Site URL: set to Vercel domain
- [ ] Supabase Dashboard > Auth > URL Configuration > Redirect URLs: includes Vercel domain
- [ ] `AUTH_ENABLED=true` set in Vercel env vars
- [ ] `NEXT_PUBLIC_AUTH_ENABLED=true` set in Vercel env vars
- [ ] Migration `20260302_add_user_id_and_cascades.sql` has been applied
- [ ] All existing projects have `user_id` set (backfill complete)
- [ ] Migration `20260302_add_auth_rls_policies.sql` has been applied
- [ ] RLS is enabled on all public tables

### 4. Logging Verification
```bash
# No console.log in API routes
grep -rn "console\.\(log\|error\|warn\)" src/app/api/ --include="*.ts" | grep -v "node_modules" | grep -v ".test."
# Should return empty — any hits are violations

# All routes use createRouteLogger
for route in $(find src/app/api -name "route.ts"); do
  grep -q "createRouteLogger" "$route" && echo "PASS: $route" || echo "FAIL: $route missing logger"
done

# Middleware uses correct logger
grep -q "createMiddlewareLogger" src/middleware.ts && echo "PASS: middleware logger" || echo "FAIL: middleware logger"
```

### 5. Edge Runtime Compatibility
Verify middleware only uses Edge-safe APIs:
```bash
# These Node.js modules MUST NOT appear in middleware
for mod in "require(" "fs." "path." "child_process" "crypto.create" "Buffer.from"; do
  grep -n "$mod" src/middleware.ts src/lib/supabase/middleware.ts 2>/dev/null && echo "FAIL: Node.js API '$mod' in middleware" || true
done

# crypto.randomUUID() is Edge-safe (different from crypto.create*)
grep -n "crypto.randomUUID" src/middleware.ts && echo "PASS: Edge-safe crypto" || true
```

### 6. Security Scan
```bash
# No secrets in code
grep -rn "sk-[a-zA-Z0-9]\{20,\}\|AKIA[0-9A-Z]\{16\}\|-----BEGIN.*PRIVATE" src/ --include="*.ts" --include="*.tsx" | grep -v "node_modules"
# Should return empty

# .env not staged
git diff --cached --name-only | grep -E '\.env' && echo "FAIL: .env staged" || echo "PASS: no .env staged"

# .env in .gitignore
grep -q "\.env" .gitignore && echo "PASS: .env in .gitignore" || echo "FAIL: .env not in .gitignore"
```

### 7. Package Dependencies
```bash
# pino-pretty must be in devDependencies (not dependencies)
node -e "const pkg = require('./package.json'); console.log(pkg.devDependencies?.['pino-pretty'] ? 'PASS: pino-pretty in devDeps' : 'FAIL: pino-pretty not in devDeps')"

# @supabase/ssr must be in dependencies
node -e "const pkg = require('./package.json'); console.log(pkg.dependencies?.['@supabase/ssr'] ? 'PASS: @supabase/ssr in deps' : 'FAIL: @supabase/ssr missing')"

# pino must be in dependencies
node -e "const pkg = require('./package.json'); console.log(pkg.dependencies?.['pino'] ? 'PASS: pino in deps' : 'FAIL: pino missing')"
```

### 8. Database Migrations
Check migration status:
- [ ] `20260302_add_user_id_and_cascades.sql` — adds user_id + CASCADE deletes
- [ ] `20260302_add_auth_rls_policies.sql` — adds RLS policies (run AFTER backfill)

**Migration order matters:**
1. Apply user_id migration FIRST
2. Deploy app with auth code
3. Log in to trigger backfill (orphan projects get user_id)
4. Verify all projects have user_id: `SELECT count(*) FROM projects WHERE user_id IS NULL;`
5. Apply RLS migration ONLY after backfill is confirmed
6. Optionally: `ALTER TABLE projects ALTER COLUMN user_id SET NOT NULL;`

---

## Output Report

```
=== DEPLOYMENT READINESS REPORT ===
Target: [production|local]
Date: [timestamp]

BUILD:
  [PASS|FAIL] TypeScript compilation
  [PASS|FAIL] Test suite (1828+ tests)
  [PASS|FAIL] Next.js build

ENV VARS:
  [PASS|FAIL] All required vars present
  [PASS|FAIL] .env.example up to date

AUTH:
  [PASS|FAIL] Auth toggle configured for target environment
  [PASS|FAIL] Supabase dashboard settings verified
  [PASS|FAIL] RLS policies applied (if AUTH_ENABLED=true)

LOGGING:
  [PASS|FAIL] All routes use structured logging
  [PASS|FAIL] No console.log in production code
  [PASS|FAIL] Middleware uses Edge-safe logger

SECURITY:
  [PASS|FAIL] No secrets in code
  [PASS|FAIL] .env not staged
  [PASS|FAIL] pino-pretty in devDeps only

RESULT: [READY TO DEPLOY | X ITEMS NEED FIXING]
```

## Rules
- NEVER deploy with failing tests or TypeScript errors
- NEVER deploy with `AUTH_ENABLED=true` before RLS migration is applied and backfill confirmed
- NEVER deploy with console.log in API routes (use structured logging)
- ALWAYS run this checklist before production deploys
- ALWAYS verify Supabase dashboard settings match the target environment
