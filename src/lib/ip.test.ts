import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { ipLimitKey } from "./ip";

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
