import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "The Free Phone Call",
    body: "15 minutes. No pressure. Cyndee calls you, walks through the vision you have for your session, answers every question, and makes sure this is the right fit. Your calendar and your confidence are all you need.",
  },
  {
    number: "02",
    title: "We Prepare Everything",
    body: "After booking you'll receive our exclusive Dream Guide — everything you need to know before your session. What to bring, what to eat, how to sleep. Then we handle the rest: hair, makeup, wardrobe from our 200-piece collection.",
  },
  {
    number: "03",
    title: "Your Session Day",
    body: "You arrive. Our in-house artist transforms you. Then Cyndee takes over — posing every body type with expert direction, making you laugh, making you feel genuinely beautiful, capturing something you have never seen of yourself before.",
  },
  {
    number: "04",
    title: "Same-Day Reveal",
    body: "You see your fully edited images the same day as your shoot. No waiting weeks wondering if they came out. They came out. Then you choose your favorites, and your final gallery — 50+ images — arrives within 7 days.",
  },
];

export function BDProcess() {
  return (
    <section className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">How It Works</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Four Steps to{" "}
            <em className="italic">Your Most Powerful Photos</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            The whole thing is designed to be easy. Cyndee has done this over 200 times. You just show up.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {steps.map((s, i) => (
            <AnimateOnScroll
              key={s.number}
              delay={i * 80}
              className="bg-(--color-ink) flex flex-col gap-4 p-8"
            >
              <span className="font-serif text-5xl text-(--color-accent)/20 leading-none">{s.number}</span>
              <h3 className="font-serif text-xl text-(--color-cream) leading-snug">{s.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-cream)/60">{s.body}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
