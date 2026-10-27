import { expect, test } from "@playwright/test";

/**
 * The anonymous funnel must not count a plain page view as a "select": the home page shows the
 * URL type by default, and only an actual choice (tile click, typing, or a type landing page)
 * should increment the counter.
 */
async function captureFunnel(page: import("@playwright/test").Page) {
  const sent: { step: string; type: string }[] = [];
  await page.route("**/api/funnel", async (route) => {
    const body = route.request().postData();
    if (body) sent.push(JSON.parse(body));
    await route.fulfill({ status: 204, body: "" });
  });
  return sent;
}

test.describe("funnel counters", () => {
  test("home page view sends no select; picking a tile does", async ({ page }) => {
    const sent = await captureFunnel(page);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    expect(sent).toEqual([]);

    await page.getByRole("group", { name: "QR code type" }).getByRole("button", { name: /Wi-Fi/ }).click();
    await expect.poll(() => sent).toEqual([{ step: "select", type: "wifi", locale: "en" }]);
  });

  test("typing into the default URL type counts as a select, then a preview", async ({ page }) => {
    const sent = await captureFunnel(page);
    await page.goto("/");
    await page.getByPlaceholder("example.com or https://example.com/page").fill("example.com/menu");
    await expect.poll(() => sent.map((s) => `${s.step}:${s.type}`)).toEqual(["select:url", "preview:url"]);
  });

  test("a type landing page counts its type as selected on load", async ({ page }) => {
    const sent = await captureFunnel(page);
    await page.goto("/wifi-qr-code");
    await expect.poll(() => sent).toEqual([{ step: "select", type: "wifi", locale: "en" }]);
  });

  test("only the first save of a type in a session counts as the funnel's save", async ({ page }) => {
    await captureFunnel(page);
    const logs: { funnel?: boolean }[] = [];
    await page.route("**/api/log", async (route) => {
      logs.push(JSON.parse(route.request().postData() ?? "{}"));
      await route.fulfill({ status: 204, body: "" });
    });
    await page.goto("/");
    await page.getByPlaceholder("example.com or https://example.com/page").fill("example.com/save");
    const save = page.getByRole("button", { name: "Save image (PNG)" });
    await Promise.all([page.waitForEvent("download"), save.click()]);
    await Promise.all([page.waitForEvent("download"), save.click()]);
    await expect.poll(() => logs.map((l) => l.funnel)).toEqual([true, false]);
  });
});

test.describe("visit source", () => {
  test("first page of a session reports its source once; saves carry it", async ({ page, baseURL }) => {
    const visits: unknown[] = [];
    const logs: { source?: string }[] = [];
    await page.route("**/api/visit", async (route) => {
      visits.push(JSON.parse(route.request().postData() ?? "{}"));
      await route.fulfill({ status: 204, body: "" });
    });
    await page.route("**/api/log", async (route) => {
      logs.push(JSON.parse(route.request().postData() ?? "{}"));
      await route.fulfill({ status: 204, body: "" });
    });

    await page.goto("/ko?utm_source=chatgpt.com");
    await expect.poll(() => visits).toEqual([{ source: "chatgpt", locale: "ko" }]);
    await page.goto("/ko/wifi-qr-code");
    await page.waitForLoadState("networkidle");
    expect(visits).toHaveLength(1);

    await page.goto("/ko");
    await page.getByPlaceholder("example.com 또는 https://example.com/page").fill("example.com/visit");
    await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "이미지로 저장 (PNG)" }).click()]);
    await expect.poll(() => logs.map((l) => l.source)).toEqual(["chatgpt"]);

    // The real endpoint accepts a valid body and rejects junk.
    const origin = new URL(baseURL!).origin;
    expect((await page.request.post("/api/visit", { headers: { origin }, data: { source: "google", locale: "en" } })).status()).toBe(200);
    expect((await page.request.post("/api/visit", { headers: { origin }, data: { source: "Bad Key", locale: "en" } })).status()).toBe(400);
    expect((await page.request.post("/api/visit", { headers: { origin }, data: { source: "google", locale: "xx" } })).status()).toBe(400);
  });
});
