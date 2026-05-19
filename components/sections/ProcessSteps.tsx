import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Reach Out",
    body: "Fill out the contact form. You'll hear back personally within 24 hours — no automated responses, no pressure. Just a real conversation about what you're looking for.",
  },
  {
    number: "02",
    title: "We Plan Together",
    body: "Once you book, you'll get everything you need to prepare — what to wear, what to expect, how to get ready. You will never walk in blind or figure it out alone.",
  },
  {
    number: "03",
    title: "Show Up & Be You",
    body: "Every pose, every angle, every expression is guided. Your only job is to show up. The rest is handled. Most people forget they were nervous within the first few minutes.",
  },
];

export interface ProcessStepsProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheading?: string;
  steps?: ProcessStep[];
}

export function ProcessSteps({
  eyebrow = "How It Works",
  headline = (
    <>
      Here&apos;s What Happens <em className="italic">After You Reach Out</em>
    </>
  ),
  subheading = "The whole experience is designed to feel simple and guided from the very first message.",
  steps = DEFAULT_PROCESS_STEPS,
}: ProcessStepsProps = {}) {
  return (
    <section className="bg-(--color-cream) py-[var(--space-section-y)] px-[var(--space-section-x)] border-t border-(--color-border)">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">
            {eyebrow}
          </span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-[var(--space-heading-eyebrow-gap)] leading-tight md:text-5xl">
            {headline}
          </h2>
          {subheading && (
            <p className="mt-[var(--space-subheading-gap)] text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
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
