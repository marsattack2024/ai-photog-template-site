import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const reviews = [
  {
    name: "Stephanie M.",
    stars: 5,
    text: "I cried when I saw my photos. I have NEVER felt that beautiful in my life. Cyndee made me feel completely at ease from the moment I walked in. I was terrified going in, and I left feeling like an entirely different woman. These photos are the best thing I have ever done for myself.",
    detail: "Verified Google Review",
  },
  {
    name: "Kayla R.",
    stars: 5,
    text: "Absolutely life-changing. I kept making excuses for years — my body isn't ready, the timing isn't right, I'm not the type of person who does this. None of that was true. Cyndee and her team made me feel safe, celebrated, and genuinely beautiful. Book it. You won't regret it.",
    detail: "Verified Google Review",
  },
  {
    name: "Jessica T.",
    stars: 5,
    text: "I did this as a gift to myself for my 40th birthday and it was the most empowering thing I have ever done. The hair and makeup was stunning, the wardrobe is gorgeous, and Cyndee is SO good at posing. I look like a completely different person — but it still looks completely like me.",
    detail: "Verified Google Review",
  },
  {
    name: "Amanda K.",
    stars: 5,
    text: "The images came back in just 7 days and I gasped out loud seeing them. My husband has been asking when he can order prints ever since. Cyndee has a gift for making you feel relaxed and confident even when you feel anything but. Worth every single penny and then some.",
    detail: "Verified Google Review",
  },
  {
    name: "Nicole B.",
    stars: 5,
    text: "I've been wanting to do a boudoir session for ten years and kept talking myself out of it. I finally stopped making excuses. The whole experience — from the free phone call to seeing my images on the same day as the shoot — was seamless and incredible. I immediately rebooked.",
    detail: "Verified Google Review",
  },
  {
    name: "Tara W.",
    stars: 5,
    text: "Do not wait as long as I did. I kept thinking I'd do it when I lost 20 pounds, when the timing was right, when I felt 'ready.' Cyndee photographs you exactly as you are, and somehow the photos look like the most confident, gorgeous version of yourself. That's the magic here.",
    detail: "Verified Google Review",
  },
];

export function BDTestimonialCards() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Real Women. Real Results.</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            What Happens After the{" "}
            <em className="italic">Session</em>
          </h2>
          <p className="text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Over 200 five-star Google reviews. Here are six of them.
          </p>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <AnimateOnScroll key={r.name} delay={i * 60} className="bg-white border border-(--color-border) p-7 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-(--color-accent) text-sm">★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-(--color-ink) italic flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="pt-2 border-t border-(--color-border)">
                <p className="text-sm font-medium text-(--color-ink)">{r.name}</p>
                <p className="text-[10px] tracking-widest uppercase text-(--color-muted) mt-0.5">{r.detail}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="text-center">
          <p className="text-sm text-(--color-muted) italic">
            &ldquo;I drove 45 minutes each way and would do it again every year.&rdquo; — Shannon L., Verified Review
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
