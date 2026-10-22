import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "qr-code-on-business-card",
  title: "How to put a QR code on a business card",
  description:
    "What to encode on a business card QR code, vCard fields that keep it scannable at 2 cm, placement, dark-card contrast, finishes, SVG proofs and privacy.",
  published: "2026-10-22",
  intro:
    "A code on a business card has two jobs: survive the printing process and be worth scanning. Here is how to choose what it holds and how to get it printed properly.",
  blocks: [
    { h2: "Choose what the code holds" },
    { h3: "A vCard" },
    {
      p: "The code carries the contact itself in vCard 3.0. The phone reads name, number and email straight from the squares and offers to add the contact without touching the network, so it works in a basement venue. The cost is permanence: a new job title means a new code and a new print run.",
    },
    { h3: "A link to a profile" },
    {
      p: "Point the code at your LinkedIn page, a personal site or your company’s team page. The page is always current, it can carry a photo and a longer bio, and a typo can be fixed tomorrow. In return the person needs a connection and still has to save your number by hand.",
    },
    { h3: "A link-in-bio page" },
    {
      p: "A single page listing your site, booking calendar, LinkedIn and a downloadable contact file sits between the two. It needs internet like any link, but one scan offers every way to reach you, and you can reorder it later. The [URL generator](/url-qr-code) makes this kind of code; the [vCard generator](/vcard-qr-code) makes the first kind.",
    },
    { h2: "Keep the vCard small" },
    {
      p: "Every character becomes squares, and a card gives you perhaps two centimetres to fit them in. Five short fields give a pattern coarse enough to scan from across a table; one with a street address, two office lines and a note becomes a grid that only reads when held still in good light.",
    },
    {
      ul: [
        "Include: first and last name, company, mobile with country code, one email, one website.",
        "Leave out: fax, the second office line, a full postal address, a multi-sentence note, and the job title if it is already printed.",
        "Skip the centre logo unless the code can be printed larger; it forces error correction to maximum, which adds squares. The [logo guide](/guides/add-logo-to-qr-code) explains the trade.",
      ],
    },
    {
      p: "If it still will not fit, switch to a link: a URL stays short however much the page behind it says.",
    },
    { h2: "Placement and size" },
    {
      p: "The back of the card is the natural home, where the code does not compete with your name and can sit on a clean background.",
    },
    {
      ul: [
        "Keep at least 3 to 4 mm of empty space around the code on every side, on top of the quiet-zone margin the generator adds.",
        "Stay 5 mm from the trimmed edge. Guillotines drift by a millimetre or two, and a clipped corner finder breaks the code.",
        "Never run it across a fold on a folded card.",
        "Make it at least 2 cm square. The [printing size guide](/guides/qr-code-size-for-printing) has the arithmetic; on a card the limit is the printer’s resolution, not the reader’s eyes.",
      ],
    },
    {
      p: "A tiny caption such as “Save my contact” or “Scan to connect” underneath does more than any design flourish, because it tells the person what they will get.",
    },
    { h2: "Colours, finishes and the file" },
    {
      p: "Dark cards are popular and the most common source of broken codes. Phones expect dark modules on a light background; a white code on black is inverted, and plenty of camera apps refuse it. Keep the modules dark on a light panel if the card is black, or use the darkest colour of your palette on a pale card. Pastels and metallic inks do not give enough contrast.",
    },
    {
      p: "Matte and uncoated stock photograph best. Glossy lamination throws overhead lights back at the lens, and spot UV over the code is a gamble: the varnish bends light exactly where the reader needs clean edges. Elsewhere on the card it is fine; keep it off the code.",
    },
    {
      p: "Give the printer an SVG rather than a PNG. Vectors stay sharp at any output resolution, and the printer can recolour the modules to a spot ink without redrawing them; the [PNG vs SVG guide](/guides/png-vs-svg-qr-code) covers the details. Then insist on a printed proof and test it on an iPhone and an Android handset before approving the run; a proof costs little, a box of 500 dead cards costs the box.",
    },
    { h2: "Privacy, backups and the day your number changes" },
    {
      p: "Everything in a vCard is readable by anyone who photographs the card or finds it in a bin. That is fine for a work number and email, and a reason to leave your home address and personal mobile off. Treat the code as public text, not a private file.",
    },
    {
      p: "A card code works best alongside a digital copy of the same contact: the same image in your email signature, on your conference badge, or on your phone’s lock screen for when you run out of cards; people who never scan print will scan a screen held in front of them.",
    },
    {
      p: "When the number changes, a static vCard code cannot follow it; the cards go in the recycling. A code that links to a page you control survives, because you update the page and the printed code keeps pointing at it. The [static vs dynamic guide](/guides/static-vs-dynamic-qr-codes) explains why no subscription is involved. If your details change often, print the link version.",
    },
  ],
};
