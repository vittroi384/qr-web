import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { QrLogRow } from "./logs";
import { browserOf, collapseRuns, formatIpList, groupVisitors, parseIpList } from "./visitors";

let nextId = 1;
function row(p: Partial<QrLogRow> & { at: string }): QrLogRow {
  return {
    id: nextId++,
    created_at: new Date(p.at),
    qr_type: p.qr_type ?? "url",
    event: p.event ?? "download_png",
    payload_json: p.payload_json ?? '{"url":"https://example.com"}',
    encoded_preview: null,
    options_json: null,
    ip: p.ip === undefined ? "1.1.1.1" : p.ip,
    user_agent: null,
    referer: null,
    accept_language: null,
    locale: null,
    page: null,
  };
}

describe("groupVisitors", () => {
  it("one visitor per IP, newest activity first, types by use", () => {
    const rows = [
      row({ at: "2026-10-20T10:00:00Z", ip: "2.2.2.2", qr_type: "vcard" }),
      row({ at: "2026-10-19T10:00:00Z", ip: "1.1.1.1", qr_type: "url" }),
      row({ at: "2026-10-19T09:00:00Z", ip: "1.1.1.1", qr_type: "url" }),
      row({ at: "2026-10-19T08:00:00Z", ip: "1.1.1.1", qr_type: "pdf" }),
    ];
    const v = groupVisitors(rows);
    assert.equal(v.length, 2);
    assert.equal(v[0].ip, "2.2.2.2");
    assert.equal(v[1].saves, 3);
    assert.deepEqual(v[1].types, [
      { type: "url", c: 2 },
      { type: "pdf", c: 1 },
    ]);
    assert.equal(v[1].firstAt.toISOString(), "2026-10-19T08:00:00.000Z");
    assert.equal(v[1].latest, rows[1]);
  });

  it("rows without an IP form one bucket", () => {
    const v = groupVisitors([row({ at: "2026-10-20T00:00:00Z", ip: null }), row({ at: "2026-10-20T00:01:00Z", ip: null })]);
    assert.equal(v.length, 1);
    assert.equal(v[0].ip, "");
  });
});

describe("collapseRuns", () => {
  it("merges neighbours with the same IP, type and payload; counts events", () => {
    const rows = [
      row({ at: "2026-10-19T22:37:26Z", event: "print" }),
      row({ at: "2026-10-19T22:37:25Z", event: "print" }),
      row({ at: "2026-10-19T22:37:13Z", event: "download_png" }),
      row({ at: "2026-10-19T19:08:29Z", qr_type: "pdf" }),
      row({ at: "2026-10-19T19:00:00Z" }),
    ];
    const runs = collapseRuns(rows);
    assert.equal(runs.length, 3);
    assert.equal(runs[0].rows.length, 3);
    assert.deepEqual(runs[0].events, [
      { event: "print", c: 2 },
      { event: "download_png", c: 1 },
    ]);
    // Same QR again after a different one: a new run, not merged across.
    assert.equal(runs[2].rows.length, 1);
  });

  it("a different IP or payload breaks the run", () => {
    const runs = collapseRuns([
      row({ at: "2026-10-19T10:00:00Z", ip: "1.1.1.1" }),
      row({ at: "2026-10-19T09:59:00Z", ip: "9.9.9.9" }),
      row({ at: "2026-10-19T09:58:00Z", ip: "9.9.9.9", payload_json: '{"url":"https://other.example"}' }),
    ]);
    assert.equal(runs.length, 3);
  });
});

describe("parseIpList", () => {
  it("lines, commas and spaces; trailing * is a prefix; lowercased", () => {
    assert.deepEqual(parseIpList("116.125.175.155\n2001:4430:D245:411E:*, 10.0.0.1"), {
      exact: ["116.125.175.155", "10.0.0.1"],
      prefixes: ["2001:4430:d245:411e:"],
    });
    assert.deepEqual(parseIpList("  \n "), { exact: [], prefixes: [] });
  });

  it("rejects non-IP text, a lone * and too many entries", () => {
    assert.equal(parseIpList("my laptop"), null);
    assert.equal(parseIpList("*"), null);
    assert.equal(parseIpList("1.1.1.1/24"), null);
    assert.equal(parseIpList(Array.from({ length: 101 }, (_, i) => `10.0.0.${i}`).join("\n")), null);
  });

  it("round-trips through the stored form", () => {
    const list = parseIpList("1.2.3.4, 2001:db8:*")!;
    assert.equal(formatIpList(list), "1.2.3.4\n2001:db8:*");
    assert.deepEqual(parseIpList(formatIpList(list)), list);
  });
});

describe("browserOf", () => {
  it("names the browser and marks phones", () => {
    assert.equal(browserOf("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit Version/17.0 Mobile Safari/604.1"), "Safari · 모바일");
    assert.equal(browserOf("Mozilla/5.0 (Windows NT 10.0) AppleWebKit Chrome/129.0 Safari/537.36 Edg/129.0"), "Edge");
    assert.equal(browserOf(null), "");
  });
});
