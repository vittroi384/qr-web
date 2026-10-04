import { expect, test } from "@playwright/test";

/**
 * A first visit to "/" lands on the visitor's language edition; crawlers, visitors who chose an
 * edition from the language menu, and deep links are never redirected. The browser language is
 * set through the context `locale` (Chromium derives Accept-Language from it).
 */
const BROWSER_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

test.describe("language detection", () => {
  test("Korean browser → /ko on the root, remembered in a cookie", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale: "ko-KR" });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
    const cookie = (await ctx.cookies()).find((c) => c.name === "qr_lang");
    expect(cookie?.value).toBe("ko");
    await ctx.close();
  });

  test("English browser stays on the root; deep links are untouched for everyone", async ({ browser, baseURL }) => {
    const en = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale: "en-US" });
    const page = await en.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await en.close();

    const ko = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale: "ko-KR" });
    const deep = await ko.newPage();
    await deep.goto("/wifi-qr-code");
    await expect(deep).toHaveURL(/\/wifi-qr-code$/);
    await ko.close();
  });

  test("choosing English from the language menu sticks on the next direct visit", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale: "ko-KR" });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko$/);
    // Footer language row: a plain link to the English root with this site as the referer.
    await page.getByRole("navigation", { name: "언어 선택" }).getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/$/);
    expect((await ctx.cookies()).find((c) => c.name === "qr_lang")?.value).toBe("en");
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await ctx.close();
  });

  test("crawlers always get the English root", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({
      baseURL,
      userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      locale: "ko-KR",
    });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/$/);
    await ctx.close();
  });
});
