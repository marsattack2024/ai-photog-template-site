import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui";

const leftCol = [
  { src: "/images/underwater/gallery-01.webp", alt: "Underwater portrait — two women in flowing gowns, golden springs", h: "h-[500px]" },
  { src: "/images/underwater/gallery-09.webp", alt: "Underwater portrait — woman in shell corset with fish in crystal springs", h: "h-[460px]" },
  { src: "/images/underwater/gallery-03.webp", alt: "Underwater session — freediver ascending through light and bubbles", h: "h-[440px]" },
  { src: "/images/underwater/gallery-02.webp", alt: "Underwater portrait — woman in blue dress looking up through pool water", h: "h-[420px]" },
];

const rightCol = [
  { src: "/images/underwater/gallery-12.webp", alt: "Underwater session — mermaid tail descending through sunlit springs", h: "h-[320px]" },
  { src: "/images/underwater/gallery-04.webp", alt: "Underwater portrait — figure ascending through dark water, black and white", h: "h-[400px]" },
  { src: "/images/underwater/gallery-08.webp", alt: "Underwater session — two women embracing in natural springs", h: "h-[500px]" },
  { src: "/images/underwater/gallery-07.jpg", alt: "Underwater portrait — St. Augustine fine art portrait", h: "h-[320px]" },
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

export function UnderwaterGallery() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">The Work</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Real People. <em className="italic">Extraordinary Images.</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Every one of these clients said they were nervous. Every one of them says the session
            was one of the best experiences of their life.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <GalleryColumn images={leftCol} baseDelay={0} />
          <GalleryColumn images={rightCol} baseDelay={80} />
        </div>

        <AnimateOnScroll delay={200} className="flex justify-center mt-12">
          <a href="#contact"><Button variant="ghost">Book Your Underwater Session</Button></a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
