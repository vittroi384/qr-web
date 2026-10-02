import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { getDict, localePath, type Locale } from "@/lib/i18n";
import { getSettings } from "@/lib/settings";

export async function AboutPage({ locale }: { locale: Locale }) {
  const t = getDict(locale).about;
  const s = await getSettings();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">{t.title(s.site_name)}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{t.lead}</p>
      </header>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {t.facts.map((f) => (
          <div key={f.title} className="bg-card p-5">
            <dt className="text-sm font-semibold">{f.title}</dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed text-muted">{f.body}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 space-y-5 text-[15px] leading-7 text-foreground/90">
        <p>{t.p1(s.site_name)}</p>
        <p>{t.p2}</p>
        <p>
          {t.p3Before}
          <Link href={localePath(locale, "/privacy")} className="link">
            {t.p3Link}
          </Link>
          {t.p3After}
        </p>
        <p className="border-t border-border pt-5 text-sm text-muted">{t.contact}</p>
      </div>

      <Link href={localePath(locale, "/")} className="btn btn-primary mt-10">
        {t.cta}
        <ArrowRightIcon />
      </Link>
    </main>
  );
}
