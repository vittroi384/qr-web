import { Blocks } from "@/components/content/Blocks";
import { TERMS, TERMS_EFFECTIVE } from "@/lib/content/terms";
import { getSettings } from "@/lib/settings";

/** /terms (English only): the same page frame as About and the Privacy Policy. */
export async function TermsPage() {
  const s = await getSettings();
  const blocks = TERMS.map((b) => ("p" in b ? { p: b.p.replaceAll("{site}", s.site_name) } : b));
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">Effective date: {TERMS_EFFECTIVE}</p>
      </header>
      <div className="mt-10 border-t border-border pt-8">
        <Blocks blocks={blocks} />
      </div>
    </main>
  );
}
