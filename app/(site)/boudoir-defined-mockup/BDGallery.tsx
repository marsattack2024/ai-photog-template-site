import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const BASE = "https://www.boudoirdefined.com/wp-content/uploads/";

const leftCol = [
  { src: `${BASE}2023/01/240201_MeggieLyons_042-688x1024.jpg`, alt: "Luxury boudoir portrait by Cyndee at Boudoir Defined, Meridian Idaho", h: "h-[520px]" },
  { src: `${BASE}2023/01/230126_BrendaAlfaro_085-688x1024.jpg`, alt: "Empowerment boudoir session at Boudoir Defined studio", h: "h-[460px]" },
  { src: `${BASE}2023/01/240227_AngelineTiseo_037-688x1024.jpg`, alt: "Fine art boudoir portrait Meridian Idaho", h: "h-[500px]" },
  { src: `${BASE}2023/03/BoudoirDefinedPhotographyBoiseIdaho_0054-686x1024.jpg`, alt: "Boudoir photography Boise Idaho by Boudoir Defined", h: "h-[440px]" },
];

const rightCol = [
  { src: `${BASE}2023/01/230908_KristinSzofran_061-768x516.jpg`, alt: "Boudoir portrait session at Boudoir Defined Idaho", h: "h-[380px]" },
  { src: `${BASE}2023/03/BoudoirDefinedPhotographyBoiseIdaho_0047-686x1024.jpg`, alt: "Luxury boudoir studio Meridian Idaho — Boudoir Defined", h: "h-[500px]" },
  { src: `${BASE}2023/01/240124_LaneMillican_016-688x1024.jpg`, alt: "Boudoir session by Cyndee at Boudoir Defined", h: "h-[460px]" },
  { src: `${BASE}2023/03/BoudoirDefinedPhotographyBoiseIdaho_0035-686x1024.jpg`, alt: "Fine art boudoir portrait at Boudoir Defined in Idaho", h: "h-[500px]" },
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
            className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </AnimateOnScroll>
      ))}
    </div>
  );
}

export function BDGallery() {
  return (
    <section id="gallery" className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">The Work</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Real Women.{" "}
            <em className="italic">Extraordinary Images.</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Every one of these clients said she wasn&apos;t sure she was the right person for this.
            Every one of them was wrong.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <GalleryColumn images={leftCol} baseDelay={0} />
          <GalleryColumn images={rightCol} baseDelay={80} />
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
