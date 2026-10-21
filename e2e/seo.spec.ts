import { expect, test } from "@playwright/test";
import { ADMIN } from "./helpers";

test.describe("SEO surface", () => {
  test("English landing page: lang, title, hreflang, JSON-LD", async ({ page }) => {
    const res = await page.goto("/wifi-qr-code");
    expect(res?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle(/Wi-Fi QR Code/);

    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((l) => [l.getAttribute("hreflang"), new URL(l.getAttribute("href")!, location.href).pathname]));
    const map = Object.fromEntries(hreflangs);
    expect(map.en).toBe("/wifi-qr-code");
    expect(map.ko).toBe("/ko/wifi-qr-code");
    for (const l of ["es", "pt", "de", "fr", "ja", "hi", "id", "zh"]) expect(map[l]).toBe(`/${l}/wifi-qr-code`);
    expect(map["x-default"]).toBe("/wifi-qr-code");

    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = blocks.flatMap((raw) => {
      const data = JSON.parse(raw); // throws → test fails on invalid JSON
      const items = Array.isArray(data) ? data : data["@graph"] ?? [data];
      return items.map((d: { "@type": string }) => d["@type"]);
    });
    expect(types).toContain("FAQPage");
    expect(types).toContain("SoftwareApplication");
  });

  for (const l of ["ko", "es", "pt", "de", "fr", "ja", "hi", "id", "zh"]) {
    test(`/${l} landing page is lang=${l}`, async ({ page }) => {
      const res = await page.goto(`/${l}/wifi-qr-code`);
      expect(res?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", l);
    });
  }

  test("/en/* permanently redirects to the root edition", async ({ request }) => {
    const res = await request.get("/en/wifi-qr-code", { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(new URL(res.headers().location, "http://x").pathname).toBe("/wifi-qr-code");
  });

  test("sitemap.xml and robots.txt", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect((xml.match(/<loc>/g) ?? []).length).toBeGreaterThanOrEqual(36);

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const txt = await robots.text();
    expect(txt).toMatch(/^Disallow: \/api$/m);
    expect(txt).not.toContain("/admin");
    expect(txt).not.toContain(ADMIN.path);
  });

  test("home JSON-LD, llms.txt and the IndexNow key file", async ({ page, request }) => {
    await page.goto("/ko");
    const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((b) => JSON.parse(b));
    expect(blocks.map((b) => b["@type"])).toEqual(["WebApplication", "FAQPage"]);
    expect(blocks[0].offers.price).toBe("0");
    expect(blocks[1].mainEntity.length).toBe(await page.locator('section[aria-labelledby="faq-heading"] details').count());

    const llms = await request.get("/llms.txt");
    expect(llms.status()).toBe(200);
    expect(llms.headers()["content-type"]).toContain("text/plain");
    const text = await llms.text();
    expect(text).toMatch(/^# /);
    expect(text).toContain("/wifi-qr-code)");
    expect(text).not.toContain(ADMIN.path);

    const key = await request.get("/indexnow-key.txt");
    expect(key.status()).toBe(200);
    expect((await key.text()).trim()).toMatch(/^[0-9a-f]{32}$/);
  });
});
