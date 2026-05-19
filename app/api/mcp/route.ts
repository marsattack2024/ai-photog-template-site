/**
 * MCP server — streamable HTTP transport.
 * Exposes ONE tool to start: submit_inquiry (wraps upsertContact → GHL).
 *
 * Adding more tools: register them inside createMcpServer(). Good future
 * candidates once a booking DB exists:
 *   - get_session_details({email}) — return a booked session for a client
 *   - get_prep_checklist({sessionType}) — return wardrobe/timing guide
 *   - reschedule_request({email, reason}) — fire a workflow
 *
 * Pattern adapted from p2p-react-website/app/api/mcp/route.ts, stripped
 * to one tool. The streamable-http transport is native Web Fetch — no
 * Node bridge needed, but runtime stays nodejs because upsertContact
 * accesses env vars + makes outbound fetches.
 */

export const runtime = "nodejs";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { upsertContact } from "@/lib/ghl/contacts";
import { siteConfig } from "@/lib/site.config";

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: `${siteConfig.brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-mcp`,
    version: "1.0.0",
  });

  server.registerTool(
    "submit_inquiry",
    {
      title: "Submit Photography Session Inquiry",
      description: `Submit a contact inquiry to ${siteConfig.brand.name}'s CRM (GoHighLevel). Use when a user wants to book a photography session, ask about availability, or request more information. Idempotent by email — re-submissions update the existing contact instead of creating duplicates.`,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        openWorldHint: true, // writes to external CRM
      },
      inputSchema: {
        name: z
          .string()
          .min(2)
          .max(100)
          .describe("Full name of the person inquiring."),
        email: z
          .string()
          .email()
          .describe("Contact email — also the idempotency key in the CRM."),
        phone: z
          .string()
          .max(40)
          .optional()
          .describe("Phone number for follow-up. Optional but strongly preferred for higher-quality leads."),
        sessionType: z
          .string()
          .max(50)
          .optional()
          .describe("Type of session (e.g. 'portrait', 'couples', 'family', 'bridal'). Becomes a tag on the CRM contact."),
        message: z
          .string()
          .max(2000)
          .optional()
          .describe("Free-form message — vision, timing, questions. Stored as a note on the contact."),
      },
    },
    async (args) => {
      const result = await upsertContact({
        ...args,
        sourceName: `${siteConfig.brand.name} (MCP)`,
        extraTags: ["source-mcp"],
      });

      if (!result.ok) {
        return {
          content: [
            {
              type: "text",
              text: `Inquiry submission failed: ${result.error}. The user may want to try again or contact the studio directly at ${siteConfig.brand.email ?? "the website"}.`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Inquiry submitted successfully. Contact ID: ${result.contactId}. The studio typically responds personally within one business day.`,
          },
        ],
      };
    }
  );

  return server;
}

export async function POST(req: Request) {
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined, // stateless
  });
  const server = createMcpServer();
  await server.connect(transport);
  return transport.handleRequest(req);
}

export async function GET() {
  // MCP discovery probe — some clients GET /api/mcp before POSTing
  return new Response(
    JSON.stringify({
      mcp: "streamable-http",
      info: `MCP server for ${siteConfig.brand.name}. Use POST with an MCP client (Claude Desktop, etc.).`,
      capabilities: { tools: true },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
