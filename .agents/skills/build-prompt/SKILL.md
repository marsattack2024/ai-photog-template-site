---
name: build-prompt
description: Use when creating a new generation route or prompt file that calls Codex to produce structured output. Covers system prompt layering, user prompt tier ordering, JSON parsing fallback, guardrails pipeline, streaming, logging, and max_tokens sizing.
---

# Build Prompt

Reference for building Codex generation prompts in this codebase. Every generation route follows the same skeleton.

## System Prompt Layer Order

```
Layer 0: GUARDRAIL_PROMPT           — src/lib/prompts/guardrails.ts (always first)
Layer 1: Strategy / Domain Rules    — universal psychology or domain-specific rules
Layer 2: Genre Psychology           — buyer psychology per genre (boudoir, maternity, newborn)
Layer 3: Format / Placement Rules   — output schema, char limits, field definitions (highest priority)
```

Layers are joined with `\n\n`. Last layer wins on conflict.

For **standalone generators** (creatives, LP, emails) that don't reuse the three-layer ad architecture: hardcode all layers in one file but keep the same priority order (guardrails first, format rules last).

Append knowledge base sections after Layer 3 when available:

```ts
const knowledgeSections = [orgKnowledgeSection, projectKnowledgeSection]
  .filter(Boolean)
  .join("\n\n");
const fullSystemPrompt = knowledgeSections
  ? `${systemPrompt}\n\n${knowledgeSections}`
  : systemPrompt;
```

## User Prompt Tier Order

```
Tier 1   (highest): Generation Notes — user's per-request instructions
Tier 1.5:           Brand Rules      — standing overrides via buildBrandRulesSection()
Tier 2:             Brand Context    — user-curated background
Tier 3   (lowest):  Website Intel    — auto-extracted via buildWebsiteIntelSection()
```

User prompt contains ONLY per-request context. Reusable rules live in the system prompt.

## Route Skeleton (7 phases)

```
1. Guardrails   — runInputGuardrails() + rate limit check
2. DB Fetch     — project, photos, existing content (capture dbMs)
3. Prompt Build — system + user prompts (capture promptMs)
4. LLM Call     — messages.stream().finalMessage() (capture llmMs)
5. Parse        — JSON extraction + fallback chain
6. Output Guard — runOutputGuardrails() on raw text
7. DB Save      — insert/update + status (capture saveMs)
```

Log with `step:N/M` tags. Log completion with `timing: { dbMs, promptMs, llmMs, saveMs }`.

## JSON Parsing Fallback Chain

```ts
// 1. Extract outermost JSON container
const firstBracket = rawText.indexOf("[");
const firstBrace = rawText.indexOf("{");
// Pick whichever appears first to determine array vs object response

// 2. Direct parse
try {
  parsed = JSON.parse(jsonStr);
} catch {
  // 3. jsonrepair (handles trailing commas, unescaped quotes, literal newlines)
  try {
    parsed = JSON.parse(jsonrepair(jsonStr));
  } catch {
    // 4. (Optional) Codex extraction fallback for prose-heavy models
    // Log error with position-targeted diagnostics
  }
}
```

## Streaming (mandatory for >30s generations)

```ts
const stream = ai.messages.stream({
  model,
  max_tokens,
  system: fullSystemPrompt,
  messages: [{ role: "user", content: userPrompt }],
});
const message = await stream.finalMessage();
```

Never use `messages.create()` for generation routes — SDK times out at 10 minutes.

## max_tokens by Output Type

| Route              | Model  | max_tokens |
| ------------------ | ------ | ---------- |
| Ad copy (campaign) | Sonnet | 32000      |
| Creatives (layout) | Sonnet | 6000       |
| Quiz               | Sonnet | 4096       |
| Email sequence     | Opus   | 12000      |
| Landing page       | Opus   | 128000     |
| Dream 100 messages | Sonnet | 4096       |

Set based on actual output length + headroom. Too low = silent truncation.

## Guardrails Pipeline

```ts
import {
  runInputGuardrails,
  runOutputGuardrails,
  INPUT_REFUSAL_MESSAGE,
  RATE_LIMIT_MESSAGE,
} from "@/lib/guardrails";

// Before LLM call — BOTH results must be destructured AND checked (lesson #26):
const { inputResult, rateLimitResult } = await runInputGuardrails(
  { field1, field2 }, // all user-provided text fields
  user.id,
  "route-name",
);
if (inputResult.verdict === "block")
  return apiError(INPUT_REFUSAL_MESSAGE, 400);
if (!rateLimitResult.allowed) return apiError(RATE_LIMIT_MESSAGE, 429);

// After LLM response:
const outputCheck = runOutputGuardrails(textContent.text);
```

## Logging Contract

```ts
const log = createRouteLogger("route-name");

log("info", "step:1/N", "Description", { key: value });
log("info", "llm:done", "Complete", {
  inputTokens,
  outputTokens,
  elapsedMs,
  tokensPerSec: Math.round((outputTokens / (elapsedMs / 1000)) * 10) / 10,
});
log("info", "complete", "Done", {
  totalElapsedMs: Date.now() - startTime,
  timing: { dbMs, promptMs, llmMs, saveMs },
});
```

## Usage Tracking

Fire-and-forget after every LLM call:

```ts
void logUsage({
  projectId,
  userId: user.id,
  route: "route-name",
  model,
  inputTokens: message.usage.input_tokens,
  outputTokens: message.usage.output_tokens,
});
```

## Checklist

- [ ] Guardrails Layer 0 present in system prompt (or standalone equivalent)
- [ ] `runInputGuardrails()` called AND both `inputResult` + `rateLimitResult` checked (not just destructured)
- [ ] Output passed through `runOutputGuardrails()`
- [ ] Streaming via `messages.stream().finalMessage()`
- [ ] JSON parse → jsonrepair fallback
- [ ] `void logUsage()` after LLM call
- [ ] All 8 canonical log events (`request`, `db:read`, `prompt`, `llm:start`, `llm:done`, `parse`, `db:write`, `complete`) with per-phase `timing:` in `complete`
- [ ] max_tokens matches expected output size
- [ ] `as unknown as Json` cast for jsonb columns
- [ ] Error paths update DB status to "failed"
