/**
 * Ad-attribution capture for paid-ads-running photographers.
 *
 * On page load, captures click IDs (gclid, fbclid, ttclid, etc.) and UTM
 * params from the URL into first-party cookies with a 90-day TTL. Reads
 * them on form submission and passes through to the CRM so the
 * photographer's GHL contact carries the original ad-click context.
 *
 * Pattern adapted from p2p-react-website/src/lib/contact-prefill.ts —
 * slimmed (no contact-prefill sessionStorage, no booking-widget wiring;
 * that's an upgrade path for forks that run a booking funnel).
 *
 * Privacy note: cookies are first-party, SameSite=Lax, Secure. Platform-
 * owned cookies (_fbp / _fbc) are NEVER written by us — Meta's pixel sets
 * those. We only read them at form submission time when they exist.
 */

const CLICK_ID_COOKIE_DAYS = 90;
const UTM_COOKIE_DAYS = 90;

/* ────────────── Cookie helpers ────────────── */

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return; // SSR no-op
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax; Secure`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // SSR no-op
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/* ────────────── Click ID + UTM tracking ────────────── */

/** URL params captured into first-party cookies on landing. */
export const CLICK_ID_PARAMS = [
  "gclid", // Google Ads
  "gbraid", // Google enhanced (iOS web)
  "wbraid", // Google enhanced (other)
  "fbclid", // Meta Ads
  "ttclid", // TikTok Ads
  "msclkid", // Microsoft Ads
  "li_fat_id", // LinkedIn Ads
] as const;

export const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type ClickIdKey = (typeof CLICK_ID_PARAMS)[number];
export type UtmKey = (typeof UTM_PARAMS)[number];

export type AttributionData = Partial<Record<ClickIdKey | UtmKey | "fbp" | "fbc", string>>;

const CLICK_ID_COOKIE_PREFIX = "ph_click_";
const UTM_COOKIE_PREFIX = "ph_utm_";

/**
 * Read URL params on landing + persist to cookies. Run once on app mount
 * (AttributionTracker mounts in root layout).
 *
 * First-touch attribution: we don't overwrite existing cookies. The
 * very first click ID a visitor lands with wins, even if they later
 * navigate via a different ad. Most ad platforms attribute first-touch.
 */
export function captureAttributionFromUrl(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);

  for (const key of CLICK_ID_PARAMS) {
    const val = params.get(key);
    if (val && !getCookie(`${CLICK_ID_COOKIE_PREFIX}${key}`)) {
      setCookie(`${CLICK_ID_COOKIE_PREFIX}${key}`, val, CLICK_ID_COOKIE_DAYS);
    }
  }

  for (const key of UTM_PARAMS) {
    const val = params.get(key);
    if (val && !getCookie(`${UTM_COOKIE_PREFIX}${key}`)) {
      setCookie(`${UTM_COOKIE_PREFIX}${key}`, val, UTM_COOKIE_DAYS);
    }
  }
}

/**
 * Read all stored attribution + live platform-owned cookies. Call at form
 * submission time.
 */
export function getStoredAttribution(): AttributionData {
  const data: AttributionData = {};

  for (const key of CLICK_ID_PARAMS) {
    const val = getCookie(`${CLICK_ID_COOKIE_PREFIX}${key}`);
    if (val) data[key] = val;
  }
  for (const key of UTM_PARAMS) {
    const val = getCookie(`${UTM_COOKIE_PREFIX}${key}`);
    if (val) data[key] = val;
  }

  // Meta's pixel cookies — live read, never cached by us.
  const fbp = getCookie("_fbp");
  if (fbp) data.fbp = fbp;
  const fbc = getCookie("_fbc");
  if (fbc) data.fbc = fbc;

  return data;
}

/**
 * Serialize attribution as form fields for a `<form>`. Each entry becomes
 * a hidden input the server can read from FormData.
 */
export function attributionToFormFields(): Array<{ name: string; value: string }> {
  const data = getStoredAttribution();
  return Object.entries(data).map(([name, value]) => ({
    name: `attr_${name}`,
    value: String(value),
  }));
}

/**
 * Server-side: extract attribution fields from a FormData. Mirrors the
 * naming convention used by attributionToFormFields().
 */
export function attributionFromFormData(formData: FormData): AttributionData {
  const data: AttributionData = {};
  for (const key of [...CLICK_ID_PARAMS, ...UTM_PARAMS, "fbp", "fbc"] as const) {
    const val = formData.get(`attr_${key}`);
    if (typeof val === "string" && val.length > 0) {
      data[key as keyof AttributionData] = val;
    }
  }
  return data;
}

/**
 * Server-side: extract attribution fields from a JSON body. Mirrors the
 * same naming convention so the REST endpoint sees the same shape.
 */
export function attributionFromJson(body: Record<string, unknown>): AttributionData {
  const data: AttributionData = {};
  for (const key of [...CLICK_ID_PARAMS, ...UTM_PARAMS, "fbp", "fbc"] as const) {
    const val = body[`attr_${key}`];
    if (typeof val === "string" && val.length > 0) {
      data[key as keyof AttributionData] = val;
    }
  }
  return data;
}
