import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export const revalidate = 3600; // 1h

/**
 * Generates /sitemap.xml from the routes that actually exist in the app.
 * Add new routes here as the template grows (about, services, blog, etc.).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.baseUrl.replace(/\/$/, "");
  const now = new Date();

  // /thank-you is intentionally omitted — it's noindex (see thank-you/page.tsx
  // metadata.robots) and shouldn't be advertised to search crawlers either.
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
