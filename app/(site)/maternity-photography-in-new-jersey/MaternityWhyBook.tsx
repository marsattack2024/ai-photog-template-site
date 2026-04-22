const reasons = [
  {
    title: "Fully Guided Posing",
    body: "No awkward guessing. Every pose is directed with your comfort and your bump in mind \u2014 so you always know exactly what to do.",
  },
  {
    title: "Studio Wardrobe Included",
    body: "Flowing gowns, sheer fabrics, and bodysuits sized for expectant mothers. You don\u2019t need to buy a thing.",
  },
  {
    title: "Partner & Sibling Shots Welcome",
    body: "Want your partner\u2019s hands on the bump? Your toddler peeking in? We\u2019ll weave those moments in naturally.",
  },
  {
    title: "Comfortable, Private Studio",
    body: "Climate-controlled, soft lighting, and completely private. Take breaks whenever you need. There is zero rush.",
  },
  {
    title: "Two-Week Gallery Delivery",
    body: "Your edited gallery arrives within two weeks \u2014 well before your due date. No waiting months to see your images.",
  },
  {
    title: "Your Comfort Decides Everything",
    body: "Full skin, draped fabric, or fully clothed \u2014 you choose what feels right. Nothing is ever assumed or pushed.",
  },
];

export function MaternityWhyBook() {
  return (
    <section className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Why Book With Us</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Designed Around{" "}
            <em className="italic">Your Body Right Now</em>
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
