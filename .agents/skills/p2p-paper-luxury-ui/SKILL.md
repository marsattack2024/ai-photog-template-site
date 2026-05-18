---
name: p2p-paper-luxury-ui
description: >
  Design and implement warm, editorial, "paper‑ish luxury" web UIs
  (P2P Studio OS, Notion-style dashboards) using Playfair Display + DM Sans,
  cream backgrounds, gold accents, and a tokenized theme system with shared
  primitives (DataTable, SegmentedTabs, StatusBadge). Covers new screens,
  restyling existing shadcn/Tailwind UIs, and migrating hand-built components
  onto the shared system. Do not change the saas theme unless explicitly requested.
keywords: p2p, paper, luxury, editorial, dashboard, cream, gold, Playfair, DM Sans, theme, primitives
version: 2.0
---

# P2P Paper Luxury UI

Source of truth for creating or restyling screens into the P2P "paper‑ish luxury"
aesthetic. Covers tokens, shared primitives, migration workflow, and visual standards.

## Resources

### Internal files (source of truth)
- `src/app/globals.css` — all CSS tokens for all themes
- `src/components/ui/data-table.tsx` — shared table primitive
- `src/components/ui/segmented-tabs.tsx` — shared tab primitive
- `src/components/ui/status-badge.tsx` — shared badge primitive
- `src/components/ui/card-classes.ts` — CARD_CLASSES, CARD_HOVER_CLASSES
- `src/components/cockpit/shared.tsx` — getCssVar(), ChartTooltip

### Scripts (run from project root)
- **Full migration snapshot:** `bash .Codex/skills/p2p-paper-luxury-ui/scripts/migration-status.sh` — primitive adoption, hardcoded color count by feature, hand-built tables remaining, features at zero. Run anytime to see where you stand.
- **Audit commands (before/after migration, token cascade, primitives, pre-PR):** [references/audits.md](references/audits.md)

### Visual references (layout and spacing only — do not copy code)
- P2P Figma mock screenshots — hierarchy and spacing feel only
- [docs/plans/p2p-theme-styling-guide.md](../../docs/plans/p2p-theme-styling-guide.md) — original brand guide

