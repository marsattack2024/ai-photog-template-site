"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Wire to Sentry or your error tracking here
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center gap-8 px-6">
        <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">Error</span>
        <h2 className="font-serif text-4xl font-normal text-[var(--color-ink)] text-center">
          Something went wrong
        </h2>
        <p className="text-sm text-[var(--color-muted)] max-w-sm text-center leading-relaxed">
          We hit an unexpected error. Try again — if it persists, please reach out.
        </p>
        <button
          onClick={reset}
          className="text-xs uppercase tracking-widest border border-[var(--color-ink)] text-[var(--color-ink)] px-8 py-4 hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] transition-colors duration-300"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
