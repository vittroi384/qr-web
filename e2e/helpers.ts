import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { expect, type APIRequestContext, type Page } from "@playwright/test";
import { totpAt } from "../src/lib/totp";

/** Same variables the app reads; fallbacks match the local .env used in development. */
export const ADMIN = {
  path: process.env.ADMIN_PATH?.trim() || "/gate-devtest1234",
  password: process.env.ADMIN_PASSWORD || "admin1234",
  totpSecret: process.env.ADMIN_TOTP_SECRET?.trim() || "VKXVD3U53NZMM6FDZP5G6RINLZG6DDMQ",
};

const STEP = 30;
// The server accepts each 30 s step once (replay protection) and allows ±1 step of drift.
// Remember the last step we used so logins in one run — or in back-to-back runs against the
// same server — never reuse a code and never trip the login-failure lockout.
// (Outside test-results/, which Playwright empties at the start of every run.)
const STEP_FILE = join(tmpdir(), "qr-web-e2e", "totp-last-step");

function readLastStep(): number {
  try {
    return Number.parseInt(readFileSync(STEP_FILE, "utf8"), 10) || -1;
  } catch {
    return -1;
  }
}

/** A one-time code the server has not seen yet (waits for the next step when needed). */
export async function freshTotp(): Promise<string> {
  for (;;) {
    const current = Math.floor(Date.now() / 1000 / STEP);
    const step = Math.max(current, readLastStep() + 1);
    if (step <= current + 1) {
      mkdirSync(dirname(STEP_FILE), { recursive: true });
      writeFileSync(STEP_FILE, String(step));
      return totpAt(ADMIN.totpSecret, step * STEP);
    }
    const waitMs = ((step - 1) * STEP - Date.now() / 1000) * 1000 + 250;
    await new Promise((r) => setTimeout(r, Math.max(waitMs, 250)));
  }
}

/** Visits the secret entry path, which sets the gate cookie and lands on the login page. */
export async function passGate(page: Page) {
  const res = await page.goto(ADMIN.path);
  expect(res?.status()).toBe(200);
  await expect(page).toHaveURL(/\/admin\/login$/);
}

/** API login sharing the page's cookies and user agent (the session is bound to the UA). */
export async function apiLogin(page: Page, baseURL: string) {
  const request: APIRequestContext = page.request;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await request.post("/api/admin/login", {
      data: { password: ADMIN.password, code: await freshTotp() },
      headers: { origin: new URL(baseURL).origin },
    });
    if (res.ok()) return;
  }
  throw new Error("admin login failed");
}
