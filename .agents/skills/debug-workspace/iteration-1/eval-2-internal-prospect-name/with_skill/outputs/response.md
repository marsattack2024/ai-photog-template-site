# Debug Session: "Unknown" showing for prospect_name in call review list

**Pipeline announced:** Using /debug: Reproduce → Classify → [Research Gate if external] → Root Cause → Fix → Verify → Lessons.

---

## Step 0: Reproduce & Collect Evidence

**Input parsed:** Vague description with no stack trace or error message. The bug is a data display issue — UI shows "Unknown" for `prospect_name` on every row in the call review list, even for calls where the name is visible in the database.

**Nature of the bug:** UI glitch / incorrect data display. Not a compile error or test failure. The component renders, but with wrong data.

**Evidence collection:**
- Read `src/components/call-reviews/CallReviewsTab.tsx` — list view component
- Read `src/app/api/call-reviews/reviews/route.ts` — list API route
- Read `src/lib/call-reviews/grading-prompt.ts` — prompt builder + output parser
- Read `src/lib/call-reviews/grade-review.ts` — grading + save function
- Read `src/lib/call-reviews/types.ts` — TypeScript interfaces
- Read `src/types/database.ts` — Supabase generated types (confirms `prospect_name: string | null` is in schema)
- Ran `git log` on call-reviews files, diff between main and current branch (`fix/style-call-reviews`)
- Ran `git diff main..HEAD` on call-reviews files — confirmed both main and this branch share identical display logic and API SELECT

**Consistent or intermittent:** Consistent — affects every row in the list.

---

## Step 1: Classify the Bug

**Classification: INTERNAL** — the bug is entirely within `src/` files. No npm package errors, no HTTP errors from third-party services. The stack trace (conceptually) points into `src/lib/call-reviews/grading-prompt.ts` and the interaction between the grading pipeline and the UI display component.

Research Gate: **does not fire** (INTERNAL classification).

---

## Step 3: Root Cause Analysis

### Data flow trace (write path — where `prospect_name` is set in the DB)

**Step 1: Grading prompt instructs Claude to return "Unknown" as a string**

File: `/Users/Humberto/Documents/GitHub/002. p2p ads generator/Claude-Dev-Environment/src/lib/call-reviews/grading-prompt.ts`, line 34:

```js
"prospect_name": "First Last (extract from transcript, or 'Unknown' if not mentioned)",
```

The prompt explicitly tells Claude to put the string `"Unknown"` in the JSON when no name is mentioned. This means Claude returns valid JSON with `"prospect_name": "Unknown"`.

**Step 2: `normalize()` passes "Unknown" through without converting to null**

File: `/Users/Humberto/Documents/GitHub/002. p2p ads generator/Claude-Dev-Environment/src/lib/call-reviews/grading-prompt.ts`, line 98:

```js
const normalize = (parsed: CallGradeOutput): CallGradeOutput => ({
  ...parsed,
  prospect_name: parsed.prospect_name || "Unknown",  // ← "Unknown" || "Unknown" = "Unknown"
```

When `parsed.prospect_name` is `"Unknown"` (a truthy string), the `|| "Unknown"` guard is a no-op. The string `"Unknown"` passes through unchanged.

**Step 3: `grade-review.ts` save guard cannot coerce "Unknown" to null**

File: `/Users/Humberto/Documents/GitHub/002. p2p ads generator/Claude-Dev-Environment/src/lib/call-reviews/grade-review.ts`, line 113:

```js
prospect_name: grade.prospect_name || null,
```

`"Unknown" || null` evaluates to `"Unknown"` because `"Unknown"` is truthy. The string `"Unknown"` is stored in the database instead of `null`.

**Consequence:** The DB `prospect_name` column contains the string `"Unknown"` for calls where no name was found in the transcript.

### Data flow trace (display path — why "Unknown" shows in the list)

File: `/Users/Humberto/Documents/GitHub/002. p2p ads generator/Claude-Dev-Environment/src/components/call-reviews/CallReviewsTab.tsx`, lines 604–611:

```jsx
{review.prospect_name ? (
  <span className="block truncate text-body font-medium text-[var(--color-text-primary)]">
    {review.prospect_name}            {/* ← renders the literal string "Unknown" */}
  </span>
) : (
  <span className="block truncate text-body italic text-[var(--color-text-placeholder)]">
    {review.caller_phone ?? "Unknown Caller"}   {/* ← never reached */}
  </span>
)}
```

