import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com"),
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME ?? "Studio Name"}`,
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        {/* Skip nav — first element in body, visible on focus */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-(--color-ink) focus:text-(--color-cream) focus:text-xs focus:uppercase focus:tracking-widest focus:border focus:border-(--color-cream)"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
