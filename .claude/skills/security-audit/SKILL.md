---
name: security-audit
description: >
  Read-only security scan for this Next.js + Supabase photography-site template.
  Use before launch, before commit, after schema/form changes, or when touching
  env vars, route handlers, server actions, RLS, or external image domains.
---

# Security Audit

This is a brochure-site security pass. Keep it focused on realistic risks:
leaked secrets, over-broad RLS, unsafe public writes, service-role exposure,
XSS in rich content, and broken deploy/env assumptions.

## Checks

1. Secret leakage:
   - `.env*`, service keys, private keys, API tokens, connection strings
   - service-role key imported outside server-only files
2. Supabase:
   - public reads limited to published/active content
   - public insert only for inquiries
   - authenticated write policies are intentional
3. Forms and route handlers:
   - server-side validation
   - no unexpected fields inserted
   - no sensitive unnecessary personal data collected
4. Rendering:
   - no unsafe `dangerouslySetInnerHTML` without sanitization
   - JSON-LD is built from trusted or escaped fields
5. Dependencies:
   - run `npm audit --json` and report high/critical only
6. Deployment:
   - `.gitignore` excludes env and build output
   - CSP/image domains in `next.config.ts` match actual assets

## Output

Report findings by severity with file paths and concrete remediation. If no
issues are found, state the checks performed and any residual risk.
