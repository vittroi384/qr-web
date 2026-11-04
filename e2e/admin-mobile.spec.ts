import { expect, test } from "@playwright/test";
import { apiLogin, passGate } from "./helpers";

/**
 * Admin on a phone: nothing may push the page sideways, and tables must fit their card too.
 * (The first mobile check skipped `.table-scroll` boxes, so tables that needed sideways
 * swiping on a phone — the actual complaint — passed.)
 */
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

const PAGES = ["/admin", "/admin/stats", "/admin/logs", "/admin/audit", "/admin/settings"];

test("admin pages fit a 390px phone, tables included", async ({ page, baseURL }) => {
  await passGate(page);
  await apiLogin(page, baseURL!);
  const problems: string[] = [];
  for (const p of PAGES) {
    await page.goto(p);
    await page.waitForLoadState("networkidle");
    const r = await page.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const out: string[] = [];
      if (document.documentElement.scrollWidth > W + 1) out.push(`page scrollWidth ${document.documentElement.scrollWidth} > ${W}`);
      document.querySelectorAll<HTMLElement>(".table-scroll").forEach((box, i) => {
        if (box.scrollWidth > box.clientWidth + 1) {
          const title = box.closest("section")?.querySelector("h2")?.textContent?.trim() ?? `table ${i}`;
          out.push(`table "${title}" ${box.scrollWidth} > ${box.clientWidth}`);
        }
      });
      return out;
    });
    problems.push(...r.map((x) => `${p}: ${x}`));
    if (process.env.SHOT_DIR) await page.screenshot({ path: `${process.env.SHOT_DIR}${p.replace(/\//g, "_")}.png`, fullPage: true });
  }
  expect(problems).toEqual([]);
});
