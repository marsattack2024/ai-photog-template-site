---
name: design-audit
description: Scan the UI codebase for design inconsistencies and generate a prioritized fix list. Use when the user says "audit design", "check consistency", "design audit", "find inconsistencies", "what still needs fixing", "check the UI", or wants to know which components don't match the design system. Also use proactively before claiming a design revamp phase is complete. Read-only — does not modify files.
---

# Design Audit

**Announce at start:** "Running design audit — scanning all UI components for consistency issues."

Scan every component under `src/components/` and `src/app/` against the design system defined in `BRAND.md` (project root — single source of truth). `docs/brand-guidelines.md` is deprecated and must NOT be used. Produce a prioritized report with exact `file:line` references. Do NOT modify any files.

## Audit Checks

Run all 8 checks. For each, use Grep/Glob to find violations, then collect results into the report.

### Check 1: Catalyst Badge Imports (Phase-Out)

Catalyst Badge (`src/components/catalyst/badge.tsx`) has been FULLY removed — 0 imports should remain anywhere in the codebase.

```
Grep: import.*catalyst/badge
Path: src/
```

List every file still importing it. Each is a violation that must be migrated to pure Tailwind inline styles.

### Check 2: Table Header Consistency

All tables should use design token header pattern:
```
text-label uppercase tracking-label text-[var(--color-text-label)]
```

Search for `<th` tags in component files and check if headers match the canonical pattern. Flag any that use different typography (e.g., `text-xs`, `font-medium`, `tracking-wider`, `text-gray-500`, or `text-muted-foreground`), OR raw hardcoded equivalents (`text-[11px]`, `tracking-[0.08em]`, `text-gray-400`).

```
Grep: <th\b
Path: src/components/
```

### Check 3: Status Badge Pattern

The canonical badge system is split into TWO distinct categories. Both are correct — the violation is using the wrong category for the wrong purpose, or using old Catalyst/class-based patterns for either.

**Category A — State pills** (Reviewed, Flagged, Grading, Complete, Failed, Error, Pending, and other status states):
```html
<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[12px] bg-{color} text-{color}">
  <span class="h-1.5 w-1.5 rounded-full bg-{color}-400" />  <!-- dot -->
  Label
</span>
```

**Category B — Tiny source/platform labels** (META, GOOGLE, Upload, In, Out):
```html
<span class="rounded-md px-2 py-[2px] text-[10px] ...">META</span>
```
These are intentionally smaller and use `rounded-md` (square-cornered relative to state pills). `rounded-md` on a tiny source/platform badge is NOT a violation.

Search for old patterns still in use:
- `STATUS_BADGE_COLORS` (old Catalyst color map — always a violation)
- `<Badge color=` (Catalyst Badge used as status indicator — always a violation)
- `rounded-md` used on state pills (Reviewed, Flagged, Grading, etc.) — violation; only correct for Category B tiny source/platform labels

```
Grep: STATUS_BADGE_COLORS
Grep: <Badge color=
Path: src/components/
```

### Check 4: Empty State Consistency

Two valid patterns exist — both are correct per `BRAND.md` §11:
- **Shared component**: `import { EmptyState } from "@/components/EmptyState"` — uses `py-20` with circular icon bg, title, description, optional action button. Best for standard zero-state placeholders.
- **Inline dashed**: `border-2 border-dashed rounded-xl py-12` — valid when a generate CTA lives inline in the content area rather than in the top bar.

Flag ONLY these violations:
1. Old Catalyst-style empty states (any import from `catalyst/`)
2. Custom inline patterns that are inconsistent with both valid patterns above (e.g., hardcoded centering without using either pattern)
3. Inline patterns where the shared `EmptyState` component would be clearly more appropriate (e.g., simple no-content states with no generate button needed)

```
Grep: border-2 border-dashed
Path: src/components/
```

List each match and note whether it's the valid inline pattern or a stale Catalyst/custom violation.

### Check 5: Dialog Typography

All dialogs should use consistent title/description typography:
- `DialogTitle`: should be concise, sentence case
- `DialogDescription`: should use `text-sm text-muted-foreground` or equivalent

```
Grep: <DialogTitle|<AlertDialogTitle|<SheetTitle
Path: src/components/
```

Check that dialog titles use consistent sizing and dialog descriptions use consistent color/size.

### Check 6: Stat Card Consistency

Stat cards (metrics displays) should follow this canonical pattern:
- Label: `text-label tracking-label uppercase text-[var(--color-text-label)]`
- Value: `text-stat font-bold tracking-tight tabular-nums text-[var(--color-text-primary)]`

```
Grep: stat|Stat|metrics|<Card.*CardContent
Path: src/components/
```

Find all stat/metric card patterns and check if labels and values use consistent typography. Flag any that use:
- Old label pattern: `text-xs font-medium uppercase text-muted-foreground`
- Old value patterns: `text-2xl font-bold`, `text-3xl font-medium`, `text-[28px]`
- `font-semibold` on stat values (should be `font-bold`)
- Stat values missing `tabular-nums` (causes column width shift on value updates)
- Stat values missing `font-bold` (canonical weight is 700)

