"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong.");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Ready to Book Your{" "}
            <em className="italic">Session?</em>
          </h2>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            Fill out the form below and I&apos;ll get back to you within 24 hours to confirm
            availability and answer any questions.
          </p>
        </div>

        {status === "success" ? (
          <div className="border border-(--color-border) p-8 text-center flex flex-col gap-3">
            <p className="font-serif text-2xl text-(--color-ink)">Message Received!</p>
            <p className="text-sm text-(--color-muted)">
              Thank you for reaching out. I&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs tracking-widest uppercase text-(--color-muted)">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-ink) transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-(--color-muted)">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-ink) transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs tracking-widest uppercase text-(--color-muted)">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your session — what you're envisioning, your date, any questions..."
                className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-ink) transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full tracking-widest uppercase text-xs font-medium bg-(--color-ink) text-(--color-cream) px-8 py-4 hover:bg-(--color-accent) transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
