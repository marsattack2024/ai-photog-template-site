---
name: style-fix
description: Audit and fix all design token violations in a specific page folder. Run as `/style-fix cockpit` or `/style-fix google-ads`. Reads BRAND.md + STYLE_AUDIT.md, audits every file in the folder, fixes all violations, updates the audit log, and commits. The one-command design compliance pass.
---

# Style Fix — Per-Page Design Token Compliance

**Usage:** `/style-fix <section-name>`

Examples: `/style-fix cockpit`, `/style-fix google-ads`, `/style-fix meta-ads`, `/style-fix dream-100`

**Announce at start:** "Running style-fix on `<section>` — audit → fix → verify → commit."

---

## Step 0: Branch Gate

**Never run style-fix on `main` or `master`.** Style fixes modify source files — they belong on a branch.

1. Check current branch: `git branch --show-current`
2. If on `main` or `master`, create a fix branch:
   ```bash
   git checkout -b fix/style-<section-name>
   ```
   Example: `/style-fix cockpit` → `git checkout -b fix/style-cockpit`
3. If already on a feature branch: continue — do not create another branch.

---

## Step 1: Resolve the folder

Map the argument to a component folder:

| Argument | Folder |
|---|---|
| `cockpit` | `src/components/cockpit/` |
| `google-ads` | `src/components/google-ads/` |
| `meta-ads` | `src/components/meta-ads/` |
| `dream-100` | `src/components/dream-100/` |
| `setup` | `src/components/setup/` |
| `gbp` | `src/components/gbp/` |
| `seo` | `src/components/seo/` |
| `email-sequence` or `emails` | `src/components/email-sequence/` |
| `quiz` | `src/components/quiz/` |
| `dashboard` | `src/components/dashboard/` |
| `campaign-dashboard` | `src/components/campaign-dashboard/` |
| `landing-page` or `lp` | `src/components/landing-page/` |
| `sidebar` | `src/components/sidebar/` |
| `root` | `src/components/*.tsx` (top-level files only) |

If the argument doesn't match, ask the user which folder they mean.

---

## Step 2: Read authority docs

Read these before scanning:
1. `BRAND.md` — Section 7 (Section Accent Colors) + Section 8 (Hard Rules) + Section 9 (Gold Standard)
2. `STYLE_AUDIT.md` — the checklist
3. Note the **section accent** from BRAND.md §7 (e.g. Quiz = amber/warning, Call Reviews = teal, Meta Ads = indigo). ALL colored tokens in this section must use that accent family — not just stat icons.

---

## Step 2b: Trace the FULL component tree (MANDATORY — lesson #102)

**Do NOT just scan the folder.** Trace every import from the main tab file recursively:

1. Read the main tab component (e.g. `QuizTab.tsx`)
2. List every imported `.tsx` component (dialogs, cards, shared components)
3. For each imported component, list ITS imports
4. Continue until you hit exempted folders (`/ui`, `/ad-templates`, `/p2p-landing`) or leaf components
5. Add ALL non-exempted files to the audit list — even if they live in a DIFFERENT folder (e.g. `src/components/typeform/` components imported by quiz)

**The audit surface is the full visual tree, not just the folder.**

Example for Quiz: `QuizTab.tsx` → `GenerateQuizDialog`, `QuizContentView`, `QuizPreviewView` (skip if user says), `TypeformConnectionCard` (in `/typeform`), `PushToTypeformDialog` (in `/typeform`), `PageHeader`, `CopyBtn`.

---

## Step 3: Audit every file in the component tree

For each `.tsx` file in the tree (folder files + traced imports), run ALL 15 checks from STYLE_AUDIT.md:

