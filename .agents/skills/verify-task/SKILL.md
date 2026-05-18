---
name: verify-task
description: Run the full verification suite on a specific task or all completed tasks.
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep
argument-hint: <task-id or "all">
---

# Verify Task

Target: $ARGUMENTS

## Process

Use `TaskList` to see current tasks. If `$ARGUMENTS` is a specific task ID, use `TaskGet` to read the full task description. If `$ARGUMENTS` is "all", iterate all tasks with status "completed".

For each task, run the full verification checklist:

### Verification Checklist
- [ ] **Tests pass**: `npx vitest run` — zero failures
- [ ] **Lint passes**: `npm run lint` — no errors
- [ ] **Deliverables exist**: Every file in the task's deliverables list exists and is non-empty
- [ ] **No placeholders**: No TODO, FIXME, PLACEHOLDER, HACK in deliverable files
- [ ] **No secrets**: No sk-, api_key, password=, Bearer, PRIVATE KEY patterns
- [ ] **Git clean**: No .env files staged (`git status`)
- [ ] **TypeScript**: `npx tsc --noEmit` passes (if TS files)
- [ ] **Build**: `npm run build` succeeds (if build script exists)
- [ ] **Auth coverage** *(if task added new API routes)*: each new `route.ts` either imports `withAuth`/`withPlatformAdmin` OR is documented as intentionally public (pixel, webhook)
- [ ] **RLS completeness** *(if task added a migration)*: each new table has SELECT + INSERT WITH CHECK + UPDATE USING+WITH CHECK + DELETE policies, or an intentional comment for admin-only writes (lesson #104)
- [ ] **Token encryption** *(if task stores OAuth tokens)*: `access_token`/`refresh_token` wrapped in `encryptToken()` before DB write (lesson #102)
- [ ] **Runtime declaration** *(if task added routes using crypto/Twilio/Node.js SDKs)*: `export const runtime = 'nodejs'` present at top of file (lesson #52)
- [ ] **Body caps** *(if task added public POST endpoints)*: Content-Length guard + per-field `.slice()` caps present (lesson #101)

## Output
For each task:
```
TASK: [id] - [title]
STATUS: PASS | FAIL
CHECKS:
  [PASS|FAIL] Tests — detail
  [PASS|FAIL] Lint — detail
  [PASS|FAIL] Deliverables — detail
  [PASS|FAIL] Placeholders — detail
  [PASS|FAIL] Secrets — detail
  [PASS|FAIL] Git — detail
  [PASS|FAIL] TypeScript — detail
  [PASS|FAIL] Build — detail
RECOMMENDATION: [pass/reopen with specific fix instructions]
```
