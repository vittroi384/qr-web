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
/** "Remember this device": one password + OTP login per month on the owner's own machine. */
export const REMEMBER_TTL_SEC = 60 * 60 * 24 * 30;

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

export async function createSessionToken(userAgent: string | null | undefined, ttlSec: number = SESSION_TTL_SEC): Promise<string> {
  return new SignJWT({ role: "admin", fp: clientFingerprint(userAgent) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ttlSec}s`)
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

/** Cookie options for a session of the given lifetime (the JWT carries the same expiry). */
export function sessionCookieOptionsFor(ttlSec: number) {
  return { ...sessionCookieOptions, maxAge: ttlSec };
}

/* ---------- Production configuration guard ---------- */

const MIN_PASSWORD_LENGTH = 12;
/** Values from .env.example / local development that must never unlock a production admin. */
const PLACEHOLDER_PASSWORDS = new Set(["change-me-to-a-long-password", "admin1234", "password", "changeme", "admin"]);

/**
 * On a deployed server the admin login is refused outright while the deployment is unsafe: no TOTP
 * secret, or a password that is short or still the example value. Returns the Korean reason shown
 * to the owner, or null when login may proceed.
 *
 * "Deployed" means APP_ENV=production, which the Dockerfile bakes into the image (not a .env
 * toggle). `next dev`, CI and the local E2E run (`next build && next start` with the short dev
 * password) do not set it, so they keep the relaxed behaviour.
 */
export function productionLoginBlocker(env: NodeJS.ProcessEnv = process.env): string | null {
  if (env.APP_ENV !== "production") return null;
  const problems: string[] = [];
  if (!env.ADMIN_TOTP_SECRET?.trim()) problems.push("ADMIN_TOTP_SECRET 미설정");
  const password = env.ADMIN_PASSWORD ?? "";
  if (password.length < MIN_PASSWORD_LENGTH) problems.push(`ADMIN_PASSWORD ${MIN_PASSWORD_LENGTH}자 미만`);
  else if (PLACEHOLDER_PASSWORDS.has(password)) problems.push("ADMIN_PASSWORD 예시 값 그대로");
  if (problems.length === 0) return null;
  return `운영 모드에서는 TOTP와 ${MIN_PASSWORD_LENGTH}자 이상 비밀번호가 필요합니다 (${problems.join(", ")}). .env를 고치고 컨테이너를 재시작하세요.`;
}

/* ---------- Login throttling ---------- */

/**
 * 5 failures per client key within 10 minutes lock that key. An attempt is charged *before* the
 * credentials are read (`beginLoginAttempt`), synchronously, so a burst of concurrent requests
 * cannot all slip past the check while one of them is still awaiting the body; a successful login
 * then refunds the key (`endLoginAttempt`). The key is the /64-normalised IP (see ip.ts).
 */
type Attempts = { count: number; first: number };

const attempts = new Map<string, Attempts>();
const LOCK_WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_TRACKED_KEYS = 5000;

export const LOCK_WINDOW_SEC = LOCK_WINDOW_MS / 1000;

/** Charges one attempt to the key. False = already locked out (the attempt still counts, so the lock persists). */
export function beginLoginAttempt(key: string, now = Date.now()): boolean {
  let a = attempts.get(key);
  if (!a || now - a.first > LOCK_WINDOW_MS) {
    if (!a && attempts.size >= MAX_TRACKED_KEYS) {
      const oldest = attempts.keys().next().value;
      if (oldest !== undefined) attempts.delete(oldest);
    }
    a = { count: 0, first: now };
    attempts.set(key, a);
  }
  a.count += 1;
  return a.count <= MAX_FAILURES;
}

/** A successful login clears the key; a failure keeps the charge already taken. */
export function endLoginAttempt(key: string, ok: boolean) {
  if (ok) attempts.delete(key);
}

/** Test hook. */
export function resetLoginAttempts() {
  attempts.clear();
}
