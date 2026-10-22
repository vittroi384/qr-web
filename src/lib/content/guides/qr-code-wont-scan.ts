import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "qr-code-wont-scan",
  title: "Why your QR code won't scan (and how to fix it)",
  description:
    "A QR code that will not scan usually has one of a dozen known causes. Check size, margin, contrast, data, logo, surface and content, then test before printing.",
  published: "2026-10-22",
  intro:
    "A QR code that refuses to scan is rarely a mystery. Work through the usual suspects, from the image itself to the phone in your hand, and the culprit normally turns up within minutes.",
  blocks: [
    { h2: "Start with the image: size, margin and contrast" },
    { h3: "Too small for the distance" },
    {
      p: "The camera has to resolve every module (the small squares), and modules shrink with the print. Measure how far away people will actually stand and size the print to match; the numbers are in our guide on [QR code size for printing](/guides/qr-code-size-for-printing).",
    },
    { h3: "Missing quiet zone" },
    {
      p: "Readers locate a code by its three large corner squares and the blank border around them. Trim that border, or butt the code against text or a photo, and the corners blend into their surroundings. Keep a clear margin of at least four modules on every side; the quiet-zone margin option in the generator adds it for you.",
    },
    { h3: "Low contrast or inverted colours" },
    {
      p: "Dark modules on a light background is what every reader expects. Light modules on a dark background (an inverted code) is worse, because many readers do not support it at all. If you customise colours, keep the foreground much darker than the background.",
    },
    { h2: "Too much data for the space" },
    { h3: "Dense codes with tiny modules" },
    {
      p: "Every extra character adds squares. A long URL full of tracking parameters, or a vCard with five phone numbers, produces a crowded grid in which each module is a fraction of a millimetre at business-card size. Shorten the content, drop fields you do not need, or print larger.",
    },
    { h3: "Blur from upscaling or JPEG artifacts" },
    {
      p: "A 200-pixel PNG stretched over an A3 poster turns crisp edges into smudges, and JPEG compression adds ringing around every square. Export at the final print size or, better, use SVG, which stays sharp at any scale. The trade-offs are covered in [PNG vs SVG for QR codes](/guides/png-vs-svg-qr-code).",
    },
    { h3: "A logo that covers too much" },
    {
      p: "Error correction lets a code survive some damage, but only up to a point: at level H roughly a quarter of the modules can be lost, and never the corner squares or the timing lines between them. An oversized or off-centre logo eats that budget. When you add a logo here, error correction switches to H and the image sits on a padded plate in the centre, which is the safe spot. More in [how to add a logo to a QR code](/guides/add-logo-to-qr-code).",
    },
    { h2: "The surface and the surroundings" },
    {
      ul: [
        "Glossy laminate, foil and glass bounce reflections into the lens and wash out part of the grid. Use matte stock, or angle the code away from overhead lights.",
        "Curved surfaces such as mugs and bottles bend straight rows into arcs. Keep the code small enough to lie on a nearly flat part.",
        "Dim light means noisy images; strong backlight turns the code into a silhouette. Give it even, frontal light.",
        "A camera held too close cannot focus. Backing off a few centimetres often revives a code that seemed broken.",
        "Cropping and stretching: a code squeezed into a non-square box, or trimmed on one edge to fit a template, no longer has square modules. Resize proportionally and check that all three corner squares are intact.",
      ],
    },
    { h2: "It scans, but nothing useful happens" },
    {
      p: "Sometimes the pattern reads perfectly and the failure lies in what it says:",
    },
    {
      ul: [
        "A typo in the address, such as a missing letter in the domain, sends people to an error page.",
        "The page moved or was deleted after printing, so the link is dead.",
        "A Wi-Fi code still holds last year’s password, or the network name was typed in a different case.",
        "The link uses plain `http://` and the phone or a corporate network refuses to open an unencrypted page. Use `https://` wherever the site supports it.",
      ],
    },
    {
      p: "Check the content yourself before exporting. For a [URL QR code](/url-qr-code), paste the final address into a browser; for a [Wi-Fi code](/wifi-qr-code), join the network from a phone that has never connected before.",
    },
    { h3: "When the phone is the problem" },
    {
      p: "Phones without native scanning (roughly iOS before 11, Android before 9) need a separate scanner app. A camera app that was denied permission shows no banner and no error. Scanning a code shown on another screen can produce moiré, a shimmering interference between the two pixel grids; enlarge the code on screen or tilt the phone slightly.",
    },
    { h2: "A testing checklist before you print" },
    {
      ol: [
        "Scan the on-screen code with at least two phones, one iPhone and one Android, using the built-in camera rather than a special app.",
        "Print a proof on the real paper at the real size and scan it from the distance people will actually use.",
        "Try it under the lighting of the final location: shop window, dim restaurant, outdoor noon sun.",
        "Follow the result all the way through: load the page, join the network, open the contact card.",
        "Hand the proof to someone who has not seen it before and watch them try.",
      ],
    },
    {
      p: "This matters because every code made on this site is static: the data is baked into the image, so nothing can be corrected after printing. Catching a problem on a proof costs a sheet of paper; catching it after a print run costs the print run. If you are weighing that trade-off, see [static vs dynamic QR codes](/guides/static-vs-dynamic-qr-codes).",
    },
  ],
};
