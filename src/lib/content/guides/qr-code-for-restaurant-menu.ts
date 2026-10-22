import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "qr-code-for-restaurant-menu",
  title: "How to make a QR code for a restaurant menu",
  description:
    "Where to host a restaurant menu for QR scans, what to print and how big, paper fallbacks, languages, allergens, UTM tracking and the mistakes that kill codes.",
  published: "2026-10-22",
  intro:
    "A menu code is only as good as the page it opens. This guide covers where to put the menu, how to print the code, and how to keep it working through every price change.",
  blocks: [
    { h2: "Decide where the menu lives" },
    {
      p: "A QR code can only point at an address, so the first decision is where the menu sits: most restaurants choose between a PDF and a plain web page, and the difference matters more than it looks.",
    },
    {
      p: "A PDF is tempting because the designer already made one for print. On a phone it falls apart: the guest has to pinch and zoom across a layout meant for A4, the file can weigh several megabytes of scanned images, and a guest on a weak signal may give up before it loads. A web page with dish names and prices as real text reflows to the screen width and loads in a fraction of the data.",
    },
    {
      p: "A Google Doc published to the web, a page on your existing site, or the page your ordering platform provides all work. If a PDF is unavoidable, export it as text rather than scanned pictures and keep it well under a megabyte.",
    },
    { h3: "Use an address you control" },
    {
      p: "Whatever hosts the menu, the address inside the code should be yours. Something like `https://yourplace.com/menu` can be redirected to a new document, a new platform or a new file at any time, and the cards on the tables never notice. A link copied straight from a sharing dialog belongs to that service: if the file is moved, renamed or the account closes, the code dies with it. The [static vs dynamic guide](/guides/static-vs-dynamic-qr-codes) explains why a redirect is the right fix when the code itself cannot be edited.",
    },
    { h2: "Make the code" },
    {
      ol: [
        "Open the [restaurant menu generator](/restaurant-menu-qr-code) and paste the full menu address, including the path, not just the home page.",
        "Leave error correction at the basic level unless you add a logo; a plainer pattern is easier for older phones to read.",
        "Download the SVG for anything a print shop will produce, and a PNG for a quick office print or an email to the sign maker.",
        "Scan the result with two different phones over mobile data before ordering a single sticker.",
      ],
    },
    {
      p: "One code is enough when every table opens the same menu. If your ordering system gives tables their own links, such as `?table=12`, the [batch page](/batch) turns that list into a ZIP of codes.",
    },
    { h2: "What to print and how big" },
    {
      p: "Where the code sits physically decides its size. The rule from the [size guide](/guides/qr-code-size-for-printing) is roughly one tenth of the scanning distance, which gives these starting points:",
    },
    {
      ul: [
        "Table tents and stickers on the table: 2.5 to 3 cm, since the phone is held close.",
        "Counter sign at a café or takeaway: 4 to 5 cm, scanned from arm’s length while queuing.",
        "Window decal: 8 to 10 cm, so people on the pavement can scan without pressing a phone against the glass.",
        "Receipt or takeaway bag insert: 2 cm is fine, but check that the thermal printer renders it crisply first.",
      ],
    },
    {
      p: "Put a caption and the restaurant name next to every code. “Scan for menu” tells people what will happen, and the name shows the code was placed by you, not stuck on by a stranger. The frame option in the generator prints a caption with the code, and the A4 print sheet does the same for window and counter posters.",
    },
    { h2: "Guests who will not scan" },
    {
      p: "A share of guests cannot or will not use the code: older diners, children, people with a flat battery, and anyone who simply prefers paper. Keep a stack of printed menus at the host stand and have staff offer them without being asked. The code exists to cut waiting, not to be a barrier.",
    },
    {
      p: "For a multilingual crowd, resist printing a separate code per language. One page with a language switch at the top is simpler for guests and for you. The same goes for allergens: put the allergen key on the same page as the dishes, or link to it prominently from the top, so the information is where people actually look.",
    },
    { h2: "Updating, measuring and mistakes to avoid" },
    {
      p: "Because the code points at a page you control, price changes cost nothing. Edit the page or swap the file behind the redirect, and every table shows the new prices on the next scan. Nothing on this site counts scans, but your own website analytics can. Append `?utm_source=table-tent` to the address before making the code, use `?utm_source=window` for the decal, and your analytics will show which placement actually brings visits.",
    },
    { p: "Three mistakes come up again and again:" },
    {
      ul: [
        "Linking to an Instagram post or story. The post gets deleted, the account gets renamed, and every printed code points at nothing.",
        "Hiding the menu behind a login, an app install or a cookie wall. Guests want prices, not an account.",
        "Printing a small code on a glossy laminated card. Overhead lights bounce off the lamination straight into the camera; the [troubleshooting guide](/guides/qr-code-wont-scan) covers glare and the other usual scan failures.",
      ],
    },
  ],
};
