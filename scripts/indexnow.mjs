// Tells IndexNow search engines (Bing — which ChatGPT search and Copilot draw on — Yandex, Naver, …)
// that every page in the sitemap may have changed. Run after a deploy that changes page content:
//   node scripts/indexnow.mjs https://getqrmaker.com
// The key is public by design and must match src/lib/indexnow.ts (served at /indexnow-key.txt).
const KEY = "ec5341be69643ba183b7a21aef85613b";

const site = (process.argv[2] ?? "").replace(/\/$/, "");
if (!/^https:\/\//.test(site)) {
  console.error("usage: node scripts/indexnow.mjs https://<domain>");
  process.exit(1);
}
const host = new URL(site).host;

const served = (await (await fetch(`${site}/indexnow-key.txt`)).text()).trim();
if (served !== KEY) {
  console.error(`[indexnow] ${site}/indexnow-key.txt does not serve the key yet — deploy first`);
  process.exit(1);
}

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()))].filter((u) => new URL(u).host === host);
if (urlList.length === 0) {
  console.error("[indexnow] no URLs found in the sitemap");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${site}/indexnow-key.txt`, urlList: urlList.slice(0, 10000) }),
});
// 200 = accepted, 202 = accepted (key validation pending); anything else is an error.
console.log(`[indexnow] ${urlList.length} URLs → HTTP ${res.status} ${await res.text()}`.trim());
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
