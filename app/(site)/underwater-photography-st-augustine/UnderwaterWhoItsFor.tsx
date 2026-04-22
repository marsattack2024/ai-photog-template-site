import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const types = [
  {
    number: "01",
    title: "Maternity",
    headline: "Your belly, underwater.",
    body: "Nothing captures the magic of pregnancy like seeing yourself weightless and glowing beneath the surface. Maternity underwater portraits are the session you will look at for the rest of your life.",
  },
  {
    number: "02",
    title: "Mermaids at Heart",
    headline: "Embrace your inner mermaid.",
    body: "Jennifer grew up in Virginia Beach \u2014 where mermaids are literally the official city mascot \u2014 and has considered herself one her whole life. If that resonates, you are in exactly the right place.",
  },
  {
    number: "03",
    title: "Fine Art & Empowerment",
    headline: "You, unbound.",
    body: "For the woman who wants something extraordinary. A portrait that doesn\u2019t look like anything else on her wall. Artistic, dreamlike, and completely, unmistakably her.",
  },
  {
    number: "04",
    title: "Milestone",
    headline: "Mark the moment.",
    body: "Significant birthday. Big move. A year you fought hard for. An underwater portrait says \u201cI was here\u201d in a way no other photograph can. It belongs on a wall, not a phone screen.",
  },
  {
    number: "05",
    title: "Family",
    headline: "The whole crew, floating.",
    body: "Kids flying through the water, parents laughing, bubbles everywhere. Family underwater sessions are one of the most joyful, genuinely fun ways to spend a Saturday morning.",
  },
  {
    number: "06",
    title: "Just Curious",
    headline: "Curiosity is enough.",
    body: "You don\u2019t need a special reason to do something beautiful. Most of Jennifer\u2019s clients had no idea why they booked \u2014 they just knew they had to. A 15-minute call will tell you if it\u2019s right.",
  },
];

export function UnderwaterWhoItsFor() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Who Books</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            You\u2019ll Recognize Yourself{" "}
            <em className="italic">in One of These.</em>
          </h2>
          <p className="text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Most clients arrive with a reason. Some come with just a feeling. Both are completely valid.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-(--color-border)">
          {types.map((t, i) => (
            <AnimateOnScroll
              key={t.number}
              delay={i * 60}
              className="bg-(--color-cream) flex flex-col gap-3 p-8"
            >
              <span className="text-xs tracking-widest uppercase text-(--color-muted)">{t.number} &mdash; {t.title}</span>
              <h3 className="font-serif text-xl text-(--color-ink) leading-snug">{t.headline}</h3>
              <p className="text-sm leading-relaxed text-(--color-muted)">{t.body}</p>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-(--color-ink) text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
          >
            Book My Free Consultation
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
