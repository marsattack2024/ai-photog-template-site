import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function UnderwaterMeetJennifer() {
  return (
    <section className="bg-(--color-cream) py-0 overflow-hidden border-t border-(--color-border)">
      <div className="grid md:grid-cols-2 min-h-[620px]">
        {/* Text — left */}
        <AnimateOnScroll className="flex flex-col justify-center px-10 py-16 md:px-16 md:py-24 order-2 md:order-1">
          <span className="text-xs uppercase tracking-widest text-(--color-muted) mb-6">
            Meet Jennifer
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-(--color-ink) leading-snug mb-6">
            Artist. Adventurer.{" "}
            <em className="italic">Mermaid at Heart.</em>
          </h2>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-4">
            Jennifer James is a fine art portrait photographer with 9+ years of professional
            experience and a background in fine arts. She grew up between Virginia Beach,
            Honolulu, and Jacksonville &mdash; always near water, always most herself in it.
          </p>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-4">
            Fun fact: mermaids are the official mascot of Virginia Beach. Jennifer has considered
            herself one at heart her entire life.
          </p>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-6">
            She is known for extraordinary set design, expert posing direction, and imagery
            that clients describe as &ldquo;unlike anything I&apos;ve ever seen of myself.&rdquo; When
            you book with Jennifer, you are working with someone who has spent nearly a decade
            learning exactly how to make every body look luminous beneath the surface.
          </p>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-6">
            She is also known for excellent Dad jokes. Consider yourself warned.
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-(--color-ink)">&mdash; Jennifer James</p>
            <p className="text-xs tracking-widest uppercase text-(--color-muted)">Photographer &middot; St. Augustine, FL</p>
          </div>
        </AnimateOnScroll>

        {/* Image — right */}
        <AnimateOnScroll delay={100} className="relative min-h-[400px] md:min-h-[620px] order-1 md:order-2">
          <Image
            src="/images/underwater/jennifer-portrait.jpg"
            alt="Jennifer James — St. Augustine underwater portrait photographer"
            fill
            className="object-cover object-top"
          />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
