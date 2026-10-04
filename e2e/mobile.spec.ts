import { expect, test, type Browser, type BrowserContext, type Page } from "@playwright/test";
import { apiLogin, passGate } from "./helpers";

/**
 * Ad placeholders only render in production when the `ad_placeholders` setting is on. Turn it on
 * through the admin settings form for this file and restore the previous value afterwards.
 */
let admin: BrowserContext | null = null;
// The top position is off by default (it sits right above the generator), so the layout tests
// switch it on alongside the placeholders and restore both afterwards.
const SWITCHES = ["ad_placeholders", "ad_show_top"] as const;
type Switch = (typeof SWITCHES)[number];
const wereOn: Record<Switch, boolean> = { ad_placeholders: false, ad_show_top: false };

async function setSwitches(page: Page, values: Partial<Record<Switch, boolean>>) {
  await page.goto("/admin/settings");
  for (const [name, on] of Object.entries(values)) await page.locator(`input[type="checkbox"][name="${name}"]`).setChecked(on);
  await page.getByRole("button", { name: "저장" }).first().click();
  await expect(page).toHaveURL(/\/admin\/settings\?saved=\d+/);
  for (const [name, on] of Object.entries(values)) await expect(page.locator(`input[type="checkbox"][name="${name}"]`)).toBeChecked({ checked: on });
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
  for (const name of SWITCHES) wereOn[name] = await page.locator(`input[type="checkbox"][name="${name}"]`).isChecked();
  const toTurnOn = Object.fromEntries(SWITCHES.filter((n) => !wereOn[n]).map((n) => [n, true]));
  if (Object.keys(toTurnOn).length) await setSwitches(page, toTurnOn);
});

test.afterAll(async () => {
  if (!admin) return;
  const toRestore = Object.fromEntries(SWITCHES.filter((n) => !wereOn[n]).map((n) => [n, false]));
  if (Object.keys(toRestore).length) await setSwitches(admin.pages()[0], toRestore);
  await admin.close();
});

const visibleSlots = (page: Page) =>
  page.locator("[data-ad-slot-name]").evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length);

test.describe("desktop layout", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("home shows all six ad slots on a wide screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-ad-slot-name]")).toHaveCount(6);
    expect(await visibleSlots(page)).toBe(6);
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

  test("only the top, in-content, in-article and bottom ads show on a phone", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-ad-slot-name]")).toHaveCount(6);
    const visible = await page
      .locator("[data-ad-slot-name]")
      .evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).map((el) => el.getAttribute("data-ad-slot-name")));
    expect(visible).toEqual(["top", "in-content", "in-article", "bottom"]);
  });
});
