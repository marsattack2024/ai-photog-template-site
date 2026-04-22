import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function UnderwaterSplit() {
  return (
    <section className="bg-(--color-cream) py-0 overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[600px]">
        {/* Image — left */}
        <AnimateOnScroll className="relative min-h-[400px] md:min-h-[600px]">
          <Image
            src="/images/underwater/split-section.webp"
            alt="Underwater portrait session in St. Augustine Florida — Jennifer Lynn James Photography"
            fill
            className="object-cover"
          />
        </AnimateOnScroll>

        {/* Text — right */}
        <AnimateOnScroll delay={100} className="flex flex-col justify-center px-10 py-16 md:px-16 md:py-24 bg-(--color-ink)">
          <span className="text-xs uppercase tracking-widest text-(--color-muted) mb-6">
            St. Augustine, Florida
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-(--color-cream) leading-snug mb-6">
            There Is No Place on Earth{" "}
            <em className="italic">That Looks Like This.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-5">
            St. Augustine&apos;s freshwater springs produce a clarity and color that studio pools
            and ocean water simply cannot replicate. The way light refracts through these
            springs — the aquamarine gradient, the dappled beams, the stillness — creates
            an environment that makes every portrait look like a painting.
          </p>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-8">
            Jennifer has photographed underwater subjects across Florida and beyond. She
            keeps coming back to St. Augustine because nothing else compares. This location
            is not incidental to the work — it <em>is</em> the work.
          </p>
          <a
            href="#contact"
            className="self-start inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/30 text-(--color-cream) px-8 py-3 hover:bg-white/10 transition-colors duration-300"
          >
            Book Your Session
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
