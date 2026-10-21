import { LOCALES, LOCALE_NAMES, allLandingSlugs, getDict, localePath, resolveLanding } from "@/lib/i18n";
import { plain } from "@/lib/jsonLd";
import { getSettings } from "@/lib/settings";

// site_url is editable at runtime, so this must not be prerendered.
export const dynamic = "force-dynamic";

/**
 * /llms.txt (llmstxt.org): a plain summary of the site for AI assistants — what it is, the facts
 * people ask about, and links to every QR type page. Built from the same copy the pages show.
 */
export async function GET() {
  const s = await getSettings();
  const base = s.site_url.replace(/\/$/, "");
  const en = getDict("en");
  const url = (path: string) => (path === "/" ? `${base}/` : `${base}${path}`);

  const landings = allLandingSlugs()
    .map((slug) => {
      const target = resolveLanding("en", slug);
      return target ? `- [${plain(target.copy.title)}](${url(`/${slug}`)}): ${plain(target.copy.metaDescription)}` : null;
    })
    .filter(Boolean);

  const body = [
    `# ${s.site_name}`,
    "",
    `> ${s.site_description}`,
    "",
    ...en.about.facts.map((f) => `- ${f.title}: ${f.body}`),
    `- ${en.about.p1(s.site_name)}`,
    "- Downloads as PNG or SVG, can be copied or printed; colors, logo and a frame with a caption are optional.",
    `- Many codes at once from a list: ${url("/batch")}`,
    `- Available in ${LOCALES.length} languages: ${LOCALES.map((l) => `${LOCALE_NAMES[l].full} (${url(localePath(l, "/"))})`).join(", ")}.`,
    "",
    "## Questions",
    "",
    ...en.home.faq.map((f) => `- ${plain(f.q)} ${plain(f.a)}`),
    "",
    "## QR code types and uses",
    "",
    ...landings,
    "",
    "## About",
    "",
    `- [About](${url("/about")})`,
    `- [Privacy Policy](${url("/privacy")})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
