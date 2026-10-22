import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: URL QR codes",
  blocks: [
    { h3: "What the phone receives" },
    { p: "A URL code is nothing more than the address as a run of characters, so the camera app knows nothing about the destination until the browser asks the server. The scheme at the front decides what happens next: `https://` and `http://` go to the browser, while `mailto:`, `tel:`, `sms:` and `geo:` are handed to the mail app, the dialer, Messages or the maps app. Store schemes such as `market:` on Android and `itms-apps:` on iOS jump straight to an app listing." },
    { p: "An `http://` address still opens, but modern browsers label the page “Not secure” and many sites redirect it to HTTPS anyway. The extra hop costs a moment and the warning costs trust, so prefer the `https://` form whenever the server supports it." },
    { h3: "Short links, long links and redirects" },
    { p: "Every character costs modules. A bare domain such as `https://example.com` fits a Version 2 symbol of 25×25 modules, whereas a 120-character address with a path and query string needs roughly Version 7 at 45×45, and each of those modules has to stay large enough to resolve from the intended distance. That is why shorteners are popular on printed material: a link like `https://bit.ly/3xyz` stays short no matter where it points." },
    { p: "The trade-off is dependency. A shortened link works only while the shortening service exists and keeps your entry, and the person scanning sees the shortener's domain in the preview rather than yours. A path on your own domain, say `yourshop.com/go/flyer`, offers the same freedom to redirect later while staying recognizable, provided you can edit redirects on your site." },
    { h3: "Campaign parameters" },
    { p: "Parameters such as `?utm_source=flyer&utm_medium=qr&utm_campaign=spring` do nothing on the phone. They are read by analytics software on the destination page, which files the visit under those labels. Choose values you will still recognise months later and keep them lowercase, because most analytics tools treat `Flyer` and `flyer` as two separate sources." },
    { p: "Three parameters are normally enough. Each one lengthens the code, and a parameter that nothing reads is pure cost." },
    { h3: "When the page moves" },
    { p: "A static code cannot be edited, but the page behind it can. If you reorganise the site, leave a redirect at the old path so printed material keeps working; a 301 response carries the visitor to the new location without them noticing. Codes aimed at a specific document, a seasonal campaign page or a third-party listing are the ones most likely to break, so for anything printed in volume, point the code at a page you control and link onward from there." },
    { p: "Before sending files to the printer, confirm that the address opens over mobile data and not only on office Wi-Fi, since staging and intranet addresses often resolve inside the building alone. The articles on [static versus dynamic codes](/guides/static-vs-dynamic-qr-codes) and [why a code will not scan](/guides/qr-code-wont-scan) go deeper into these trade-offs, and if the destination is a document rather than a page, see the [PDF QR code](/pdf-qr-code) page." },
  ],
};
