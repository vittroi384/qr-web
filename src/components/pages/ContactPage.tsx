import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/contact";
import { getSettings } from "@/lib/settings";

/** /contact (English only): one address, what to write about, and where the policies are. */
export async function ContactPage() {
  const s = await getSettings();
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight sm:text-[34px]">Contact</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">Questions, bug reports and suggestions about {s.site_name} are welcome.</p>
      </header>

      <div className="mt-10 rounded-xl border border-border bg-card p-5 sm:p-6">
        <p className="text-sm font-semibold text-foreground">Email</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="link mt-1 inline-block text-lg break-all">
          {CONTACT_EMAIL}
        </a>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">We read every message and usually reply within a few working days.</p>
      </div>

      <div className="mt-10 space-y-5 text-[15px] leading-7 text-foreground/90">
        <p>
          If a QR code does not scan, please include what you entered, which type you used (URL, Wi-Fi, vCard and so on), the phone model and the
          app you scanned with. Most scanning problems come from the size, contrast or quiet zone of the print; the{" "}
          <Link href="/guides/qr-code-wont-scan" className="link">
            troubleshooting guide
          </Link>{" "}
          covers the common causes.
        </p>
        <p>
          For requests about information that may have been recorded when you used the site, see the{" "}
          <Link href="/privacy" className="link">
            Privacy Policy
          </Link>
          , which explains what is kept and for how long. The{" "}
          <Link href="/terms" className="link">
            Terms of Service
          </Link>{" "}
          describe what you can expect from the service.
        </p>
        <p className="border-t border-border pt-5 text-sm text-muted">
          {s.site_name} does not host the pages or files that QR codes point to. If a code you scanned leads to harmful content, report it to the
          operator of that page or to your local authorities.
        </p>
      </div>
    </main>
  );
}
