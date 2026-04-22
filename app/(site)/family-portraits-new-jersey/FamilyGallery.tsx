import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui";

const leftCol = [
  { src: "/images/family/family-hero.jpg", alt: "Family portrait on location in New Jersey", h: "h-[400px]" },
  { src: "/images/family/family-couple.jpg", alt: "Couple portrait session", h: "h-[520px]" },
];

const rightCol = [
  { src: "/images/family/family-generations.jpg", alt: "Multi-generational family portrait", h: "h-[520px]" },
  { src: "/images/family/family-cta-bg.jpg", alt: "Mother and child portrait", h: "h-[400px]" },
];

function GalleryColumn({ images, baseDelay = 0 }: { images: typeof leftCol; baseDelay?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {images.map((img, i) => (
        <AnimateOnScroll key={i} delay={baseDelay + i * 60} className={`relative w-full overflow-hidden ${img.h}`}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

export function FamilyGallery() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">The Work</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Real Families. <em className="italic">Real Sessions.</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Every family. Every stage. Every combination of chaos and love.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <GalleryColumn images={leftCol} baseDelay={0} />
          <GalleryColumn images={rightCol} baseDelay={80} />
        </div>

        <AnimateOnScroll delay={200} className="flex justify-center mt-12">
          <a href="#contact"><Button variant="ghost">See More Family Sessions</Button></a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
