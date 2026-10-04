import { expect, test } from "@playwright/test";

/**
 * Step guide gauge and type tiles: picking a type fills one step, typing fills two, tapping the
 * chosen tile again clears the selection (hint instead of the form, gauge back to zero), and only
 * eight tiles show until "More types" is pressed — on every width.
 */
test.describe("step guide and type tiles", () => {
  test("gauge follows pick → type → deselect, and the form hides while nothing is selected", async ({ page }) => {
    await page.goto("/");
    const gauge = page.getByRole("progressbar", { name: "How it works" });
    const tiles = page.getByRole("group", { name: "QR code type" });
    const wifi = tiles.getByRole("button", { name: /Wi-Fi/ });
    await expect(gauge).toHaveAttribute("aria-valuenow", "0");

    await wifi.click();
    await expect(wifi).toHaveAttribute("aria-pressed", "true");
    await expect(gauge).toHaveAttribute("aria-valuenow", "1");

    await page.getByPlaceholder("e.g. MyHome_5G").fill("CafeGuest");
    await expect(gauge).toHaveAttribute("aria-valuenow", "2");

    // Second tap on the chosen tile: nothing selected, hint shown, preview and gauge reset.
    await wifi.click();
    await expect(wifi).toHaveAttribute("aria-pressed", "false");
    await expect(gauge).toHaveAttribute("aria-valuenow", "0");
    await expect(page.getByPlaceholder("e.g. MyHome_5G")).toHaveCount(0);

    // Re-selecting restores what was typed.
    await wifi.click();
    await expect(page.getByPlaceholder("e.g. MyHome_5G")).toHaveValue("CafeGuest");
    await expect(gauge).toHaveAttribute("aria-valuenow", "2");
  });

  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "phone", width: 390, height: 844 },
  ]) {
    test(`${viewport.name}: eight tiles until "More types" is pressed`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/");
      const tiles = page.getByRole("group", { name: "QR code type" }).locator("button");
      await expect(tiles).toHaveCount(17);
      expect(await tiles.evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length)).toBe(8);

      await page.getByRole("button", { name: /More types \(9\)/ }).click();
      expect(await tiles.evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length)).toBe(17);
      await page.getByRole("button", { name: "Fewer types" }).click();
      expect(await tiles.evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).length)).toBe(8);
    });
  }
});
