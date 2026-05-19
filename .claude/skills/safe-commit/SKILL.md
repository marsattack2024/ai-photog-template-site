---
name: safe-commit
description: >
  Create a verified git commit for this project. Use when the user asks to
  commit or ship local changes.
---

# Safe Commit

Commit only intentional files.

## Pre-Commit

1. Run `git status --short`.
2. Inspect changed files relevant to the task.
3. Verify no `.env`, key, cert, secret, `.next`, or `node_modules` files are
   staged.
4. Run a staged diff secret scan:

```bash
git diff --cached | rg '(sk-[A-Za-z0-9]{20,}|api[_-]?key\\s*[:=]|password\\s*[:=]|-----BEGIN .*PRIVATE KEY|SUPABASE_SERVICE_ROLE_KEY)'
```

5. For app changes, run the relevant verification:
   - UI/content only: typecheck when TypeScript changed
   - Routes/data/forms/shared components: `npm run typecheck` and `npm run build`

## Commit

- Stage explicit files only.
- Use conventional commit format.
- Confirm with `git log --oneline -1`.

Never commit environment files or generated build output.
