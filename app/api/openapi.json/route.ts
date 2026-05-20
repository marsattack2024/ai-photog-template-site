import { siteConfig } from "@/lib/site.config";

/**
 * OpenAPI 3.1 specification for the public REST API.
 * Discoverable via /.well-known/api-catalog (rel="service-desc") and the
 * Link response header on every page.
 *
 * Currently documents one endpoint: POST /api/v1/inquiry.
 * Add more endpoints here as the API surface grows.
 */

export const revalidate = 86400;

export async function GET() {
  const base = siteConfig.seo.baseUrl;

  const spec = {
    openapi: "3.1.0",
    info: {
      title: `${siteConfig.brand.name} — Inquiry API`,
      version: "1.0.0",
      description: `Public REST API for submitting photography session inquiries to ${siteConfig.brand.name}. Mirrors the website's contact form. Designed for AI agents acting on a client's behalf.`,
      contact: siteConfig.brand.email ? { email: siteConfig.brand.email } : undefined,
    },
    servers: [{ url: `${base}/api/v1` }],
    paths: {
      "/inquiry": {
        post: {
          operationId: "submitInquiry",
          summary: "Submit a photography session inquiry.",
          description:
            "Creates or updates a contact in the studio's CRM (idempotent by email). Returns the CRM contact ID on success.",
          tags: ["inquiry"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/InquiryInput" },
                example: {
                  name: "Alex Rivers",
                  email: "alex@example.com",
                  phone: "+1 555 0100",
                  sessionType: "portrait",
                  message:
                    "I'd love to book a portrait session for my 40th birthday in April.",
                  source_agent: "claude-mobile",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Inquiry accepted.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/InquirySuccess" },
                },
              },
            },
            "400": {
              description: "Validation error or malformed JSON.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
            "413": {
              description: "Request body exceeded 8KB.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
            "429": {
              description:
                "Rate limited (5 requests/min/IP). Retry-After header indicates seconds until the next allowed request.",
              headers: {
                "Retry-After": {
                  schema: { type: "integer" },
                  description: "Seconds the client should wait before retrying.",
                },
              },
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
            "502": {
              description: "Upstream CRM rejected the request.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        InquiryInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string", minLength: 2, maxLength: 100 },
            email: { type: "string", format: "email" },
            phone: { type: "string", maxLength: 40 },
            sessionType: {
              type: "string",
              maxLength: 50,
              description:
                "Optional session category (e.g. 'portrait', 'couples', 'family'). Becomes a tag on the CRM contact.",
            },
            message: { type: "string", maxLength: 2000 },
            sourcePage: {
              type: "string",
              description:
                "Page slug the inquiry originated from (for attribution).",
            },
            source_agent: {
              type: "string",
              maxLength: 80,
              description:
                "Identifier of the agent submitting the inquiry (e.g. 'claude-mobile', 'gpt-app'). Recorded as a tag.",
            },
            hp: {
              type: "string",
              description:
                "Honeypot field — must be empty. Filled values are silently dropped.",
            },
          },
        },
        InquirySuccess: {
          type: "object",
          required: ["ok"],
          properties: {
            ok: { type: "boolean", const: true },
            contactId: {
              type: ["string", "null"],
              description: "CRM contact ID, or null if the request was a honeypot drop.",
            },
          },
        },
        ApiError: {
          type: "object",
          required: ["ok", "error"],
          properties: {
            ok: { type: "boolean", const: false },
            error: {
              type: "string",
              description: "Machine-readable error code.",
            },
            details: {
              type: "object",
              description: "Optional per-field validation errors.",
              additionalProperties: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        },
      },
    },
  };

  return new Response(JSON.stringify(spec, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
