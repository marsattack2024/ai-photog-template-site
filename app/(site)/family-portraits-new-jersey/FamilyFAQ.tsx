"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Button } from "@/components/ui";

const faqs = [
  {
    q: "What ages work best for family sessions?",
    a: "Every age is the right age. We photograph families with newborns, toddlers, teens, adult children, and grandparents. The session is adapted to each family\u2019s dynamic \u2014 no age is too young or too old.",
  },
  {
    q: "What if my kids won\u2019t cooperate?",
    a: "They never do, and that\u2019s completely fine. We build in time for kids to warm up, move around, and be themselves. Some of the best images come from the unscripted moments. We never force smiles \u2014 we earn them.",
  },
  {
    q: "What should we wear?",
    a: "You\u2019ll receive a detailed wardrobe guide after booking. The short version: coordinate, don\u2019t match. Soft neutrals, earth tones, and muted colors photograph beautifully. Avoid logos, neon, and busy patterns.",
  },
  {
    q: "How long is a family session?",
    a: "About 60 to 90 minutes, depending on the size of your family and the number of groupings. That gives us time for full family, couples, individual kids, grandparents, and sibling shots without anyone feeling rushed.",
  },
  {
    q: "Can we include grandparents or extended family?",
    a: "Absolutely. Multi-generational portraits are some of the most meaningful images we create. We\u2019ll plan the session flow so everyone gets their moment \u2014 and the big group shot looks effortless.",
  },
  {
    q: "Where do sessions take place?",
    a: "We\u2019re based in Montclair, New Jersey with a private studio. We also offer outdoor sessions at select NJ locations \u2014 parks, beaches, and urban backdrops. We\u2019ll help you choose the best setting for your family.",
  },
  {
    q: "When will we see our photos?",
    a: "Your private gallery is delivered within two weeks. You\u2019ll view your images at a reveal appointment and choose only the ones you love. Nothing is shared or printed without your approval.",
  },
  {
    q: "How do we book?",
    a: "Fill out the contact form below and tell us a little about your family. You\u2019ll hear back personally within 24 hours \u2014 no bots, no pressure. Just a real conversation about what this session could look like.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="border-b border-(--color-border)">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer group"
        aria-expanded={open}
      >
        <span className="font-serif text-lg font-normal text-(--color-ink) group-hover:text-(--color-accent) transition-colors">
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-2xl leading-none text-(--color-muted) shrink-0">
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-(--color-muted) leading-relaxed pb-6 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FamilyFAQ() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Common Questions</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Everything Families{" "}
            <em className="italic">Want to Know</em>
          </h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-center mt-12">
          <p className="text-sm text-(--color-muted) mb-4">Still have questions? Reach out &mdash; happy to help.</p>
          <a href="#contact"><Button variant="ghost">Get In Touch</Button></a>
        </motion.div>
      </div>
    </section>
  );
}
