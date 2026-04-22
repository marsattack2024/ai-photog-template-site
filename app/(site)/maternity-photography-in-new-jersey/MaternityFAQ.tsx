"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import { Button } from "@/components/ui";

const faqs = [
  {
    q: "When is the best time to schedule a maternity session?",
    a: "Between 28 and 36 weeks is ideal. Your bump is beautifully round, you still feel comfortable enough to move and pose, and the timing gives us flexibility if baby decides to arrive early.",
  },
  {
    q: "I don\u2019t feel beautiful right now. Is this still for me?",
    a: "Especially for you. Most of our maternity clients say the same thing before their session. Pregnancy changes your body in ways that can feel unfamiliar. This experience is designed to show you how stunning you actually are right now \u2014 not despite the changes, but because of them.",
  },
  {
    q: "What should I wear?",
    a: "You\u2019ll get a full style guide after booking. We have a studio wardrobe of flowing gowns, bodysuits, and draped fabrics sized for expectant mothers. Most clients wear two to three looks. Bring anything sentimental \u2014 baby shoes, a partner\u2019s shirt, ultrasound prints.",
  },
  {
    q: "Can my partner or other children be in the photos?",
    a: "Of course. Many sessions include a few partner shots or sibling moments. We\u2019ll plan the flow so the session still feels intimate and unhurried, even with little ones in the mix.",
  },
  {
    q: "How long is a maternity session?",
    a: "About 90 minutes to two hours. That gives us time for outfit changes, different setups, and a relaxed pace. You\u2019ll never feel rushed, and there\u2019s always time to sit down and rest.",
  },
  {
    q: "Is boudoir maternity too revealing for me?",
    a: "You decide what you\u2019re comfortable with. Some mamas go full skin, some stay in a gown the entire time. We talk through everything beforehand so there are zero surprises. The point is to feel powerful, not exposed.",
  },
  {
    q: "When do I see my photos?",
    a: "Your private gallery is typically delivered within two weeks. You\u2019ll view your images at a reveal appointment and choose only the ones you love. Nothing is shared publicly without your permission.",
  },
  {
    q: "Where is the studio located?",
    a: "We\u2019re based in Montclair, New Jersey \u2014 easily accessible from across North Jersey, the NYC metro area, and the surrounding suburbs. We also offer outdoor sessions at select NJ locations.",
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
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl leading-none text-(--color-muted) shrink-0"
        >
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
            <p className="text-sm text-(--color-muted) leading-relaxed pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function MaternityFAQ() {
  return (
    <section className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-(--color-muted)">Common Questions</span>
          <h2 className="font-serif text-4xl font-normal text-(--color-ink) mt-3 md:text-5xl">
            Everything Expecting Mamas{" "}
            <em className="italic">Want to Know</em>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-(--color-muted) mb-4">Still have questions? Reach out &mdash; happy to help.</p>
          <a href="#contact"><Button variant="ghost">Get In Touch</Button></a>
        </motion.div>
      </div>
    </section>
  );
}
