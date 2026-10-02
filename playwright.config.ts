import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests against a production build (`next build` + `next start`).
 *
 * - Locally: builds and starts the app on :3300 (your dev server on :3000 is left alone).
 *   Reuses a server already listening on :3300.
 * - PLAYWRIGHT_BASE_URL=https://… runs the suite against an existing deployment instead.
 *
 * The app reads DATABASE_URL / ADMIN_* / SESSION_SECRET from the environment (or .env locally).
 * Tests run serially: admin logins share one TOTP time-step budget and one rate limiter.
 */
const PORT = 3300;
const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalBaseUrl ?? `http://localhost:${PORT}`;
const CI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "e2e",
  fullyParallel: false,
  workers: 1,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    locale: "en-US",
    timezoneId: "Asia/Seoul",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: externalBaseUrl
    ? undefined
    : {
        command: `npm run build && npx next start -p ${PORT}`,
        url: `http://localhost:${PORT}/robots.txt`,
        reuseExistingServer: !CI,
        timeout: 300_000,
        stdout: "ignore",
        stderr: "pipe",
        env: { NEXT_TELEMETRY_DISABLED: "1" },
      },
});
