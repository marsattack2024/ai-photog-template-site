---
name: create-architecture
description: Generate an architecture document from an existing PRD.
user-invocable: true
allowed-tools: Read, Write, Glob
argument-hint: <optional notes>
---

# Create Architecture

Additional context: $ARGUMENTS

## Process
1. Read `docs/prd.md` for requirements
2. Read template at `docs/templates/architecture.md`
3. Design the architecture to satisfy all P0 requirements
4. Write to `docs/architecture.md`

## Requirements
- **Tech Stack**: Specify exact packages (e.g., "Express 4.x" not just "Express")
- **Components**: List every major module with its responsibility
- **API Design**: Every endpoint with method, path, request/response types
- **Data Models**: TypeScript interfaces for all entities
- **Error Handling**: How errors propagate and what the client sees
- **Testing Strategy**: What gets unit tested, integration tested, e2e tested
- **Directory Structure**: Exact file layout under `src/`
- **Security Surfaces** *(required — never omit)*: For each component, list which security patterns apply and how they are satisfied. Use this checklist — only include rows that are relevant:

  | Surface | Present? | Mitigation |
  |---------|----------|-----------|
  | OAuth / token storage | ✓ / — | AES-256-GCM encryption before DB write (lesson #102) |
  | New DB tables | ✓ / — | RLS: SELECT + INSERT WITH CHECK + UPDATE USING+WITH CHECK + DELETE (lesson #104) |
  | Fetch from user-supplied URL | ✓ / — | DNS resolve4 guard, block RFC-1918 + loopback (lesson #99) |
  | XML / TwiML generation | ✓ / — | Dedicated escape utility applied to all interpolated values (lesson #100) |
  | HMAC signing | ✓ / — | Dedicated env var, no fallback, throw if missing (lesson #53) |
  | Public endpoints (no auth) | ✓ / — | Content-Length cap + per-field slice() (lesson #101) |
  | Routes using crypto / platform SDKs | ✓ / — | `export const runtime = 'nodejs'` on each route (lesson #52) |

  If a surface is present but the mitigation is deferred to a future PR, mark it explicitly: `⚠️ DEFERRED — must be resolved before merge`.

## Rules
- Architecture must satisfy every P0 requirement from the PRD
- Prefer simple over clever. Use standard patterns.
- Default to: Express for APIs, Vitest for testing, Zod for validation
- No microservices for MVPs — monolith first
- Security Surfaces section is mandatory — blank is not acceptable. Write "N/A — no relevant surfaces" only if you have verified each row is genuinely absent.
