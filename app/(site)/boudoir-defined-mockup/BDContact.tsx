"use client";
import { useState } from "react";

export function BDContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="book" className="bg-(--color-cream) py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center flex flex-col gap-3 mb-12">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Ready to Begin</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Book Your Free{" "}
            <em className="italic">15-Minute Call</em>
          </h2>
          <p className="text-sm text-(--color-muted) max-w-md mx-auto leading-relaxed">
            Cyndee will call you at the time you choose. No pressure, no pitch.
            Just a conversation about what your session could look like.
          </p>
          <p className="text-sm text-(--color-muted)">
            Prefer to call or text directly?{" "}
            <a href="tel:+12088773779" className="text-(--color-ink) underline underline-offset-2">
              208-877-3779
            </a>
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 flex flex-col gap-4 border border-(--color-border) p-10">
            <span className="text-3xl text-(--color-accent)">✦</span>
            <h3 className="font-serif text-2xl text-(--color-ink)">You&apos;re on the list.</h3>
            <p className="text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
              Cyndee will be in touch within one business day to confirm your call time.
              Check your inbox — and get excited. This is the part where everything changes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-(--color-border) p-8 md:p-12">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-(--color-muted)">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="First & last name"
                  className="bg-transparent border border-(--color-border) px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-(--color-muted)">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="bg-transparent border border-(--color-border) px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase text-(--color-muted)">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="For your consultation call"
                className="bg-transparent border border-(--color-border) px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase text-(--color-muted)">Tell Cyndee a little about you</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="What's the occasion? What are you nervous about? What do you hope to walk away with? (optional)"
                className="bg-transparent border border-(--color-border) px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-center mt-4 inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-10 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Send My Request
            </button>

            <p className="text-center text-[10px] text-(--color-muted) tracking-wide">
              100% private. Your information is never shared. Ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
