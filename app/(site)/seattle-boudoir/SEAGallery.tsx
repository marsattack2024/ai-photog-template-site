import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const leftCol = [
  { src: "/seattle/sls-1.webp", alt: "Luxury boudoir portrait at Seattle Boudoir & Co downtown Seattle", h: "h-[280px] md:h-[500px]" },
  { src: "/seattle/sbc-3.jpg", alt: "Editorial boudoir photography session in Seattle Washington", h: "h-[200px] md:h-[320px]" },
  { src: "/seattle/sls-4.webp", alt: "Fine art boudoir at Seattle Boudoir studio", h: "h-[260px] md:h-[480px]" },
  { src: "/seattle/sbc-10.webp", alt: "Seattle boudoir studio set and styling", h: "h-[200px] md:h-[320px]" },
  { src: "/seattle/sls-7.webp", alt: "Luxury boudoir studio portrait downtown Seattle", h: "h-[280px] md:h-[500px]" },
];

const middleCol = [
  { src: "/seattle/sbc-2.webp", alt: "Inclusive boudoir photography for all genders Seattle", h: "h-[200px] md:h-[320px]" },
  { src: "/seattle/sls-2.webp", alt: "Bridal boudoir photography session Seattle WA", h: "h-[260px] md:h-[480px]" },
  { src: "/seattle/sls-6.webp", alt: "Solo boudoir session at Seattle Boudoir & Co", h: "h-[280px] md:h-[500px]" },
  { src: "/seattle/sbc-14.jpg", alt: "Fine art boudoir portrait Seattle Washington", h: "h-[200px] md:h-[320px]" },
  { src: "/seattle/sls-10.webp", alt: "Cinematic boudoir photography by Seattle Boudoir Company", h: "h-[260px] md:h-[480px]" },
];

const rightCol = [
  { src: "/seattle/sls-3.webp", alt: "Editorial luxury boudoir Seattle Washington", h: "h-[280px] md:h-[500px]" },
  { src: "/seattle/sbc-8.webp", alt: "Seattle boudoir photo session at Seattle Boudoir & Co", h: "h-[200px] md:h-[320px]" },
  { src: "/seattle/sls-8.webp", alt: "Boudoir portrait at downtown Seattle studio", h: "h-[260px] md:h-[480px]" },
  { src: "/seattle/sbc-13.webp", alt: "Boudoir photography for all genders and all loves Seattle", h: "h-[200px] md:h-[320px]" },
  { src: "/seattle/sls-12.webp", alt: "Luxury boudoir experience at Seattle Boudoir & Co", h: "h-[280px] md:h-[500px]" },
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

export function SEAGallery() {
  return (
    <section id="gallery" className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">
            The Work
          </span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Real People.{" "}
            <em className="italic">Unforgettable Images.</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Every one of these clients said she wasn&apos;t sure she was ready.
            Every one of them was wrong.
          </p>
        </AnimateOnScroll>

        {/* Desktop: 3-column masonry. Mobile: flat grid */}
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
