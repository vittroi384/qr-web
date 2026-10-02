import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// No CSS transitions mid-scan (axe would sample in-between colours).
test.use({ reducedMotion: "reduce" });

const PAGES = ["/", "/batch", "/wifi-qr-code", "/ko"];

for (const path of PAGES) {
  test(`axe: no serious/critical violations on ${path}`, async ({ page }, testInfo) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();

    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      targets: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
    }));
    const minor = summary.filter((v) => v.impact !== "serious" && v.impact !== "critical");
    if (minor.length) {
      console.log(`[axe] ${path}: ${minor.length} minor/moderate`, JSON.stringify(minor));
      await testInfo.attach("axe-minor", { body: JSON.stringify(minor, null, 2), contentType: "application/json" });
    }
    const blocking = summary.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}
