---
name: token-sweep
description: Full-codebase design token compliance scan + factorization pass. Wider than /style-fix (all sections at once) and deeper (extracts repeated class strings into shared constants). Run after any major merge or architecture change to verify zero violations were introduced. Produces a health score, violation table, factorization candidates, auto-fixes with parallel subagents, and commits.
---

# Token Sweep — Full-Codebase Compliance + Factorization

**Announce at start:** "Running `/token-sweep` — scanning all sections for violations, computing health score, finding factorization opportunities."

**Wider than `/style-fix`** (all sections in one pass, not one at a time)
**Deeper than `/style-fix`** (second pass finds repeated class strings that should be shared constants)
**Faster than `/style-fix`** (all 12 grep checks fire in parallel, subagents fix in parallel)

---

## Step 0: Branch Gate

**Never run token-sweep on `main` or `master`.** Token sweep fixes modify source files across the entire codebase — they belong on a branch.

1. Check current branch: `git branch --show-current`
2. If on `main` or `master`, create a fix branch:
   ```bash
   git checkout -b fix/token-sweep-$(date +%Y-%m-%d)
   ```
3. If already on a feature branch: continue — do not create another branch.

---

## Step 1: Read authority docs (parallel)

Read both before scanning:

1. `BRAND.md` — §7 Section Accent Colors, §8 Hard Rules, §12 Borders & Dividers
2. `STYLE_AUDIT.md` — the Audit Log (know what's already been swept + what's intentionally accepted)

Note any sections already marked `✅ done` in the audit log — their known-acceptable exceptions don't need re-flagging.

---

## Step 2: Full violation scan — all 12 checks in one shot

Run this single command block. All greps fire together, output is labelled:

```bash
BASE="src/components"
EXCL="--exclude-dir=ui --exclude-dir=ad-templates --exclude-dir=p2p-landing"

echo "=== 1. text-sm / text-xs (→ text-body / text-caption) ===" && \
grep -rn 'text-sm\|text-xs' $BASE/ --include='*.tsx' $EXCL 2>/dev/null | grep -v '\.test\.' || echo "(none)"

echo "=== 2. Hardcoded px font sizes (→ text-body or text-section-title) ===" && \
grep -rn 'text-\[[0-9][0-9]px\]' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 3. Gray tokens (→ color vars or divider tokens) ===" && \
grep -rn 'text-gray-\|bg-gray-\|border-gray-\|divide-gray-' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 4. bg-white (→ bg-card) ===" && \
grep -rn 'bg-white\b' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 5. Semantic text tokens (→ color vars) ===" && \
grep -rn 'text-foreground\|text-muted-foreground' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 6. Divider violations (border-t/b without divider token) ===" && \
grep -rn 'divide-y\|border-t\b\|border-b\b\|border-l\b\|border-r\b' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | grep -v 'divider\|border-border\|table-row-border\|status-\|focus:\|ring-\|border-white' || echo "(none)"

echo "=== 7. Raw status colors (→ status-* tokens) ===" && \
grep -rn 'bg-emerald-\|bg-red-50\|bg-amber-50\|text-emerald-\|text-red-5\|text-amber-' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 8. Focus ring violations (→ focus:ring-focus-ring) ===" && \
grep -rn 'focus:ring-blue-\|focus:ring-indigo-\|focus:ring-violet-\|focus:ring-gray-' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 9. Overlay violations (→ bg-overlay) ===" && \
grep -rn 'bg-black/4[0-9]\|bg-black/5[0-9]\|bg-black/6[0-9]' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 10. Shadow violations (→ CARD_CLASSES) ===" && \
grep -rn 'shadow-\[0_0_0' $BASE/ --include='*.tsx' $EXCL 2>/dev/null || echo "(none)"

echo "=== 11. Hardcoded hex (review — may be intentional) ===" && \
grep -rn '#[0-9A-Fa-f]\{6\}' $BASE/ --include='*.tsx' $EXCL 2>/dev/null | grep -v 'brand-kit\|OverviewTab\|dream-100/shared' || echo "(none)"

echo "=== 12. text-stat missing tabular-nums ===" && \
grep -rn 'text-stat' $BASE/ --include='*.tsx' | grep -v 'tabular-nums' || echo "(none)"

echo "=== TOTAL FILE COUNT ===" && \
find $BASE/ -name '*.tsx' $EXCL -not -path '*/ui/*' -not -path '*/ad-templates/*' -not -path '*/p2p-landing/*' | wc -l
```

