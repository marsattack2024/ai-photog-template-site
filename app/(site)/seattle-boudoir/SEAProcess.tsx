import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Inquire & Consult",
    body: "Send us a note. We'll set up a real conversation — what you're hoping to feel, what excites you, what makes you nervous. No pitch. No pressure. Just clarity before you commit a single dollar.",
  },
  {
    number: "02",
    title: "Lock Your Date & Prep",
    body: "Once you book, you'll get our complete planning guide: what to wear, what to bring, how to prep your skin. Read your emails, hydrate, sleep, and arrive nourished. We handle hair, makeup, and wardrobe ideas before you even walk in.",
  },
  {
    number: "03",
    title: "Your Studio Day",
    body: "Arrive at our private downtown Seattle studio. Get pampered with professional hair and makeup. Then we shoot — across luxe, hand-built sets — with expert posing direction the entire time. You don't pose. You get posed.",
  },
  {
    number: "04",
    title: "Same-Week Reveal",
    body: "We deliver a same-day sneak peek, then a same-week viewing and ordering appointment where you see every finished image. Pick your favorites. Plan your album, your wall art, your digital files. Gush over yourself forever.",
  },
];

export function SEAProcess() {
  return (
    <section className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            How It Works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Four Steps to{" "}
            <em className="italic">Photos You&apos;ll Never Stop Looking At</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            The whole experience is designed to feel effortless. We&apos;ve
            done this 689+ times. You just show up.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {steps.map((s, i) => (
            <AnimateOnScroll
              key={s.number}
              delay={i * 80}
              className="bg-(--color-ink) flex flex-col gap-4 p-8"
            >
              <span className="font-serif text-5xl text-(--color-accent)/25 leading-none">
                {s.number}
              </span>
              <h3 className="font-serif text-xl text-(--color-cream) leading-snug">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-(--color-cream)/60">
                {s.body}
              </p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
