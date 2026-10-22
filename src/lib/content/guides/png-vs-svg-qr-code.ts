import type { GuidePost } from "../types";

export const post: GuidePost = {
  slug: "png-vs-svg-qr-code",
  title: "PNG vs SVG: which format to use for QR codes",
  description:
    "PNG or SVG for a QR code? Raster versus vector, when each format wins, file size, transparency, why resized PNGs and JPEGs fail, and what to send to a printer.",
  published: "2026-10-22",
  intro:
    "Both downloads hold the same code, but they behave differently once they leave the generator. Here is how to pick the right one for screens, print and design tools.",
  blocks: [
    { h2: "Raster versus vector" },
    {
      p: "A PNG is a raster image: a fixed grid of pixels, each with a colour. When you download a PNG of a QR code, the generator decides once how many pixels each module gets, and that decision is baked in. An SVG is a vector file: a text description that says, in effect, “draw a black square here, this wide”. Nothing becomes pixels until the file is displayed or printed, and at that moment the software draws it at whatever size is required.",
    },
    { h2: "Which format fits the job" },
    { h3: "PNG is right for" },
    {
      ul: [
        "Web pages, where browsers and content systems accept PNG everywhere and the display size is known.",
        "Email signatures and messaging apps, which often strip SVG or treat it as an attachment.",
        "Slide decks and word processors, where a PNG pastes cleanly and the copy-to-clipboard button does it in one step.",
        "Quick prints at a known size on an office printer.",
        "Designs that need a transparent background, which PNG supports and JPEG does not.",
      ],
    },
    {
      p: "PNG is lossless, so the saved code matches the preview exactly; its one weakness is a single native size.",
    },
    { h3: "SVG is right for" },
    {
      ul: [
        "Print shops and anything above postcard size: posters, banners, vehicle wraps, window vinyl.",
        "Laser cutting, engraving and vinyl plotting, where the machine follows paths and cannot use pixels at all.",
        "Design work in Illustrator, Figma, Inkscape or Affinity, where the code sits in a layout that will be exported later.",
        "Jobs where the final size is not decided yet, or one file must serve both a business card and a trade-show backdrop.",
      ],
    },
    {
      p: "An SVG from this site carries the modules, the margin and any centre logo in one vector file, so a design tool can recolour or scale it without touching the code; the [logo generator](/qr-code-with-logo) explains how the logo is placed.",
    },
    { h2: "Size, colour and the resizing trap" },
    {
      p: "File size is rarely a problem either way. A QR code PNG at a few hundred pixels is a handful of kilobytes, and a poster-sized PNG can reach several hundred, whereas the SVG for the same code stays at a few kilobytes however large it will be printed, because it only lists the squares.",
    },
    {
      p: "Colours survive both formats. The module and background colours you choose are written into both files as RGB, and the printer converts to CMYK on their side. Keep the contrast strong whichever format you use; the [scanning problems guide](/guides/qr-code-wont-scan) lists the combinations that fail. Both formats support transparency, but a transparent code borrows its background from whatever it sits on, and a dark or busy backdrop can break scanning.",
    },
    {
      p: "Enlarging a PNG never adds information. The software invents the missing pixels by interpolation, which blends neighbouring colours; on a photograph that looks smooth, but on a QR code it turns every crisp module edge into a grey ramp and smears neighbours together. Shrinking has the opposite problem: modules that no longer line up with the pixel grid get averaged into grey. If you must use a PNG, download it at the size you need instead of resizing afterwards.",
    },
    {
      p: "JPEG is the format to avoid. Its compression was designed for photographs and treats the sharp edges of a QR code as noise to be smoothed, which leaves ringing and blocky halos around every module. A JPEG code may still scan, but it is always worse than the PNG it came from. If a platform insists on JPEG, upload the largest PNG it allows and let it convert once.",
    },
    { h2: "Handing files to a printer" },
    {
      ol: [
        "Send the SVG whenever the shop accepts it; most do, and it removes any question of resolution.",
        "If they want a raster file, send a PNG at 300 dpi at the final printed size: about 1,200 pixels for a 10 cm code, 2,400 for 20 cm.",
        "Leave colour conversion to them. The RGB values in the file are enough; they will handle black and warn you if a brand colour is out of gamut.",
        "Ask for a proof at actual size and scan it before approving the run; the [printing size guide](/guides/qr-code-size-for-printing) covers what to check.",
      ],
    },
    {
      p: "Converting between formats is one-directional in practice. SVG to PNG is easy and exact at any chosen size. PNG to SVG means auto-tracing the pixels, which gives wobbly edges and misaligned squares; it is almost always quicker to regenerate the code and download the SVG, which costs nothing because the codes are static and never expire.",
    },
    { h2: "Decision checklist" },
    {
      ul: [
        "Going on a screen, in an email or in a chat: PNG.",
        "Going into a slide or document: PNG, or copy to clipboard.",
        "Going to a print shop or a sign maker: SVG, or a 300 dpi PNG at final size.",
        "Going into Illustrator, Figma or Inkscape: SVG.",
        "Being cut, engraved or plotted: SVG, always.",
        "Size not yet known: SVG, and make a PNG from it later.",
        "Many codes at once from the [batch tool](/batch): PNGs in a ZIP, so keep the links short.",
      ],
    },
  ],
};
