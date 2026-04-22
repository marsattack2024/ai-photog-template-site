"use client";
import { useActionState } from "react";
import { submitInquiry } from "@/app/actions/submitInquiry";

const initialState = { success: false as const, errors: {} as Record<string, string[]> };

const sessionTypes = [
  "Heated Pool Session",
  "Natural Springs Session",
  "Underwater Maternity",
  "Mermaid / Fantasy Session",
  "Freediving / Sport",
  "Not Sure Yet \u2014 Let\u2019s Talk",
];

export function UnderwaterContact() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);

  if (state.success) {
    return (
      <section id="contact" className="py-24 px-6 bg-(--color-cream)">
        <div className="max-w-2xl mx-auto border border-(--color-border) p-12 text-center flex flex-col gap-4">
          <p className="font-serif text-3xl text-(--color-ink)">Consultation Request Received</p>
          <p className="text-sm text-(--color-muted) max-w-sm mx-auto leading-relaxed">
            Jennifer reads every inquiry personally and will be in touch within 24 hours
            to schedule your free consultation call. No pressure, no pitch.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 bg-(--color-cream)">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-(--color-accent)">Free Consultation</span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-(--color-ink)">
            Let&apos;s Begin{" "}
            <em className="italic">The Conversation</em>
          </h2>
          <p className="text-sm leading-relaxed text-(--color-muted)">
            Tell Jennifer a little about your vision. She reads every inquiry personally
            and will reach out within 24 hours to schedule your free consultation call.
            No sales pitch. No pressure. Just a real conversation about what this could
            look like for you.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-5">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className="text-xs tracking-widest uppercase text-(--color-muted)">
                First Name
              </label>
              <input
                id="firstName" name="firstName" type="text" required
                className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lastName" className="text-xs tracking-widest uppercase text-(--color-muted)">
                Last Name
              </label>
              <input
                id="lastName" name="lastName" type="text" required
                className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors"
              />
            </div>
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
            <label htmlFor="phone" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Phone Number
            </label>
            <input
              id="phone" name="phone" type="tel"
              placeholder="(904) 555-0000"
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors placeholder:text-(--color-muted)/40"
            />
          </div>

          {/* Session type checkboxes */}
          <div className="flex flex-col gap-3">
            <span className="text-xs tracking-widest uppercase text-(--color-muted)">
              I&apos;m interested in (check all that apply)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {sessionTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="sessionType"
                    value={type}
                    className="w-4 h-4 border border-(--color-border) appearance-none checked:bg-(--color-ink) checked:border-(--color-ink) focus:outline-none transition-colors cursor-pointer"
                  />
                  <span className="text-xs text-(--color-muted) group-hover:text-(--color-ink) transition-colors leading-snug">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs tracking-widest uppercase text-(--color-muted)">
              Tell Jennifer About Your Vision
            </label>
            <textarea
              id="message" name="message" required rows={5}
              placeholder="What draws you to underwater photography? Any questions, concerns, or ideas? The more you share, the better Jennifer can prepare for your consultation."
              className="w-full border border-(--color-border) bg-transparent px-4 py-3 text-sm text-(--color-ink) focus:outline-none focus:border-(--color-ink) transition-colors resize-none placeholder:text-(--color-muted)/40"
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
            {isPending ? "Sending\u2026" : "Schedule My Free Consultation"}
          </button>

          <p className="text-xs text-(--color-muted) text-center leading-relaxed">
            Jennifer reads every inquiry personally and texts you to confirm.
            She will never cold-call you or share your information.
            Sessions book 4&ndash;6 weeks out.
          </p>
          <p className="text-xs text-(--color-muted) text-center">
            Prefer to text?{" "}
            <a href="tel:9045933220" className="text-(--color-ink) underline underline-offset-2 hover:text-(--color-accent) transition-colors">
              (904) 593-3220
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
