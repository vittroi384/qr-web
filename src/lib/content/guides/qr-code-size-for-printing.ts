import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "qr-code-size-for-printing",
  title: "What size should a QR code be for printing?",
  description:
    "How big to print a QR code: the scanning-distance rule of thumb, minimum sizes for cards and posters, module count, quiet zone, DPI, and a size reference list.",
  published: "2026-10-22",
  intro:
    "How big a printed QR code needs to be depends on the scanning distance, the amount of data inside, and the surface it lands on. Here are the rules of thumb and a quick reference list.",
  blocks: [
    { h2: "Start from the scanning distance" },
    {
      p: "The most useful guideline is also the simplest: make the code roughly one tenth as wide as the distance from which people will scan it. A poster read from two metres away wants a code about 20 cm across; a flyer held 25 cm from the face can get by with 2.5 cm. This is a rule of thumb, not a law. Modern phone cameras often cope with less and a dense code needs more, but the ratio is a sensible starting point.",
    },
    { h3: "Minimum sizes in practice" },
    {
      p: "For anything held in the hand, about 2 cm (0.8 in) is the floor for a short link, and 2.5 to 3 cm is more comfortable. Business cards are the usual squeeze; the [business card guide](/guides/qr-code-on-business-card) shows how to fit a code without shrinking it past the point of use. Going larger never troubles the scanner: a billboard code just needs the phone far enough back to frame the whole square.",
    },
    { h2: "Why the content changes the minimum size" },
    {
      p: "A QR code is a grid of square modules, and the grid grows with the data. Version 1 is 21 × 21 modules; version 40 is 177 × 177, and each step adds four per side. A bare domain name fits in a small version, while a long URL full of tracking parameters, or a contact card with several numbers and an address, climbs through the versions.",
    },
    {
      p: "The camera needs a legible module, not a particular code width. A 25-module code at 2 cm has modules of 0.8 mm; a 57-module code in the same 2 cm has modules of 0.35 mm, so the phone must be closer or sharper. Shorten the content before enlarging the print. A [URL QR code](/url-qr-code) for a short, clean link will nearly always print smaller than one for a long link.",
    },
    { h3: "The quiet zone" },
    {
      p: "The specification asks for a blank margin of four modules on every side, the quiet zone, so a scanner can tell where the code ends. It counts toward the printed size: a code set in a 2 cm box is smaller than 2 cm once the margin is included. The margin option in the Style section controls it, and it should stay on unless the surrounding area is already plain and light.",
    },
    { h3: "Error correction" },
    {
      p: "Every QR code carries redundant data so a scanner can rebuild modules it cannot read. Level L recovers roughly 7% of damaged modules, M about 15%, Q about 25% and H about 30%. Higher levels tolerate scratches, glare and logos, but they add modules, so the same content needs a bigger minimum print. The generator offers M as basic and H as maximum, and the [logo option](/guides/add-logo-to-qr-code) switches to H because the logo covers part of the code.",
    },
    { h2: "Pixels, DPI and the printing surface" },
    {
      p: "Print shops usually ask for 300 dpi at the final size. A code 3 cm wide therefore needs roughly 350 pixels; a 20 cm poster code needs about 2,400. A PNG saved at 300 pixels and stretched to poster size blurs, and soft module edges are a common reason a printed code fails. Export the PNG at the pixel size the job needs, or download the SVG, which draws crisp edges at any size; the [PNG vs SVG guide](/guides/png-vs-svg-qr-code) goes through the trade-offs.",
    },
    {
      p: "All of this assumes dark modules on a light background. Coloured codes and low-contrast palettes need more size to compensate. Glossy laminate and metallic stock reflect the flash and wash out part of the code, so go larger and matte. Curved surfaces such as bottles distort the square; keep the code on a nearly flat band or a flat label. Fabric and embroidery soften edges, so modules must be coarse: short content, generous size.",
    },
    { h2: "Suggested sizes by situation" },
    {
      p: "Starting points for a short link at level M, quiet zone included. Test them on your own artwork.",
    },
    {
      ul: [
        "Business card: 2 to 2.5 cm (0.8 to 1 in), scanned from the hand.",
        "Table tent or menu card: 3 to 4 cm, scanned from a seated position.",
        "A4 poster or flyer on a wall: 5 to 8 cm, scanned from about a metre.",
        "Shop window or door sign: 10 to 15 cm, scanned from the pavement through glare.",
        "Banner or billboard: 30 cm and up, sized by the ÷10 rule for the real viewing distance.",
      ],
    },
    { h3: "Test before the print run" },
    {
      ol: [
        "Print one copy at the final size on the same stock, not a draft on office paper.",
        "Scan it with at least two phones, ideally an older Android and a recent iPhone, from a realistic distance.",
        "Try it under the actual lighting: a window in daylight, a menu under warm restaurant lamps.",
        "If any phone struggles, shorten the content or enlarge the code rather than lowering error correction; the [troubleshooting guide](/guides/qr-code-wont-scan) lists the usual culprits.",
      ],
    },
    {
      p: "Making a set in the [batch tool](/batch)? Print and scan a couple from the ZIP before ordering the lot.",
    },
  ],
};