### External references
- [Recharts API](https://recharts.org/en-US/api) — chart components
- [oklch color picker](https://oklch.com) — hex → oklch for new tokens
- [Tailwind CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables) — var() with Tailwind
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | [DM Sans](https://fonts.google.com/specimen/DM+Sans) — font references

---

## When to use this skill

- "Paper / Notion / brand-guideline" style dashboards or apps
- Warm, cream-based, editorial SaaS UIs (not brutalist / glassmorphism)
- Applying or extending the P2P visual language across new or existing screens
- Restyling shadcn/Tailwind UIs to the P2P look
- Migrating hand-built tables, tabs, or badges onto shared primitives

**Assumptions:**

- Design system: CSS variables + Tailwind + shadcn
- Theme switching: `[data-theme="…"][data-mode="…"]`
- `p2p` = warm paper theme; `saas` = brutalist theme — **never change saas** unless explicitly asked
- Shared primitives exist in `src/components/ui/` — always use them

---

## Core aesthetic principles

1. **Warm paper, not white UI** — Background is warm cream (#FAF9F6), never pure white. Cards slightly lighter with very subtle shadows. No glass, blur, neon, or high-tech gradients. Think "printed editorial layout."

2. **Editorial typography** — Headings: Playfair Display, strong weight, tight leading. Body/UI: DM Sans, generous line height. Deliberate scale; never fall back to Tailwind defaults.

3. **Generous spacing = perceived luxury** — Large section paddings, cards as "objects on a desk," breathing room over density. When in doubt, add more space.

4. **Gold as accent, not flood** — Gold for CTAs, key stats, one gradient hero moment per page. Body text stays in neutrals. Too much gold reads cheap; a few precise hits read as "earned."

5. **Calm motion** — One spring easing curve for everything. Subtle hover lifts and tab transitions. No bouncing, flashing, or competing animations.

---

## Architecture: tokens → primitives → features

```
globals.css tokens (colors, spacing, shadows, motion, badge/table/tab state)
       ↓
Shared primitives (DataTable, SegmentedTabs, StatusBadge, CARD_CLASSES)
       ↓
Feature components (Cockpit, Dream 100, Call Reviews, etc.)
```

**The rule:** Features never define their own table layouts, tab active states, or
badge styles. They consume primitives, which consume tokens. Changing one token
updates every feature that has adopted the primitives.

---

## Theme tokens

All live under `[data-theme="p2p"]` in `globals.css`. Both light and dark mode blocks.

### Colors (oklch)

```css
[data-theme="p2p"] {
  /* Backgrounds */
  --background: oklch(98.5% 0.02 80);     /* #FAF9F6 cream */
  --muted:      oklch(96.5% 0.02 78);     /* #F0EEEA warm gray */

  /* Cards */
  --card:            oklch(99.5% 0.01 75);
  --card-foreground: oklch(25% 0.08 65);

  /* Gold system */
  --primary:            oklch(75% 0.15 85);  /* #C9A84C */
  --primary-foreground: oklch(25% 0.08 65);
  --secondary:          oklch(85% 0.12 82);  /* darker gold for hover */

  /* Text hierarchy */
  --foreground:       oklch(25% 0.08 65);    /* primary text */
  --muted-foreground: oklch(55% 0.04 70);    /* body text */
  --popover:          oklch(65% 0.03 72);    /* secondary/labels */

  /* Utility */
  --border: oklch(92% 0.02 76);
  --input:  oklch(92% 0.02 76);
  --ring:   oklch(75% 0.15 85);

  /* Charts */
  --chart-meta:     oklch(0.70 0.12 85);
  --chart-google:   oklch(0.62 0.10 70);
  --chart-revenue:  oklch(0.65 0.14 155);
  --chart-cpl:      oklch(0.72 0.10 50);
  --chart-bookings: oklch(0.62 0.12 70);
  --chart-grid:     var(--border);
  --chart-axis:     var(--muted-foreground);

  /* Heatmap */
  --heatmap-0: oklch(0.96 0.02 78);
  --heatmap-1: oklch(0.88 0.08 85);
  --heatmap-2: oklch(0.78 0.12 85);
  --heatmap-3: oklch(0.68 0.15 85);
  --heatmap-4: oklch(0.50 0.12 60);
}
```

### State tokens (tables, tabs, badges)

These exist in **all four theme blocks** (p2p light/dark, saas light/dark) so
primitives work universally. Visual differences come from token values, not components.

```css
[data-theme="p2p"] {
  /* Table states */
  --table-row-border:          #F0F0ED;
  --table-row-hover:           rgba(0,0,0,0.02);
  --table-row-selected-bg:     rgba(201,168,76,0.06);
  --table-row-selected-border: #C9A84C;
  --table-header-text:         var(--muted-foreground);

  /* Tab / pill active states */
  --accent-pill-bg:    rgba(201,168,76,0.10);
  --accent-pill-text:  var(--primary);
  --tab-container-bg:  var(--muted);
  --tab-active-bg:     var(--card);
  --tab-active-text:   var(--foreground);
  --tab-active-shadow: 0 1px 3px rgba(0,0,0,0.08);
  --tab-inactive-text: var(--muted-foreground);

  /* Badge semantic tokens (5 variants × 3 values) */
  --badge-success-bg:   /* warm emerald bg */;
  --badge-success-text: /* warm emerald text */;
  --badge-success-dot:  /* warm emerald dot */;
  --badge-warning-bg/text/dot:  /* amber — Contacted, In Progress */
  --badge-error-bg/text/dot:    /* red — Flagged, Error */
  --badge-info-bg/text/dot:     /* indigo — New, Replied */
  --badge-neutral-bg/text/dot:  /* gray — Pending, Dormant */
}
```

### Typography

```css
[data-theme="p2p"] {
  --font-heading: 'Playfair Display', serif;
  --font-body:    'DM Sans', sans-serif;
}
```

| Element | Font | Size | Weight | Line height |
|---------|------|------|--------|-------------|
| H1 (page title) | Playfair | clamp(44px, 7vw, 72px) | 700 | 1.1 |
| H2 (section title) | Playfair | clamp(32px, 5vw, 48px) | 700 | 1.1 |
| Big stats ($35,185) | Playfair | 28–36px | 700 | 1.1 |
| Body | DM Sans | clamp(15px, 2.5vw, 18px) | 400 | 1.7 |
| Table cells | DM Sans | 13px | 400 | 1.5 |
| Table headers | DM Sans | 11px uppercase | 600 | — |
| Labels/overlines | DM Sans | 11px uppercase | 600 | tracking 0.05–0.12em |
| Buttons | DM Sans | 13px uppercase | 600 | tracking 0.12em |

**Rules:** Playfair only for H1–H3 and major numeric stats. DM Sans for everything else.
Zero-value stats (0, $0) should use `text-muted-foreground` to avoid screaming empty data.

### Spacing

```css
[data-theme="p2p"] {
  --section-padding-y: clamp(80px, 12vw, 140px);
  --section-padding-x: clamp(20px, 6vw, 48px);
  --card-padding:      clamp(24px, 4vw, 40px);
  --component-gap:     clamp(28px, 4vw, 56px);
}
```

Use these instead of ad-hoc `mt-8`/`mb-10`. Between major page zones (summary cards →
filter bar → table), always use `--component-gap`.

### Shadows

```css
[data-theme="p2p"] {
  --shadow-card:      0 1px 3px rgba(0,0,0,0.04);
  --shadow-button:    0 4px 24px rgba(201,168,76,0.25);
  --shadow-hover:     0 12px 40px rgba(0,0,0,0.08);
  --shadow-dashboard: 0 40px 80px rgba(0,0,0,0.06);
}
```

### Motion

```css
[data-theme="p2p"] {
  --ease-spring:      cubic-bezier(0.16, 1, 0.3, 1);
  --duration-default: 0.3s;
}
```

Apply to: card hover, tab switches, buttons, filter chips. No competing easings
or infinite background animations.

---

## Shared primitives

These live in `src/components/ui/`. **Always use them.** Never hand-build tables,
segmented tabs, or status badges in feature code.

### DataTable (`data-table.tsx`)

- Generic `<T>`, fully typed
- Props: `columns`, `data`, `getRowKey`, `variant` ("workspace" | "navigating"),
  `onRowClick?`, `selectedKey?`, `loading?`, `emptyState?`, `getRowClassName?`
- Uses CSS Grid (fr, minmax — not HTML `<table>`)
- Exports sub-parts: `DataTableHeader`, `DataTableRow`, `DataTableCell` for
  non-standard layouts (expandable rows, nested content)
- Header: `--table-header-text`, 11px uppercase tracking
- Rows: hover `--table-row-hover`, selected = gold inset border via
  `box-shadow: inset 3px 0 0 var(--table-row-selected-border)`
- Sorting: consumer provides `onHeaderClick` + `sortDirection` — not built in

### SegmentedTabs (`segmented-tabs.tsx`)

- Props: `tabs` (key, label, icon?), `activeKey`, `onChange`, `size?` ("sm" for
  compact), `className?`
- Container: `--tab-container-bg`, rounded-xl
- Active: `--tab-active-bg`, `--tab-active-text`, `--tab-active-shadow`
- Inactive: `--tab-inactive-text`, `hover:text-foreground`
- Icon type: LucideIcon
- This is a segmented control, not a Radix/shadcn panel switcher

### StatusBadge (`status-badge.tsx`)

- Props: `label`, `variant` (success | warning | error | info | neutral),
  `showDot?`, `dotClassName?`, `className?`
- All colors from CSS vars (`--badge-{variant}-bg/text/dot`)
- Escape hatch: `className`/`dotClassName` for edge cases
- Works in both p2p and saas themes (tokens exist in all 4 theme blocks)

**Status → variant mapping (standard across all features):**

| Status | Variant |
|--------|---------|
| Partner, Booked, Active | success |
| Contacted, In Progress, In Conversation | warning |
| Flagged, Error | error |
| New, New Lead, Replied | info |
| Pending, Dormant | neutral |

### Card classes (shared)

Import from `src/lib/card-classes.ts` (re-exported by cockpit/shared.tsx for convenience):

```tsx
export const CARD_CLASSES =
  "bg-card rounded-[14px] border border-border shadow-[var(--shadow-card)]";
export const CARD_HOVER_CLASSES =
  "hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)] transition-all duration-300 ease-[var(--ease-spring)]";
```

### Shared helpers

```tsx
// getCssVar — for Recharts and SVG that need runtime color values
export function getCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// ChartTooltip — shared Recharts tooltip styled as mini card
export function ChartTooltip({ active, payload, label }: TooltipProps) { … }
```

---

## Component patterns

### Page layout

```tsx
<div className="min-h-screen bg-background px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
  <h1 className="font-heading text-[clamp(44px,7vw,72px)] font-bold leading-[1.1]">
    Page Title
  </h1>
  <p className="text-muted-foreground font-body">Subtitle</p>
  {/* sections separated by var(--component-gap) */}
</div>
```

### Buttons

**Primary gold CTA:**
- Desktop: `rounded-full px-11 py-4`
- Mobile: `rounded-[12px] w-full py-4`
- `bg-primary text-primary-foreground shadow-[var(--shadow-button)]`
- `text-[13px] font-semibold tracking-[0.12em] uppercase`
- Hover: `-translate-y-0.5 scale-[1.02] shadow-[var(--shadow-hover)]`

**Secondary/ghost:**
- `rounded-full px-9 py-3 border border-[rgba(201,168,76,0.4)]`
- `text-primary bg-transparent`
- Hover: `bg-[var(--gold-bg)] border-primary`

### Tables (via DataTable)

- Always use `DataTable` — never hand-build row grids
- Workspace variant: click selects, gold left border on selected
- Navigating variant: click navigates, subtle hover
- Row padding should feel generous (paper, not spreadsheet)

### Filter chips / category tabs

- Active: `bg-[var(--accent-pill-bg)] text-[var(--accent-pill-text)]` + pill shape
- Inactive: `text-muted-foreground hover:bg-muted/60` + pill shape
- Use same token values as SegmentedTabs even if not using the component

### Charts (Recharts)

- All colors from `--chart-*` vars via `getCssVar()`
- Grid: `getCssVar('--chart-grid')`, Axis: `getCssVar('--chart-axis')`
- Tooltip: shared `ChartTooltip` component
- No hex literals in chart config

### Gold gradient (use once per page max)

```css
.gradient-text {
  background: linear-gradient(135deg, #C9A84C 0%, #E8D5A0 40%, #C9A84C 70%, #A08530 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
```

One hero headline per page. Never on body text or multiple elements.

---

## Migration workflow (per feature)

When restyling an existing feature, **always combine migration + visual polish in one pass.**
Do not separate "migrate to primitives" from "apply P2P styling" — do both together so the
feature comes out finished.

### Step 1: Audit

Before touching code:

```bash
grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-\|bg-slate-\|#[0-9a-fA-F]\{3,6\}" src/components/{feature}/
```

Count hardcoded colors. Identify tables, tabs, and badges that need primitive adoption.

### Step 2: Migrate to primitives

- Replace hand-built tables → `DataTable` (define columns, wire handlers)
- Replace hand-built tab bars → `SegmentedTabs`
- Replace inline status pills → `StatusBadge` with correct variant mapping
- Import `CARD_CLASSES` / `CARD_HOVER_CLASSES` for all card containers

### Step 3: Replace hardcoded colors

| Find | Replace with |
|------|-------------|
| `bg-white` | `bg-card` |
| `text-gray-900` | `text-[var(--color-text-primary)]` |
| `text-gray-600/700` | `text-[var(--color-text-secondary)]` |
| `text-gray-500` | `text-[var(--color-text-tertiary)]` |
| `text-gray-400` (labels) | `text-[var(--color-text-label)]` |
| `text-gray-400` (placeholders) | `text-[var(--color-text-placeholder)]` |
| `text-gray-300` | `text-[var(--color-text-faint)]` |
| `border-gray-200` | `border-border` |
| `bg-gray-50/100` | `bg-muted` |
| `bg-slate-*` | `bg-muted` |
| `hover:bg-gray-50` | `hover:bg-muted/40` |
| `shadow-lg/xl` | `shadow-[var(--shadow-card)]` |
| Any hex color | Appropriate CSS var |

**IMPORTANT:** Do NOT use `text-foreground` or `text-muted-foreground` — use the semantic `var(--color-text-*)` tokens above instead. The `text-foreground` tokens are ambiguous and do not map cleanly to the semantic text hierarchy.

### Step 4: Apply P2P visual polish

- Page title → `font-heading` at correct scale
- Stats → `font-heading`, bold, appropriate size
- Labels/overlines → 11px uppercase tracking, `text-muted-foreground`
- Body text → `font-body`, `text-muted-foreground`, line-height 1.7
- Section spacing → `--component-gap`
- Card padding → `--card-padding`
- Buttons → gold primary or ghost secondary per spec above
- Motion → `--ease-spring`, `--duration-default`

### Step 5: Verify

```bash
# Zero hardcoded colors in feature
grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-" src/components/{feature}/

# TypeScript compiles
npx tsc --noEmit

# Tests pass
npx vitest run

# Saas theme unaffected (new tokens only inside [data-theme="p2p"])
```

### Migration priority order

| Priority | Feature | Effort | Notes |
|----------|---------|--------|-------|
| 1 | Call Reviews | 30 min | Table + tabs + badges — exercises all 3 primitives |
| 2 | Sidebar | 15 min | Every page sees it, high visual impact |
| 3 | Cockpit remaining | 15 min | 43 hardcoded colors left in non-migrated panels |
| 4 | Campaign Dashboard | 20 min | Real HTML table → DataTable migration |
| 5 | GBP | 20 min | Badge-heavy, no tables |
| 6 | SEO | 25 min | Small, clean |
| 7 | Meta Ads | 20 min | 128 hardcoded colors, mostly card layouts |
| 8 | Google Ads | 15 min | Similar to Meta |
| 9 | Creatives | 15 min | Small |
| 10 | Quiz | 45 min | 137 hardcoded colors, mostly color swaps |

Each migration follows all 5 steps above. Feature comes out **on primitives and
visually polished** in one PR.

---

## Hard rules

### DO

- Use **only** theme tokens and shared primitives
- Use `DataTable` for any list/table UI — no hand-built grids
- Use `StatusBadge` for any status indicator — no inline pills
- Use `SegmentedTabs` for any tab bar / segmented control
- Let cards and sections breathe — err on extra space
- Dim zero-value stats with `text-muted-foreground`
- Run the hardcoded color grep after every change
- Combine migration + visual polish in one pass per feature

### DON'T

- Don't hardcode `bg-white`, `text-gray-*`, `border-gray-*`, or hex in components
- Don't use Playfair for body text, nav, or small labels
- Don't overuse gold — highlight, not base
- Don't add glassmorphism, heavy shadows, neon, or blur
- Don't animate more than a few things at once
- Don't create feature-specific table, tab, or badge components
- Don't separate "migrate to primitives" from "apply styling" — always do both together
- Don't modify saas theme unless explicitly asked

---

## Token cascade check

After migrating features, verify token changes propagate correctly. **Exact grep commands:** [references/audits.md](references/audits.md) (sections 1–4).

| Token | Should update |
|-------|--------------|
| `--accent-pill-bg` | All active filter chips and category tabs |
| `--tab-active-bg` | All SegmentedTabs active states |
| `--table-row-hover` | All DataTable row hovers |
| `--badge-success-bg` | All StatusBadge success variants |
| `--shadow-card` | All cards and DataTable containers |
| `--chart-meta` | All Recharts instances using Meta color |

If a token change doesn't cascade to a feature, that feature hasn't been
migrated yet. The goal: **one token change = app-wide visual update.**

---

## Figma / mock usage rules

When the user provides Figma screenshots or mock designs:

- Treat as **visual inspiration only** (layout hierarchy, spacing feel, typography weight)
- Do NOT copy Figma code, component structure, or inline styles
- Always implement through existing tokens and primitives
- If the mock shows a pattern not covered by existing primitives, discuss with the user
  before creating a new component

---

## Success criteria

```
✅ Warm cream #FAF9F6 — never pure white
✅ Subtle shadows (--shadow-card) — never shadow-xl
✅ Gold accents on CTAs + 1 gradient per hero
✅ Playfair H1–H3 and stats only — never body
✅ 140px → 80px spacing rhythm via tokens
✅ All tables use DataTable primitive
✅ All tabs use SegmentedTabs primitive
✅ All badges use StatusBadge primitive
✅ Zero hardcoded colors in migrated features
✅ Token change cascades to all adopted features
❌ No glassmorphism, neumorphism, heavy blur
❌ No cold blues/purples/grays
❌ No cramped spacing
❌ No hand-built tables, tabs, or badges
❌ No feature-specific style patterns
```

**Formula: 40% Colors + 30% Typography + 30% Space = P2P luxury**