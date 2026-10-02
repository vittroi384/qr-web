import { getSettings } from "@/lib/settings";

// AdSense requires /ads.txt at the site root listing the publisher ID (without the "ca-" prefix).
export function GET() {
  const client = getSettings().adsense_client.trim();
  const pub = client.replace(/^ca-/, "");
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : "# AdSense publisher ID not configured\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
