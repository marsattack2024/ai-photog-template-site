import "server-only";

/**
 * In-memory sliding-window rate limiter.
 *
 * Caveats:
 * - In-memory state lives per function instance. Vercel's Fluid Compute
 *   reuses instances aggressively, so this is effective for low-traffic
 *   photographer sites (a single bot from one IP gets rate-limited even
 *   across multiple requests). High-traffic / multi-region deploys should
 *   swap this for Upstash Redis or @vercel/kv — the rateLimit() function
 *   signature stays the same.
 * - First request after a cold start always passes (fresh bucket map).
 *   That's acceptable: cold-start frequency is bounded; worst case is a
 *   handful of extra requests get through during a deploy.
 *
 * For a brochure photography site receiving < 100 form submissions / day,
 * this is the right tradeoff — zero infra, zero monthly cost, catches
 * actual abuse from a single source.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitConfig {
  /** Max requests allowed in the window. Default: 5. */
  max?: number;
  /** Window length in ms. Default: 60_000 (1 minute). */
  windowMs?: number;
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  /** Unix ms when the bucket resets. */
  resetAt: number;
  /** Seconds until reset. 0 when ok. Use for Retry-After header. */
  retryAfter: number;
}

/**
 * Check + increment rate limit for a key.
 * Returns ok=false when the bucket is full.
 */
export function rateLimit(
  key: string,
  config: RateLimitConfig = {}
): RateLimitResult {
  const max = config.max ?? 5;
  const windowMs = config.windowMs ?? 60_000;
  const now = Date.now();

  // Lazy GC: prune expired entries on each call. Cheap when the map is small.
  // For high-traffic, swap to a proper LRU library.
  if (buckets.size > 0) {
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return {
      ok: true,
      remaining: max - 1,
      resetAt: now + windowMs,
      retryAfter: 0,
    };
  }

  if (bucket.count >= max) {
    return {
      ok: false,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count++;
  return {
    ok: true,
    remaining: max - bucket.count,
    resetAt: bucket.resetAt,
    retryAfter: 0,
  };
}

/**
 * Resolve the client's IP from common proxy headers. Vercel sets
 * x-forwarded-for + x-real-ip; Cloudflare adds cf-connecting-ip.
 * Returns "unknown" when no header is present (local dev).
 */
function resolveIp(get: (k: string) => string | null | undefined): string {
  return (
    get("x-forwarded-for")?.split(",")[0]?.trim() ||
    get("x-real-ip") ||
    get("cf-connecting-ip") ||
    "unknown"
  );
}

export function getClientIpFromRequest(req: Request): string {
  return resolveIp((k) => req.headers.get(k));
}

export function getClientIpFromHeaders(h: Headers): string {
  return resolveIp((k) => h.get(k));
}
