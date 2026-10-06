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

  test("Chinese browser (any region tag) → /zh, the Simplified edition", async ({ browser, baseURL }) => {
    for (const locale of ["zh-CN", "zh-TW"]) {
      const ctx = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale });
      const page = await ctx.newPage();
      await page.goto("/");
      await expect(page, locale).toHaveURL(/\/zh$/);
      await expect(page.locator("html"), locale).toHaveAttribute("lang", "zh");
      await ctx.close();
    }
  });

  test("Korean edition shows KakaoTalk, Naver and the Korean map apps first in the SNS picker", async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale: "ko-KR" });
    const page = await ctx.newPage();
    await page.goto("/ko");
    await page.getByRole("group", { name: "QR 종류" }).getByRole("button", { name: /SNS/ }).click();
    const picker = page.getByRole("group", { name: "플랫폼" });
    await expect(picker.getByTitle("카카오톡 오픈채팅")).toBeVisible();
    await expect(picker.getByTitle("네이버 지도")).toBeVisible();
    await expect(picker.getByTitle("카카오맵")).toBeVisible();
    await ctx.close();
    // English edition keeps the global set first; Kakao sits behind "More". (A Korean browser would be
    // sent to /ko from the root, so use an English context here.)
    const enCtx = await browser.newContext({ baseURL, userAgent: BROWSER_UA, locale: "en-US" });
    const enPage = await enCtx.newPage();
    await enPage.goto("/");
    await enPage.getByRole("group", { name: "QR code type" }).getByRole("button", { name: /Social/ }).click();
    const en = enPage.getByRole("group", { name: "Platform" });
    await expect(en.getByTitle("Google Maps")).toBeVisible();
    await expect(en.getByTitle("KakaoTalk Open Chat")).toHaveCount(0);
    await enCtx.close();
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
