export function MaternityUrgency() {
  return (
    <section className="py-24 px-6 bg-(--color-accent)">
      <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white">
          Your Due Date Isn&apos;t Waiting.{" "}
          <em className="italic">Neither Should You.</em>
        </h2>
        <p className="text-sm leading-relaxed text-white/80">
          The ideal window for maternity photos is 28 to 36 weeks — and it goes fast.
          I take on a limited number of maternity sessions each month to give every
          mama my full attention. Once the calendar fills, it fills.
        </p>
        <div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-white text-(--color-ink) px-8 py-4 hover:bg-(--color-ink) hover:text-white transition-colors duration-300"
          >
            Secure My Maternity Date
          </a>
        </div>
      </div>
    </section>
  );
}
