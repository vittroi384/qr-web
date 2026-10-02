import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SOCIAL_PLATFORMS, encodeSocial } from "./encoders";

describe("encodeSocial", () => {
  it("builds a profile URL and strips a leading @", () => {
    assert.equal(encodeSocial({ platform: "instagram", handle: "@my.shop" }), "https://www.instagram.com/my.shop/");
    assert.equal(encodeSocial({ platform: "youtube", handle: "channel" }), "https://www.youtube.com/@channel");
  });
  it("keeps codes intact for platforms that need them", () => {
    assert.equal(encodeSocial({ platform: "kakao_channel", handle: "_AbCdE" }), "https://pf.kakao.com/_AbCdE");
  });
  it("accepts a pasted full URL", () => {
    assert.equal(encodeSocial({ platform: "x", handle: "https://x.com/someone" }), "https://x.com/someone");
  });
  it("rejects unknown platform or empty handle", () => {
    assert.equal(encodeSocial({ platform: "nope", handle: "a" }), "");
    assert.equal(encodeSocial({ platform: "instagram", handle: "  " }), "");
    assert.equal(encodeSocial({ platform: "instagram", handle: "@" }), "");
  });
  it("every platform template has exactly one {handle} slot", () => {
    for (const p of SOCIAL_PLATFORMS) assert.equal(p.template.split("{handle}").length, 2, p.id);
  });
});
