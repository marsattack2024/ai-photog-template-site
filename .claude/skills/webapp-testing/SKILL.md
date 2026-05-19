---
name: webapp-testing
description: >
  Use when testing the local website in a browser: screenshots, responsive
  checks, form behavior, console errors, visual regressions, and smoke tests.
  Works with the current project dev server instead of assuming a fixed port.
---

# Webapp Testing

Use this for browser-based verification. Prefer direct, minimal checks over a
large custom testing harness.

## Workflow

1. Identify the command and port from `package.json` or the running dev server.
2. Start the app only if it is not already running.
3. Open the relevant route.
4. Check desktop and mobile widths for visual work.
5. Capture screenshots for issues that are visual or subjective.
6. Inspect console/network errors when behavior fails.

## What To Verify

- Page loads without runtime errors.
- Primary images render and are cropped intentionally.
- Text does not overflow or overlap.
- Navigation and CTAs work.
- Contact/inquiry form validation and submission path work.
- Thank-you or confirmation route works.
- Mobile layout preserves reading order and CTA visibility.

## Notes

- If using Playwright, wait for the page to settle before inspecting.
- If framework behavior is surprising, check current official docs before
  assuming older Next.js, React, or browser behavior.
- Keep screenshots and scripts disposable unless the test becomes a recurring
  project gate.
