import { expect, test, type Request } from "@playwright/test";

const isLogRequest = (r: Request) => new URL(r.url()).pathname === "/api/log" && r.method() === "POST";

test.describe("QR generator (/)", () => {
  test("live preview, Wi-Fi PNG download, and a masked log only on save", async ({ page }) => {
    const logRequests: Request[] = [];
    page.on("request", (r) => {
      if (isLogRequest(r)) logRequests.push(r);
    });

    // The client sends logs with navigator.sendBeacon, whose Blob body Playwright cannot read
    // from the network event. Record what the page hands to sendBeacon (it still sends it).
    await page.addInitScript(() => {
      const w = window as unknown as { __beacons: Promise<string>[] };
      w.__beacons = [];
      const original = navigator.sendBeacon?.bind(navigator);
      if (!original) return;
      navigator.sendBeacon = (url, data) => {
        if (String(url).includes("/api/log")) w.__beacons.push(data instanceof Blob ? data.text() : Promise.resolve(String(data ?? "")));
        return original(url, data);
      };
    });

    await page.goto("/");
    const canvas = page.getByRole("img", { name: "Preview of your QR code" });
    const blank = await canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL("image/png"));

    // ---- URL: typing renders a code but sends nothing ----
    await page.getByPlaceholder("example.com or https://example.com/page").fill("example.com/menu");
    await expect
      .poll(() => canvas.evaluate((c: HTMLCanvasElement) => c.toDataURL("image/png")))
      .not.toBe(blank);
    const drawn = await canvas.evaluate((c: HTMLCanvasElement) => {
      const ctx = c.getContext("2d")!;
      const { data } = ctx.getImageData(0, 0, c.width, c.height);
      let dark = 0;
      for (let i = 0; i < data.length; i += 4) if (data[i] < 128 && data[i + 3] > 0) dark++;
      return { width: c.width, darkRatio: dark / (c.width * c.height), urlLength: c.toDataURL("image/png").length };
    });
    expect(drawn.width).toBeGreaterThan(0);
    expect(drawn.urlLength).toBeGreaterThan(2_000);
    expect(drawn.darkRatio).toBeGreaterThan(0.2);
    expect(drawn.darkRatio).toBeLessThan(0.8);
    // Caption: "Output 512 × 512px · …"
    await expect(page.getByText(/Output\s+\d+ × \d+px/)).toBeVisible();

    // ---- Wi-Fi ----
    await page.getByRole("group", { name: "QR code type" }).getByRole("button", { name: /Wi-Fi/ }).click();
    await page.getByPlaceholder("e.g. MyHome_5G").fill("CafeGuest");
    await page.getByPlaceholder("Wi-Fi password").fill("s3cret;pass");
    await expect(page.getByRole("button", { name: "Save image (PNG)" })).toBeEnabled();

    // Nothing was logged while typing, previewing or switching types.
    await page.waitForTimeout(500);
    expect(logRequests).toHaveLength(0);

    const [download, logRequest] = await Promise.all([
      page.waitForEvent("download"),
      page.waitForRequest(isLogRequest),
      page.getByRole("button", { name: "Save image (PNG)" }).click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/\.png$/);

    const raw =
      logRequest.postData() ??
      (await page.evaluate(async () => {
        const beacons = (window as unknown as { __beacons: Promise<string>[] }).__beacons;
        return beacons.length ? await beacons[beacons.length - 1] : "";
      }));
    const body = JSON.parse(raw);
    expect(body.type).toBe("wifi");
    expect(body.event).toBe("download_png");
    expect(body.payload.ssid).toBe("CafeGuest");
    expect(body.payload.password).toBe("****");
    expect(body.encoded).toContain("P:****;");
    // The plaintext password never leaves the browser.
    expect(raw).not.toContain("s3cret");
    expect(logRequests).toHaveLength(1);
  });
});
