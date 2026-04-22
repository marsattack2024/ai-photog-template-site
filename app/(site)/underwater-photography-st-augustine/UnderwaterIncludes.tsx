import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const columns = [
  {
    phase: "Before Your Session",
    items: [
      "Free 15-minute phone consultation",
      "Complete wardrobe guidance + mood board",
      "Water acclimation coaching and prep tips",
      "Access to Jennifer\u2019s couture gown & fabric collection",
      "Dry-land rehearsal before anyone gets wet",
    ],
  },
  {
    phase: "Your Session Day",
    items: [
      "2\u20133 hours at private indoor heated pool",
      "Jennifer in the water guiding every single shot",
      "Dedicated safety swimmer on-site at all times",
      "Posing direction from eyelash to pointed toe",
      "Unlimited wardrobe changes during session",
    ],
  },
  {
    phase: "What You Take Home",
    items: [
      "Private online gallery within 2\u20133 weeks",
      "50+ fully edited high-resolution images",
      "Fine-art prints, canvas, and metal print options",
      "Digital files included with print purchases",
      "Images used only with your written permission",
    ],
  },
];

export function UnderwaterIncludes() {
  return (
    <section className="py-24 px-6 bg-(--color-ink)">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">What\u2019s Included</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            No Surprises.{" "}
            <em className="italic">Just Results.</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            You show up. Jennifer handles everything else.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {columns.map((col, i) => (
            <AnimateOnScroll
              key={col.phase}
              delay={i * 80}
              className="bg-(--color-ink) flex flex-col gap-5 p-8"
            >
              <h3 className="text-xs tracking-widest uppercase text-(--color-accent) pb-4 border-b border-white/10">
                {col.phase}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-(--color-accent) mt-0.5 shrink-0">\u2713</span>
                    <span className="text-sm text-(--color-cream)/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
