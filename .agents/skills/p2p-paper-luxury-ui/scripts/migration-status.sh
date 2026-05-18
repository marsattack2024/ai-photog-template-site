#!/bin/bash
# P2P migration status — run from project root: bash .claude/skills/p2p-paper-luxury-ui/scripts/migration-status.sh

echo "=============================="
echo "P2P Migration Status"
echo "=============================="

echo ""
echo "--- Primitive Adoption ---"
echo "DataTable consumers:"
grep -rln "DataTable" src/components/ --include="*.tsx" 2>/dev/null | grep -v "data-table.tsx" | sed 's|src/components/|  |'

echo "SegmentedTabs consumers:"
grep -rln "SegmentedTabs" src/components/ --include="*.tsx" 2>/dev/null | grep -v "segmented-tabs.tsx" | sed 's|src/components/|  |'

echo "StatusBadge consumers:"
grep -rln "StatusBadge" src/components/ --include="*.tsx" 2>/dev/null | grep -v "status-badge.tsx" | sed 's|src/components/|  |'

echo ""
echo "--- Hardcoded Color Count by Feature ---"
for dir in src/components/*/; do
  [ -d "$dir" ] || continue
  feature=$(basename "$dir")
  count=$(grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-" "$dir" --include="*.tsx" 2>/dev/null | wc -l)
  if [ "$count" -gt 0 ]; then
    printf "  %-30s %s\n" "$feature:" "$count"
  fi
done

echo ""
echo "--- Hand-built Tables Remaining ---"
grep -rln "<table\b\|<thead\b\|<tbody\b" src/components/ --include="*.tsx" 2>/dev/null | \
  grep -v "data-table.tsx" | sed 's|src/components/|  |'

echo ""
echo "--- Migration Complete ---"
echo "Features at zero hardcoded colors:"
for dir in src/components/*/; do
  [ -d "$dir" ] || continue
  feature=$(basename "$dir")
  count=$(grep -rn "bg-white\|text-gray-\|border-gray-\|bg-gray-" "$dir" --include="*.tsx" 2>/dev/null | wc -l)
  if [ "$count" -eq 0 ]; then
    echo "  ✅ $feature"
  fi
done
