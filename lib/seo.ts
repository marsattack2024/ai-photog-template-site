import type { Metadata } from "next";
import { siteConfig } from "@/lib/site.config";

/**
 * Page metadata builder — pulls all defaults from siteConfig (the single
 * source of truth for brand + SEO config). No duplicated env-var reads.
 *
 * OG image is intentionally NOT set here when omitted — falls through to
 * app/opengraph-image.tsx (auto-generated from brand name + tagline +
 * accent color). To override per page, pass `image` explicitly.
 */

type PageMetadataOptions = {
  title: string;
  description?: string;
  /** Relative path, e.g. "/galleries/golden-hour" */
  path?: string;
  /** Absolute URL or path. Overrides the auto-generated OG. */
  image?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: PageMetadataOptions): Metadata {
  const desc = description ?? siteConfig.seo.description;
  const baseUrl = siteConfig.seo.baseUrl;
  const canonical = path ? `${baseUrl}${path}` : baseUrl;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: siteConfig.brand.name,
      title,
      description: desc,
      url: canonical,
      ...(image && {
        images: [{ url: image, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      ...(image && { images: [image] }),
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

type ArticleMetadataOptions = PageMetadataOptions & {
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
};

export function buildArticleMetadata({
  publishedTime,
  modifiedTime,
  tags,
  ...base
}: ArticleMetadataOptions): Metadata {
  const page = buildPageMetadata(base);
  return {
    ...page,
    openGraph: {
      ...page.openGraph,
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      tags,
    },
  };
}
