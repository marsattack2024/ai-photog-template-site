"use client";
import { useActionState } from "react";
import { submitInquiry, type SubmitInquiryState } from "@/app/actions/submitInquiry";

const initialState: SubmitInquiryState = { success: false, errors: {} };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  if (state.success) {
    return (
      <section id="contact" className="py-[var(--space-section-y)] px-[var(--space-section-x)] bg-(--color-cream)">
        <div className="max-w-2xl mx-auto border border-(--color-border) p-12 text-center flex flex-col gap-4">
          <p className="font-serif text-3xl text-(--color-ink)">Message Received</p>
          <p className="text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out. You&apos;ll hear back personally within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-[var(--space-section-y)] px-[var(--space-section-x)] bg-(--color-cream)">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Ready to Book Your <em className="italic">Session?</em>
          </h2>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            Fill out the form and you&apos;ll hear back within 24 hours.
          </p>
        </div>

        <form action={formAction} className="relative flex flex-col gap-5">
          {/* Honeypot — visually hidden, must stay empty. */}
          <input
            type="text"
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] w-px h-px opacity-0"
          />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Full Name
            </label>
            <input
              id="name" name="name" type="text" required
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors"
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />
            {state.errors?.name && (
              <p id="name-error" className="text-xs text-red-600">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Email Address
            </label>
            <input
              id="email" name="email" type="email" required
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors"
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <p id="email-error" className="text-xs text-red-600">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Message
            </label>
            <textarea
              id="message" name="message" required rows={5}
              placeholder="Tell me about what you're envisioning..."
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors resize-none"
              aria-describedby={state.errors?.message ? "message-error" : undefined}
            />
            {state.errors?.message && (
              <p id="message-error" className="text-xs text-red-600">{state.errors.message[0]}</p>
            )}
          </div>

          {state.errors?.root && (
            <p className="text-xs text-red-600">{state.errors.root[0]}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full tracking-widest uppercase text-xs font-medium bg-(--color-ink) text-(--color-cream) px-8 py-4 hover:bg-(--color-accent-text) transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
