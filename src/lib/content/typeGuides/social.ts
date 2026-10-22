import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Social media QR codes",
  blocks: [
    { h3: "One address per platform, each shaped differently" },
    { p: "Every network turns an account into a web address differently. Instagram and X append the bare handle to the domain. TikTok and YouTube keep the `@` in the path, so a TikTok account appears as `tiktok.com/@name`. Facebook pages use a page name or numeric ID set in the page settings, which may differ from the display name. LinkedIn personal profiles live under `/in/` with a slug you can customise, while company pages sit under `/company/`. Telegram uses `t.me/username`, LINE official accounts are reached through a `line.me` link with the account ID, and Google reviews need a Place ID rather than a name." },
    { h3: "App or browser" },
    { p: "The code holds an ordinary https address, and whether the app takes over is decided by the phone. iOS Universal Links and Android App Links let a platform register its domain so that a scanned link opens the app directly. When the app is missing, or a scanner app opens links in its own built-in browser, the mobile website loads instead, sometimes behind a login wall. That fallback is why a web address beats an app-only scheme." },
    { h3: "A profile or a link page" },
    { p: "One code opens one address, so the question is which address deserves the print space. A link-in-bio service such as Linktree, or a page on your own site, lets a single code lead to several profiles, a booking form and a menu, and the list behind it can change without touching the print. The cost is an extra tap and a page carrying someone else's branding, so a café that only wants Instagram followers is better served by the profile itself, while a musician on five platforms is better served by the hub." },
    { h3: "Print placement, measurement and renaming" },
    { p: "On a storefront window, put the code at adult chest height inside the glass and check it from outside in daylight, because tinted or reflective glass can defeat a scanner. On packaging, the flat face of the box beats a curved label. On slides, let the code fill at least a tenth of the screen height and stay visible for a full minute, and spell out the handle under it in every case." },
    { p: "This site makes static codes and does not count scans. For numbers, point a [URL code](/url-qr-code) at a page you control and add UTM parameters such as `?utm_source=qr&utm_medium=print`, then read the results in your analytics tool. A profile address cannot usefully carry UTM tags, because the platform's analytics never show them to you." },
    { p: "Handles can be edited in seconds, but every poster, menu and business card printed with the old address keeps pointing at it, so treat a rename as a reprint. For the two most requested networks see the [Instagram page](/instagram-qr-code) and the [YouTube page](/youtube-qr-code); for asking customers to rate you, the [Google Review page](/google-review-qr-code) explains Place IDs." },
  ],
};
