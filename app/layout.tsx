import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { AttributionTracker } from "@/components/ui/AttributionTracker";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

// Analytics IDs: prefer siteConfig, fall back to env vars at runtime.
// Production-only by design: localhost + Vercel preview deploys never load
// analytics so we don't pollute the photographer's data with test traffic.
// VERCEL_ENV is "production" | "preview" | "development" on Vercel; undefined
// locally. Missing ID still no-ops gracefully — never blocks the build/launch.
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
const GTM_ID = IS_PRODUCTION
  ? siteConfig.analytics?.gtmId || process.env.NEXT_PUBLIC_GTM_ID
  : undefined;
const GA_ID = IS_PRODUCTION
  ? siteConfig.analytics?.gaId || process.env.NEXT_PUBLIC_GA_ID
  : undefined;

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.baseUrl),
  title: {
    default: siteConfig.brand.name,
    template:
      siteConfig.seo.titleTemplate ?? `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.seo.description,
  // openGraph.images falls through to app/opengraph-image.tsx (auto-generated).
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        {/*
          Preconnect to GoHighLevel — first contact-form submission hits
          services.leadconnectorhq.com. Resolving TLS + DNS during idle
          page load saves ~100-200ms off the first submit.
        */}
        <link
          rel="preconnect"
          href="https://services.leadconnectorhq.com"
          crossOrigin="anonymous"
        />
        {/*
          Preconnect to GTM only when actually loading it. GTM script fetches
          additional resources from googletagmanager.com on init — preconnect
          shaves ~100ms off the first paint after script execution.
        */}
        {GTM_ID && (
          <>
            <link
              rel="preconnect"
              href="https://www.googletagmanager.com"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          </>
        )}
      </head>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        {/* Skip nav — first element in body, visible on focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-(--color-ink) focus:text-(--color-cream) focus:text-xs focus:uppercase focus:tracking-widest focus:border focus:border-(--color-cream)"
        >
          Skip to main content
        </a>
        <AttributionTracker />
        {/* LazyMotion + strict: tree-shakes ~25KB by only bundling
            the domAnimation feature pack. `strict` enforces `m.*` (not
            `motion.*`) so missing features fail at compile time, not runtime. */}
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
        {/* GA4 only loads when GA_ID set AND GTM is not — most setups load GA
            via GTM instead of duplicating it. */}
        {GA_ID && !GTM_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
