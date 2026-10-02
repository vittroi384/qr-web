// In-memory token bucket keyed by IP. Good enough for a single-instance deploy.
type Bucket = { tokens: number; updated: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000;

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const refillPerMs = limit / windowMs;
  let b = buckets.get(key);
  if (!b) {
    if (buckets.size >= MAX_KEYS) buckets.clear();
    b = { tokens: limit, updated: now };
    buckets.set(key, b);
  }
  b.tokens = Math.min(limit, b.tokens + (now - b.updated) * refillPerMs);
  b.updated = now;
  if (b.tokens < 1) return false;
  b.tokens -= 1;
  return true;
}
