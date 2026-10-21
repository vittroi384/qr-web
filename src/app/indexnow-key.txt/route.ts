import { INDEXNOW_KEY } from "@/lib/indexnow";

// IndexNow ownership proof: the key file must be served from this host (scripts/indexnow.mjs names it as keyLocation).
export function GET() {
  return new Response(`${INDEXNOW_KEY}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
