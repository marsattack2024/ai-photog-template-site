---
name: safe-commit
description: Create a verified git commit. Runs security checks before committing.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Bash, Glob, Grep
argument-hint: <commit message>
---

# Safe Commit

Commit message: $ARGUMENTS

## Pre-Commit Checks

### Secrets & Files
1. Run `git status` — review what will be committed
2. Verify NO `.env` files are staged: `git diff --cached --name-only | grep -E '\.env'`
3. Verify NO secret files staged: `git diff --cached --name-only | grep -E '\.(pem|key)$|secrets/'`
4. Scan staged files for exposed secrets:
   ```
   git diff --cached | grep -E '(sk-[a-zA-Z0-9]{20,}|api[_-]?key\s*[:=]|password\s*[:=]|-----BEGIN.*PRIVATE KEY|AKIA[0-9A-Z]{16})'
   ```
5. If ANY secrets found: **ABORT** and report findings

### Security Spot-Checks on Staged Route Files
For each new `route.ts` file in `src/app/api/` that appears in the staged diff:

6. **Auth coverage** — check if the file imports `withAuth` or `withPlatformAdmin`. If neither is present AND the file is not in a documented public path (`/pixel/v1/`, `/webhook/`), flag as a potential missing auth guard.

7. **Runtime declaration** — check if the file imports `crypto`, `dns`, `twilio`, or other Node.js-native modules. If yes, verify `export const runtime = 'nodejs'` is present. Flag as warning if missing (lesson #52).

8. **Token encryption** — if the staged diff adds `.upsert(` or `.insert(` containing `access_token` or `refresh_token`, check that `encryptToken` or equivalent is also in the diff. Flag as HIGH if tokens appear to be stored in plaintext (lesson #102).

If any spot-check raises a concern: **report it clearly** with file + line, explain the risk, and ask "Commit anyway or fix first?"

## Commit
If all checks pass:
1. `git add <specific files>` (never `git add -A`)
2. `git commit -m "<conventional commit message>"`
3. `git log --oneline -1` to confirm

## Rules
- Always use conventional commit format (feat:, fix:, docs:, etc.)
- Never commit .env files even if they appear harmless
- Never use `git add .` or `git add -A`
- If unsure about a file, don't stage it
