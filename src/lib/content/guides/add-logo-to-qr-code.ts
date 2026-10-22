import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "add-logo-to-qr-code",
  title: "How to add a logo to a QR code without breaking it",
  description:
    "Why a QR code still scans with a logo on top, how big the logo can be, where to place it, which colours work, and how to test the result before you print.",
  published: "2026-10-22",
  intro:
    "A logo turns an anonymous black square into something people recognise before they scan. It works because a QR code is built to lose part of itself and survive, and the logo simply spends part of that allowance.",
  blocks: [
    { h2: "Why a logo does not break the code" },
    {
      p: "Every QR code carries more data than its message needs. The extra codewords are Reed–Solomon parity, and a reader uses them to reconstruct codewords it misread or could not see at all. How many can be rebuilt depends on the error-correction level chosen when the code was made: L recovers roughly 7% of codewords, M about 15%, Q about 25% and H about 30%.",
    },
    {
      p: "A logo is nothing more than a block of modules the camera will never see. As long as the covered share stays clearly under the recoverable share, the decoder fills in the gap and the scan succeeds. “Clearly under” matters, because those percentages are a ceiling for all damage combined, not a budget reserved for your artwork.",
    },
    {
      p: "Where the logo sits matters as much as how big it is. The three large squares in the corners are finder patterns; the reader locates and orients the code with them, and nothing can rebuild them if they are hidden. Larger codes also contain smaller alignment patterns across the grid. The centre is the safest spot: it is as far as possible from the finders and, in most code sizes, falls between alignment patterns rather than on one.",
    },
    { h2: "How big is safe" },
    {
      p: "A practical rule with level H: a logo about a fifth of the code’s width is comfortably safe. Width is deceptive here, because area grows with the square of the side. A logo spanning 20% of the width hides only 4% of the modules, while one spanning half the width hides a quarter of them and fails on level H alone once a little glare is added.",
    },
    {
      p: "On [the logo generator](/qr-code-with-logo) this is handled for you. Uploading a logo raises error correction to H automatically, and the logo is drawn at roughly a fifth of the width on a padded white plate. The plate is deliberate: modules under it are removed entirely rather than half-covered, which a decoder may read as the wrong value instead of a gap it knows to fill.",
    },
    { h2: "Choosing and colouring the logo" },
    {
      p: "The logo gets only a few hundred pixels at scan distance, so a simple mark beats a full wordmark. Use the icon version of your brand in one or two flat colours with strong contrast against the white plate. A square or round shape wastes the least of the plate. Supply a PNG with a transparent background or an SVG; a JPG works too but shows its white box if the code background is not pure white.",
    },
    {
      p: "Colour applies to the code as well. Modules should stay dark on a light background, because phone cameras read dark-on-light reliably and inverted codes are hit-and-miss. Leave the finder patterns the same colour as the other modules rather than tinting them to match the logo. Skip gradients across the modules: the light end of a gradient can drop below the contrast a camera needs even when the dark end looks fine on screen.",
    },
    { h3: "What not to do" },
    {
      ul: [
        "A logo over or touching a corner square: the code will not even be located.",
        "A logo wider than a quarter of the code, or a full-width banner across the middle.",
        "A busy photograph or detailed illustration, unrecognisable at that size.",
        "Text inside the code area, such as “scan me” across the modules. Put captions in a frame below instead.",
      ],
    },
    { h2: "Data length, print size and testing" },
    {
      p: "The module count grows with the amount of data and with the error-correction level. More data means more modules in the same printed square, so each module shrinks and the fixed-size logo swallows more of them; a long URL at level H with a logo ends up as a dense grid of tiny cells. The remedy is to shorten what the code encodes: drop tracking parameters, use the bare domain, or point the code at a short redirect page. See [the sizing guide](/guides/qr-code-size-for-printing) too, since a denser grid needs a larger print to keep each module above what a camera can resolve.",
    },
    {
      p: "Test the finished file, not the preview. Scan it on at least two phones, ideally an older Android and a recent iPhone, at the real print size and from the distance people will actually stand. If the logo version hesitates where the plain version reads instantly, that hesitation is your margin disappearing. Prefer SVG for print files; [PNG vs SVG](/guides/png-vs-svg-qr-code) explains why.",
    },
    { h2: "The honest trade-off" },
    {
      p: "A logo is paid for with the same error-correction budget that would otherwise absorb dirt, scratches, glare from a laminate, a cheap print and a soft-focus camera. With a fifth-of-width logo on level H, about 4% of modules are gone before anything else goes wrong, which leaves plenty in everyday conditions. On a tiny product label or a sign that spends a season outdoors, that margin is worth more than the branding. In those cases keep the logo small or leave it off, and if a code starts failing in the field, [the troubleshooting guide](/guides/qr-code-wont-scan) is the place to start.",
    },
  ],
};
