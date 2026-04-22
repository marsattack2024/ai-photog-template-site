const reasons = [
  {
    title: "No Swimming Skills Required",
    body: "As long as you can tread water, you\u2019re qualified. Sessions take place in 5.5-foot-deep water \u2014 most clients can touch the bottom. Pool noodles are available between shots. Jennifer has never had a session she couldn\u2019t make work.",
  },
  {
    title: "Safety Swimmer Present, Always",
    body: "A dedicated safety swimmer is on-site for every session. Their only job is monitoring the environment and your comfort. You are never in the water alone, and the session never moves faster than you do.",
  },
  {
    title: "Expert Posing Direction",
    body: "Jennifer doesn\u2019t just press the shutter. She\u2019s in the water with you, directing hands, fabric, hair, and expression in real time. You won\u2019t guess \u2014 you\u2019ll be guided through every single frame.",
  },
  {
    title: "Full Wardrobe Provided",
    body: "Couture gowns, silk fabrics, lingerie, and mermaid tails \u2014 all purchased specifically for underwater work. Jennifer has pieces in all sizes. You\u2019re also welcome to bring your own. A guide is sent after booking.",
  },
  {
    title: "Heated Pool or Natural Springs",
    body: "Choose between Jennifer\u2019s private saltwater pool (80\u201390\u00b0F, low chlorine) or Florida\u2019s crystal-clear freshwater springs (72\u201374\u00b0F year-round). Each creates a completely different look. Jennifer helps you choose based on your vision.",
  },
  {
    title: "Clients Travel From Across the Country",
    body: "People drive, fly, and road trip to St. Augustine specifically for this experience. Jennifer has welcomed clients from up and down the East Coast, and as far as France. If you\u2019re planning a trip, she\u2019ll help you make the most of it.",
  },
];

export function UnderwaterWhyBook() {
  return (
    <section className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Why Jennifer</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Everything You Need.{" "}
            <em className="italic">Nothing Left to Figure Out.</em>
          </h2>
          <p className="text-sm text-(--color-muted) max-w-lg mx-auto leading-relaxed">
            Jennifer has spent 9 years refining a process that makes even the most nervous
            first-timer feel completely at home beneath the surface.
          </p>
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
