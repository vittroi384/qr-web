import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Text QR codes",
  blocks: [
    { h3: "Four ways a QR code stores characters" },
    { p: "The QR standard does not treat text as one undifferentiated blob. It picks from four encoding modes depending on what the content looks like. Numeric mode packs three digits into ten bits; alphanumeric mode covers digits, capital letters, space and the symbols `$ % * + - . / :` at five and a half bits per character; byte mode stores anything else at eight bits per byte; and Kanji mode compresses Shift JIS characters into thirteen bits each." },
    { p: "In practice, a string of digits such as `2024-0918-77` takes a fraction of the space that the same length of mixed-case prose would. Writing a serial number in capitals rather than lowercase can shrink the symbol by a whole version, because a single lowercase letter forces the encoder into byte mode." },
    { h3: "Unicode and the byte budget" },
    { p: "Modern scanners assume byte-mode content is UTF-8. A Latin letter costs one byte, an accented letter two, a Korean, Japanese or Chinese character three, and most emoji four. A 150-character Korean sentence therefore uses as much capacity as 450 English letters, and the symbol grows to match. A few older readers still guess ISO-8859-1 and show garbled accents, so a test on two different phones is worth the minute it takes." },
    { h3: "Why long content fails in print" },
    { p: "Capacity is rarely the practical limit; legibility is. The largest symbol has 177 modules on a side. Printed at 3 cm, each module is about 0.17 mm wide, finer than most office printers reproduce cleanly and smaller than a phone camera can separate at arm's length. Anything beyond roughly Version 10, which is 57×57 modules, needs either a large print or a close-focus lens. If the content runs past a short paragraph, split it across several codes or move it to a web page." },
    { p: "Error correction compounds this. Raising the level from M to H keeps the text identical but demands a noticeably larger symbol, so dense text at level H is the worst case for scanning." },
    { h3: "What text codes are good at" },
    { p: "Because the result is just characters, a text code serves anywhere a reader needs data rather than an action. Asset tags that list a model number and purchase date, lab samples with a batch identifier, machine stickers carrying torque values or a safety checklist, geocache clues, poems on a gallery wall and the stations of a scavenger hunt all fit. Automated readers, such as inventory scanners or a keyboard-wedge scanner feeding a spreadsheet, benefit the most because they treat the decoded string as typed input." },
    { p: "The phone side stays passive: nothing opens and nothing is sent, which is exactly the point for inventory or instructions. When the information should trigger an action, pick the matching type instead: a [URL code](/url-qr-code) to open a page or a [vCard code](/vcard-qr-code) to save a contact. For a long list of serial numbers, the [bulk generator](/bulk-qr-code-generator) produces one code per line." },
  ],
};
