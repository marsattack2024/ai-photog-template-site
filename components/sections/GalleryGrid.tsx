import Image from "next/image";

const images = [
  { src: "https://placehold.co/800x1000/d4c5b2/6b5e4e?text=Portrait+1", alt: "Portrait session 1" },
  { src: "https://placehold.co/800x600/c8b9a8/6b5e4e?text=Portrait+2", alt: "Portrait session 2" },
  { src: "https://placehold.co/800x1000/bfae9e/6b5e4e?text=Portrait+3", alt: "Portrait session 3" },
  { src: "https://placehold.co/800x600/d4c5b2/6b5e4e?text=Portrait+4", alt: "Portrait session 4" },
  { src: "https://placehold.co/800x1000/c8b9a8/6b5e4e?text=Portrait+5", alt: "Portrait session 5" },
  { src: "https://placehold.co/800x600/bfae9e/6b5e4e?text=Portrait+6", alt: "Portrait session 6" },
];

export function GalleryGrid() {
  return (
    <section id="gallery" className="py-24 px-6 bg-(--color-border)/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">The Work</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Real People.{" "}
            <em className="italic">Real Results.</em>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img) => (
            <div key={img.src} className="relative overflow-hidden aspect-[4/5]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
