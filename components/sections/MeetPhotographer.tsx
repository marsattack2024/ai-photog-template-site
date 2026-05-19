import Image from "next/image";

export interface MeetPhotographerProps {
  /** Eyebrow above the headline. */
  eyebrow?: string;
  /** First name (rendered italic in the headline). */
  name?: string;
  /** Body paragraphs — keep to 2-3 for rhythm. */
  bioParagraphs?: string[];
  photoSrc?: string;
  photoAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * "light" = cream bg (default; sits between other cream sections).
   * "dark"  = ink bg with cream text (use to break up long cream stretches).
   */
  variant?: "light" | "dark";
}

const DEFAULT_BIO = [
  "I've been photographing real people — not models, not actors — for over eight years. I started because I believed everyone deserves to feel seen and beautiful in photographs. That belief still drives every session I shoot.",
  "My approach is guided, warm, and a little bit playful. I'll walk you through every pose, every angle, every expression. By the end of the session, most clients tell me it was nothing like what they feared.",
];

export function MeetPhotographer({
  eyebrow = "Meet Your Photographer",
  name = "[Name]",
  bioParagraphs = DEFAULT_BIO,
  photoSrc = "/placeholder/portrait.svg",
  photoAlt = "Photographer portrait",
  ctaLabel = "Work With Me",
  ctaHref = "#contact",
  variant = "light",
}: MeetPhotographerProps = {}) {
  const isDark = variant === "dark";

  const sectionBg = isDark ? "bg-(--color-ink)" : "bg-(--color-border)/30";
  const headlineColor = isDark ? "text-(--color-on-dark-primary)" : "text-(--color-ink)";
  const bodyColor = isDark ? "text-(--color-on-dark-secondary)" : "text-(--color-muted)";
  const ctaClasses = isDark
    ? "border-(--color-on-dark-primary) hover:bg-(--color-on-dark-primary) hover:text-(--color-ink)"
    : "border-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream)";

  return (
    <section
      className={`py-[var(--space-section-y)] px-[var(--space-section-x)] ${sectionBg}`}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            {eyebrow}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl font-normal leading-tight ${headlineColor}`}
          >
            Hi, I&apos;m <em className="italic">{name}</em>
          </h2>
          {bioParagraphs.map((p, i) => (
            <p key={i} className={`text-sm leading-relaxed ${bodyColor}`}>
              {p}
            </p>
          ))}
          <a
            href={ctaHref}
            className={`self-start inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium border px-6 py-3 transition-colors duration-300 ${ctaClasses}`}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