Because `review.prospect_name` is `"Unknown"` (a truthy string, NOT null or undefined), the truthy branch is taken and the text "Unknown" is rendered as a real name — in non-italic primary text weight, not the fallback italic placeholder style. The phone number fallback is never reached.

### Why the user sees "the name in the database"

The `prospect_name` column in Supabase does contain the string `"Unknown"` — which IS a value in the database. The user may be interpreting the presence of any value (including the literal string "Unknown") as the name being "in the database." Alternatively, if there are seed rows that have real names (e.g., "Sarah Mitchell" from the seed data described in MEMORY.md), those rows correctly show the real name. But any call that was graded after the `7265a4f` commit (March 5) where Claude didn't detect a name will have `prospect_name = "Unknown"` and display "Unknown" instead of falling back to the phone number.

### When did this start?

The `normalize` function was introduced in commit `7265a4f` (March 5, "feat: add public privacy policy page at /privacy" — which also included the full call-reviews enhancement). Before this commit, `parseGradeOutput` had no `normalize` step — if Claude's response lacked `prospect_name` (which it would, because the old prompt didn't ask for it), `prospect_name` would be `undefined`, which is falsy, and the DB save `grade.prospect_name || null` would correctly store `null`. The display would then fall back to the phone number.

After `7265a4f`, the prompt was updated to explicitly request `prospect_name` and the `normalize` function was added — but the normalize function writes the sentinel string `"Unknown"` to the DB rather than `null`, breaking the falsy-check fallback in the display component.

### Root cause

```
Root cause: The normalize() function in parseGradeOutput stores the sentinel string
"Unknown" in the DB when Claude finds no name, but the display component checks
for truthiness — and "Unknown" is truthy — so the phone number fallback is never
reached, and the literal word "Unknown" renders as the caller's name.
```

The bug is a **contract mismatch** between:
1. The **grading layer** (`grading-prompt.ts` + `grade-review.ts`): uses string sentinel "Unknown" to represent "name not found"
2. The **display layer** (`CallReviewsTab.tsx`): uses null/undefined falsy check to decide whether to show name or phone fallback

---

## Step 4: Fix (Blast Radius Check)

### Blast radius

```
Files that import from grading-prompt.ts:
  src/lib/call-reviews/grade-review.ts (1 consumer)

Files that import from grade-review.ts:
  src/app/api/call-reviews/upload/route.ts
  src/lib/call-reviews/process-call.ts  (→ reanalyze route calls this)
```

**2 files affected for Option A (fix at write path). 1 file affected for Option B (fix at display path).**

Both options are low blast radius fixes.

---

### Proposed Fix

**Attempt 1/3: Fix at the write path — the root cause location**

There are two places that need to be corrected together:

**Fix A: Change `grading-prompt.ts` — `normalize()` should use `null` not `"Unknown"` as the "not found" sentinel**

File: `/Users/Humberto/Documents/GitHub/002. p2p ads generator/Claude-Dev-Environment/src/lib/call-reviews/grading-prompt.ts`

Change:
```js
const normalize = (parsed: CallGradeOutput): CallGradeOutput => ({
  ...parsed,
  prospect_name: parsed.prospect_name || "Unknown",
  prospect_type: parsed.prospect_type || "Unknown",
  outcome: parsed.outcome || "Unknown",
```

To:
```js
const normalize = (parsed: CallGradeOutput): CallGradeOutput => ({
  ...parsed,
  prospect_name: parsed.prospect_name === "Unknown" || !parsed.prospect_name ? null : parsed.prospect_name,
  prospect_type: parsed.prospect_type === "Unknown" || !parsed.prospect_type ? null : parsed.prospect_type,
  outcome: parsed.outcome === "Unknown" || !parsed.outcome ? null : parsed.outcome,
```

Rationale: Claude is instructed to return the string "Unknown" when the field is not found. The normalize function should recognize this sentinel value AND convert it to null. Returning null allows the `|| null` guard in `grade-review.ts` to work correctly (it already does this correctly — the problem is `normalize` never produces null). The display component already handles null correctly with its falsy check.

