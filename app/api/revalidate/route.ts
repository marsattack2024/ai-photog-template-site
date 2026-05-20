// app/api/revalidate/route.ts
export const runtime = "nodejs"; // revalidateTag is not available in Edge runtime

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

/**
 * Constant-time secret comparison. Plain `!==` is vulnerable to timing
 * side-channels — an attacker measuring response latency can brute-force
 * a short secret one byte at a time. `timingSafeEqual` requires equal-length
 * buffers, so we early-return on length mismatch to avoid throwing.
 */
function secretsMatch(provided: string | null, expected: string): boolean {
  if (!provided || provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

// Map Supabase table names to cache tags. Template forks add new tables here;
// the allowlist below is derived from the values so it never drifts.
const TABLE_TAGS: Record<string, string[]> = {
  site_config:    ["site-config"],
  services:       ["services"],
  galleries:      ["galleries", "gallery-slugs"],
  gallery_images: ["galleries"],
  posts:          ["posts", "post-slugs"],
  testimonials:   ["testimonials"],
};

// Allowlist: only tags that this route knows how to mint can be revalidated.
// Without this, a leaked REVALIDATE_SECRET could be used to poison ANY tag
// in the app's cache graph (including future tags the template author adds).
const ALLOWED_TAGS = new Set<string>(Object.values(TABLE_TAGS).flat());

export async function POST(req: NextRequest): Promise<NextResponse> {
  const provided = req.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || !secretsMatch(provided, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { table?: string; tag?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Allow direct tag revalidation or table-based lookup. Direct `tag` requests
  // must be in the allowlist — see ALLOWED_TAGS above.
  const tagsToInvalidate = body.tag
    ? ALLOWED_TAGS.has(body.tag)
      ? [body.tag]
      : []
    : TABLE_TAGS[body.table ?? ""] ?? [];

  if (tagsToInvalidate.length === 0) {
    return NextResponse.json({ error: "Unknown table or tag" }, { status: 400 });
  }

  tagsToInvalidate.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: tagsToInvalidate });
}
