import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ipLimitKey, isFromThisSite, isJsonRequest, isSameOrigin, publicPostRejection } from "./ip";

describe("ipLimitKey", () => {
  it("keeps IPv4 and IPv4-mapped addresses as they are", () => {
    assert.equal(ipLimitKey("203.0.113.10"), "203.0.113.10");
    assert.equal(ipLimitKey("::ffff:203.0.113.10"), "203.0.113.10");
    assert.equal(ipLimitKey("unknown"), "unknown");
  });
  it("collapses IPv6 to its /64 prefix", () => {
    assert.equal(ipLimitKey("2001:db8:85a3:1234:8a2e:370:7334:1"), "2001:db8:85a3:1234::/64");
    assert.equal(ipLimitKey("2001:0db8:85a3:1234::1"), "2001:db8:85a3:1234::/64");
    // Two addresses from the same subscriber prefix share one key …
    assert.equal(ipLimitKey("2001:db8:85a3:1234::1"), ipLimitKey("2001:db8:85a3:1234:ffff:ffff:ffff:ffff"));
    // … and a different /64 does not.
    assert.notEqual(ipLimitKey("2001:db8:85a3:1234::1"), ipLimitKey("2001:db8:85a3:1235::1"));
  });
  it("handles compressed forms, zone ids and case", () => {
    assert.equal(ipLimitKey("::1"), "0:0:0:0::/64");
    assert.equal(ipLimitKey("fe80::1%eth0"), "fe80:0:0:0::/64");
    assert.equal(ipLimitKey("2001:DB8::"), "2001:db8:0:0::/64");
    assert.equal(ipLimitKey("1:2:3:4:5:6:7::"), "1:2:3:4::/64");
  });
  it("returns malformed IPv6 unchanged instead of merging clients", () => {
    assert.equal(ipLimitKey("1::2::3"), "1::2::3");
    assert.equal(ipLimitKey("1:2:3"), "1:2:3");
    assert.equal(ipLimitKey("2001:db8:zzzz::1"), "2001:db8:zzzz::1");
  });
});

describe("isSameOrigin / publicPostRejection", () => {
  const post = (headers: Record<string, string>) => new Request("http://app:3000/api/log", { method: "POST", headers });
  const host = { host: "getqrmaker.com" };
  it("accepts a POST whose Origin matches the Host (or forwarded host)", () => {
    assert.equal(isSameOrigin(post({ ...host, origin: "https://getqrmaker.com" })), true);
    assert.equal(isSameOrigin(post({ host: "app:3000", "x-forwarded-host": "getqrmaker.com", origin: "https://getqrmaker.com" })), true);
    // No Origin (older browsers on same-origin GET→POST forms): the Referer may stand in.
    assert.equal(isSameOrigin(post({ ...host, referer: "https://getqrmaker.com/ko" })), true);
  });
  it("refuses another site, 'Origin: null', a bare request and a malformed Origin", () => {
    assert.equal(isSameOrigin(post({ ...host, origin: "https://evil.example" })), false);
    assert.equal(isSameOrigin(post({ ...host, origin: "null" })), false);
    assert.equal(isSameOrigin(post({ ...host })), false);
    assert.equal(isSameOrigin(post({ ...host, origin: "not a url" })), false);
    assert.equal(isSameOrigin(post({ origin: "https://getqrmaker.com" })), false); // no Host at all
  });
  it("isFromThisSite: judges the Referer against the visitor's Host, not the container's address", () => {
    // Behind Caddy the app sees Host (or X-Forwarded-Host) = public domain while nextUrl.host is app:3000.
    assert.equal(isFromThisSite(new Headers({ host: "getqrmaker.com", referer: "https://getqrmaker.com/ko" })), true);
    assert.equal(isFromThisSite(new Headers({ host: "app:3000", "x-forwarded-host": "getqrmaker.com", referer: "https://getqrmaker.com/ko" })), true);
    assert.equal(isFromThisSite(new Headers({ host: "getqrmaker.com", referer: "https://www.google.com/" })), false);
    assert.equal(isFromThisSite(new Headers({ host: "getqrmaker.com" })), false);
  });
  it("requires a JSON body: sendBeacon with a text/plain body is turned away", () => {
    assert.equal(isJsonRequest(post({ "content-type": "application/json" })), true);
    assert.equal(isJsonRequest(post({ "content-type": "application/json; charset=utf-8" })), true);
    assert.equal(isJsonRequest(post({ "content-type": "text/plain;charset=UTF-8" })), false);
    assert.equal(isJsonRequest(post({ "content-type": "application/jsonp" })), false);
    assert.equal(isJsonRequest(post({})), false);
  });
  it("answers 403 for a foreign origin before 415 for a wrong body type", () => {
    assert.deepEqual(publicPostRejection(post({ ...host, origin: "https://evil.example", "content-type": "application/json" })), { status: 403, error: "bad_origin" });
    assert.deepEqual(publicPostRejection(post({ ...host, origin: "https://getqrmaker.com", "content-type": "text/plain" })), { status: 415, error: "json_required" });
    assert.equal(publicPostRejection(post({ ...host, origin: "https://getqrmaker.com", "content-type": "application/json" })), null);
  });
});
