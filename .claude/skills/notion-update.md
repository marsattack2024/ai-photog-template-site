# /notion-update 

Update the GSD project board in Notion. Uses the Notion REST API directly via `scripts/notion-gsd.ts`. Checks the local index first — zero API calls for status and duplicate checks.

## Requirements
- `NOTION_API_TOKEN` must be set in `.env.local`
- Run `source .env.local` (or the shell will pick it up automatically via Next.js)
- For Claude Code sessions: export the var before running: `export $(grep NOTION_API_TOKEN .env.local | xargs)`

## Invoking the tool
```bash
npx tsx .claude/tools/notion-gsd.ts <command> [options]
```

## Database Info
- **Board URL**: https://www.notion.so/31d226cee45880ce9636d632db29e1e2
- **Database ID**: `31d226ce-e458-80ce-9636-d632db29e1e2`

## Local Index
Always read `.claude/gsd-index.json` FIRST. It is the source of truth for:
- Duplicate prevention (check before calling `add`)
- Notion page IDs (needed for updates — no API read required)
- Current status/progress

## Schema
```
Feature      — title (required)
Status       — TBD | Pending | In Progress | Blocked | Done
             NOTE: Notion's Status field uses "Done" (not "Usable") for completed items.
             "Usable" is not a valid status in this board — use "Done" for 100% complete.
Progress     — 0% | 25% | 50% | 75% | 80% | 100%
Priority     — Critical | High | Medium | Low
Category     — Marketing Tools | Ads | Analytics | GTM | Hosting | Content | AI Features | CRM | Personal | Other
Notes        — text (context, file paths, what "done" means)
Blocking Issue — text (only when Status = Blocked)
Size         — Small | Medium | Large
```

## Operations

### STATUS (no API call — local only)
```bash
npx tsx .claude/tools/notion-gsd.ts status
```
Prints items grouped by status. Always start here for a board overview.

### ADD a new item
1. Read `.claude/gsd-index.json` and check items array for a name match (case-insensitive, fuzzy ok)
2. If found → say "Already in board as [Feature] ([Status])" and stop
3. If not found:
```bash
npx tsx .claude/tools/notion-gsd.ts add "Feature Name" \
  --status "Pending" \
  --category "GTM" \
  --priority "High" \
  --progress "0%"
```
The script appends the new item to the local index automatically.

**Category logic:**
- Personal life tasks, habits, health → `Personal`
- Code tasks, refactors, tests → appropriate technical category
- Product features → most relevant category
- When unsure → ask before creating

### UPDATE an existing item
Find the item name in the local index first (fuzzy match ok), then:
```bash
npx tsx .claude/tools/notion-gsd.ts update "Feature Name" --status "In Progress" --progress "50%"
```

Common patterns:
- "mark X done" → `--status "Done" --progress "100%"`
- "X is in progress" → `--status "In Progress"`
- "X is blocked on Y" → `--status "Blocked" --blocking "Y"`
- "X is 50% done" → `--progress "50%"`

The script updates the local index automatically.

### SYNC (rebuild index from Notion)
Use when the user has edited Notion directly and the index may be stale:
```bash
npx tsx .claude/tools/notion-gsd.ts sync
```
Queries all pages from the database and rewrites the local index. Reports item count before and after.

## Personal Tasks
Personal items use `--category "Personal"`. Same board, filterable via Notion's "By Category" view. Use simpler notes — no file paths needed.

## Never
- Call the Notion API to check for duplicates — use the local index
- Create an item without the index being updated (the script handles this automatically)
- Run sync unnecessarily — only when Notion was edited directly in the browser
