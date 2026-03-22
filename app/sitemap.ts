import type { MetadataRoute } from "next";
import { getGallerySlugs, getPostSlugs } from "@/lib/data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

  const [gallerySlugs, postSlugs] = await Promise.all([
    getGallerySlugs(),
    getPostSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1.0, lastModified: new Date() },
    { url: `${BASE}/galleries`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8, lastModified: new Date() },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
  ];

  return [
    ...staticRoutes,
    ...gallerySlugs.map((slug) => ({
      url: `${BASE}/galleries/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    })),
    ...postSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(),
    })),
  ];
}
