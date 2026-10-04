import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { FRAME_TEXT_MAX, estimateTextWidth, fitLabel, frameLayout, frameTextColor, normalizeFrameText, resolveFrameColor } from "./frame";

describe("frameLayout", () => {
  it("is the bare QR when the frame is off, whatever the text says", () => {
    const l = frameLayout(528, { frame: "none", frameShape: "label", frameText: "Scan me" });
    assert.deepEqual(l, { width: 528, height: 528, qr: { x: 0, y: 0, size: 528 }, box: null, parts: [], bar: null, text: null, fillBackground: false, radius: 0, border: 0 });
  });

  it("adds a 6% border and an 18% label bar below the code", () => {
    const l = frameLayout(512, { frame: "scan", frameShape: "label", frameText: "Scan me" });
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
    assert.deepEqual(l.box, { x: 0, y: 0, w: l.width, h: l.height, radius: border * 2 });
    assert.deepEqual(l.parts, []);
    assert.equal(l.text.color, "#ffffff");
  });

  it("puts the caption bar above the code for the \"top\" shape", () => {
    const l = frameLayout(512, { frame: "scan", frameShape: "top", frameText: "Scan me" });
    const border = Math.round(512 * 0.06);
    const barH = Math.round(512 * 0.18);
    assert.deepEqual(l.qr, { x: border, y: border + barH, size: 512 });
    assert.deepEqual(l.bar, { x: 0, y: 0, w: l.width, h: border + barH });
    assert.equal(l.height, 512 + border * 2 + barH);
  });

  it("adds a tail under the box for the speech bubble, and the canvas grows by its height", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "bubble", frameText: "Scan me" });
    assert.ok(l.box);
    const tailH = Math.round(500 * 0.08);
    assert.equal(l.height, l.box.h + tailH);
    const tail = l.parts[0];
    assert.ok(tail && tail.kind === "polygon");
    const [a, b, tip] = tail.points;
    assert.equal(a[1], l.box.h);
    assert.equal(b[1], l.box.h);
    assert.equal(tip[1], l.box.h + tailH);
    assert.equal(tip[0], l.width / 2);
  });

  it("uses a thicker border and a bigger radius for the rounded shape", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "rounded", frameText: "Scan me" });
    assert.equal(l.border, Math.round(500 * 0.08));
    assert.equal(l.radius, Math.round(l.border * 3.5));
  });

  it("ribbon: the strip runs wider than the box with notched ends, over the code's background", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "ribbon", frameText: "Scan me" });
    const border = Math.round(500 * 0.06);
    const wing = Math.round(500 * 0.1);
    assert.ok(l.box && l.bar);
    assert.equal(l.width, 500 + border * 2 + wing * 2);
    assert.equal(l.box.x, wing);
    assert.equal(l.qr.x, wing + border);
    assert.deepEqual([l.bar.x, l.bar.w], [0, l.width]);
    assert.equal(l.fillBackground, true);
    const ribbon = l.parts[0];
    assert.ok(ribbon && ribbon.kind === "polygon" && ribbon.points.length === 6);
    // Without a caption there is no ribbon and the canvas is just the box.
    const bare = frameLayout(500, { frame: "custom", frameShape: "ribbon", frameText: "" });
    assert.equal(bare.width, 500 + border * 2);
    assert.deepEqual(bare.parts, []);
  });

  it("floating: the caption sits on a pill below the box with a gap", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "floating", frameText: "Scan me" });
    const border = Math.round(500 * 0.06);
    const w = 500 + border * 2;
    assert.ok(l.box && l.bar && l.text);
    assert.equal(l.box.h, w);
    assert.equal(l.bar.y, w + Math.round(500 * 0.06));
    assert.equal(l.bar.h, Math.round(500 * 0.18));
    assert.equal(l.height, l.bar.y + l.bar.h);
    const pill = l.parts[0];
    assert.ok(pill && pill.kind === "rect" && pill.radius === pill.h / 2);
    assert.equal(l.text.color, "#ffffff");
  });

  it("corners: four L marks and no box, caption below in the frame colour", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "corners", frameText: "Scan me" });
    const thick = Math.round(500 * 0.06);
    const inset = thick + Math.round(500 * 0.04);
    assert.equal(l.box, null);
    assert.equal(l.parts.length, 8);
    assert.ok(l.parts.every((p) => p.kind === "rect"));
    assert.deepEqual(l.qr, { x: inset, y: inset, size: 500 });
    assert.equal(l.width, 500 + inset * 2);
    assert.ok(l.text && l.text.color === "" && l.text.y > l.width);
    assert.equal(l.fillBackground, true);
  });

  it("bubbleTop: the tail points up above a caption strip at the top", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "bubbleTop", frameText: "Scan me" });
    const tailH = Math.round(500 * 0.08);
    const border = Math.round(500 * 0.06);
    const barH = Math.round(500 * 0.18);
    assert.ok(l.box && l.bar);
    assert.equal(l.box.y, tailH);
    assert.deepEqual(l.qr, { x: border, y: tailH + border + barH, size: 500 });
    const tail = l.parts[0];
    assert.ok(tail && tail.kind === "polygon");
    assert.equal(tail.points[2][1], 0);
    assert.equal(l.height, l.box.h + tailH);
  });

  it("circle: the box is a circle around the code's diagonal, caption below in the open", () => {
    const l = frameLayout(500, { frame: "scan", frameShape: "circle", frameText: "Scan me" });
    const border = Math.round(500 * 0.06);
    const d = Math.ceil(500 * Math.SQRT2) + border * 2;
    assert.ok(l.box && l.text);
    assert.deepEqual(l.box, { x: 0, y: 0, w: d, h: d, radius: d / 2 });
    assert.equal(l.qr.x, Math.round((d - 500) / 2));
    assert.equal(l.text.color, "");
    assert.ok(l.height > d);
  });

  it("underline and brackets: parts only, no box, caption below in the open", () => {
    const u = frameLayout(500, { frame: "scan", frameShape: "underline", frameText: "Scan me" });
    assert.equal(u.box, null);
    assert.equal(u.width, 500);
    assert.equal(u.parts.length, 1);
    assert.ok(u.text && u.text.color === "");
    const b = frameLayout(500, { frame: "scan", frameShape: "brackets", frameText: "Scan me" });
    assert.equal(b.box, null);
    assert.equal(b.parts.length, 6);
    const inset = Math.round(500 * 0.06) + Math.round(500 * 0.05);
    assert.equal(b.qr.x, inset);
    assert.ok(b.text && b.text.y > b.qr.y + 500);
  });

  it("sets the caption outside a thin box in the frame colour, over the code's background", () => {
    const l = frameLayout(400, { frame: "scan", frameShape: "thin", frameText: "Scan me" });
    const border = Math.max(2, Math.round(400 * 0.025));
    assert.equal(l.border, border);
    assert.deepEqual(l.box, { x: 0, y: 0, w: 400 + border * 2, h: 400 + border * 2, radius: border * 2 });
    assert.equal(l.bar, null);
    assert.ok(l.text);
    assert.equal(l.text.color, "");
    assert.equal(l.fillBackground, true);
    assert.ok(l.text.y > l.box.h);
    assert.ok(l.height > l.box.h);
    assert.equal(frameTextColor(l, { frameColor: "", darkColor: "#123456" }), "#123456");
    // Without a caption the thin box is square.
    const bare = frameLayout(400, { frame: "custom", frameShape: "thin", frameText: "" });
    assert.equal(bare.height, bare.width);
    assert.equal(bare.text, null);
  });

  it("is a square border only when the text is empty", () => {
    const l = frameLayout(400, { frame: "custom", frameShape: "label", frameText: "   " });
    assert.equal(l.bar, null);
    assert.equal(l.text, null);
    assert.equal(l.width, l.height);
    assert.equal(l.width, 400 + Math.round(400 * 0.06) * 2);
  });

  it("shrinks the font for a long label and keeps it inside maxWidth", () => {
    const short = frameLayout(512, { frame: "custom", frameShape: "label", frameText: "Menu" });
    const long = frameLayout(512, { frame: "custom", frameShape: "label", frameText: "Scan here to open our full seasonal menu" });
    assert.ok(short.text && long.text);
    assert.ok(long.text.fontPx < short.text.fontPx);
    assert.ok(estimateTextWidth(long.text.value, long.text.fontPx) <= long.text.maxWidth);
    assert.equal(long.text.value, "Scan here to open our full seasonal menu");
    // Both layouts have the same outer size: only the glyphs change, never the canvas.
    assert.equal(long.height, short.height);
  });

  it("uses the supplied measurer (canvas measureText) instead of the estimate", () => {
    const wide = () => 10_000;
    const l = frameLayout(512, { frame: "scan", frameShape: "label", frameText: "Scan me" }, wide);
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
