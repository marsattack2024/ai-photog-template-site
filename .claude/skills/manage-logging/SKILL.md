---
name: manage-logging
description: Manage structured Pino logging — add logging to new routes, audit existing routes for logging compliance, check log output, debug production logs. Use when adding API routes, debugging log issues, or checking logging standards.
user-invocable: true
allowed-tools: Read, Edit, Write, Bash, Glob, Grep, Task
argument-hint: <action> — e.g. "add-to-route", "audit", "check-output", "debug"
---

# Manage Structured Logging

Action: $ARGUMENTS

## Architecture Reference

This project uses Pino for structured JSON logging, verified against Pino docs and Vercel best practices on 2026-03-02.

### Key Files
| File | Purpose |
|------|---------|
| `src/lib/logger.ts` | Logger factory — `createRouteLogger()` (Node.js) + `createMiddlewareLogger()` (Edge Runtime) |
| `docs/logging-standards.md` | Full logging specification — 8 required events, timing, security rules |

### Two Logger Types
- **`createRouteLogger(name)`** — For API routes (Node.js runtime). Uses Pino with JSON output in prod, pino-pretty in dev.
- **`createMiddlewareLogger(name, ctx)`** — For middleware (Edge Runtime). Uses structured `console` output since Pino's fast-redact uses `vm` module which Edge doesn't support.

### Package Placement (Verified)
- `pino` → `dependencies` (needed in production)
- `pino-pretty` → `devDependencies` (dev-only, stripped in Vercel builds)

### PII Redaction (Automatic)
Pino redact paths cover: `req.headers.authorization`, `req.headers.cookie`, `apiKey`, `serviceKey`, `prospect.email`, `prospect.phone`, `prospect.contact_name`, `*.apiKey`, `*.serviceKey`

---

## Actions

### add-to-route
Add structured logging to a new API route:

1. Import the logger at the top of the route file:
   ```typescript
   import { createRouteLogger, truncate } from "@/lib/logger";
   ```

2. Create the route logger inside the handler:
   ```typescript
   const log = createRouteLogger("route-name");
   ```

3. Add the 8 required logging events (per `docs/logging-standards.md`):

   | Event | When | Level | Required Data |
   |-------|------|-------|---------------|
   | `request` | Handler entry | info | All input params (IDs, type, flags) |
   | `db:read` | After loading context | info | Presence flags (hasUrl, hasIntel, etc.) |
   | `prompt` | After building prompt | info | `truncate(systemPrompt)`, `truncate(userPrompt)` |
   | `llm:start` | Before Claude call | info | `model`, `max_tokens` |
   | `llm:done` | After Claude response | info | `inputTokens`, `outputTokens`, `elapsedMs`, `tokensPerSec` |
   | `parse` | After parsing output | info | Item count, validation result |
   | `db:write` | After saving to DB | info | Row count, IDs |
   | `complete` | Handler end | info | Total timing breakdown: `{ dbMs, promptMs, llmMs, saveMs, totalMs }` |

4. Add per-phase timing:
   ```typescript
   const dbStart = Date.now();
   // ... db operations ...
   const dbMs = Date.now() - dbStart;
   ```

5. Add error logging in catch block — use the phase that failed as the context, not a generic name:
   ```typescript
   catch (err) {
     // Use the phase context: "llm:error", "db:read", "parse", etc.
     // "unhandled" for catch-all outer try/catch
     log("error", "llm:error", "Generation failed", {
       error: err instanceof Error ? err.message : String(err),
     });
     return Response.json({ error: "Internal server error" }, { status: 500 });
   }
   ```

### audit
Check all API routes AND lib files for logging compliance:

1. Find all route files:
   ```bash
   find src/app/api -name "route.ts" -type f
   ```

