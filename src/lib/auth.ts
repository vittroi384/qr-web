import { SignJWT, jwtVerify } from "jose";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Admin session cookie. On HTTPS deployments (DOMAIN set) the cookie uses the __Host- prefix,
 * which browsers only accept when it is Secure, Path=/ and has no Domain — i.e. it cannot be
 * planted by a sibling subdomain. SameSite=Strict keeps it out of cross-site requests entirely.
 */
const HTTPS = process.env.NODE_ENV === "production" && Boolean(process.env.DOMAIN);
export const SESSION_COOKIE = HTTPS ? "__Host-qr_admin_session" : "qr_admin_session";
const SESSION_TTL_SEC = 60 * 60 * 24; // 24h, re-login daily

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET env var must be set (min 16 chars). Generate with: openssl rand -hex 32");
  }
  return new TextEncoder().encode(secret);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // Still do a comparison to keep timing roughly constant.
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

/** Short fingerprint of the browser so a stolen cookie is useless from another client. */
export function clientFingerprint(userAgent: string | null | undefined): string {
  return createHash("sha256").update(userAgent ?? "").digest("base64url").slice(0, 16);
}

export async function createSessionToken(userAgent: string | null | undefined): Promise<string> {
  return new SignJWT({ role: "admin", fp: clientFingerprint(userAgent) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SEC}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined, userAgent?: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.role !== "admin") return false;
    // Fingerprint check is skipped only when the caller cannot supply a UA.
    if (userAgent !== undefined && payload.fp !== clientFingerprint(userAgent)) return false;
    return true;
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: HTTPS,
  path: "/",
  maxAge: SESSION_TTL_SEC,
};

// Login throttling: 5 failures per IP within 10 minutes locks that IP.
const failures = new Map<string, { count: number; first: number }>();
const LOCK_WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_TRACKED_IPS = 5000;

export const LOCK_WINDOW_SEC = LOCK_WINDOW_MS / 1000;

export function isLockedOut(ip: string): boolean {
  const f = failures.get(ip);
  if (!f) return false;
  if (Date.now() - f.first > LOCK_WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return f.count >= MAX_FAILURES;
}

export function recordLoginFailure(ip: string) {
  const f = failures.get(ip);
  if (!f || Date.now() - f.first > LOCK_WINDOW_MS) {
    if (failures.size >= MAX_TRACKED_IPS) {
      const oldest = failures.keys().next().value;
      if (oldest !== undefined) failures.delete(oldest);
    }
    failures.set(ip, { count: 1, first: Date.now() });
  } else {
    f.count += 1;
  }
}

export function clearLoginFailures(ip: string) {
  failures.delete(ip);
}
