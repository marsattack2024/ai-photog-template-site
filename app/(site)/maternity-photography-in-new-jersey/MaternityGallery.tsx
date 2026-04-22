import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui";

const leftCol = [
  { src: "/placeholder/portrait.svg", alt: "Maternity boudoir session — studio gown", h: "h-[480px]" },
  { src: "/placeholder/landscape.svg", alt: "Maternity session — partner hands on bump", h: "h-[300px]" },
  { src: "/placeholder/portrait.svg", alt: "Maternity boudoir — draped fabric", h: "h-[540px]" },
  { src: "/placeholder/landscape.svg", alt: "Maternity session — natural light", h: "h-[280px]" },
];

const rightCol = [
  { src: "/placeholder/landscape.svg", alt: "Maternity boudoir — silhouette", h: "h-[260px]" },
  { src: "/placeholder/portrait.svg", alt: "Maternity session — flowing gown", h: "h-[510px]" },
  { src: "/placeholder/landscape.svg", alt: "Maternity boudoir — detail shot", h: "h-[260px]" },
  { src: "/placeholder/portrait.svg", alt: "Maternity session — expecting mother", h: "h-[480px]" },
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

export function MaternityGallery() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">The Work</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Real Mamas. <em className="italic">Real Sessions.</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Every body. Every trimester. Every woman who decided this chapter deserved to be remembered.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <GalleryColumn images={leftCol} baseDelay={0} />
          <GalleryColumn images={rightCol} baseDelay={80} />
        </div>

        <AnimateOnScroll delay={200} className="flex justify-center mt-12">
          <a href="#contact"><Button variant="ghost">See More Maternity Sessions</Button></a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
