import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SEAMeetMolly() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <AnimateOnScroll
          from="left"
          className="relative h-[560px] lg:h-[680px] overflow-hidden"
        >
          <Image
            src="/seattle/sbc-12.webp"
            alt="Molly Blair, founder of Seattle Boudoir & Co in downtown Seattle Washington"
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
            Meet Molly
          </h2>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I&apos;m Molly Blair — owner, photographer, and the person who
            will be fixing your hair between frames, coaching your
            expressions, and telling you you look incredible until you
            actually start to believe it.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            My background is in fine art, interior design, and storytelling.
            That mix is why our Seattle studio doesn&apos;t feel like a
            photography set — it feels like a space designed to bring out a
            version of you no camera has ever caught before. Every set, every
            light, every detail was built on purpose.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I&apos;ve faced moments that could have broken me. That&apos;s
            part of why I do this. I know how transformative it is to be
            truly seen. Inside this studio you&apos;ll find no judgement,
            no body that&apos;s &ldquo;too much&rdquo; or &ldquo;not
            enough,&rdquo; no one love that&apos;s more valid than another.
            Everyone is welcome. Everyone is celebrated.
          </p>

          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { num: "689+", label: "Sessions slayed" },
              { num: "Solo · Couples · Bridal", label: "Sessions offered" },
              { num: "All Bodies", label: "Genuinely welcome" },
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
            Book My Experience with Molly
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
