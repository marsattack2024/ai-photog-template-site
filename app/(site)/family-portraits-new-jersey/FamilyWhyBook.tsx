const reasons = [
  {
    title: "Every Pose Is Guided",
    body: "No awkward standing around. We direct every grouping, every hand placement, every angle \u2014 so everyone looks natural and nobody feels lost.",
  },
  {
    title: "Kids Can Be Kids",
    body: "We build in time for little ones to warm up, run around, and be themselves. Forced smiles don\u2019t hang on walls. Real moments do.",
  },
  {
    title: "Wardrobe Guidance Included",
    body: "A full style guide for the whole family \u2014 what to wear, what to avoid, and how to coordinate without looking like a catalog.",
  },
  {
    title: "Multi-Generational Welcome",
    body: "Grandparents, cousins, the family dog. We plan the session flow so everyone gets their moment without chaos.",
  },
  {
    title: "Two-Week Gallery Delivery",
    body: "Your edited gallery arrives within two weeks. No waiting months to see your family on the wall.",
  },
  {
    title: "Studio or Outdoor Options",
    body: "Private Montclair studio or your favorite NJ outdoor location. We\u2019ll help you choose the best setting for your family\u2019s vibe.",
  },
];

export function FamilyWhyBook() {
  return (
    <section className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Why Book With Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Designed Around{" "}
            <em className="italic">Real Families</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col gap-3 border-t border-(--color-border) pt-6">
              <h3 className="font-serif text-xl text-(--color-ink)">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-muted)">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
