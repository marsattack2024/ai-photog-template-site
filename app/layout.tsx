import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/lib/site.config";
import "./globals.css";

// Analytics IDs: prefer siteConfig, fall back to env vars at runtime.
const GTM_ID = siteConfig.analytics?.gtmId || process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = siteConfig.analytics?.gaId || process.env.NEXT_PUBLIC_GA_ID;

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
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        {/* Skip nav — first element in body, visible on focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-(--color-ink) focus:text-(--color-cream) focus:text-xs focus:uppercase focus:tracking-widest focus:border focus:border-(--color-cream)"
        >
          Skip to main content
        </a>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        {/* GA4 only loads when GA_ID set AND GTM is not — most setups load GA
            via GTM instead of duplicating it. */}
        {GA_ID && !GTM_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
