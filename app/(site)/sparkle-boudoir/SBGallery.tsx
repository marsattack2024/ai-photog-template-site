import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const leftCol = [
  { src: "/sparkle/gallery-1.jpg", alt: "Luxury boudoir portrait at Empower & Sparkle Boudoir Fredericksburg VA", h: "h-[280px] md:h-[500px]" },
  { src: "/sparkle/gallery-2.jpg", alt: "Boudoir photography session at Sparkle Boudoir studio", h: "h-[200px] md:h-[320px]" },
  { src: "/sparkle/gallery-3.jpg", alt: "Empowerment boudoir session in downtown Fredericksburg", h: "h-[260px] md:h-[480px]" },
  { src: "/sparkle/gallery-4.jpg", alt: "Boudoir portrait by Seydi at Sparkle Boudoir", h: "h-[200px] md:h-[320px]" },
  { src: "/sparkle/gallery-5.jpg", alt: "Fine art boudoir photography Virginia", h: "h-[280px] md:h-[500px]" },
];

const middleCol = [
  { src: "/sparkle/gallery-6.jpg", alt: "Boudoir session by Seydi at Empower & Sparkle Boudoir", h: "h-[200px] md:h-[320px]" },
  { src: "/sparkle/gallery-7.jpg", alt: "Luxury boudoir studio Fredericksburg Virginia", h: "h-[260px] md:h-[480px]" },
  { src: "/sparkle/gallery-8.jpg", alt: "Empowerment boudoir photography at Sparkle Boudoir", h: "h-[280px] md:h-[500px]" },
  { src: "/sparkle/gallery-9.jpg", alt: "Boudoir portrait in Fredericksburg VA", h: "h-[200px] md:h-[320px]" },
  { src: "/sparkle/gallery-10.jpg", alt: "Fine art boudoir at Sparkle Boudoir studio", h: "h-[260px] md:h-[480px]" },
];

const rightCol = [
  { src: "/sparkle/gallery-11.jpg", alt: "Boudoir photography by Seydi in Virginia", h: "h-[280px] md:h-[500px]" },
  { src: "/sparkle/gallery-12.jpg", alt: "Luxury boudoir session at Empower & Sparkle", h: "h-[200px] md:h-[320px]" },
  { src: "/sparkle/gallery-13.jpg", alt: "Boudoir portrait session Fredericksburg", h: "h-[260px] md:h-[480px]" },
  { src: "/sparkle/gallery-14.jpg", alt: "Empowerment session at Sparkle Boudoir", h: "h-[200px] md:h-[320px]" },
  { src: "/sparkle/gallery-15.jpg", alt: "Fine art boudoir photography Fredericksburg Virginia", h: "h-[280px] md:h-[500px]" },
];

function GalleryColumn({
  images,
  baseDelay = 0,
}: {
  images: typeof leftCol;
  baseDelay?: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      {images.map((img, i) => (
        <AnimateOnScroll
          key={i}
          delay={baseDelay + i * 60}
          className={`relative w-full overflow-hidden ${img.h}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

export function SBGallery() {
  return (
    <section id="gallery" className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">
            The Work
          </span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Real Women.{" "}
            <em className="italic">Extraordinary Images.</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Every one of these clients said she wasn&apos;t sure she was ready.
            Every one of them was wrong.
          </p>
        </AnimateOnScroll>

        {/* Desktop: 3-column masonry. Mobile: flat grid of all images */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          <GalleryColumn images={leftCol} baseDelay={0} />
          <GalleryColumn images={middleCol} baseDelay={60} />
          <GalleryColumn images={rightCol} baseDelay={120} />
        </div>
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {[...leftCol.slice(0, 3), ...middleCol.slice(0, 3), ...rightCol.slice(0, 3)].map((img, i) => (
            <AnimateOnScroll
              key={i}
              delay={i * 40}
              className="relative w-full h-[220px] overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                sizes="50vw"
              />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="flex justify-center mt-12">
          <a
            href="#book"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-(--color-ink) text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
          >
            Book My Session
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
