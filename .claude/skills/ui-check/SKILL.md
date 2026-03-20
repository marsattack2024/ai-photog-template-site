---
name: ui-check
description: UI design token compliance check. Pre mode predicts violations in planned files. Post mode verifies written files against approved standards and BLOCKS merge on FAIL. Complements the check-ui-tokens.sh hook (always-on blocking) with deliberate review during /build-feature. Use when building UI components, restyling screens, or before committing visual changes.
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep
argument-hint: pre:<file-or-glob> | post:<file-or-glob>
---

# UI Check

**Announce at start:** "Using ui-check to verify design token compliance."

## Overview

Two-mode design compliance gate. Works alongside the `check-ui-tokens.sh` PostToolUse hook — the hook BLOCKS individual writes automatically; this skill runs deliberate review at pipeline checkpoints and BLOCKS merge on FAIL.

**The hook blocks individual writes. This skill blocks the merge. Neither alone is sufficient.**

## Modes

### Pre mode (`/ui-check pre:<files>`)

Reads planned files (or the plan's file list) and flags existing violations before execution begins. Informational only — does NOT block.

**Purpose:** Give the executor awareness of existing debt in files they're about to modify. "These files have N existing violations — fix them during your pass or leave them, but know they're there."

### Post mode (`/ui-check post:<files>`)

Reads what was actually written and runs the full checklist. Outputs PASS/FAIL per rule with file:line for each failure. **FAIL blocks merge** — violations must be fixed before branch completion.

---

## Checklist

Run all checks in both modes. For each violation, output the file path, line number, the violating code, and what it should be.

### FAIL rules (definite violations)

| # | Pattern | Violation | Correct |
|---|---------|-----------|---------|
| 1 | `text-[Npx]` anywhere | Raw pixel font size | Use `text-body`, `text-label`, `text-stat`, `text-page-title`, `text-caption`, `text-micro`, `text-section-title` |
| 2 | `text-sm` or `text-xs` on primary column text | Tailwind default on data | Use `text-body` (13px) or `text-caption` (12px) |
| 3 | `font-heading` outside `globals.css` | Deprecated token in components | Use `font-[var(--font-heading)]` in CSS or apply via className from token |
| 4 | `bg-white` on a non-button div | Hardcoded background | Use `bg-card` or `CARD_CLASSES` |
| 5 | `rounded-xl shadow-*` on card div | Inline card styling | Import `CARD_CLASSES` from `@/lib/card-classes` |
| 6 | `text-foreground` on any element | Ambiguous color token | Use `text-[var(--color-text-primary)]` |
| 7 | `text-muted-foreground` on any element | Ambiguous color token | Use `text-[var(--color-text-secondary)]`, `text-[var(--color-text-tertiary)]`, or `text-[var(--color-text-placeholder)]` depending on intent |
| 8 | Stat number without `font-bold tabular-nums` | Missing required stat formatting | Full pattern: `text-stat font-bold tracking-tight tabular-nums text-[var(--color-text-primary)]` |

### WARN rules (likely violations, need context)

| # | Pattern | Why it might be OK |
|---|---------|-------------------|
| 9 | `text-gray-*` or `bg-gray-*` | May be intentional accent on interactive elements (hover states, borders) |
| 10 | `bg-foreground` without `hover:bg-foreground/90` | CTA button missing hover state — half-implemented |

### Exclusions (never flag)

- Files in `src/components/ui/` — shadcn internals
- Files in `src/components/ad-templates/` — Puppeteer render pipeline
- Files in `src/components/catalyst/` — legacy, phased out separately
- Files in `src/components/p2p-landing/` — marketing landing page
- `globals.css` itself — token definitions live here
- `src/lib/ui-constants.ts` — badge/status constant maps

---

## Approved Standards Reference

These are locked. Every check above validates against these patterns:

- **Stat numbers:** `text-stat font-bold tracking-tight tabular-nums text-[var(--color-text-primary)]`
- **Table primary column:** `text-body font-medium text-[var(--color-text-primary)]`
- **Table secondary/meta:** `text-caption text-[var(--color-text-placeholder)]`
- **Table headers:** `text-label uppercase tracking-label text-[var(--color-text-label)]`
- **Section labels/eyebrows:** `text-label uppercase tracking-label text-[var(--color-text-label)]`
- **Page title:** `text-page-title tracking-tight text-[var(--color-text-primary)]`
- **Card wrapper:** `CARD_CLASSES` from `@/lib/card-classes` — never inline
- **All colors:** `var(--color-text-*)` tokens only

---

## Process

### Pre mode

1. Parse `$ARGUMENTS` to get file list (glob or comma-separated paths)
2. For each file, run all FAIL + WARN checks via grep
3. Output summary:
   ```
   UI Pre-Check Report
   ═══════════════════
   Files scanned: N

   FAIL: M violations across K files
     src/components/cockpit/OverviewTab.tsx:45  text-[28px] → text-stat
     src/components/cockpit/OverviewTab.tsx:72  bg-white → bg-card

   WARN: P items (review needed)
     src/components/cockpit/shared.tsx:18  text-gray-500 (may be intentional)

   Recommendation: Fix FAIL items during execution. WARN items at your discretion.
   ```
4. Do NOT block execution — this is informational

### Post mode

1. Parse `$ARGUMENTS` to get file list
2. Run all FAIL + WARN checks
3. Output PASS/FAIL per rule:
   ```
   UI Post-Check Report
   ════════════════════
   Files checked: N

   Rule 1 (raw pixel sizes):     PASS
   Rule 2 (text-sm on primary):  PASS
   Rule 3 (font-heading):        PASS
   Rule 4 (bg-white):            FAIL  src/components/cockpit/NewPanel.tsx:23
   Rule 5 (inline card styling): PASS
   Rule 6 (text-foreground):     PASS
   Rule 7 (text-muted-foreground): PASS
   Rule 8 (stat tabular-nums):   FAIL  src/components/cockpit/NewPanel.tsx:31
   Rule 9 (raw gray):            WARN  2 occurrences (review needed)
   Rule 10 (CTA hover):          PASS

   Result: 2 FAIL, 1 WARN — BLOCKED: fix FAILs before merge
   ```
4. **Any FAIL blocks merge.** Fix violations and re-run until all PASS before proceeding to security gate.

---

## Integration with /build-feature

This skill is called at two points in the `/build-feature` pipeline:

- **Step 4c (UI Pre-Check):** After plan review, before execution. Scans the files the plan will modify.
- **Step 6.25 (UI Post-Check):** After verification, before security gate. Scans the files that were written.

The skill does NOT replace the `check-ui-tokens.sh` hook. The hook fires on every write (including ralph, subagents, quick fixes). This skill fires only during explicit `/build-feature` runs.
