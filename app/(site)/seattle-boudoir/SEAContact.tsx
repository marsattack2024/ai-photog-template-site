"use client";
import { useActionState } from "react";
import { submitInquiry, type SubmitInquiryState } from "@/app/actions/submitInquiry";

const initialState: SubmitInquiryState = {
  success: false,
  errors: {},
};

export function SEAContact() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

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

        {state.success ? (
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
            action={formAction}
            className="relative flex flex-col gap-6 bg-(--color-cream) p-8 md:p-14"
          >
            {/* Honeypot — visually hidden, screen-reader-hidden, must stay empty.
                Real users won't fill this; bots that auto-fill every input will
                trigger a silent success so they don't retry. */}
            <input
              type="text"
              name="hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />
            <input type="hidden" name="sourcePage" value="/seattle-boudoir" />

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sea-name"
                  className="text-xs tracking-widest uppercase text-(--color-muted)"
                >
                  Your Name
                </label>
                <input
                  id="sea-name"
                  type="text"
                  name="name"
                  required
                  placeholder="First & last name"
                  aria-describedby={!state.success && state.errors?.name ? "sea-name-error" : undefined}
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                />
                {!state.success && state.errors?.name && (
                  <p id="sea-name-error" className="text-xs text-red-600">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sea-email"
                  className="text-xs tracking-widest uppercase text-(--color-muted)"
                >
                  Email Address
                </label>
                <input
                  id="sea-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  aria-describedby={!state.success && state.errors?.email ? "sea-email-error" : undefined}
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                />
                {!state.success && state.errors?.email && (
                  <p id="sea-email-error" className="text-xs text-red-600">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sea-phone"
                  className="text-xs tracking-widest uppercase text-(--color-muted)"
                >
                  Phone Number
                </label>
                <input
                  id="sea-phone"
                  type="tel"
                  name="phone"
                  placeholder="For your consultation call"
                  className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="sea-session-type"
                  className="text-xs tracking-widest uppercase text-(--color-muted)"
                >
                  Session Type
                </label>
                <select
                  id="sea-session-type"
                  name="sessionType"
                  defaultValue=""
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
              <label
                htmlFor="sea-message"
                className="text-xs tracking-widest uppercase text-(--color-muted)"
              >
                Tell Molly about your vision
              </label>
              <textarea
                id="sea-message"
                name="message"
                rows={4}
                placeholder="What's the occasion? What excites you? What are you nervous about? (optional)"
                className="bg-white border border-(--color-border) px-4 py-3.5 text-sm text-(--color-ink) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)/30 transition-all duration-200 resize-none"
              />
            </div>

            {!state.success && state.errors?.root && (
              <p className="text-center text-xs text-red-600">
                {state.errors.root[0]}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="self-center mt-2 inline-flex items-center justify-center tracking-widest uppercase text-xs font-medium bg-(--color-accent) text-(--color-cream) px-12 py-4.5 hover:opacity-90 transition-opacity duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending…" : "Send My Request"}
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
