# P2P audit commands

Run these from **project root**. Use before and after migrations, and before every PR that touches P2P UI.

---

## 1. Hardcoded color audit (before AND after every migration)

**Full audit across all components:**
```bash
grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-\|bg-slate-\|#[0-9a-fA-F]\{3,6\}" src/components/ \
  --include="*.tsx" --include="*.ts" \
  | grep -v "node_modules" \
  | awk -F: '{print $1}' \
  | sort | uniq -c | sort -rn
```

**Single feature audit:**
```bash
grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-\|bg-slate-" src/components/{feature}/
```
Replace `{feature}` with the folder name (e.g. `dream-100`, `cockpit`).

**Count total remaining hardcoded colors app-wide:**
```bash
grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-\|bg-slate-" src/components/ \
  --include="*.tsx" | wc -l
```

---

## 2. Token cascade check (verify a token change propagates)

**Find every file consuming a specific token:**
```bash
grep -rn "accent-pill-bg\|table-row-hover\|badge-success\|shadow-card" src/components/ \
  --include="*.tsx" | grep -v "globals.css"
```

**Find files still using hand-built tables (not DataTable):**
```bash
grep -rn "<table\|<thead\|<tbody\|<tr\|<td\|<th" src/components/ \
  --include="*.tsx" | grep -v "data-table.tsx"
```

**Find files still using hand-built badges (not StatusBadge):**
```bash
grep -rn "rounded-full.*text-.*bg-\|pill\|badge" src/components/ \
  --include="*.tsx" | grep -v "status-badge.tsx\|StatusBadge"
```

---

## 3. Primitive adoption check (which files still need migration)

**Files with table-like patterns NOT using DataTable:**
```bash
grep -rln "grid-cols\|CSS Grid\|flex.*gap.*border-b" src/components/ \
  --include="*.tsx" | \
  while read f; do
    grep -L "DataTable" "$f" 2>/dev/null && echo "$f: NOT using DataTable"
  done
```

**Count StatusBadge consumers vs hand-built pills:**
```bash
echo "Using StatusBadge:"
grep -rln "StatusBadge" src/components/ --include="*.tsx" | wc -l
echo "Hand-built pills remaining:"
grep -rln "rounded-full.*bg-.*text-" src/components/ --include="*.tsx" | \
  grep -v "status-badge\|button\|tabs" | wc -l
```

---

## 4. Pre-PR verification (run before every merge)

Run all five checks in sequence. Replace `{feature}` with the feature folder you changed.

```bash
echo "=== 1. TypeScript ===" && npx tsc --noEmit
echo "=== 2. Tests ===" && npx vitest run
echo "=== 3. Hardcoded colors in modified feature ===" && \
  grep -rn "bg-white\|text-gray-\|border-gray-\|#[0-9a-fA-F]\{3,6\}" src/components/{feature}/ || true
echo "=== 4. Hand-built tables remaining ===" && \
  grep -rln "<table\|<thead\|<tbody" src/components/ --include="*.tsx" | grep -v "data-table.tsx" || true
echo "=== 5. Saas theme untouched ===" && \
  git diff src/app/globals.css 2>/dev/null | grep "^+" | grep "data-theme=\"saas\"" || echo "  (no globals.css changes or saas unchanged)"
```

---

## Quick reference

| Goal | Command / doc |
|------|----------------|
| Full snapshot (primitives + colors + tables + “migration complete”) | `bash .claude/skills/p2p-paper-luxury-ui/scripts/migration-status.sh` |
| Hardcoded colors (full or by feature) | Section 1 above |
| Token consumers / hand-built tables or badges | Section 2 above |
| Primitive adoption counts | Section 3 above |
| Pre-merge checklist | Section 4 above |
