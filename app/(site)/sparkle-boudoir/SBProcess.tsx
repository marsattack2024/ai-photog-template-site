import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Schedule a Consultation",
    body: "Reach out and we'll talk through your vision — what you're hoping to feel, what you're nervous about, what sets excite you. No pressure. Just a real conversation to make sure this is the right fit.",
  },
  {
    number: "02",
    title: "We Prepare Everything",
    body: "After booking, you'll receive a complete planning guide. What to bring, how to prepare, what to expect. Then we handle the rest: professional hair, makeup, lash application, and wardrobe from our 1,000+ piece collection.",
  },
  {
    number: "03",
    title: "Your Session Day",
    body: "You arrive at our private studio in downtown Fredericksburg. Our artist transforms you. Then I take over — posing every angle with 20 years of expert direction, making you laugh, making you feel genuinely beautiful across 10+ cinematic sets.",
  },
  {
    number: "04",
    title: "Same-Day Cinematic Reveal",
    body: "After a champagne lunch break, you see your fully edited images that same afternoon — on a large screen, cinematic-style. No waiting weeks wondering if they came out. They came out. Then you choose your favorites.",
  },
];

export function SBProcess() {
  return (
    <section className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            How It Works
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Four Steps to{" "}
            <em className="italic">Your Most Powerful Photos</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            The whole experience is designed to feel effortless. Seydi has been
            doing this for over 20 years. You just show up.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {steps.map((s, i) => (
            <AnimateOnScroll
              key={s.number}
              delay={i * 80}
              className="bg-(--color-ink) flex flex-col gap-4 p-8"
            >
              <span className="font-serif text-5xl text-(--color-accent)/20 leading-none">
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
