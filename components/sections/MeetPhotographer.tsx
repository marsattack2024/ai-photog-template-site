import Image from "next/image";

export function MeetPhotographer() {
  return (
    <section className="py-24 px-6 bg-(--color-border)/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/placeholder/portrait.svg"
            alt="Photographer portrait"
            fill
            className="object-cover"

          />
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Meet Your Photographer</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Hi, I&apos;m{" "}
            <em className="italic">[Name]</em>
          </h2>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            I&apos;ve been photographing real people — not models, not actors — for over eight
            years. I started because I believed everyone deserves to feel seen and beautiful in
            photographs. That belief still drives every session I shoot.
          </p>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            My approach is guided, warm, and a little bit playful. I&apos;ll walk you through
            every pose, every angle, every expression. By the end of the session, most clients
            tell me it was nothing like what they feared.
          </p>
          <a
            href="#contact"
            className="self-start inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border border-(--color-ink) px-6 py-3 hover:bg-(--color-ink) hover:text-(--color-cream) transition-colors duration-300"
          >
            Work With Me
          </a>
        </div>
      </div>
    </section>
  );
}
