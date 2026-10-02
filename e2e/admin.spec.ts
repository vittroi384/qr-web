import { expect, test } from "@playwright/test";
import { ADMIN, freshTotp, passGate } from "./helpers";

test.describe("admin area", () => {
  test("is invisible without the gate cookie", async ({ page, request }) => {
    for (const path of ["/admin", "/admin/login", "/admin/logs"]) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(404);
    }
    expect((await request.get("/api/admin/login")).status()).toBe(404);
    expect((await request.post("/api/admin/login", { data: { password: ADMIN.password } })).status()).toBe(404);
    expect((await request.get("/api/admin/logs/export")).status()).toBe(404);
  });

  test("gate → login (password + TOTP) → dashboard, logs, CSV → logout", async ({ page, request }) => {
    // A Wi-Fi log sent with a plaintext password (as a non-masking client would): the server must mask it.
    const marker = `E2E-${Date.now().toString(36)}`;
    const plain = `Plain-${marker}-pw`;
    const logged = await request.post("/api/log", {
      data: {
        type: "wifi",
        event: "download_png",
        payload: { ssid: marker, password: plain, encryption: "WPA", hidden: false },
        options: { size: 512 },
        encoded: `WIFI:T:WPA;S:${marker};P:${plain};;`,
      },
    });
    expect(logged.ok()).toBeTruthy();

    // Secret entry path → gate cookie → login page.
    await passGate(page);
    await expect(page.getByRole("heading", { name: "관리자 로그인" })).toBeVisible();

    // Exactly one login with a code the server has not seen (codes are single-use; failures count toward a lockout).
    await page.getByLabel("비밀번호").fill(ADMIN.password);
    const otp = page.getByLabel("인증 코드 (OTP)");
    await expect(otp).toBeVisible();
    await otp.fill(await freshTotp());
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("navigation", { name: "관리자 메뉴" })).toBeVisible();

    // Dashboard and logs render for the session.
    expect((await page.goto("/admin"))?.status()).toBe(200);
    const logsRes = await page.goto(`/admin/logs?q=${encodeURIComponent(marker)}`);
    expect(logsRes?.status()).toBe(200);
    const table = page.locator("table");
    await expect(table).toContainText(marker);
    await expect(table).toContainText("****");
    await expect(table).not.toContainText(plain);
    expect(await page.content()).not.toContain(plain);

    // CSV export (cookies are shared with page.request).
    const csv = await page.request.get(`/api/admin/logs/export?q=${encodeURIComponent(marker)}`);
    expect(csv.status()).toBe(200);
    expect(csv.headers()["content-type"]).toContain("text/csv");
    const bytes = await csv.body();
    expect([...bytes.subarray(0, 3)]).toEqual([0xef, 0xbb, 0xbf]); // UTF-8 BOM
    const text = bytes.toString("utf8");
    expect(text).toContain("created_at_kst");
    expect(text).toContain(marker);
    expect(text).not.toContain(plain);

    // Logout → session gone, gate still valid → /admin redirects to the login page.
    await page.getByRole("button", { name: "로그아웃" }).click();
    await expect(page).toHaveURL(/\/admin\/login/);
    const after = await page.goto("/admin");
    expect(after?.status()).toBe(200);
    await expect(page).toHaveURL(/\/admin\/login\?next=%2Fadmin$/);
  });
});
