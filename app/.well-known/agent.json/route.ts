import { siteConfig } from "@/lib/site.config";

/**
 * /.well-known/agent.json — single-agent descriptor.
 *
 * Lean manifest pointing agents at this site's machine-readable surfaces:
 * the OpenAPI spec, MCP endpoint, and llms.txt. Mirrors the pattern used
 * by p2p-react-website but trimmed to the capabilities this template
 * actually backs (inquiry submission via REST + MCP). Do not add OAuth,
 * HTTP signatures, or other claims unless they're wired up for real.
 */

export const revalidate = 86400;

export async function GET() {
  const base = siteConfig.seo.baseUrl;

  const agent = {
    schema_version: "1.0",
    name: siteConfig.brand.name,
    description:
      siteConfig.seo.description ||
      `${siteConfig.brand.name} — agent-readable photography studio site.`,
    contact: siteConfig.brand.email ?? undefined,
    homepage: base,
    documentation: `${base}/llms-full.txt`,
    api: {
      openapi: `${base}/api/openapi.json`,
      base_url: `${base}/api/v1`,
    },
    mcp: {
      endpoint: `${base}/api/mcp`,
      server_card: `${base}/.well-known/mcp/server-card.json`,
    },
    capabilities: ["submit_inquiry"],
    content: {
      llms_txt: `${base}/llms.txt`,
      llms_full_txt: `${base}/llms-full.txt`,
      markdown_negotiation: {
        accept: "text/markdown",
        note: "Send Accept: text/markdown on any public page to receive the markdown view.",
      },
    },
    policies: {
      ai_bot_policy: `${base}/robots.txt`,
    },
  };

  return new Response(JSON.stringify(agent, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
