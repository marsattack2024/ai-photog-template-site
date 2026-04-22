import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Reach Out",
    body: "Fill out the form and tell us a little about your family \u2014 ages, pets, the vibe you\u2019re going for. You\u2019ll hear back personally within 24 hours.",
  },
  {
    number: "02",
    title: "We Plan Together",
    body: "Once you book, you\u2019ll get a full prep guide \u2014 wardrobe tips for the whole crew, location options, and a timeline that accounts for nap schedules and short attention spans.",
  },
  {
    number: "03",
    title: "Show Up & Be You",
    body: "Every pose is guided but never forced. Kids can run, babies can cry, and the dog can photobomb. That\u2019s the whole point. We capture real life \u2014 just beautifully lit.",
  },
];

export function FamilyProcess() {
  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">How It Works</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 leading-tight md:text-5xl">
            From First Message to{" "}
            <em className="italic">Family Gallery</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Designed to be easy &mdash; especially when you&apos;re wrangling kids.
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
