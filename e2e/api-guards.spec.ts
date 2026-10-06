import { expect, test } from "@playwright/test";

/**
 * The public write endpoints only accept JSON posted by a page of this site. Anything else — another
 * website's sendBeacon, a bare request, a text/plain body — is refused before any database work.
 * The security headers Caddy adds at the edge must also come from Next itself, so the admin UI gets
 * them when reached without Caddy (SSH tunnel).
 */
test.describe("public API guards", () => {
  const funnel = { step: "select", type: "url", locale: "en" };

  test("same-origin JSON is accepted; a foreign origin, a missing origin and a non-JSON body are not", async ({ request, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const ok = await request.post("/api/funnel", { headers: { origin }, data: funnel });
    expect(ok.status()).toBe(200);

    const foreign = await request.post("/api/funnel", { headers: { origin: "https://evil.example" }, data: funnel });
    expect(foreign.status()).toBe(403);
    expect(await foreign.json()).toEqual({ ok: false, error: "bad_origin" });

    const bare = await request.post("/api/funnel", { data: funnel });
    expect(bare.status()).toBe(403);

    // What a cross-site sendBeacon sends without a CORS preflight: a text/plain body.
    const text = await request.post("/api/funnel", {
      headers: { origin, "content-type": "text/plain;charset=UTF-8" },
      data: JSON.stringify(funnel),
    });
    expect(text.status()).toBe(415);
    expect(await text.json()).toEqual({ ok: false, error: "json_required" });

    const log = await request.post("/api/log", {
      headers: { origin: "https://evil.example" },
      data: { type: "url", event: "download_png", payload: { url: "https://x.com" }, options: {}, encoded: "https://x.com" },
    });
    expect(log.status()).toBe(403);
  });

  test("security headers are sent by Next itself, not only by Caddy", async ({ request }) => {
    for (const path of ["/", "/ko", "/api/health"]) {
      const res = await request.get(path);
      const h = res.headers();
      expect(h["x-content-type-options"], path).toBe("nosniff");
      expect(h["x-frame-options"], path).toBe("SAMEORIGIN");
      expect(h["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
      expect(h["permissions-policy"], path).toContain("camera=()");
    }
  });
});
