/**
 * Input sanitizers for free-form fields that flow to external systems (GHL,
 * Sentry, etc.). Keep these conservative — the template ships with no
 * server-side HTML rendering, so the threat model is mostly:
 *
 *   1. Injection into downstream CRM notes (Handlebars `{{...}}`, HTML tags)
 *   2. Log poisoning / spoofed source pages
 *   3. Tag-key explosion (slug-unsafe agent names)
 *
 * Treat these helpers as defense-in-depth, not as a substitute for Zod
 * validation upstream.
 */

const HTML_TAG_RE = /<\/?[a-z][^>]*>/gi;
const HANDLEBARS_RE = /\{\{[^}]*\}\}/g;
const CONTROL_CHAR_RE = /[\x00-\x1f\x7f]/g;

/**
 * Strip HTML tags + `{{handlebars}}` + control chars, collapse whitespace,
 * and cap length. Returns `undefined` for empty/non-string inputs so the
 * caller can spread it without producing empty CRM fields.
 */
export function sanitizeFreeText(value: unknown, maxLength = 200): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value
    .replace(HTML_TAG_RE, "")
    .replace(HANDLEBARS_RE, "")
    .replace(CONTROL_CHAR_RE, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
  return cleaned || undefined;
}

const SLUG_SAFE_RE = /[^a-z0-9._-]+/gi;

/**
 * For tag keys / source identifiers that round-trip into CRM tag systems.
 * Lowercased, slug-safe ASCII only, max 80 chars. Empty input → "unknown".
 */
export function sanitizeSlugSafe(value: unknown, maxLength = 80): string {
  if (typeof value !== "string" || !value) return "unknown";
  const cleaned = value.toLowerCase().replace(SLUG_SAFE_RE, "-").replace(/^-+|-+$/g, "").slice(0, maxLength);
  return cleaned || "unknown";
}
