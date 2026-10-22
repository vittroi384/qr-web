import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "static-vs-dynamic-qr-codes",
  title: "Static vs dynamic QR codes: what's the difference?",
  description:
    "Static QR codes hold the data in the image; dynamic ones redirect through a service. Compare cost, lifespan, editing and tracking to pick the right kind.",
  published: "2026-10-22",
  intro:
    "The two kinds of QR code look identical on paper but behave very differently once they are out in the world. Here is what separates them, where each one earns its place, and how to get most of the flexibility of a dynamic code without paying for one.",
  blocks: [
    { h2: "What a static QR code is" },
    {
      p: "A static code carries its payload inside the pattern itself. Scan a static URL code and the phone reads the full web address straight off the squares; scan a Wi-Fi code and the network name and password come out the same way. No server is consulted and the image you downloaded is the whole product. Once it is printed, the information in it cannot be altered, only replaced with a new print.",
    },
    { h2: "What a dynamic QR code is" },
    {
      p: "A dynamic code also encodes a URL, but a very short one that belongs to a QR service, something like `qrs.example/a8Kz`. When someone scans it, their phone opens that short address, the service looks up where it should go today and redirects the visitor there. Because the real destination lives in the provider’s database rather than in the image, the owner can log in and point the same printed code somewhere new, and the provider can count every visit as it passes through.",
    },
    { h2: "Strengths and weaknesses of each" },
    { h3: "Static" },
    {
      ul: [
        "Free to create and free to use, with no recurring fees.",
        "Works for as long as the destination works. No service in the middle can shut down, expire or paywall the code.",
        "Private by design: the scan goes directly from the phone to your page, network or payment app without a third party recording it.",
        "Cannot be edited after printing. A changed address, a new Wi-Fi password or a moved PDF means a new code.",
        "No built-in scan counts. Whatever you learn about usage has to come from your own analytics.",
      ],
    },
    { h3: "Dynamic" },
    {
      ul: [
        "The destination can be changed at any time, so a single printed code can follow a campaign through several landing pages.",
        "Scan statistics by time, rough location and device come as standard.",
        "Short redirect URLs produce sparser, easier-to-scan patterns than long destination links.",
        "Usually subscription based; stop paying and the code typically stops resolving.",
        "Dependent on the provider staying in business and keeping the link alive. Prints outlast many startups.",
        "Every scan passes through the provider’s server, which adds a privacy hop and a moment of delay.",
      ],
    },
    { h2: "Which one to choose" },
    { h3: "When static is the right call" },
    {
      p: "Anything that is meant to last and is unlikely to change is static territory. A [Wi-Fi code](/wifi-qr-code) for a guest network, a [vCard](/vcard-qr-code) on a business card, a [PayPal.Me link](/paypal-qr-code) on a tip jar, or a restaurant menu that is updated a couple of times a year all fall into this group. Anything that would be awkward to route through a stranger’s server, such as payments and network credentials, also belongs here. For the menu case specifically, see [QR codes for restaurant menus](/guides/qr-code-for-restaurant-menu).",
    },
    { h3: "When dynamic makes sense" },
    {
      p: "If the code is part of a campaign whose performance you must measure or retarget, or if the content behind the code changes weekly and you cannot control the landing page, a paid dynamic service is a reasonable tool. Agencies running many client campaigns in parallel are the classic customers.",
    },
    { h2: "Middle paths with a static code" },
    {
      p: "Most of what people want from a dynamic code can be had with a static one and a little planning:",
    },
    {
      ol: [
        "Link to a page on a domain you control, such as `yourshop.com/offer`, and change what that page shows. The printed code stays valid for as long as you keep the address alive.",
        "Append campaign parameters such as `?utm_source=flyer&utm_medium=print` to the link and read the results in the analytics tool your site already uses. Each placement gets its own parameter, so you get per-location counts without a QR provider.",
        "Set up a short URL on your own domain, for example `yourshop.com/go/spring`, and redirect it wherever you like from your own hosting. You get the short pattern and the editable target while remaining the only party in the chain.",
      ],
    },
    {
      p: "If you need many codes with different links or parameters, the [batch tool](/batch) turns a list into a set of codes in one go.",
    },
    { h3: "The expiring code trap" },
    {
      p: "A frequent source of frustration is the free trial. Someone generates a code on a dynamic service, prints it on menus or signage, and discovers two weeks later that every scan now lands on an upgrade page because the trial lapsed. The code was never broken; it was a redirect whose lease ran out. Read the terms before printing anything that relies on a third-party short link, and if the destination is permanent, encode it directly.",
    },
    { h3: "Where GetQRMaker fits" },
    {
      p: "This site makes static codes only. They are generated in your browser, there is no account, and because nothing is stored on a server there is nothing to expire. The flip side is that there are no dynamic codes and no scan tracking here; if you need those, pick a dynamic provider with a pricing page you are comfortable with. Whichever kind you choose, test it before printing; our guide on [why QR codes fail to scan](/guides/qr-code-wont-scan) covers the checks, and the [Wi-Fi guide](/guides/wifi-qr-code-guide) walks through the most common static use case.",
    },
  ],
};
