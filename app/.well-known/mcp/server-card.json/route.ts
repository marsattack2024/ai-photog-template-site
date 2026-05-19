import { siteConfig } from "@/lib/site.config";

/**
 * MCP server capability card (SEP-1649).
 * Shown by MCP clients before connection + used by the MCP Registry
 * (registry.modelcontextprotocol.io) for discovery.
 */

export const revalidate = 86400;

export async function GET() {
  const base = siteConfig.seo.baseUrl;
  const slug = siteConfig.brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const card = {
    $schema: "https://modelcontextprotocol.io/schemas/server-card.json",
    version: "1.0",
    protocolVersion: "2025-03-26",
    serverInfo: {
      name: `${slug}-mcp`,
      version: "1.0.0",
      description: `MCP server for ${siteConfig.brand.name}. Lets AI agents submit photography session inquiries directly to the studio's CRM on behalf of users.`,
      homepage: base,
      contact: siteConfig.brand.email ?? undefined,
    },
    transport: {
      type: "streamable-http",
      url: `${base}/api/mcp`,
      stateless: true,
    },
    capabilities: {
      tools: true,
      resources: false,
      prompts: false,
    },
    tools: ["submit_inquiry"],
    tags: ["photography", "inquiry", "lead-generation"],
  };

  return new Response(JSON.stringify(card, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
