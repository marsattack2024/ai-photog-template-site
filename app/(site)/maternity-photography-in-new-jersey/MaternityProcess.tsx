import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Reach Out",
    body: "Fill out the form below and tell me a little about your due date and vision. You\u2019ll hear back personally within 24 hours \u2014 no bots, no pressure. Just a real conversation about what this session could look like for you.",
  },
  {
    number: "02",
    title: "We Plan Your Session",
    body: "Once you book, you\u2019ll receive a full prep guide \u2014 what to wear, how to prep your skin, when to schedule around your energy levels. We\u2019ll talk wardrobe, props, and whether you want partner or sibling shots included.",
  },
  {
    number: "03",
    title: "Show Up & Glow",
    body: "Every angle, every drape, every expression is guided. You don\u2019t need to know how to pose \u2014 you just need to show up. Most mamas forget they were nervous within the first five minutes.",
  },
];

export function MaternityProcess() {
  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">How It Works</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 leading-tight md:text-5xl">
            From First Message to{" "}
            <em className="italic">Final Gallery</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            The whole experience is designed to feel effortless &mdash; especially when you&apos;re already carrying enough.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-0 md:divide-x md:divide-(--color-border)">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={step.number}
              delay={i * 120}
              className="flex flex-col gap-5 px-8 py-10 first:pl-0 last:pr-0"
            >
              <span className="font-serif text-7xl text-(--color-accent) opacity-20 leading-none">
                {step.number}
              </span>
              <div className="w-8 h-px bg-(--color-border)" />
              <h3 className="font-serif text-2xl text-(--color-ink) font-normal">
                {step.title}
              </h3>
              <p className="text-sm text-(--color-muted) leading-relaxed">{step.body}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
