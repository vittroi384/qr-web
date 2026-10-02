import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { encodeEmail, encodeEvent, encodeGeo, encodePhone, encodeSms, encodeUrl, encodeVCard, encodeWifi } from "./encoders";
import { sanitizePayloadForStorage } from "./sanitize";

describe("encodeUrl", () => {
  it("adds https:// when no scheme", () => {
    assert.equal(encodeUrl("example.com/a b"), "https://example.com/a b");
  });
  it("keeps existing scheme", () => {
    assert.equal(encodeUrl("http://x.com"), "http://x.com");
    assert.equal(encodeUrl("mailto:a@b.c"), "mailto:a@b.c");
  });
  it("empty stays empty", () => {
    assert.equal(encodeUrl("   "), "");
  });
});

describe("encodeWifi", () => {
  it("escapes structural characters", () => {
    assert.equal(
      encodeWifi({ ssid: "My;Net", password: 'p:a,s"s\\x', encryption: "WPA", hidden: true }),
      'WIFI:T:WPA;S:My\\;Net;P:p\\:a\\,s\\"s\\\\x;H:true;;',
    );
  });
  it("omits password for open networks", () => {
    assert.equal(encodeWifi({ ssid: "Cafe", password: "ignored", encryption: "nopass", hidden: false }), "WIFI:T:nopass;S:Cafe;;");
  });
});

describe("encodeVCard", () => {
  it("builds a vCard 3.0", () => {
    const v = encodeVCard({
      firstName: "길동",
      lastName: "홍",
      org: "A,B",
      title: "",
      phone: "",
      mobile: "010-1234-5678",
      email: "h@x.kr",
      website: "x.kr",
      address: "",
      note: "line1\nline2",
    });
    const lines = v.split("\r\n");
    assert.equal(lines[0], "BEGIN:VCARD");
    assert.ok(lines.includes("N:홍;길동;;;"));
    assert.ok(lines.includes("FN:홍 길동"));
    assert.ok(lines.includes("ORG:A\\,B"));
    assert.ok(lines.includes("TEL;TYPE=CELL:010-1234-5678"));
    assert.ok(lines.includes("URL:https://x.kr"));
    assert.ok(lines.includes("NOTE:line1\\nline2"));
    assert.equal(lines.at(-1), "END:VCARD");
  });
  it("requires at least a name or contact field", () => {
    assert.equal(
      encodeVCard({ firstName: "", lastName: "", org: "Org", title: "", phone: "", mobile: "", email: "", website: "", address: "", note: "" }),
      "",
    );
  });
});

describe("misc encoders", () => {
  it("email uses percent-encoding without plus signs", () => {
    assert.equal(encodeEmail({ to: "a@b.c", subject: "hi there", body: "x&y" }), "mailto:a@b.c?subject=hi%20there&body=x%26y");
  });
  it("sms/phone strip formatting", () => {
    assert.equal(encodeSms({ phone: "010-1234-5678", message: "hi" }), "SMSTO:01012345678:hi");
    assert.equal(encodePhone({ phone: "+82 (10) 1234-5678" }), "tel:+821012345678");
  });
  it("geo validates range", () => {
    assert.equal(encodeGeo({ lat: "37.5665", lng: "126.978" }), "geo:37.5665,126.978");
    assert.equal(encodeGeo({ lat: "95", lng: "0" }), "");
    assert.equal(encodeGeo({ lat: "abc", lng: "0" }), "");
  });
});

describe("encodeEvent", () => {
  it("all-day event uses DATE values", () => {
    const v = encodeEvent({ title: "휴가", location: "", description: "", start: "2026-10-03", end: "2026-10-05", allDay: true });
    assert.ok(v.includes("DTSTART;VALUE=DATE:20261003"));
    assert.ok(v.includes("DTEND;VALUE=DATE:20261005"));
  });
  it("timed event converts to UTC stamp", () => {
    const v = encodeEvent({ title: "회의", location: "3층", description: "", start: "2026-10-03T10:00", end: "", allDay: false });
    assert.match(v, /DTSTART:\d{8}T\d{6}Z/);
    assert.ok(v.includes("LOCATION:3층"));
  });
  it("needs title and start", () => {
    assert.equal(encodeEvent({ title: "", location: "", description: "", start: "2026-10-03T10:00", end: "", allDay: false }), "");
  });
});

describe("sanitizePayloadForStorage", () => {
  it("masks wifi password when enabled and drops non-primitive fields", () => {
    const out = sanitizePayloadForStorage(
      "wifi",
      { ssid: "Home", password: "secret123", nested: { a: 1 }, encryption: "WPA" },
      { maskWifiPassword: true },
    );
    assert.deepEqual(out, { ssid: "Home", password: "*********", encryption: "WPA" });
  });
  it("keeps password when masking is off", () => {
    const out = sanitizePayloadForStorage("wifi", { ssid: "Home", password: "secret" }, { maskWifiPassword: false });
    assert.equal(out.password, "secret");
  });
});
