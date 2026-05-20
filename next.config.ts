import type { NextConfig } from "next";
import path from "path";

const supabaseProjectRef = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "placeholder.supabase.co";

const isDev = process.env.NODE_ENV === "development";

/**
 * Link response headers (RFC 8288) for agent discovery.
 * Lets AI agents auto-discover the site's API surfaces, llms.txt index,
 * and (future) MCP server card without manual config.
 */
const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</api/openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="llms-txt"; type="text/plain"',
  '</llms-full.txt>; rel="llms-full-txt"; type="text/plain"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
].join(", ");

const securityHeaders = [
  { key: "Link", value: LINK_HEADER },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    /**
     * Compatibility-focused CSP for a static lead-gen marketing site.
     *
     * Deliberately uses 'unsafe-inline' instead of nonces:
     *   - This site is mostly static prerendered HTML. A nonce CSP forces every
     *     page through dynamic SSR (cookies/headers reads) and breaks edge cache.
     *   - The common embed vendors here (GTM, Typeform, Calendly, YouTube,
     *     Vimeo) all require inline scripts or iframes that fight strict CSP.
     *   - The real threat surface for this kind of site is form abuse + bot
     *     spam, which is covered upstream by rate-limit + Vercel WAF.
     *
     * We keep the strong basics: frame-ancestors 'none', object-src 'none',
     * base-uri 'self', form-action 'self', HSTS, nosniff, frame-options.
     */
    value: [
      "default-src 'self'",
      // dev: unsafe-eval required for React Fast Refresh (webpack HMR uses eval)
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://embed.typeform.com https://*.typeform.com https://assets.calendly.com`,
      "style-src 'self' 'unsafe-inline'",    // required: Tailwind v4 inline styles
      `img-src 'self' data: blob: https://${supabaseProjectRef} https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://*.typeform.com https://*.calendly.com https://i.ytimg.com https://i.vimeocdn.com`,
      `connect-src 'self' https://${supabaseProjectRef} wss://${supabaseProjectRef} https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.typeform.com https://calendly.com https://*.calendly.com${isDev ? " ws://localhost:* http://localhost:*" : ""}`,
      "font-src 'self' data: https://assets.calendly.com",
      // Allow common embed iframes (YouTube, Vimeo, Typeform, Calendly).
      // Adding a new vendor? Add its domain here.
      "frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com https://player.vimeo.com https://*.typeform.com https://calendly.com https://*.calendly.com https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),

  // ── Performance optimizations (adapted from p2p-react-website) ──
  experimental: {
    // Inline critical CSS into the HTML head instead of a separate request.
    // Eliminates a render-blocking round-trip; ~150-250ms LCP improvement
    // on cold cache. Safe on all Vercel deploys.
    inlineCss: true,
    // Tree-shake barrel imports so we only pay for what we actually use.
    // framer-motion + @sentry/nextjs are the heavy hitters in this stack.
    optimizePackageImports: [
      "framer-motion",
      "@sentry/nextjs",
      "@next/third-parties",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // 30-day cache on Vercel's image optimizer. Photographer images don't
    // change often; long TTL means edge cache survives Supabase / source
    // image hiccups and most requests bypass the optimizer entirely.
    minimumCacheTTL: 2592000, // 30 days in seconds
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseProjectRef,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // Long cache on next/image optimized outputs at the edge.
      // Pairs with images.minimumCacheTTL above.
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
