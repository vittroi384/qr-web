import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_SIGNATURE = 0x02014b50;

/** Reads the file names from a ZIP's central directory (no zip library — just the spec layout). */
function zipEntryNames(bytes: Buffer): string[] {
  // EOCD is 22 bytes plus an optional comment of up to 65 535 bytes; scan backwards for it.
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 22 - 0xffff); i--) {
    if (bytes.readUInt32LE(i) === EOCD_SIGNATURE) {
      eocd = i;
      break;
    }
  }
  expect(eocd, "end-of-central-directory record").toBeGreaterThanOrEqual(0);
  const total = bytes.readUInt16LE(eocd + 10);
  const cdSize = bytes.readUInt32LE(eocd + 12);
  const cdOffset = bytes.readUInt32LE(eocd + 16);
  expect(cdOffset + cdSize).toBe(eocd);

  const names: string[] = [];
  let p = cdOffset;
  for (let n = 0; n < total; n++) {
    expect(bytes.readUInt32LE(p)).toBe(CENTRAL_SIGNATURE);
    const nameLen = bytes.readUInt16LE(p + 28);
    const extraLen = bytes.readUInt16LE(p + 30);
    const commentLen = bytes.readUInt16LE(p + 32);
    names.push(bytes.subarray(p + 46, p + 46 + nameLen).toString("utf8"));
    p += 46 + nameLen + extraLen + commentLen;
  }
  expect(p).toBe(eocd);
  return names;
}

test("batch: valid rows become a ZIP of PNGs + index.csv, invalid rows are skipped", async ({ page }) => {
  await page.goto("/batch");

  await page.getByLabel("Name, line 1", { exact: true }).fill("Menu");
  await page.getByLabel("Link or text, line 1", { exact: true }).fill("https://example.com/menu");
  await page.getByLabel("Link or text, line 2", { exact: true }).fill("javascript:alert(1)");
  await page.getByLabel("Name, line 3", { exact: true }).fill("Booking");
  await page.getByLabel("Link or text, line 3", { exact: true }).fill("example.com/booking");

  const invalid = page.getByLabel("Link or text, line 2", { exact: true });
  await expect(invalid).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Not a valid address")).toBeVisible();
  await expect(page.getByText("1 line marked in red will be skipped.")).toBeVisible();
  await expect(page.getByLabel("Link or text, line 1", { exact: true })).not.toHaveAttribute("aria-invalid", "true");

  const button = page.getByRole("button", { name: "Download 2 QR codes" });
  await expect(button).toBeEnabled();
  const [download] = await Promise.all([page.waitForEvent("download"), button.click()]);
  expect(download.suggestedFilename()).toMatch(/\.zip$/);
  await expect(page.getByText("Saved 2 QR codes.")).toBeVisible();

  const bytes = readFileSync(await download.path());
  expect(bytes.readUInt32LE(0)).toBe(0x04034b50); // first local file header
  const names = zipEntryNames(bytes);
  expect(names.filter((n) => n.endsWith(".png"))).toHaveLength(2);
  expect(names).toContain("index.csv");
  expect(names).toHaveLength(3);
});
