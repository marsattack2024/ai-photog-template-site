import { siteConfig } from "@/lib/site.config";

/**
 * RFC 9727 — API Catalog (linkset format).
 * Lets agents discover the site's API surfaces from a single well-known URL.
 * Currently advertises one anchor (/api/v1/) with the OpenAPI spec as the
 * service-desc and the full markdown content as service-doc.
 */

export const revalidate = 86400;

export async function GET() {
  const base = siteConfig.seo.baseUrl;

  const linkset = {
    linkset: [
      {
        anchor: `${base}/api/v1/`,
        "service-desc": [
          {
            href: `${base}/api/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${base}/llms-full.txt`,
            type: "text/plain",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(linkset, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
