import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FRAME_TEXT_MAX, estimateTextWidth, fitLabel, frameLayout, normalizeFrameText, resolveFrameColor } from "./frame";

describe("frameLayout", () => {
  it("is the bare QR when the frame is off, whatever the text says", () => {
    const l = frameLayout(528, { frame: "none", frameText: "Scan me" });
    assert.deepEqual(l, { width: 528, height: 528, qr: { x: 0, y: 0, size: 528 }, bar: null, text: null, radius: 0, border: 0 });
  });

  it("adds a 6% border and an 18% label bar below the code", () => {
    const l = frameLayout(512, { frame: "scan", frameText: "Scan me" });
    const border = Math.round(512 * 0.06); // 31
    const barH = Math.round(512 * 0.18); // 92
    assert.equal(l.border, border);
    assert.equal(l.width, 512 + border * 2);
    assert.equal(l.height, l.width + barH);
    assert.deepEqual(l.qr, { x: border, y: border, size: 512 });
    assert.deepEqual(l.bar, { x: 0, y: border + 512, w: l.width, h: border + barH });
    assert.ok(l.text);
    assert.equal(l.text.value, "Scan me");
    assert.equal(l.text.fontPx, Math.round(barH * 0.55));
    assert.equal(l.text.x, l.width / 2);
    assert.equal(l.text.y, l.bar.y + l.bar.h / 2);
    assert.equal(l.radius, border * 2);
  });

  it("is a square border only when the text is empty", () => {
    const l = frameLayout(400, { frame: "custom", frameText: "   " });
    assert.equal(l.bar, null);
    assert.equal(l.text, null);
    assert.equal(l.width, l.height);
    assert.equal(l.width, 400 + Math.round(400 * 0.06) * 2);
  });

  it("shrinks the font for a long label and keeps it inside maxWidth", () => {
    const short = frameLayout(512, { frame: "custom", frameText: "Menu" });
    const long = frameLayout(512, { frame: "custom", frameText: "Scan here to open our full seasonal menu" });
    assert.ok(short.text && long.text);
    assert.ok(long.text.fontPx < short.text.fontPx);
    assert.ok(estimateTextWidth(long.text.value, long.text.fontPx) <= long.text.maxWidth);
    assert.equal(long.text.value, "Scan here to open our full seasonal menu");
    // Both layouts have the same outer size: only the glyphs change, never the canvas.
    assert.equal(long.height, short.height);
  });

  it("uses the supplied measurer (canvas measureText) instead of the estimate", () => {
    const wide = () => 10_000;
    const l = frameLayout(512, { frame: "scan", frameText: "Scan me" }, wide);
    assert.ok(l.text);
    assert.ok(l.text.value.endsWith("…"));
  });
});

describe("fitLabel", () => {
  const measure = (text: string, px: number) => text.length * px * 0.6;

  it("returns the text untouched when it fits", () => {
    assert.deepEqual(fitLabel("Scan me", 50, 1000, measure), { value: "Scan me", fontPx: 50 });
  });

  it("shrinks the font before cutting", () => {
    // 20 chars × 0.6 × 50 = 600px; needs 360px → 30px font (≥ 20 min).
    assert.deepEqual(fitLabel("abcdefghijklmnopqrst", 50, 360, measure), { value: "abcdefghijklmnopqrst", fontPx: 30 });
  });

  it("ellipsizes at the minimum size when even that is too wide", () => {
    const out = fitLabel("abcdefghijklmnopqrstuvwxyz", 50, 200, measure);
    assert.equal(out.fontPx, 20);
    assert.ok(out.value.endsWith("…"));
    assert.ok(measure(out.value, 20) <= 200);
    assert.ok(out.value.length > 1);
  });
});

describe("normalizeFrameText", () => {
  it("trims, collapses whitespace and caps the length in code points", () => {
    assert.equal(normalizeFrameText("  Scan   me \n"), "Scan me");
    assert.equal(normalizeFrameText("가".repeat(FRAME_TEXT_MAX + 5)).length, FRAME_TEXT_MAX);
    assert.equal(Array.from(normalizeFrameText("😀".repeat(FRAME_TEXT_MAX + 1))).length, FRAME_TEXT_MAX);
  });
});

describe("estimateTextWidth", () => {
  it("counts East Asian characters as a full em and combining marks as nothing", () => {
    assert.equal(estimateTextWidth("가나", 10), 20);
    assert.equal(estimateTextWidth("スキャン", 10), 40);
    assert.equal(estimateTextWidth("कि", 10), estimateTextWidth("क", 10));
    assert.ok(estimateTextWidth("Scan me", 10) < estimateTextWidth("스캔하세요", 10) + 20);
  });
});

describe("resolveFrameColor", () => {
  it("falls back to the code colour", () => {
    assert.equal(resolveFrameColor({ frameColor: "", darkColor: "#1e3a8a" }), "#1e3a8a");
    assert.equal(resolveFrameColor({ frameColor: "#881337", darkColor: "#1e3a8a" }), "#881337");
  });
});
