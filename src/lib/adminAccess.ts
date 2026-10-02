import { SignJWT, jwtVerify } from "jose";

/**
 * Admin access policy shared by the proxy (edge of the app) and the API routes.
 *
 *  1. Secret entry path  — ADMIN_PATH (e.g. "/gate-7f3a9c2e"). Visiting it sets a signed
 *     "gate" cookie and redirects to the login page. Without that cookie every /admin/*
 *     request (and the admin API) is answered with 404, so the admin area is invisible to
 *     anyone who only knows the public site. If ADMIN_PATH is unset the gate is disabled.
 *  2. Optional IP allowlist — ADMIN_ALLOWED_IPS="1.2.3.4, 10.0.0.0/8, 2001:db8::1".
 *  3. Password + TOTP (see auth.ts / totp.ts) behind both of the above.
 */

export const GATE_COOKIE = "qr_admin_gate";
export const GATE_TTL_SEC = 60 * 60 * 24 * 30;

export function adminEntryPath(): string | null {
  const raw = process.env.ADMIN_PATH?.trim();
  if (!raw) return null;
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  // Must be a single, non-trivial segment that does not collide with real routes.
  if (!/^\/[A-Za-z0-9_-]{8,64}$/.test(path) || path === "/admin") return null;
  return path;
}

/** Gate tokens are signed with a key derived from SESSION_SECRET; never usable as a session. */
function gateKey(): Uint8Array | null {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) return null;
  return new TextEncoder().encode(`${secret}:gate`);
}

export async function createGateToken(): Promise<string | null> {
  const key = gateKey();
  if (!key) return null;
  return new SignJWT({ gate: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${GATE_TTL_SEC}s`)
    .sign(key);
}

export async function verifyGateToken(token: string | undefined): Promise<boolean> {
  const key = gateKey();
  if (!key || !token) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.gate === true;
  } catch {
    return false;
  }
}

/** Gate requirement satisfied: either no ADMIN_PATH configured, or a validly signed gate cookie. */
export async function gateSatisfied(token: string | undefined): Promise<boolean> {
  if (!adminEntryPath()) return true;
  return verifyGateToken(token);
}

function ipv4ToInt(ip: string): number | null {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ip);
  if (!m) return null;
  const parts = m.slice(1).map(Number);
  if (parts.some((p) => p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function matchesRule(ip: string, rule: string): boolean {
  const [base, prefixStr] = rule.split("/");
  if (prefixStr === undefined) return ip.toLowerCase() === base.toLowerCase();
  const prefix = Number.parseInt(prefixStr, 10);
  const a = ipv4ToInt(ip);
  const b = ipv4ToInt(base);
  if (a === null || b === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) return false;
  if (prefix === 0) return true;
  const mask = (0xffffffff << (32 - prefix)) >>> 0;
  return (a & mask) === (b & mask);
}

/** True when no allowlist is configured or the IP matches one of its entries. */
export function ipAllowedForAdmin(ip: string): boolean {
  const raw = process.env.ADMIN_ALLOWED_IPS?.trim();
  if (!raw) return true;
  const rules = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (rules.length === 0) return true;
  // Strip an IPv6-mapped IPv4 prefix so "::ffff:1.2.3.4" matches "1.2.3.4".
  const normalized = ip.replace(/^::ffff:/i, "");
  return rules.some((rule) => matchesRule(normalized, rule));
}
