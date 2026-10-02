import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatKst, isValidDay, kstDayEndExclusive, kstDayStart, kstToday, toKstIso, toUtcIso } from "./time";

describe("time (KST helpers)", () => {
  it("maps a KST calendar day to its UTC instants", () => {
    assert.equal(kstDayStart("2026-10-02").toISOString(), "2026-10-01T15:00:00.000Z");
    assert.equal(kstDayEndExclusive("2026-10-02").toISOString(), "2026-10-02T15:00:00.000Z");
    assert.equal(kstDayEndExclusive("2026-12-31").toISOString(), "2026-12-31T15:00:00.000Z");
  });

  it("computes today in KST across the UTC midnight boundary", () => {
    assert.equal(kstToday(new Date("2026-10-01T14:59:59Z")), "2026-10-01");
    assert.equal(kstToday(new Date("2026-10-01T15:00:00Z")), "2026-10-02");
  });

  it("formats timestamptz values for display and export", () => {
    const d = new Date("2026-10-02T11:39:33.456Z");
    assert.equal(formatKst(d), "2026-10-02 20:39:33 KST");
    assert.equal(toKstIso(d), "2026-10-02T20:39:33+09:00");
    assert.equal(toUtcIso(d), "2026-10-02T11:39:33Z");
    assert.equal(formatKst("not a date"), "not a date");
  });

  it("validates calendar days", () => {
    assert.equal(isValidDay("2026-02-28"), true);
    assert.equal(isValidDay("2026-02-30"), false);
    assert.equal(isValidDay("2026-1-01"), false);
  });
});
