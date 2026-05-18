import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SBMeetSeydi() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <AnimateOnScroll
          from="left"
          className="relative h-[560px] lg:h-[680px] overflow-hidden"
        >
          <Image
            src="/sparkle/seydi.jpg"
            alt="Seydi, founder of Empower & Sparkle Boudoir in Fredericksburg Virginia"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </AnimateOnScroll>

        {/* Copy */}
        <AnimateOnScroll from="right" className="flex flex-col gap-6">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Your Photographer
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Meet Seydi
          </h2>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I&apos;m Seydi — owner, photographer, and the woman who will be
            fixing your hair between shots, coaching your expressions, and
            telling you how incredible you look until you finally believe it.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            Born and raised in California, I spent six years in Japan before
            bringing my studio to downtown Fredericksburg, Virginia. I&apos;ve
            been behind the camera for over 20 years, internationally published,
            and I transitioned to exclusively boudoir because I believe every
            woman deserves to see herself the way the people who love her have
            always seen her.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I don&apos;t believe in filters. I believe in crafting art. Every
            image is individually edited to remove distractions while preserving
            the real, beautiful, powerful you. The version of you that&apos;s been
            there the whole time — just waiting for someone to pay attention.
          </p>

          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { num: "20+", label: "Years behind the lens" },
              { num: "1,000+", label: "Wardrobe pieces" },
              { num: "10+", label: "Cinematic scene sets" },
              { num: "100%", label: "Guided & private" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-serif text-2xl text-(--color-ink)">
                  {s.num}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-(--color-muted)">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#book"
            className="self-start inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-8 py-4 hover:opacity-90 transition-opacity duration-300 mt-2"
          >
            Book My Experience with Seydi
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
