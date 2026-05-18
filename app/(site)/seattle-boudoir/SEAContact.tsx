"use client";
import { useState } from "react";

export function SEAContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="book" className="bg-(--color-ink) py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center flex flex-col gap-3 mb-12">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">
            Ready to Begin
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-cream)">
            Book Your{" "}
            <em className="italic">Seattle Boudoir Experience</em>
          </h2>
          <p className="text-sm text-(--color-cream)/60 max-w-md mx-auto leading-relaxed">
            Molly will be in touch within one business day to schedule your
            consultation. No pressure, no pitch. Just a real conversation
            about what your session could look like.
          </p>
          <p className="text-sm text-(--color-cream)/60">
            Prefer to call or text directly?{" "}
            <a
              href="tel:+12065520981"
              className="text-(--color-accent) underline underline-offset-2 hover:text-(--color-cream) transition-colors duration-200"
            >
              (206) 552-0981
            </a>
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 flex flex-col gap-4 bg-(--color-cream) p-10">
            <span className="text-3xl text-(--color-accent)">✦</span>
            <h3 className="font-serif text-2xl text-(--color-ink)">
              You&apos;re on the list.
            </h3>
            <p className="text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
              Molly will be in touch within one business day. Check your
              inbox — and get excited. This is the part where everything
              starts to change.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-(--color-cream) p-8 md:p-14"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-(--color-muted)">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="First & last name"
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-(--color-muted)">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-(--color-muted)">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="For your consultation call"
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-(--color-muted)">
                  Session Type
                </label>
                <select
                  name="sessionType"
                  value={form.sessionType}
                  onChange={handleChange}
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                >
                  <option value="">Select one (optional)</option>
                  <option value="solo">Solo Boudoir</option>
                  <option value="couples">Couples Boudoir</option>
                  <option value="bridal">Bridal Boudoir</option>
                  <option value="erotica">Erotica</option>
                  <option value="empowerment">Empowerment / Milestone</option>
                  <option value="other">Something else</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase text-(--color-muted)">
                Tell Molly about your vision
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="What's the occasion? What excites you? What are you nervous about? (optional)"
                className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-center mt-2 inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-12 py-4.5 hover:opacity-90 transition-opacity duration-300"
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
