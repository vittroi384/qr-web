#!/usr/bin/env node
// Generates a TOTP secret for the admin login and prints it as a QR code to scan with
// Google Authenticator / Authy / 1Password. Run: npm run totp-setup
import { randomBytes } from "node:crypto";
import QRCode from "qrcode";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32(bytes) {
  let bits = 0, value = 0, out = "";
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) { out += ALPHABET[(value >>> (bits - 5)) & 31]; bits -= 5; }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

const issuer = process.argv[2] || "GetQRMaker";
const account = process.argv[3] || "admin";
const secret = base32(randomBytes(20));
const uri = `otpauth://totp/${encodeURIComponent(`${issuer}:${account}`)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

console.log("\n1) Scan this with your authenticator app:\n");
console.log(await QRCode.toString(uri, { type: "terminal", small: true }));
console.log("   (or enter the key manually):", secret);
console.log("\n2) Add this line to .env on the server and restart:\n");
console.log(`ADMIN_TOTP_SECRET=${secret}\n`);
