import "server-only";
import { GHL_BASE, ghlHeaders, withGHLTimeout } from "./client";
import { normalizePhone } from "@/lib/phone";

/**
 * Upsert a contact into GoHighLevel from a website inquiry form.
 *
 * GHL is the source of truth for leads — the photographer reads them in the
 * GHL inbox / mobile app. No local DB write needed for a brochure site.
 *
 * Pattern adapted from p2p-react-website's lib/ghl.ts. Slimmed:
 *  - no custom field IDs (those are env-var-driven there; here we just use tags)
 *  - no attribution source nesting (no UTM capture on a photographer site)
 *  - no fire-and-forget Supabase log (single integration, no observability stack)
 *
 * Idempotent: GHL upserts by email. Re-submission from the same email updates
 * the existing contact (and adds tags), not a duplicate.
 */

export interface UpsertContactInput {
  /** Full name from form. Split on whitespace into first/last for GHL. */
  name: string;
  email: string;
  phone?: string;
  /** Optional category (e.g. "solo" / "couples" / "bridal" for boudoir). Becomes a tag. */
  sessionType?: string;
  /** Free-form message; written as a contact note (not on the contact itself). */
  message?: string;
  /** Page slug the form was submitted from (e.g. "/seattle-boudoir"). */
  sourcePage?: string;
  /** Visible in the GHL UI as the lead source — defaults to "Website". */
  sourceName?: string;
  /** Additional tags appended to the contact. Capped at 20 total (GHL limit). */
  extraTags?: string[];
}

export type UpsertContactResult =
  | { ok: true; contactId: string }
  | { ok: false; error: string };

export async function upsertContact(
  input: UpsertContactInput
): Promise<UpsertContactResult> {
  const token = process.env.GHL_PIT_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    return { ok: false, error: "integration_not_configured" };
  }

  const trimmed = input.name.trim();
  const [firstName, ...rest] = trimmed.split(/\s+/);
  const lastName = rest.join(" ") || undefined;

  const tags = dedupeTags([
    "web form",
    ...(input.sessionType ? [`session-${input.sessionType}`] : []),
    ...(input.extraTags ?? []),
  ]);

  const body: Record<string, unknown> = {
    locationId,
    source: input.sourceName ?? "Website",
    firstName: firstName || trimmed,
    email: input.email,
    tags,
  };
  if (lastName) body.lastName = lastName;
  // Phone is normalized to E.164 at the boundary so GHL doesn't 422 on bare
  // 10-digit US numbers. Original input is preserved when normalization can't
  // confidently coerce (international without prefix, etc.).
  if (input.phone) body.phone = normalizePhone(input.phone);

  try {
    const res = await fetch(
      `${GHL_BASE}/contacts/upsert`,
      withGHLTimeout({
        method: "POST",
        headers: ghlHeaders(token),
        body: JSON.stringify(body),
      })
    );
    if (!res.ok) {
      // Don't log response body — GHL echoes back PII on errors.
      console.error("[ghl] contact upsert failed", { status: res.status });
      return { ok: false, error: `upsert_failed_${res.status}` };
    }
    const data = (await res.json()) as { contact?: { id?: string }; id?: string };
    const contactId = data.contact?.id ?? data.id ?? "unknown";

    if (input.message?.trim()) {
      await addContactNote(token, contactId, formatNote(input));
    }

    return { ok: true, contactId };
  } catch (err) {
    console.error("[ghl] contact upsert exception", {
      error: (err as Error).message,
    });
    return { ok: false, error: "network_error" };
  }
}

/**
 * Attach a note to an existing contact. Used to store free-form message text
 * (which doesn't have a native contact field in GHL). Best-effort: a failure
 * here doesn't fail the inquiry — the contact still got created.
 */
async function addContactNote(token: string, contactId: string, body: string): Promise<void> {
  // Defense-in-depth: strip HTML and GHL/Handlebars template syntax so a
  // malicious message can't render as templates in GHL's UI or emails.
  const safeBody = body
    .replace(/<[^>]*>/g, "")
    .replace(/\{\{[^}]*\}\}/g, "")
    .slice(0, 10_000);

  try {
    await fetch(
      `${GHL_BASE}/contacts/${contactId}/notes`,
      withGHLTimeout({
        method: "POST",
        headers: ghlHeaders(token),
        body: JSON.stringify({ body: safeBody }),
      })
    );
  } catch (err) {
    console.error("[ghl] note add failed", {
      contact_id_prefix: contactId.slice(0, 8),
      error: (err as Error).message,
    });
  }
}

function formatNote(input: UpsertContactInput): string {
  const lines: string[] = [];
  if (input.sessionType) lines.push(`Session type: ${input.sessionType}`);
  if (input.sourcePage) lines.push(`Source page: ${input.sourcePage}`);
  if (input.message) {
    if (lines.length) lines.push("");
    lines.push("Message:");
    lines.push(input.message);
  }
  return lines.join("\n");
}

function dedupeTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tags) {
    const clean = t.trim().replace(/[\x00-\x1F]/g, "").slice(0, 80);
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
    if (out.length >= 20) break;
  }
  return out;
}
