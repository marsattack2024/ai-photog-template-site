import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function BDMeetCyndee() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <AnimateOnScroll from="left" className="relative h-[560px] lg:h-[680px] overflow-hidden">
          <Image
            src="https://www.boudoirdefined.com/wp-content/uploads/2019/07/Cyndee.jpg"
            alt="Cyndee, founder of Boudoir Defined studio in Meridian Idaho"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </AnimateOnScroll>

        {/* Copy */}
        <AnimateOnScroll from="right" className="flex flex-col gap-6">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Your Photographer</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Meet Cyndee
          </h2>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I&apos;m a wife, a mama, and a photographer who spent most of her early adult life
            pouring into everyone else. In my early 40s I looked up and realized I hadn&apos;t
            done something just for me in years. That realization is what built Boudoir Defined.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I&apos;m not here to give you a polished marketing version of yourself. I&apos;m here
            to show you something real — the version of you that&apos;s been there the whole time,
            waiting for someone to pay attention to her. That is my entire job.
          </p>

          <p className="text-sm leading-relaxed text-(--color-muted)">
            I have photographed women from 18 to their late 60s. Every size, every background,
            every story. The one thing that has never changed: the look on a woman&apos;s face
            when she sees herself the way I see her.
          </p>

          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { num: "10+", label: "Years in business" },
              { num: "200+", label: "Women photographed" },
              { num: "5.0★", label: "Average Google rating" },
              { num: "100%", label: "Private, always" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-serif text-2xl text-(--color-ink)">{s.num}</span>
                <span className="text-[10px] tracking-widest uppercase text-(--color-muted)">{s.label}</span>
              </div>
            ))}
          </div>

          <a
            href="#book"
            className="self-start inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-8 py-4 hover:opacity-90 transition-opacity duration-300 mt-2"
          >
            Book a Free Call with Cyndee
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
