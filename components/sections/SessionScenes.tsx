"use client";
import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export interface SessionScene {
  /** e.g. "Solo Boudoir", "Family Lifestyle", "Editorial Headshots". */
  name: string;
  /** Image src. */
  img: string;
  /** Image alt. */
  alt?: string;
  /** Short tagline (~50-80 chars reads best). */
  desc: string;
}

export interface SessionScenesProps {
  eyebrow?: string;
  headline?: React.ReactNode;
  subheading?: string;
  scenes: SessionScene[];
  /** Optional italic line below the grid (e.g. "Themed shoots also available"). */
  footnote?: string;
  /** Background variant. Default "dark" — ink bg makes the image tiles pop. */
  variant?: "dark" | "light";
}

/**
 * Grid of session-type cards — each card is a full-bleed image with the
 * session name and tagline overlaid at the bottom. Hover zooms the image.
 *
 * Adapted from the SEA reference page's "Six Ways to Be Seen" section.
 * Universally useful for photographers offering multiple session types
 * (boudoir, wedding, family, headshots, etc.). Pass any number of scenes;
 * grid is responsive (1 col mobile → 2 col tablet → 3 col desktop).
 */
export function SessionScenes({
  eyebrow = "Choose Your Session",
  headline = (
    <>
      Every Way to <em className="italic">Be Seen.</em>
    </>
  ),
  subheading,
  scenes,
  footnote,
  variant = "dark",
}: SessionScenesProps) {
  const isDark = variant === "dark";
  const bg = isDark ? "bg-(--color-ink)" : "bg-(--color-cream)";
  const headlineColor = isDark
    ? "text-(--color-on-dark-primary)"
    : "text-(--color-ink)";
  const subColor = isDark
    ? "text-(--color-on-dark-muted)"
    : "text-(--color-muted)";

  return (
    <section
      className={`${bg} py-[var(--space-section-y)] px-[var(--space-section-x)]`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            {eyebrow}
          </span>
          <h2
            className={`font-serif text-4xl md:text-5xl font-normal leading-tight ${headlineColor}`}
          >
            {headline}
          </h2>
          {subheading && (
            <p
              className={`text-sm max-w-md mx-auto leading-relaxed ${subColor}`}
            >
              {subheading}
            </p>
          )}
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenes.map((scene, i) => (
            <AnimateOnScroll
              key={scene.name}
              delay={i * 60}
              className="group relative h-80 overflow-hidden"
            >
              <Image
                src={scene.img}
                alt={scene.alt ?? scene.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-(--color-overlay-dark-heavy) via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                <h3 className="font-serif text-xl text-(--color-on-dark-primary)">
                  {scene.name}
                </h3>
                <p className="text-xs text-(--color-on-dark-muted) leading-relaxed">
                  {scene.desc}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {footnote && (
          <AnimateOnScroll delay={200} className="text-center">
            <p
              className={`text-sm italic max-w-md mx-auto leading-relaxed ${subColor}`}
            >
              {footnote}
            </p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
