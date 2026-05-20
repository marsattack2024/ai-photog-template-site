import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui";

const leftCol = [
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[480px]" },
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[300px]" },
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[540px]" },
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[280px]" },
];

const rightCol = [
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[260px]" },
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[510px]" },
  { src: "/placeholder/landscape.svg", alt: "Session photo", h: "h-[260px]" },
  { src: "/placeholder/portrait.svg", alt: "Session photo", h: "h-[480px]" },
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
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
          />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

export function GalleryGrid() {
  return (
    <section className="bg-(--color-cream) py-[var(--space-section-y)] px-[var(--space-section-x)]">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-[var(--space-heading-body-gap)]">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">The Work</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-[var(--space-heading-eyebrow-gap)] md:text-5xl">
            Real People. <em className="italic">Real Sessions.</em>
          </h2>
          <p className="mt-[var(--space-subheading-gap)] text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Not models. Not staged. Just everyday people who decided to show up for themselves.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <GalleryColumn images={leftCol} baseDelay={0} />
          <GalleryColumn images={rightCol} baseDelay={80} />
        </div>

        <AnimateOnScroll delay={200} className="flex justify-center mt-12">
          <a href="#contact"><Button variant="ghost">View Full Gallery</Button></a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
