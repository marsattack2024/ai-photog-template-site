import { empathyBody as DEFAULT_BRIEF_BODY } from "@/lib/content.config";

export interface EmpathyPullQuote {
  text: string;
  attribution?: string;
}

export interface EmpathyBlockProps {
  /**
   * "brief"     = 2-paragraph centered block (default; current behavior).
   * "narrative" = long-form personal letter — left-aligned, multiple
   *               paragraphs, optional pull quote + signature. Use for
   *               sites that want a high-touch "letter from the photographer"
   *               moment (boudoir, milestone, wedding).
   */
  variant?: "brief" | "narrative";
  headline?: React.ReactNode;
  /**
   * Body paragraphs. Each string becomes one <p>. Defaults to the brief
   * 2-paragraph copy if not provided.
   */
  body?: string[];
  /** Optional pull quote (rendered as a blockquote with accent left-border). Narrative only. */
  pullQuote?: EmpathyPullQuote;
  /** Optional signature line (e.g. "— Molly"). Narrative only. */
  signature?: string;
}

const DEFAULT_BRIEF_HEADLINE = (
  <>
    You hate how you look in photos.
    <br />
    <em className="italic">I hear that all the time.</em>
  </>
);

export function EmpathyBlock({
  variant = "brief",
  headline,
  body,
  pullQuote,
  signature,
}: EmpathyBlockProps = {}) {
  const isNarrative = variant === "narrative";
  const resolvedHeadline = headline ?? DEFAULT_BRIEF_HEADLINE;
  const resolvedBody = body ?? DEFAULT_BRIEF_BODY;

  return (
    <section className="py-[var(--space-section-y)] px-[var(--space-section-x)] bg-(--color-cream)">
      <div
        className={`max-w-2xl mx-auto flex flex-col gap-${isNarrative ? "7" : "6"} ${isNarrative ? "" : "text-center"}`}
      >
        <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
          {resolvedHeadline}
        </h2>

        {resolvedBody.map((paragraph, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-(--color-muted)"
          >
            {paragraph}
          </p>
        ))}

        {isNarrative && pullQuote && (
          <blockquote className="border-l-2 border-(--color-accent) pl-6 py-1 my-1">
            <p className="font-serif text-xl italic text-(--color-ink) leading-relaxed">
              &ldquo;{pullQuote.text}&rdquo;
            </p>
            {pullQuote.attribution && (
              <cite className="text-xs tracking-widest uppercase text-(--color-muted) mt-3 block not-italic">
                &mdash; {pullQuote.attribution}
              </cite>
            )}
          </blockquote>
        )}

        {isNarrative && signature && (
          <p className="text-sm font-medium text-(--color-ink)">{signature}</p>
        )}
      </div>
    </section>
  );
}
