import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "qr_admin_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7;

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

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SEC}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  // Secure cookies are rejected by browsers over plain HTTP, and the HTTP-only mode
  // (DOMAIN unset → Caddy serves :80) must still allow the admin to log in.
  secure: process.env.NODE_ENV === "production" && Boolean(process.env.DOMAIN),
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