2. For each LLM route, verify all 8 canonical events are present:
   - [ ] Imports `createRouteLogger` (not raw `console.log`)
   - [ ] `"request"` — handler entry with key params
   - [ ] `"db:read"` — after loading from DB
   - [ ] `"prompt"` — after building prompts (use `truncate()`)
   - [ ] `"llm:start"` — before Claude call (model, maxTokens)
   - [ ] `"llm:done"` — after response (inputTokens, outputTokens, elapsedMs)
   - [ ] `"parse"` — after parsing output
   - [ ] `"db:write"` — after saving to DB
   - [ ] `"complete"` — timing breakdown `{ dbMs, promptMs, llmMs, saveMs, totalMs }`
   - [ ] Uses `truncate()` for long strings (prompts, error bodies)
   - [ ] Does NOT log full prompts, full outputs, API keys, or user PII

3. **Check for non-canonical event names** (the most common violation):
   ```bash
   grep -rn '"step[0-9]\|"step:\|"bg:\|perplexity:\|"ai:' src/app/api/ --include="*.ts"
   ```
   Any hits are violations. Event names MUST be one of the 8 canonical names. For multi-LLM routes, distinguish calls with `{ provider: "perplexity", step: 2 }` data fields. For background pipelines, use `{ context: "background" }` data fields. NEVER prefix the event name itself.

4. Check for stale `console.log` calls in routes AND lib:
   ```bash
   grep -rn "console\.\(log\|error\|warn\)" src/app/api/ --include="*.ts"
   grep -rn "console\.\(log\|error\|warn\)" src/lib/ --include="*.ts"
   ```
   Any hits in routes are violations. Lib hits may be in comments/strings — verify before flagging.

5. **Audit lib files that make external HTTP calls**:
   ```bash
   grep -rln "fetch\|axios" src/lib/ --include="*.ts"
   ```
   Any lib file making external HTTP calls without `createRouteLogger` is a gap. Complex async pipelines (polling loops, sync/async fallback strategies) need logging passed from the caller or created internally.

6. Check middleware uses correct logger:
   ```bash
   grep -n "createMiddlewareLogger\|createRouteLogger" src/middleware.ts src/lib/supabase/middleware.ts
   ```
   Both must use `createMiddlewareLogger` (NOT `createRouteLogger`).

### check-output
View log output in development:

1. Start dev server: `npm run dev`
2. Trigger a generation or API call
3. Logs appear in terminal with pino-pretty formatting
4. To see raw JSON (production format): `LOG_LEVEL=debug NODE_ENV=production npm run dev`
5. Filter by route: look for `"route":"generate"` or `"route":"scrape"` in output

### debug
Debug logging issues:

**Logs not appearing?**
- Check `LOG_LEVEL` env var — default is `info`, set to `debug` for verbose output
- Check the route imports `createRouteLogger` and calls it
- In Edge middleware: logs go through `console` not Pino — check browser network for `x-request-id` header

**PII leaking in logs?**
- Check redact paths in `src/lib/logger.ts` lines 8-19
- Add new paths to the `redact` array for any new sensitive fields
- Test: log an object with sensitive field, verify it shows `[Redacted]`

**Logs too verbose in production?**
- Set `LOG_LEVEL=warn` in Vercel env vars (suppresses info and debug)
- Generation routes log at `info` — only errors and warnings will show

**Vercel Log Drains not capturing?**
- Verify Pino outputs JSON (not pretty-printed) in production
- Check `NODE_ENV` is `production` on Vercel (auto-set)
- Confirm no `transport` config leaks into production build

---

## Security Rules
- NEVER log full prompts — use `truncate(prompt, 200)` to show preview + length
- NEVER log full generation output — log item count and content length only
- NEVER log API keys, tokens, or passwords — Pino redact handles auth headers automatically
- NEVER log raw Supabase rows — log presence flags and counts instead
- ALWAYS truncate error bodies to 500 chars max
- ALWAYS include `error.message` and first 5 lines of stack trace in error logs

## Log Level Guide
| Level | Use for | Example |
|-------|---------|---------|
| `error` | Unrecoverable failures | DB write failed, Claude API 500 |
| `warn` | Recoverable issues | JSON parse fallback, auth session expired |
| `info` | Normal operations | Request entry, LLM done, completion |
| `debug` | Verbose diagnostics | Prompt preview, auth bypass, cookie refresh |
