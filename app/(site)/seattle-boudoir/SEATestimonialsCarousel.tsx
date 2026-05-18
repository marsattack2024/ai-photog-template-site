import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const testimonials = [
  {
    quote:
      "Most empowering thing I have ever done for myself. I walked in nervous and walked out a different woman. The way Molly makes you feel seen is hard to put into words. You just have to do it to understand.",
    name: "Megan H.",
    detail: "Solo empowerment",
  },
  {
    quote:
      "I have done boudoir at two other studios in Seattle. Nothing comes close to this. The sets, the editing, the actual artistry. These aren't snapshots — they are cinematic art. I will be back for my 40th.",
    name: "Monica D.",
    detail: "Returning client",
  },
  {
    quote:
      "My partner cried when I gave him the album. He said he didn't know I saw myself that way. That is exactly the point — I didn't, until Molly showed me. Book this. Tell the voice in your head to be quiet and just book it.",
    name: "Brittany S.",
    detail: "Bridal gift",
  },
  {
    quote:
      "I did this after my divorce to reclaim something for myself. I cannot believe what Molly brought out of me. Three of those images are hanging in my hallway. They are the first thing I see every morning now.",
    name: "Carrie M.",
    detail: "Reclaiming session",
  },
  {
    quote:
      "As a plus-size woman I was terrified. I have spent my whole life hiding from cameras. These photos are the first time I have ever wanted to be seen. Molly is a miracle worker. I cried at the viewing — happy tears.",
    name: "Danielle F.",
    detail: "First boudoir",
  },
  {
    quote:
      "We did couples boudoir for our anniversary. Best decision in a marriage full of good decisions. Molly directed every pose, took every awkward moment off our shoulders. The album is now our most prized possession.",
    name: "Laura & Kai",
    detail: "Couples boudoir",
  },
];

export function SEATestimonialsCarousel() {
  return (
    <section className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Lovely Words
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            They Were Nervous Too.{" "}
            <em className="italic">Read What Happened.</em>
          </h2>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
          {testimonials.map((t, i) => (
            <AnimateOnScroll
              key={t.name}
              delay={i * 60}
              className="bg-(--color-ink) flex flex-col gap-5 p-8"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-(--color-accent) text-sm">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="font-serif text-lg italic text-(--color-cream)/85 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-(--color-cream)">
                  {t.name}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-(--color-cream)/40 mt-0.5">
                  {t.detail}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="text-center">
          <a
            href="#book"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-white/20 text-(--color-cream) px-8 py-4 hover:bg-white/8 transition-colors duration-300"
          >
            I&apos;m Ready &mdash; Book My Session
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