### Categorize every hit as one of:
- **Fix** — clear violation, auto-fixable with the replacement map below
- **Accept** — intentional (brand color picker defaults, dark-overlay contexts like lightbox, Google Maps constants)
- **Review** — ambiguous, needs judgment (new hardcoded hex, section accent mismatch)

---

## Step 3: Compute health score

```
Health = (total files − files with ≥1 violation) / total files × 100
```

Present before the violation table:

```
Token Health: 97% (3 violations in 2 files / 68 total auditable files)
Last clean sweep: 2026-03-09 (commit 91c807e)
```

---

## Step 4: Factorization scan

Find class strings repeated in 3+ files — candidates for shared constants in `src/lib/card-classes.ts`.

```bash
BASE="src/components"
EXCL="--exclude-dir=ui --exclude-dir=ad-templates --exclude-dir=p2p-landing"

echo "=== Repeated flex row patterns ===" && \
grep -rho 'flex items-center gap-[0-9\.]*' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -15

echo "=== Repeated label patterns ===" && \
grep -rho 'text-label tracking-label[^"'\'']*' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -10

echo "=== Repeated card header text patterns ===" && \
grep -rho 'font-semibold text-\[var(--color-text-primary)\]' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -10

echo "=== Repeated status pill patterns ===" && \
grep -rho 'inline-flex items-center[^"'\'']*rounded-full[^"'\'']*text-label[^"'\'']*' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -10

echo "=== Repeated action button pattern ===" && \
grep -rho 'bg-\[var(--color-action)\][^"'\'']*hover:bg-\[var(--color-action-hover)\]' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -10

echo "=== Repeated stat number pattern ===" && \
grep -rho 'text-stat font-bold[^"'\'']*tabular-nums[^"'\'']*' $BASE/ --include='*.tsx' $EXCL 2>/dev/null \
  | sort | uniq -c | sort -rn | awk '$1 >= 3' | head -10
```

For each pattern at ≥3 hits, propose a named constant:

| Pattern | Count | Proposed constant | Destination |
|---|---|---|---|
| `text-label tracking-label uppercase text-[var(--color-text-label)]` | 14 | `LABEL_CLASSES` | `card-classes.ts` |
| `border-t border-divider` | 8 | `DIVIDER_CLASSES` | `card-classes.ts` |
| `w-px bg-divider self-stretch` | 5 | `VDIVIDER_CLASSES` | `card-classes.ts` |

**Present factorization candidates to the user. These are design decisions — get approval before extracting.**

---

## Step 5: Present findings — two tables

**Table A — Violations (auto-fixable after approval):**

| Section | File | Category | Pattern | Fix | Count |
|---|---|---|---|---|---|
| `google-ads` | `PushToGoogleDialog.tsx` | border | `border-gray-200` | `border-divider` | 3 |
| `meta-ads` | `MetaAdsTab.tsx` | divider | `divide-y divide-gray-100` | `divide-y divide-divider` | 2 |

**Table B — Factorization candidates (user approves individually):**

| Pattern | Count | Proposed | Where to add |
|---|---|---|---|
| `text-label tracking-label...` | 14 | `LABEL_CLASSES` | `card-classes.ts` |

**Table C — Accepted (no action):**

| File | Pattern | Reason |
|---|---|---|
| `BrandKitCard.tsx` | `#1A1A2E` | Brand color picker default |
| `CreativeLightbox.tsx` | `border-white/10` | Intentional dark overlay |

Ask: **"Fix all violations in Table A? Which factorization constants from Table B?"**

---

## Step 6: Fix violations — parallel subagents

After approval, split violation files into groups of 6–8. Dispatch one **sonnet** subagent per group:

> "Fix these token violations in [file list]. Use the replacement map. Fix ALL violations in each file in one pass (lesson #85 — hooks validate the whole file). Do not change layout, logic, or component structure."

**Full replacement map:**

