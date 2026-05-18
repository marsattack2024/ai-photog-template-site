"use client";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const faqs = [
  {
    q: "Do I need to look a certain way or be a certain size?",
    a: "Absolutely not. Seydi has photographed women of every size, shape, and background for over 20 years. The women who arrive most convinced they're 'not the type' are almost always the ones who leave with the most powerful images. This session is for you exactly as you are today.",
  },
  {
    q: "Do I have to provide my own wardrobe?",
    a: "Not at all. Our studio has over 1,000 pieces — lingerie, robes, gowns, bodysuits, and accessories — plus heels and jewelry. You're welcome to bring your own pieces too, but nothing is required. If you're not the lingerie type, dresses, button-ups, and robes work beautifully.",
  },
  {
    q: "Is hair and makeup included?",
    a: "Yes! Your session includes professional hair, makeup, and lash application by our team. Our artists are specifically trained for boudoir photography lighting. You'll walk out of that chair feeling like a completely different woman — and that's before the camera even comes out.",
  },
  {
    q: "What if I'm not photogenic?",
    a: "Seydi hears this constantly. After 20 years she can tell you with certainty: nobody is 'not photogenic.' There are just poses that work and poses that don't. Expert posing direction is a core part of every session. You will be guided in every single shot. Every angle, every expression — that's her job.",
  },
  {
    q: "How long does a session last?",
    a: "With professional hair and makeup plus the same-day cinematic reveal, your experience is typically 4–6 hours. This is a full day of luxury and pampering — we will never rush you out the door.",
  },
  {
    q: "When will I see my photos?",
    a: "The same day! After your shoot, you'll break for lunch, and then Seydi reveals your fully edited images on a large screen — cinematic-style. No waiting weeks wondering if they came out. They came out.",
  },
  {
    q: "Who will see my images?",
    a: "Nobody without your explicit written permission. Your privacy is non-negotiable. You choose whether anything is ever shared. Period.",
  },
  {
    q: "What are the unique scene sets?",
    a: "Our studio features 10+ cinematic sets: Wings, Rain Room, Smoke & Lights, Egg Chair, Swing, Dance Pole, Faux Shower, Wet Body, Bedroom Set, Bedsheets, and more. Your session includes access to every set in the studio.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes! We offer flexible payment options through Affirm, Klarna, and our in-house financing to make investing in yourself as accessible as possible. Reach out and we'll walk you through everything during your consultation.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the form below and Seydi will be in touch within one business day to schedule your consultation. No pressure — just a real conversation about what your session could look like. Have your calendar ready — most clients book their date right on that call.",
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
        <span
          className="text-(--color-accent) text-xl shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
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
        <p className="text-sm leading-relaxed text-(--color-muted) pb-5 pr-8">
          {a}
        </p>
      </div>
    </div>
  );
}

export function SBFAQ() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <AnimateOnScroll className="text-center flex flex-col gap-3">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Questions
          </span>
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
            Have a question that&apos;s not here? Reach out — Seydi answers
            everything personally.
          </p>
          <a
            href="#book"
            className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-8 py-4 hover:opacity-90 transition-opacity duration-300"
          >
            Book My Experience
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
