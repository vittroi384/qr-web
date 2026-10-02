// In-memory token bucket keyed by IP. Good enough for a single-instance deploy.
type Bucket = { tokens: number; updated: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export type RateLimitResult = { ok: boolean; retryAfterSec: number };

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const refillPerMs = limit / windowMs;
  let b = buckets.get(key);
  if (!b) {
    // Evict the least recently touched entries instead of wiping everyone's limits.
    while (buckets.size >= MAX_KEYS) {
      const oldest = buckets.keys().next().value;
      if (oldest === undefined) break;
      buckets.delete(oldest);
    }
    b = { tokens: limit, updated: now };
  } else {
    buckets.delete(key); // re-insert below so Map order == recency
    b.tokens = Math.min(limit, b.tokens + (now - b.updated) * refillPerMs);
    b.updated = now;
  }
  buckets.set(key, b);
  if (b.tokens < 1) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((1 - b.tokens) / refillPerMs / 1000)) };
  }
  b.tokens -= 1;
  return { ok: true, retryAfterSec: 0 };
}
