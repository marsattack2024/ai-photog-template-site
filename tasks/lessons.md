# Lessons Learned

Short rules discovered through real project bugs or user corrections. Keep this
file lean: only record things future agents cannot reliably infer from the
current codebase, package files, or official docs.

- **This is a Next.js App Router template** — Ignore old React Router/Vite
  assumptions; verify framework behavior from the current code and official docs.
- **Shared skills live in `.claude/skills`** — `.agents/skills` and
  `.codex/skills` are symlinks, so update the Claude base folder instead of
  maintaining separate copies.
- **Use current docs for unstable platform behavior** — Do not rely on memory for
  Next.js, React, Tailwind, Supabase, Vercel/hosting, Framer Motion, Google Ads,
  Typeform, or tracking behavior.
- **Lessons must earn their place** — Add only lessons from real bugs,
  corrections, or failed assumptions that are still true and not obvious from
  reading the repo.
