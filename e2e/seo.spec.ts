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
    for (const l of ["es", "pt", "de", "fr", "ja", "hi", "id"]) expect(map[l]).toBe(`/${l}/wifi-qr-code`);
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

  for (const l of ["ko", "es", "pt", "de", "fr", "ja", "hi", "id"]) {
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
});
