import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const reviews = [
  {
    name: "Jessica M.",
    stars: 5,
    text: "I have never felt more beautiful in my entire life. Seydi made me feel completely at ease from the moment I walked in. The hair and makeup was flawless, and every single pose was guided. I cried when I saw my images on the big screen that same day.",
    detail: "Boudoir Experience",
  },
  {
    name: "Amber K.",
    stars: 5,
    text: "I kept putting this off for years thinking I wasn't ready. That my body needed to change first. Seydi showed me that was never true. The wardrobe collection alone blew my mind — over a thousand pieces. I felt like a queen the entire day.",
    detail: "Empowerment Session",
  },
  {
    name: "Rachel T.",
    stars: 5,
    text: "This was my 40th birthday gift to myself and it was the single best decision I have ever made. The rain room set? Absolutely unreal. Seydi has a gift for making you feel powerful. I immediately booked another session.",
    detail: "Birthday Celebration",
  },
  {
    name: "Danielle W.",
    stars: 5,
    text: "As a plus-size woman I was terrified walking in. Within five minutes Seydi had me laughing and feeling like a supermodel. She directed every single angle and I never once felt lost. The same-day reveal had me in tears — happy tears.",
    detail: "Self-Love Session",
  },
  {
    name: "Stephanie R.",
    stars: 5,
    text: "The experience from start to finish was absolute luxury. The studio is gorgeous, the sets are incredible, and Seydi's 20 years of experience shows in every single frame. My husband's jaw dropped when he saw the album.",
    detail: "Gift for Partner",
  },
  {
    name: "Nicole P.",
    stars: 5,
    text: "I drove two hours to get here and would drive four next time. The smoke and lights set was cinematic. Seydi adjusts your hair between shots, coaches your expressions, handles everything. You literally just show up and sparkle.",
    detail: "Boudoir Experience",
  },
];

export function SBTestimonialCards() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Real Women. Real Transformations.
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            What Happens When You{" "}
            <em className="italic">Dare to Sparkle</em>
          </h2>
          <p className="text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Every woman who walked through our door had the same doubts you
            have right now. Here&apos;s what they said after.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <AnimateOnScroll
              key={r.name}
              delay={i * 60}
              className="bg-white border border-(--color-border) p-7 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-(--color-accent) text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-(--color-ink) italic flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="pt-2 border-t border-(--color-border)">
                <p className="text-sm font-medium text-(--color-ink)">
                  {r.name}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-(--color-muted) mt-0.5">
                  {r.detail}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
