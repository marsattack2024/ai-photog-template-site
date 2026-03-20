# Bug Investigation: Call Review List Showing "Unknown" for prospect_name

## Summary

Every reviewed call is displaying "Unknown" as the prospect name in the list, even when the transcript contains the caller's actual name. The bug is a two-part interaction between the `normalize()` function in `grading-prompt.ts` and the save logic in `grade-review.ts`.

---

## Investigation — Data Flow Trace

### Step 1: Rendering (UI)

**File:** `src/components/call-reviews/CallReviewsTab.tsx` (lines 604–612)

```tsx
{review.prospect_name ? (
  <span className="block truncate text-body font-medium text-[var(--color-text-primary)]">
    {review.prospect_name}
  </span>
) : (
  <span className="block truncate text-body italic text-[var(--color-text-placeholder)]">
    {review.caller_phone ?? "Unknown Caller"}
  </span>
)}
```

The UI checks `review.prospect_name` as a truthy value. If it's truthy, it renders the name. If falsy (null, empty string), it falls back to the phone number. This logic is correct.

### Step 2: API Query

**File:** `src/app/api/call-reviews/reviews/route.ts` (lines 78–81)

```ts
.select(
  "id, call_sid, ... prospect_name, prospect_type, outcome, score_tier, ai_flagged, call_source",
  { count: "exact" },
)
```

`prospect_name` is explicitly included in the SELECT. This is correct — the field is being fetched from the database.

### Step 3: Database Write — The Bug

**File:** `src/lib/call-reviews/grade-review.ts` (line 113)

```ts
prospect_name: grade.prospect_name || null,
```

The save guard `|| null` is intended to convert "no name found" into a proper `null` so the UI can fall back to the phone number. But this only works if `grade.prospect_name` is a falsy value (empty string, null, undefined). The problem is what `grade.prospect_name` actually contains at this point.

### Step 4: The normalize() Function — Root Cause

**File:** `src/lib/call-reviews/grading-prompt.ts` (lines 96–110)

```ts
const normalize = (parsed: CallGradeOutput): CallGradeOutput => ({
  ...parsed,
  prospect_name: parsed.prospect_name || "Unknown",  // <-- BUG HERE
  prospect_type: parsed.prospect_type || "Unknown",
  outcome: parsed.outcome || "Unknown",
  ...
});
```

The `normalize()` function is called on every successfully parsed JSON response from Claude. It converts any falsy `prospect_name` (empty string, null, undefined) to the literal string `"Unknown"`.

This means `grade.prospect_name` is **always** either a real name like `"Sarah Mitchell"` OR the literal string `"Unknown"` — it is **never** null, undefined, or an empty string after normalization.

Back in `grade-review.ts`, the guard:
```ts
prospect_name: grade.prospect_name || null,
```
...evaluates `"Unknown" || null` — since `"Unknown"` is a truthy non-empty string, the `|| null` branch is never taken. The literal string `"Unknown"` is written directly to the database.

### Step 5: System Prompt Compounding the Problem

**File:** `src/lib/call-reviews/grading-prompt.ts` (line 34)

```
"prospect_name": "First Last (extract from transcript, or 'Unknown' if not mentioned)",
```

Claude is explicitly instructed to output the string `"Unknown"` when the name is not in the transcript. Combined with the `normalize()` function's fallback also being `"Unknown"`, the string `"Unknown"` propagates through the entire pipeline and lands in the database as a real value — not null — for every call where the prospect's name is not spoken on the transcript.

---

## Root Cause

There are two cooperating defects:

1. **`grading-prompt.ts` `normalize()` (line 98):** Converts missing prospect names to the string `"Unknown"` rather than leaving them as `null` or empty string. A sentinel string is indistinguishable from a real name in the downstream save guard.

2. **`grade-review.ts` save guard (line 113):** Uses `grade.prospect_name || null` expecting that an absent name would be falsy. But after `normalize()`, it is always truthy — the `|| null` conversion never fires.

The system prompt instruction (line 34 of `grading-prompt.ts`) telling Claude to output `"Unknown"` is a secondary amplifier: even without the `normalize()` fallback, Claude itself may output the string `"Unknown"` for calls where the name is not mentioned, causing the same persistence problem via the same save guard.

---

## Why This "Just Started Happening"

The most likely explanation is that this was always broken for calls where the prospect's name was not mentioned in the transcript (Claude outputs `"Unknown"` per the system prompt instruction, `normalize()` passes it through, `|| null` fails to catch it). The bug became visible once the seed/test data was replaced or supplemented with real calls where names are not spoken — or once the user noticed the pattern. For the seed calls where names ARE in the transcript (e.g. "Sarah Mitchell"), Claude correctly extracts the real name, `normalize()` preserves it, and it displays fine. So the bug presents selectively based on call content.

---

## Proposed Fix

### Fix 1: `grading-prompt.ts` — Remove the sentinel string fallback in `normalize()`

Change line 98 from:
```ts
prospect_name: parsed.prospect_name || "Unknown",
```
to:
```ts
prospect_name: parsed.prospect_name || null,
```

And make the same change for `prospect_type` and `outcome` on lines 99–100 if they are subject to the same render logic (though those fields currently show `—` when falsy, not "Unknown", so the user-visible impact is lower).

This ensures that when Claude returns an empty or missing `prospect_name`, `normalize()` sets it to `null` instead of `"Unknown"`. The `grade-review.ts` save guard `grade.prospect_name || null` then correctly writes `null` to the database.

### Fix 2: `grading-prompt.ts` — Change the system prompt instruction

Change line 34 from:
```
"prospect_name": "First Last (extract from transcript, or 'Unknown' if not mentioned)",
```
to:
```
"prospect_name": "First Last extracted from transcript, or empty string \"\" if not mentioned",
```

This eliminates the source of the sentinel string from Claude itself. An empty string `""` is falsy in JavaScript, so `grade.prospect_name || null` (in `grade-review.ts`) correctly converts it to `null` even without Fix 1.

Both fixes together are belt-and-suspenders: Fix 2 prevents Claude from outputting the sentinel, Fix 1 prevents `normalize()` from introducing it independently.

### Fix 3 (Optional, defensive): `grade-review.ts` — Explicit sentinel check

As an additional safety net, the save line could be made sentinel-aware:
```ts
prospect_name: (grade.prospect_name && grade.prospect_name !== "Unknown") ? grade.prospect_name : null,
```

However, this is a code smell — it encodes domain knowledge about the sentinel string in the wrong layer. Fixes 1 and 2 are cleaner and correct the problem at the source.

---

## Files Involved

| File | Location | Problem |
|---|---|---|
| `src/lib/call-reviews/grading-prompt.ts` | Line 34 | System prompt tells Claude to output `"Unknown"` string |
| `src/lib/call-reviews/grading-prompt.ts` | Line 98 | `normalize()` converts missing name to `"Unknown"` string (truthy) |
| `src/lib/call-reviews/grade-review.ts` | Line 113 | `|| null` guard never fires because `"Unknown"` is truthy |

The UI (`CallReviewsTab.tsx`) and API route (`reviews/route.ts`) are both correct — they are faithfully displaying and fetching whatever is in the database. The bug lives entirely in the grading pipeline.
