import { StickyBar } from "@/components/layout/StickyBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/site.config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {siteConfig.announcement && <StickyBar {...siteConfig.announcement} />}
      <Navbar brandName={siteConfig.brand.name} />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer
        studioName={siteConfig.brand.name}
        socials={siteConfig.socials}
      />
    </>
  );
}
