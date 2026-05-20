# Client-side Sentry setup (opt-in)

The template ships with **server-side Sentry only** (`instrumentation.ts`). Client-side error tracking adds ~80KB to the shared client bundle, so it's not on by default. Add it per-fork if you want browser-side error tracking + session replays.

## When to add client-side Sentry

- Photographer is running paid ads and needs to know if the contact form breaks on a real device
- You've seen mobile-only bugs and want stack traces
- You want session replay for high-value clients

For a brochure site with low traffic and well-tested code, server-side Sentry (which catches form submission failures, API errors, edge function errors) is usually enough.

## Setup steps

### 1. Create `instrumentation-client.ts` at the project root

```ts
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? "0.1"
    ),
    replaysSessionSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? "0"
    ),
    replaysOnErrorSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? "0"
    ),
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development",
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    sendDefaultPii: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
```

### 2. Wrap `next.config.ts` with `withSentryConfig`

For proper tree-shaking + optional source-map upload:

```ts
import { withSentryConfig } from "@sentry/nextjs";

// ... existing nextConfig ...

export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  tunnelRoute: process.env.SENTRY_TUNNEL_ROUTE,
  widenClientFileUpload: true,
  disableLogger: true,
});
```

### 3. Set env vars

```bash
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/yyy
# Optional:
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE=0.01
NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE=1.0
# For source-map upload (per-environment in Vercel):
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=...
```

### 4. Verify

```bash
npm run build
```

Client bundle will grow ~80KB. To confirm Sentry is wired, throw a test error from a component and confirm it shows up in your Sentry project's Issues feed.

## Cost

Adding client-side Sentry costs ~80KB on the shared client bundle (every page). For a brochure site that's a real LCP hit. Make sure your photographer client values error tracking more than the small speed cost. If they're running paid traffic, yes. If they get 5 inquiries/month, server-side Sentry is enough.

## Removing it later

Delete `instrumentation-client.ts`, revert the `withSentryConfig` wrapper in `next.config.ts`, unset the env vars. Server-side Sentry (`instrumentation.ts`) is independent and stays.
