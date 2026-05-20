import { InquirySchema } from "@/lib/validators";
import { upsertContact } from "@/lib/ghl/contacts";
import { siteConfig } from "@/lib/site.config";
import { rateLimit, getClientIpFromRequest } from "@/lib/rate-limit";
import { attributionFromJson } from "@/lib/contact-attribution";
import { sanitizeFreeText, sanitizeSlugSafe } from "@/lib/sanitize";

/**
 * POST /api/v1/inquiry — public REST endpoint for agent-submitted contacts.
 *
 * Same contract as the browser-side server action (submitInquiry) but JSON
 * in / JSON out. Lets AI agents ("book me a consultation") submit inquiries
 * directly. Discoverable via /.well-known/api-catalog and /api/openapi.json.
 *
 * Tags the GHL contact with `source-agent:<name>` so the photographer can
 * see which agent referred the lead. CORS open (Access-Control-Allow-Origin: *)
 * because the endpoint is intentionally public — same data anyone could
 * submit through the website form.
 */

const CORS_HEADERS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Max-Age": "86400",
};

const MAX_BODY_BYTES = 8192;

function json(
  payload: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  // Rate limit: 5 requests / minute / IP. Defense against bot spam since
  // CORS is open. Effective per Vercel function instance — see
  // lib/rate-limit.ts caveats for distributed-rate-limit upgrade path.
  const ip = getClientIpFromRequest(req);
  const limit = rateLimit(`inquiry:${ip}`, { max: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return json(
      { ok: false, error: "rate_limited", retryAfter: limit.retryAfter },
      429,
      { "Retry-After": String(limit.retryAfter) }
    );
  }

  // Size guard
  const cl = req.headers.get("content-length");
  if (cl && Number(cl) > MAX_BODY_BYTES) {
    return json({ ok: false, error: "body_too_large" }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot — silent success so bots don't retry
  if (typeof body.hp === "string" && body.hp.length > 0) {
    return json({ ok: true, contactId: null, note: "ignored" }, 200);
  }

  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "validation_failed",
        details: parsed.error.flatten().fieldErrors,
      },
      400
    );
  }

  const sourceAgent = sanitizeSlugSafe(body.source_agent);
  const sourcePage = sanitizeFreeText(body.sourcePage);

  // Agents may pass attribution fields as `attr_gclid`, `attr_utm_source`,
  // etc. — same naming convention as the browser form's hidden inputs.
  // Most agent inquiries skip this; browser-relay clients pass it through.
  const attribution = attributionFromJson(body);

  const result = await upsertContact({
    ...parsed.data,
    sourcePage,
    sourceName: `${siteConfig.brand.name} (API · ${sourceAgent})`,
    extraTags: [`source-agent:${sourceAgent}`],
    attribution,
  });

  if (!result.ok) {
    return json({ ok: false, error: result.error }, 502);
  }

  return json({ ok: true, contactId: result.contactId }, 200);
}
