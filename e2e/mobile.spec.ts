import { expect, test, type Browser, type BrowserContext, type Page } from "@playwright/test";
import { apiLogin, passGate } from "./helpers";

/**
 * Ad placeholders only render in production when the `ad_placeholders` setting is on. Turn it on
 * through the admin settings form for this file and restore the previous value afterwards.
 */
let admin: BrowserContext | null = null;
let placeholdersWereOn = false;

async function setAdPlaceholders(page: Page, on: boolean) {
  await page.goto("/admin/settings");
  const box = page.locator('input[type="checkbox"][name="ad_placeholders"]');
  await box.setChecked(on);
  await page.getByRole("button", { name: "저장" }).first().click();
  await expect(page).toHaveURL(/\/admin\/settings\?saved=\d+/);
  await expect(page.locator('input[type="checkbox"][name="ad_placeholders"]')).toBeChecked({ checked: on });
}

async function adminPage(browser: Browser, baseURL: string): Promise<Page> {
  admin = await browser.newContext({ baseURL });
  const page = await admin.newPage();
  await passGate(page);
  await apiLogin(page, baseURL);
  return page;
}

test.beforeAll(async ({ browser, baseURL }) => {
  const page = await adminPage(browser, baseURL!);
  await page.goto("/admin/settings");
  placeholdersWereOn = await page.locator('input[type="checkbox"][name="ad_placeholders"]').isChecked();
  if (!placeholdersWereOn) await setAdPlaceholders(page, true);
});

test.afterAll(async () => {
  if (!admin) return;
  if (!placeholdersWereOn) await setAdPlaceholders(admin.pages()[0], false);
  await admin.close();
});

const visibleSlots = (page: Page) =>
  page.locator("[data-ad-slot-name]").evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length);

test.describe("desktop layout", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("home shows all five ad slots on a wide screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-ad-slot-name]")).toHaveCount(5);
    expect(await visibleSlots(page)).toBe(5);
  });
});

test.describe("phone layout (390×844)", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });

  for (const path of ["/", "/ko", "/batch"]) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(clientWidth).toBe(390);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }

  test("only the top, in-content and bottom ads show on a phone", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-ad-slot-name]")).toHaveCount(5);
    const visible = await page
      .locator("[data-ad-slot-name]")
      .evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).map((el) => el.getAttribute("data-ad-slot-name")));
    expect(visible).toEqual(["상단", "본문 중간", "하단"]);
  });
});
