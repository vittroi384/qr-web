import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: PDF and file QR codes",
  blocks: [
    { h3: "Choosing where the file lives" },
    { p: "Because the code only carries an address, the hosting decision shapes everything that follows. Google Drive, Dropbox and OneDrive are convenient and free for small volumes, but each wraps the file in its own viewer page with a sign-in prompt in the corner. A file on your own website under a plain path such as `/menu.pdf` opens straight into the phone's built-in viewer with nothing in between, and it stays under your control if the service changes its sharing rules." },
    { p: "Whichever host you pick, think about who will scan. A cloud viewer can misbehave when the visitor is signed in to a school or work account that blocks external content, a common surprise on managed devices." },
    { h3: "Preview links versus direct downloads" },
    { p: "Most share links open a preview. For Google Drive the usual form is `https://drive.google.com/file/d/ID/view`; swapping the ending for `uc?export=download&id=ID` forces a download instead. Dropbox links end in `?dl=0` for preview and `?dl=1` for download. Preview is friendlier for a quick look at a menu or a poster; a direct download suits manuals and forms people will want to keep offline. A downloaded PDF lands in the Files app on iPhone or the Downloads folder on Android, where some people lose track of it, so preview is the safer default for anything read once." },
    { h3: "Designing the document for a phone" },
    { p: "Printed A4 brochures laid out in two or three columns are hard work on a six-inch screen: the reader zooms in, scrolls sideways, and loses the column. If you can, export a phone version with a single column, generous type and no tiny footnotes. Compress images before export as well; a brochure full of photographs can run to tens of megabytes, and someone on a weak mobile signal may give up before the first page renders." },
    { p: "For content that changes often, ask whether a PDF is the right format at all. A simple web page reflows to any screen, loads progressively, and can be edited without touching a file. The PDF route makes most sense when the layout itself matters, like a certificate, a floor plan or a spec sheet." },
    { h3: "Keeping the printed code valid" },
    { p: "The code never expires, but the link behind it can. Three habits keep it alive: upload new versions over the existing file instead of beside it, never move the file to another folder or account, and keep a note of which link is printed where. Codes often die when the original uploader leaves and their personal Drive is archived; a shared drive avoids that." },
    { p: "Typical uses include exhibition labels that open a longer catalogue entry, assignment hand-outs where students scan for the worksheet, product packaging with the manual in several languages, and event programmes. For a menu specifically, see [the restaurant menu guide](/guides/qr-code-for-restaurant-menu); a plain [URL code](/url-qr-code) is the same mechanism without the file-specific hints, and the [print size guide](/guides/qr-code-size-for-printing) covers how large the code should be on a label." },
  ],
};
