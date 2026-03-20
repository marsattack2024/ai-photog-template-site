const reasons = [
  {
    title: "Fully Guided Sessions",
    body: "No awkward silences or blank stares. I direct every pose so you always know what to do.",
  },
  {
    title: "Style Consultation Included",
    body: "Before your session, we'll talk outfits, locations, and vision so nothing is left to chance.",
  },
  {
    title: "Same-Week Gallery Delivery",
    body: "Your edited gallery arrives within 5 business days — not months.",
  },
  {
    title: "Unlimited Print Rights",
    body: "Print wherever, whenever. Your images are yours to keep forever.",
  },
  {
    title: "Natural Light Expertise",
    body: "Every session is timed and located to maximize the most flattering light for your skin tone.",
  },
  {
    title: "100% Satisfaction Guarantee",
    body: "If you're not in love with your gallery, I'll reshoot — no questions asked.",
  },
];

export function WhyBook() {
  return (
    <section className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Why Book With Me</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Everything You Need.{" "}
            <em className="italic">Nothing You Don&apos;t.</em>
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
