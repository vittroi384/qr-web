import { getDict, type Locale } from "@/lib/i18n";
import { getSettings, isOn } from "@/lib/settings";

export async function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getDict(locale).privacy;
  const s = await getSettings();
  const logging = isOn(s.logging_enabled);
  const retention = Number.parseInt(s.log_retention_days, 10);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">{t.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.effective}</p>
      </header>
      <div className="mt-10 divide-y divide-border border-y border-border text-[15px] leading-7 text-foreground/90 [&_section]:py-7 [&_section_h2]:text-base [&_section_h2]:font-semibold [&_section_h2]:text-foreground">
        <section>
          <h2>{t.s1Title}</h2>
          <p className="mt-2">{t.s1Intro(s.site_name)}</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-zinc-400">
            <li>
              <strong>{t.s1InputTerm}</strong>: {t.s1Input}
              {logging ? t.s1LoggingOn : t.s1LoggingOff}
              {t.s1WifiMask}
            </li>
            <li>
              <strong>{t.s1AccessTerm}</strong>: {t.s1Access}
            </li>
            <li>{t.s1Analytics}</li>
          </ul>
        </section>

        <section>
          <h2>{t.s2Title}</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-zinc-400">
            {t.s2Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t.s3Title}</h2>
          <p className="mt-2">
            {retention > 0 ? t.s3Retention(retention) : t.s3RetentionNone} {t.s3Legal}
          </p>
        </section>

        <section>
          <h2>{t.s4Title}</h2>
          <p className="mt-2">
            {t.s4Before}
            <a href="https://adssettings.google.com" className="link" target="_blank" rel="noopener noreferrer">
              {t.s4Link}
            </a>
            {t.s4After}
          </p>
        </section>

        <section>
          <h2>{t.s5Title}</h2>
          <p className="mt-2">{t.s5Body}</p>
        </section>

        <section>
          <h2>{t.s6Title}</h2>
          <p className="mt-2">{t.s6Body}</p>
        </section>

        <section>
          <h2>{t.s7Title}</h2>
          <p className="mt-2">{t.s7Body}</p>
        </section>
      </div>
    </main>
  );
}
