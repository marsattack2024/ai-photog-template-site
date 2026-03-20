---
name: test-generate
description: Test the ad generation pipeline end-to-end. Hits the API, verifies JSON parsing, checks card rendering data, and reports results.
user-invocable: true
allowed-tools: Read, Bash, Glob, Grep, WebFetch
argument-hint: <placement> [genre] — e.g. "static_ad", "carousel", "google_ads boudoir"
---

# Test Ad Generation Pipeline

Runs an end-to-end test of the generation API for the specified placement.

**Arguments**: $ARGUMENTS
- First arg: placement (`static_ad`, `carousel`, `google_ads`)
- Second arg (optional): genre (default: `boudoir`)

## Prerequisites
- Run `npx vitest run` first — all tests must pass before E2E testing (currently 1828+)
- Dev server must be running (`npm run dev`)
- `.env.local` must have valid `ANTHROPIC_API_KEY` and `PERPLEXITY_API_KEY`
- At least one project must exist in Supabase

## Process

### Step 1: Find a test project
```bash
# Get the first project from Supabase via the app
curl -s http://localhost:3000/api/generate -X POST \
  -H "Content-Type: application/json" \
  -d '{"projectId":"TEST","type":"static_ad"}' 2>&1 | head -5
```
If no projects exist, tell the user to create one first via the UI.

Actually, query Supabase directly to find a project ID:
```bash
cd "$CLAUDE_PROJECT_DIR"
node -e "
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
db.from('projects').select('id, name').limit(1).single().then(({data, error}) => {
  if (error) { console.error('No projects found:', error.message); process.exit(1); }
  console.log(JSON.stringify(data));
});
"
```

### Step 2: Call the generation API
Use the project ID from Step 1. Call `POST /api/generate` with the specified placement and genre.

```bash
curl -s -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "<PROJECT_ID>",
    "type": "<PLACEMENT>",
    "genre": "<GENRE>",
    "notes": "Test generation — short output preferred for speed"
  }'
```

Set a timeout of 120 seconds (Opus can be slow).

### Step 3: Validate the response
Check:
- [ ] **HTTP 200**: Response status is 200
- [ ] **Has generation**: `response.generation` exists with `status: "complete"`
- [ ] **Has items**: `response.items` is a non-empty array
- [ ] **Items have metadata**: Each item has a `metadata` object

For each placement type, validate the metadata structure:

**static_ad**:
- [ ] `metadata.type === "static"`
- [ ] `metadata.headlines` is array of 5 strings
- [ ] `metadata.primaryTexts` is array of 5 strings
- [ ] `metadata.descriptions` is array of 5 strings
- [ ] `metadata.groupName` is a non-empty string

**carousel**:
- [ ] `metadata.type === "carousel"`
- [ ] `metadata.primaryTexts` is array of 3 strings
- [ ] `metadata.slides` is array of 12 objects (prompt generates 12 by design; user picks best subset)
- [ ] Each slide has `headline`, `description`, `imageNote`

**google_ads**:
- [ ] `metadata.type === "google_ads"`
- [ ] `metadata.headlines` is array of 15 strings
- [ ] `metadata.descriptions` is array of 4 strings
- [ ] `metadata.keywords` is array of 10 strings
- [ ] `metadata.callouts` is array of 6 strings
- [ ] All headlines are <= 30 characters
- [ ] All descriptions are <= 90 characters
- [ ] All callouts are <= 25 characters

### Step 4: Check prompt composition
Read the server logs to verify:
- System prompt length is logged
- No contradicting platform rules appear
- For google_ads: system prompt should be shorter (no FB format rules)
- For boudoir: Bible content should be included
- For non-boudoir: Bible content should NOT be included

### Step 5: Check database
Verify the generation and items were saved to Supabase:
```bash
node -e "
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
db.from('generations').select('id, type, status, created_at').order('created_at', { ascending: false }).limit(1).single()
  .then(({data}) => console.log('Latest generation:', JSON.stringify(data, null, 2)));
"
```

## Output Report

```
=== AD GENERATION TEST REPORT ===
Placement: [static_ad|carousel|google_ads]
Genre: [boudoir|...]
Project: [name] ([id])

API RESPONSE:
  [PASS|FAIL] HTTP Status: 200
  [PASS|FAIL] Generation status: complete
  [PASS|FAIL] Items returned: [count]

METADATA VALIDATION:
  [PASS|FAIL] Type field correct
  [PASS|FAIL] Headlines: [count] (expected [N])
  [PASS|FAIL] Primary Texts / Descriptions: [count]
  [PASS|FAIL] Character limits respected
  [details of any violations]

PROMPT COMPOSITION:
  System prompt: [length] chars
  User prompt: [length] chars
  [PASS|FAIL] No contradicting platform rules

DATABASE:
  [PASS|FAIL] Generation saved with status: complete
  [PASS|FAIL] Items saved: [count]

SAMPLE OUTPUT:
  Group: [first group name]
  Headline: [first headline]
  Primary Text preview: [first 100 chars of first primary text]

RESULT: [ALL PASS | X FAILURES]
```

If any checks fail, provide specific details on what went wrong and suggest fixes.
