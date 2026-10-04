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
});
