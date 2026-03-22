import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name";
const DEFAULT_DESC = process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? "Professional photography studio.";
const DEFAULT_OG = "/og-default.jpg"; // 1200×630 — place in /public

type PageMetadataOptions = {
  title: string;
  description?: string;
  /** Relative path, e.g. "/galleries/golden-hour" */
  path?: string;
  /** Absolute URL or relative path to OG image */
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
  const desc = description ?? DEFAULT_DESC;
  const canonical = path ? `${SITE_URL}${path}` : SITE_URL;
  const ogImage = image ?? DEFAULT_OG;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description: desc,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
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
