import * as Sentry from "@sentry/nextjs";

/**
 * Server + edge runtime instrumentation.
 *
 * Opt-in: only initializes when NEXT_PUBLIC_SENTRY_DSN is set. Template
 * forks that don't want Sentry leave the env var empty and Sentry is
 * a zero-runtime-cost dependency.
 *
 * Client-side init lives in instrumentation-client.ts (Next.js 15 convention).
 */
export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn,
      // Performance tracing: sample 10% by default. Override via env.
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.1"),
      // Don't send PII by default — contact-form payloads contain emails.
      sendDefaultPii: false,
      // Respect deploy env in Sentry UI grouping.
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      release: process.env.VERCEL_GIT_COMMIT_SHA,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.1"),
      sendDefaultPii: false,
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      release: process.env.VERCEL_GIT_COMMIT_SHA,
    });
  }
}

/**
 * Catches unhandled errors from React Server Components, Server Actions,
 * and Middleware — anything that doesn't bubble through a normal error
 * boundary. Records on the active span if there is one.
 */
export const onRequestError = Sentry.captureRequestError;
