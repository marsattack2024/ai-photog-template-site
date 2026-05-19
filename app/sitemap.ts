import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export const revalidate = 3600; // 1h

/**
 * Generates /sitemap.xml from the routes that actually exist in the app.
 * Add new routes here as the template grows (about, services, blog, etc.).
 *
 * Priority tiers:
 *   1.0 — homepage
 *   0.5 — reference pages (seattle-boudoir; bump in the forked client repo)
 *   0.3 — utility (thank-you)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.baseUrl.replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/seattle-boudoir`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/thank-you`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
