import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Minimal RFC 6238 TOTP (SHA-1, 6 digits, 30 s) — compatible with Google Authenticator,
 * Authy, 1Password, etc. No dependency so the admin login stays auditable.
 */

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const STEP_SECONDS = 30;
const DIGITS = 6;

export function base32Encode(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(input: string): Uint8Array {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  const out: number[] = [];
  let bits = 0;
  let value = 0;
  for (const ch of clean) {
    value = (value << 5) | BASE32_ALPHABET.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Uint8Array.from(out);
}

export function generateTotpSecret(): string {
  return base32Encode(randomBytes(20));
}

function hotp(secret: Uint8Array, counter: number): string {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const digest = createHmac("sha1", Buffer.from(secret)).update(buf).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const code = ((digest[offset] & 0x7f) << 24) | (digest[offset + 1] << 16) | (digest[offset + 2] << 8) | digest[offset + 3];
  return String(code % 10 ** DIGITS).padStart(DIGITS, "0");
}

export function totpAt(secretBase32: string, unixSeconds: number): string {
  return hotp(base32Decode(secretBase32), Math.floor(unixSeconds / STEP_SECONDS));
}

// Highest time-step already consumed per secret, so a sniffed code cannot be replayed within its window.
const consumedSteps = new Map<string, number>();

/** Accepts the current code plus one step either side to absorb clock drift; each step is single-use. */
export function verifyTotp(secretBase32: string, code: string, now = Date.now()): boolean {
  const input = code.replace(/\s+/g, "");
  if (!/^\d{6}$/.test(input)) return false;
  const seconds = Math.floor(now / 1000);
  const current = Math.floor(seconds / STEP_SECONDS);
  const last = consumedSteps.get(secretBase32) ?? -1;
  for (const drift of [-1, 0, 1]) {
    const step = current + drift;
    if (step <= last) continue;
    const expected = hotp(base32Decode(secretBase32), step);
    if (timingSafeEqual(Buffer.from(expected), Buffer.from(input))) {
      consumedSteps.set(secretBase32, step);
      return true;
    }
  }
  return false;
}

export function otpauthUri(secretBase32: string, account: string, issuer: string): string {
  const label = encodeURIComponent(`${issuer}:${account}`);
  return `otpauth://totp/${label}?secret=${secretBase32}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=${DIGITS}&period=${STEP_SECONDS}`;
}
