import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    number: "01",
    title: "Schedule Your Free Consultation",
    body: "Fill out the form below and we\u2019ll schedule a quick phone call. We\u2019ll talk about your vision, your location preference (heated pool or natural springs), and any questions you have. No pressure, no pitch \u2014 just Jennifer, personally, making sure this is right for you.",
  },
  {
    number: "02",
    title: "We Plan Your Session Together",
    body: "Once you\u2019re booked, you\u2019ll receive a detailed planning guide. Jennifer has a full wardrobe of couture gowns, silks, lingerie, and mermaid tails \u2014 all chosen specifically for underwater work. You can bring your own pieces too. We\u2019ll talk through every detail before your session day.",
  },
  {
    number: "03",
    title: "The Dry-Land Rehearsal",
    body: "Your session begins before you touch the water. Jennifer walks you through every movement, breath technique, and pose on dry land first. By the time you step in, nothing is a surprise. Clients consistently say this is when the nerves completely disappear.",
  },
  {
    number: "04",
    title: "You Become the Image",
    body: "You hold for 10 to 15 seconds. Jennifer is underwater with you, directing every detail in real time \u2014 hands, hair, expression, fabric. You surface, breathe, and look at the screen. Most clients go quiet when they see the first image. Some cry. That\u2019s always a good sign.",
  },
];

export function UnderwaterProcess() {
  return (
    <section className="bg-(--color-cream) py-24 px-6 border-t border-(--color-border)">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">How It Works</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 leading-tight md:text-5xl">
            From First Call to{" "}
            <em className="italic">Final Gallery</em>
          </h2>
          <p className="mt-4 text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Jennifer guides you through every step. You just show up. She handles the rest.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-0 md:divide-x md:divide-(--color-border)">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={step.number}
              delay={i * 100}
              className="flex flex-col gap-5 px-8 py-10"
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