### Check 7: Page Header Consistency

Page headers should use:
- Title: `text-page-title tracking-tight text-[var(--color-text-primary)]`
- Subtitle: `text-body text-[var(--color-text-placeholder)]`

```
Grep: text-2xl|text-3xl|<h1|page.*title
Path: src/components/
Path: src/app/
```

Find all page-level headings and flag any still using the old patterns (`text-2xl/8 font-semibold`, `text-2xl font-semibold`, or similar).

### Check 8: Design Plan Cross-Reference

Read `BRAND.md` (project root) — the canonical design system reference. `docs/brand-guidelines.md` is deprecated; do not read it. Cross-reference the current codebase state against the patterns documented in `BRAND.md`.

Verify the following known post-compliance items are still correct (these should all be DONE — flag any regression):
- Catalyst Badge: fully removed (0 imports anywhere in `src/`) — `src/components/catalyst/badge.tsx` should be deleted or unused
- `EmptyState.tsx` exists at `src/components/EmptyState.tsx` and is used consistently
- `DetailViewHeader.tsx` exists at `src/components/DetailViewHeader.tsx` and is used by AdCopyDetailView

Verify the following structural items are correctly implemented:
- Per-tab scroll structures: each major tab (Ad Copy, Landing Pages, Emails, Quiz, Creatives, Dream 100, Call Reviews) has its own scroll container rather than relying on a shared layout scroll
- Sidebar restructure: groups are Content / Ads Platforms / Outreach / Local / Tools / Setup with correct section membership (Call Reviews under Tools, GBP + SEO Pixel under Local)
- Navigating vs workspace table pattern applied correctly: navigating (CSS Grid divs, ArrowRight icon) for Ad Copy / LP / Emails / Quiz list views; workspace (HTML `<table>`) for Creatives / Dream 100 / Campaign tables

Update the status of each item in the report.

## Report Format

Output a single report with this structure:

```markdown
## Design Audit Report

### Summary
- X files still using Catalyst Badge (should be 0 — each is a violation)
- X table header inconsistencies (canonical: `text-label uppercase tracking-label text-[var(--color-text-label)]`)
- X status badge pattern violations
- X empty state inconsistencies
- X dialog typography issues
- X stat card inconsistencies (canonical label: `text-label tracking-label uppercase text-[var(--color-text-label)]` / value: `text-stat font-bold tracking-tight tabular-nums text-[var(--color-text-primary)]`)
- X page header inconsistencies (canonical: `text-page-title tracking-tight text-[var(--color-text-primary)]`)
- X files still using raw hardcoded pixel values (`text-[13px]`, `text-[11px]`, `text-[10px]`) instead of design tokens

### Priority 1: Catalyst Badge Phase-Out (X files)
| File | Line | Current Usage | Migration Notes |
|------|------|--------------|-----------------|
| path/to/file.tsx | 32 | `import { Badge } from catalyst/badge` | Replace with inline Tailwind dot+text pill |

### Priority 2: Status Badge Violations
[same table format]

### Priority 3: Table Header Inconsistencies
[same table format]

### Priority 4: Empty State Inconsistencies
[same table format]

### Priority 5: Dialog/Stat/Header Issues
[same table format]

### Design Plan Status
| Item | Status | Evidence |
|------|--------|----------|
| Catalyst Badge fully removed | Done / Regression | [0 imports found / file:line of remaining import] |
| EmptyState.tsx exists | Done / Missing | [file exists / doesn't exist] |
| DetailViewHeader.tsx exists | Done / Missing | [file exists / doesn't exist] |
| Per-tab scroll structures | Done / Incomplete | [file:line or "no evidence found"] |
| Sidebar restructure (Ops/Content/Ads/Outreach/Local/Sales/Setup groups) | Done / Incomplete | [verify: Ops=Cockpit+OKRs+Rituals, Sales=CallReviews, Local=GBP+SEO, no "Tools" group] |
| Navigating vs workspace pattern applied | Done / Incomplete | [file:line or "no evidence found"] |

### Recommended Next Actions
1. [Highest-impact fix with file references]
2. [Second priority]
3. ...
```

## Prioritization Rules

Order fixes by blast radius:
1. **Catalyst Badge imports** — every import is a visible inconsistency across the app
2. **Status badge violations** — directly user-facing, muddy colors
3. **Table header inconsistencies** — visible but less impactful
4. **Empty states** — visible when content is missing
5. **Dialog/stat/header issues** — important but lower frequency

## What NOT to Flag

- Files in `src/lib/` (not UI components)
- Test files (`*.test.ts`)
- The Catalyst Badge component itself (`src/components/catalyst/badge.tsx`)
- `ui-constants.ts` importing Badge for type references only
- Dark mode classes (not in scope for this audit)
- `rounded-md` on tiny source/platform labels (META, GOOGLE, Upload, In, Out) — this is intentional Category B badge styling, not a violation
