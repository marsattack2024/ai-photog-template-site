"use client";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const faqs = [
  {
    q: "Do I have to be a certain size or look a certain way?",
    a: "Absolutely not. Cyndee has photographed women from size 2 to size 24+, ages 18 to late 60s. The women who arrive most convinced they're 'not the type' are almost always the ones with the most powerful images. This session is for you exactly as you are today.",
  },
  {
    q: "Do I have to provide my own wardrobe?",
    a: "Not at all. Cyndee's studio has over 200 pieces of lingerie, robes, gowns, and accessories — plus heels in sizes 5–11. You're welcome to bring your own pieces too, but nothing is required. We have you completely covered.",
  },
  {
    q: "Is hair and makeup included?",
    a: "Yes. Your session includes professional hair and makeup by our in-house artist, who is specifically trained for boudoir photography lighting. She has transformed over 200 women in this studio. You will be obsessed with how you look.",
  },
  {
    q: "What if I'm not photogenic?",
    a: "Cyndee hears this constantly. Nobody is 'not photogenic' — there are just poses that work and poses that don't. Expert posing direction for every body type is a core part of what she does. You will be guided in every single shot. Nobody is left to figure it out alone.",
  },
  {
    q: "When will I see my photos?",
    a: "You see your fully edited photos the same day as your session. That afternoon, Cyndee walks you through your gallery. Your final 50+ high-resolution images are delivered within 7 days.",
  },
  {
    q: "Who will see my images?",
    a: "Nobody without your permission. If you decline to give a model release, every precaution is taken to ensure your images are secure and never shared. Your privacy is non-negotiable. The irony: most clients who arrive saying they definitely don't want images shared can't wait to show them off once they see the results.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 15-minute phone call. Cyndee will call you at the time you choose, walk through your vision, answer every question you have, and make sure this is the right fit. Have your calendar ready — most clients book their session date right on that call.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-(--color-border)">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-(--color-ink) group-hover:text-(--color-accent) transition-colors duration-200">
          {q}
        </span>
        <span className="text-(--color-accent) text-xl shrink-0 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "none" }}>
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="text-sm leading-relaxed text-(--color-muted) pb-5 pr-8">{a}</p>
      </div>
    </div>
  );
}

export function BDFAQ() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Questions</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            The Ones Everyone Asks{" "}
            <em className="italic">Before They Book</em>
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100} className="flex flex-col">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </AnimateOnScroll>

        <AnimateOnScroll delay={200} className="text-center pt-4">
          <p className="text-sm text-(--color-muted) mb-6">
            Have a question that&apos;s not here? The free phone call is where everything gets answered.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-8 py-4 hover:opacity-90 transition-opacity duration-300"
          >
            Book My Free Consultation
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