**Also check section accent compliance (lesson #103):**
- Stat card icon backgrounds must use the section's accent (e.g. `bg-status-warning-bg` for Quiz, not `bg-status-info-bg`)
- Statement/explanation slide backgrounds must use the section's accent
- Drag-over/selection rings must use the section's accent
- Informational banners inside section-specific dialogs should use neutral tokens (not `status-info`) unless they're truly system-state
- Correct-answer/highlight indicators should use the section's accent, not `status-success` (green)

```bash
# Quick violation count per pattern
grep -rn 'text-sm\|text-xs' <folder> --include='*.tsx' | wc -l
grep -rn 'text-\[[0-9]' <folder> --include='*.tsx' | wc -l
grep -rn 'text-gray-\|bg-gray-\|border-gray-' <folder> --include='*.tsx' | wc -l
grep -rn 'bg-white' <folder> --include='*.tsx' | wc -l
grep -rn 'violet\|indigo' <folder> --include='*.tsx' | wc -l
grep -rn 'shadow-\[0_0_0' <folder> --include='*.tsx' | wc -l
grep -rn 'text-foreground\|text-muted-foreground' <folder> --include='*.tsx' | wc -l
grep -rn 'bg-emerald-\|bg-red-\|bg-amber-' <folder> --include='*.tsx' | wc -l
grep -rn 'text-emerald-\|text-red-\|text-amber-' <folder> --include='*.tsx' | wc -l
```

Read each file that has violations. Produce the audit table per STYLE_AUDIT.md output format.

**Present the table to the user.** Wait for approval before fixing.

---

## Step 4: Fix all "fix now" items

After user approves (or if they said "fix all" upfront):

1. Dispatch parallel subagents (sonnet model) — split files into groups of 6-8
2. Each agent reads its files and makes the token replacements
3. After all agents complete, check for stragglers (grep for remaining violations)
4. Fix any stragglers manually

**Common replacements (copy from Call Reviews gold standard):**

| Pattern | Replacement |
|---|---|
| `text-sm` | `text-body` |
| `text-xs` | `text-caption` |
| `text-[14px]` or `text-[15px]` | `text-body` or `text-section-title` |
| `bg-white` | `bg-card` |
| `text-foreground` (bare) | `text-[var(--color-text-primary)]` |
| `hover:text-foreground` | `hover:text-[var(--color-text-primary)]` |
| `shadow-[0_0_0_1px_rgba(0,0,0,0.04)...]` | `${CARD_CLASSES}` (add import) |
| `bg-violet-50` / `text-violet-500` | `bg-status-info-bg` / `text-status-info` |
| `focus:ring-violet-*` / `focus:ring-indigo-*` | `focus:ring-focus-ring/20` |
| `hover:text-gray-700` | `hover:text-[var(--color-text-secondary)]` |
| `hover:border-gray-300` | `hover:border-foreground/15` |
| `bg-emerald-50` | `bg-status-success-bg` |
| `text-emerald-600` | `text-status-success` |

**IMPORTANT:** Before editing any file, check if it has pre-existing violations the PostToolUse hook will catch. Fix ALL violations in one pass per file (lesson #101).

**SECTION ACCENT RULE (lesson #103):** After replacing raw colors with status tokens, verify the token matches the section's accent from BRAND.md §7. Common mistakes:
- Quiz page using `status-info` (indigo) or `status-success` (green) → should be `status-warning` (amber)
- Using `bg-status-success-bg` for correct-answer highlight → use section accent instead
- Info banners inside section-specific dialogs → use neutral (`bg-muted`) not `status-info`

---

## Step 5: Verify

```bash
npx tsc --noEmit --skipLibCheck
```

Then re-run the grep checks from Step 3 to confirm zeros.

---

## Step 6: Check for dead code

For every file in the folder, grep for imports elsewhere:
```bash
grep -rn "ComponentName" src/ --include='*.tsx' --include='*.ts' | grep -v "ComponentName.tsx"
```

If zero imports → flag for deletion. Delete with user confirmation.

---

## Step 7: Update STYLE_AUDIT.md

Add a row to the Audit Log table:
```
| YYYY-MM-DD | <Section> (<N> components) | <fix-now count> | <acceptable count> | <deleted count> | `<commit hash>` |
```

Update the Page Queue: change the section's status from `⬜ pending` to `✅ done — <commit>`.

---

## Step 8: Commit

```
fix: <Section> style audit — <summary of what was fixed>
```

Push to current branch.

---

## What NOT to change

- Files in `src/components/ui/` (shadcn primitives)
- Files in `src/components/ad-templates/` (Puppeteer render pipeline)
- Files in `src/components/p2p-landing/` (marketing landing page)
- Layout structure, column counts, component order
- Business logic, data fetching, state management
- Route files, API handlers

This is a **style-only** pass. If a file needs layout changes, note it in the report but don't fix it here.
