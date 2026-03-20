const steps = [
  {
    number: "01",
    title: "Inquire",
    body: "Fill out the contact form below. I'll respond within 24 hours to check your date and answer any questions.",
  },
  {
    number: "02",
    title: "Consult",
    body: "We'll hop on a quick call to talk through your vision, choose a location, and plan your outfits.",
  },
  {
    number: "03",
    title: "Shoot",
    body: "Show up, relax, and let me do the directing. Most sessions last 1–2 hours.",
  },
  {
    number: "04",
    title: "Receive",
    body: "Your fully edited gallery arrives in your inbox within 5 business days, ready to download and print.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-24 px-6 bg-(--color-ink)">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">The Process</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Four Steps to{" "}
            <em className="italic">Photos You Love</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <span className="font-serif text-5xl text-(--color-accent)/40">{step.number}</span>
              <h3 className="font-serif text-xl text-(--color-cream)">{step.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-cream)/60">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