**Fix B: Update `CallGradeOutput` type in `types.ts` to reflect nullable fields**

File: `/Users/Humberto/Documents/GitHub/002. p2p ads generator/Claude-Dev-Environment/src/lib/call-reviews/types.ts`

Change the interface to reflect that `prospect_name`, `prospect_type`, and `outcome` can be null after normalization:

```ts
export interface CallGradeOutput {
  prospect_name: string | null;   // null when not found in transcript
  prospect_type: string | null;
  outcome: string | null;
  ...
}
```

This ensures TypeScript won't complain about passing `null` for these fields after Fix A.

**Bonus: Update the prompt to avoid ambiguity**

The prompt currently says `or 'Unknown' if not mentioned`. This could be changed to simply not include the sentinel guidance, or to use `null` semantics. But the actual fix is in `normalize()` — the prompt instruction is just context; what matters is how the output is parsed.

**Alternative simpler fix (Option B — fix at display layer only)**

If changing the grading path is considered too risky, the display component could be updated to treat "Unknown" as falsy:

File: `src/components/call-reviews/CallReviewsTab.tsx`, line 604:

Change:
```jsx
{review.prospect_name ? (
```
To:
```jsx
{review.prospect_name && review.prospect_name !== "Unknown" ? (
```

This treats the string "Unknown" as a fallback indicator in the display, so the phone number is shown instead. **However, this is treating a symptom rather than the root cause** — "Unknown" would still be stored in the DB, and the detail view at `CallReviewDetail.tsx` line 346 would still render `review.prospect_name || "Unknown Prospect"` which would show "Unknown" (not "Unknown Prospect") because `"Unknown"` is truthy.

**Recommended approach:** Fix A + Fix B (write path fix). This is the cleaner fix because:
1. It stores the correct semantic value (`null` = name unknown) instead of a display-layer sentinel
2. It fixes ALL views simultaneously (list + detail)
3. It correctly enables the phone number fallback in the list
4. It correctly enables the "Unknown Prospect" fallback in the detail view

**Summary of changes for Fix A + B:**

1. `src/lib/call-reviews/grading-prompt.ts` — `normalize()` function: convert `"Unknown"` sentinel and falsy values to `null` for `prospect_name`, `prospect_type`, `outcome`
2. `src/lib/call-reviews/types.ts` — `CallGradeOutput` interface: change `prospect_name`, `prospect_type`, `outcome` from `string` to `string | null`

Blast radius: 2 files touched. The only consumer of `parseGradeOutput` is `grade-review.ts`, which already handles null correctly at line 113 (`grade.prospect_name || null`). No other files need changes.

---

## Step 5: Verify Fix

After applying the fix:

1. Run `npx tsc --noEmit` — verify no type errors from the `string | null` change
2. Run `npx vitest run` — check for test regressions (check `src/lib/call-reviews/__tests__/`)
3. Manual verification: submit a test transcript where the caller's name is NOT mentioned → check DB row has `prospect_name = null` (not "Unknown") → check list shows phone number in italic placeholder style
4. Manual verification: submit a test transcript where the caller IS identified → check DB row has `prospect_name = "Sarah Mitchell"` → check list shows name in bold primary style
5. Run `/ui-check post:src/components/call-reviews/CallReviewsTab.tsx` — no UI token changes were made, but confirm no violations were introduced

---

## Step 6: Lessons Capture

**Root cause class:** Contract mismatch between a "sentinel string" used as a "not found" indicator in one layer and a falsy/null check used in the display layer to choose between two rendering paths.

**Prevention rule to add to `tasks/lessons.md`:**

> When a prompt instructs the LLM to return a sentinel string (like "Unknown", "N/A", "None") instead of a real value, the normalization/parsing layer must convert that sentinel to `null` before writing to the DB. Storing sentinel strings in the DB breaks any component that uses a falsy check to decide whether to show a fallback. Rule: LLM sentinel strings must never reach the DB. Normalize at the parser, not at the UI.

**Pattern to watch for:** Any `normalize()` function that maps a falsy value to a non-null string sentinel (`|| "Unknown"`, `|| "N/A"`) when the DB column is nullable. The correct pattern is `parsed.fieldName === "Unknown" || !parsed.fieldName ? null : parsed.fieldName`.