| Violation | Replacement |
|---|---|
| `text-sm` | `text-body` |
| `text-xs` | `text-caption` |
| `text-[14px]` / `text-[15px]` | `text-body` |
| `bg-white` | `bg-card` |
| `text-foreground` | `text-[var(--color-text-primary)]` |
| `text-muted-foreground` | `text-[var(--color-text-secondary)]` |
| `text-gray-900` / `text-gray-800` | `text-[var(--color-text-primary)]` |
| `text-gray-600` / `text-gray-700` | `text-[var(--color-text-secondary)]` |
| `text-gray-400` / `text-gray-500` | `text-[var(--color-text-tertiary)]` |
| `border-gray-100` / `border-gray-200` (section divider) | `border-divider` |
| `border-gray-200` (tight row) | `border-divider-subtle` |
| `divide-y divide-gray-100` | `divide-y divide-divider` |
| `divide-gray-*` | `divide-divider` or `divide-divider-subtle` |
| `<hr className="border-gray-*">` | `<hr className="border-divider" />` |
| `w-px bg-gray-200` | `w-px bg-divider` |
| `bg-emerald-50` | `bg-status-success-bg` |
| `text-emerald-600` / `text-emerald-700` | `text-status-success` |
| `bg-red-50` | `bg-status-error-bg` |
| `text-red-500` / `text-red-600` | `text-status-error` |
| `bg-amber-50` | `bg-status-warning-bg` |
| `text-amber-600` / `text-amber-700` | `text-status-warning` |
| `focus:ring-blue-*` / `focus:ring-indigo-*` | `focus:ring-focus-ring/20` |
| `bg-black/40` → `bg-black/60` | `bg-overlay` |
| `shadow-[0_0_0_1px...]` | import + use `CARD_CLASSES` |

**Divider disambiguation:** `border-t border-gray-*` between *sections* → `border-divider`. Between *tight rows inside a list* → `border-divider-subtle`. When ambiguous, use `border-divider`.

**Section accent rule (lesson #87):** After replacing raw colors with status tokens, verify the token family matches the section's accent from BRAND.md §7. A Quiz component should use `status-warning` (amber), not `status-info` (indigo).

---

## Step 7: Implement approved factorization constants

For each approved constant, add to `src/lib/card-classes.ts`:

```ts
// Add only what's approved — never speculative
export const DIVIDER_CLASSES = "border-t border-divider" as const;
export const VDIVIDER_CLASSES = "w-px bg-divider self-stretch" as const;
export const LABEL_CLASSES = "text-label tracking-label uppercase text-[var(--color-text-label)]" as const;
```

Then grep for each literal pattern across `src/components/`, replace with the constant + import statement. **One subagent per constant** to avoid import conflicts.

---

## Step 8: Verify

```bash
# Type check
npx tsc --noEmit --skipLibCheck

# Re-run all 12 violation greps — every section should be "(none)" or in the accepted list
BASE="src/components"
EXCL="--exclude-dir=ui --exclude-dir=ad-templates --exclude-dir=p2p-landing"
echo "Remaining violations:" && \
grep -rn 'text-sm\|text-xs\|bg-white\b\|text-foreground\|text-muted-foreground\|text-gray-\|bg-gray-\|border-gray-\|divide-gray-\|bg-emerald-\|bg-red-50\|bg-amber-50\|text-emerald-\|text-amber-\|focus:ring-blue-\|focus:ring-indigo-\|bg-black/[456][0-9]' \
  $BASE/ --include='*.tsx' $EXCL 2>/dev/null | wc -l
```

Zero output (or only accepted exceptions) = clean.

---

## Step 9: Update STYLE_AUDIT.md

Add a row to the Audit Log:

```
| YYYY-MM-DD | Full codebase sweep | <N violations fixed> | <N accepted> | <N constants extracted> | `<commit hash>` |
```

---

## Step 10: Commit

```
fix: full token sweep — <summary> (health: N%)
```

Examples:
- `fix: full token sweep — zero violations post-arch-hardening (health: 100%)`
- `fix: full token sweep — 12 gray token violations, extract LABEL_CLASSES constant (health: 94%→100%)`

---

## Exempted files (never touch)

- `src/components/ui/` — shadcn primitives, different token system
- `src/components/ad-templates/` — Puppeteer render pipeline, pixel-exact layouts
- `src/components/p2p-landing/` — marketing landing page, different design system
- `src/app/globals.css` — token definitions, not violations
- `src/lib/card-classes.ts` — constants file, only ADD here never remove

## Known-acceptable patterns (don't flag)

- `BrandKitCard.tsx` hex fallbacks — brand color picker default values
- `cockpit/OverviewTab.tsx` chart color CSS var fallbacks — intentional `|| "#hex"` pattern
- `dream-100/shared.tsx` status pill hex — Dream 100 custom statuses, no system token equivalent
- `CreativeLightbox.tsx` `border-white/10` — intentional dark overlay context
- `GeoTargetingPicker.tsx` `INDIGO` const — Google Maps marker, Maps API context
