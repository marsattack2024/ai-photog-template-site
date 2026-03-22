// app/api/revalidate/route.ts
export const runtime = "nodejs"; // revalidateTag is not available in Edge runtime

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Map Supabase table names to cache tags
const TABLE_TAGS: Record<string, string[]> = {
  site_config:    ["site-config"],
  services:       ["services"],
  galleries:      ["galleries", "gallery-slugs"],
  gallery_images: ["galleries"],
  posts:          ["posts", "post-slugs"],
  testimonials:   ["testimonials"],
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { table?: string; tag?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Allow direct tag revalidation or table-based lookup
  const tagsToInvalidate = body.tag
    ? [body.tag]
    : TABLE_TAGS[body.table ?? ""] ?? [];

  if (tagsToInvalidate.length === 0) {
    return NextResponse.json({ error: "Unknown table or tag" }, { status: 400 });
  }

  tagsToInvalidate.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: tagsToInvalidate });
}
