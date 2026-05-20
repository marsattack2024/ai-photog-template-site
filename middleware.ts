import { NextResponse, type NextRequest } from "next/server";

/**
 * Markdown content negotiation: when an agent requests an HTML page with
 * `Accept: text/markdown`, transparently rewrite to /md/[slug] which serves
 * the markdown version. The browser URL doesn't change; the agent just gets
 * a different content-type.
 *
 * Skipped for /api/, /_next/, /md/ (already markdown), and static files.
 */
export function middleware(req: NextRequest) {
  const accept = req.headers.get("accept") ?? "";
  // Only trigger if markdown is explicitly preferred (not just `*/*`).
  if (!accept.includes("text/markdown")) return;

  const { pathname } = req.nextUrl;

  // Pass through routes that aren't HTML pages.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/md/") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    pathname.includes(".") // *.png, *.jpg, *.ico, *.webp etc.
  ) {
    return;
  }

  const url = req.nextUrl.clone();
  // Strip trailing slash; "" → "/md", "/foo" → "/md/foo"
  url.pathname = pathname === "/" ? "/md" : `/md${pathname.replace(/\/$/, "")}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip the middleware entirely for routes that never need markdown
  // negotiation. The function body short-circuits for these too, but
  // bypassing at the matcher level avoids the per-request invocation
  // (and its bundle load) altogether — meaningful on cold starts.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|api/|md/|.well-known/|.*\\.).*)",
  ],
};
