# New Build — Claude Code Guide

## Project Overview

[Replace with your project name and description]

**Base URL:** `https://yourdomain.com`
**Stack:** React Router v7 + Vite + Tailwind v4 + Supabase + Vercel

---

## Key Files

| File             | Purpose                |
| ---------------- | ---------------------- |
| `app/routes.ts`  | All route definitions  |
| `app/root.tsx`   | Root layout            |
| `vite.config.ts` | Vite + Tailwind config |

---

## Engineering Philosophy (Non-Negotiable)

**Always choose the future-proof, production-grade option.** No band-aids, no patchwork.
Every decision should be the one you'd make if this system had to run for 5 years.

- Use the framework's built-in patterns before reaching for external services
- Band-aids compound — one creates two, two create five, five create a rewrite

---

## Rules (auto-loaded from `.claude/rules/`)

| Rule File               | Scope                                     |
| ----------------------- | ----------------------------------------- |
| `workflow.md`           | Planning, verification, subagent strategy |
| `coding-conventions.md` | TypeScript, formatting, async patterns    |
| `verification.md`       | Verification checklist                    |

---

## Design System

- **Tokens**: All colors via Tailwind v4 `@theme` — never hardcode hex values
- **Fonts**: Define in `app/styles/theme.css`
- **Components**: Build shared components in `app/components/`
- **Animation**: `motion/react` with `viewport={{ once: true }}` on whileInView
- **Layout**: `max-w-7xl mx-auto px-6` containers

---

## Development Workflow

```bash
npm run dev      # Start dev server
npm run build    # Production build
npx tsc --noEmit # Type check
```
