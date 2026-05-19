import {
  MD_HEADERS,
  buildHomeMarkdown,
  buildSeaMarkdown,
  buildThankYouMarkdown,
} from "@/lib/llms/page-markdown";

/**
 * /md/[...slug] — markdown views of known pages.
 *
 * Reached two ways:
 *   1. Direct: agents request /md/seattle-boudoir (or /md/ for home)
 *   2. Negotiated: middleware.ts rewrites GET /seattle-boudoir with
 *      Accept: text/markdown → /md/seattle-boudoir transparently
 *
 * To add a new page: add an entry to PAGE_MARKDOWN.
 */

const PAGE_MARKDOWN: Record<string, () => string> = {
  "": buildHomeMarkdown,
  "seattle-boudoir": buildSeaMarkdown,
  "thank-you": buildThankYouMarkdown,
};

export const revalidate = 86400; // 24h

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;
  const key = (slug ?? []).join("/");
  const builder = PAGE_MARKDOWN[key];

  if (!builder) {
    return new Response(`# Not found\n\nNo markdown view available for /${key}.\n`, {
      status: 404,
      headers: MD_HEADERS,
    });
  }

  return new Response(builder(), { status: 200, headers: MD_HEADERS });
}
