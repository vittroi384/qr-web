import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: vCard QR codes",
  blocks: [
    { h3: "Why version 3.0 and not 4.0" },
    { p: "Two versions of the vCard format are in common use. Version 4.0, standardised in 2011, is cleaner on paper: it mandates UTF-8 and adds fields such as gender and calendar addresses. Phone cameras, however, learned to read 3.0 first, and the import paths in the iOS Camera app and Android scanners remain most dependable with a card that begins `BEGIN:VCARD` followed by `VERSION:3.0`. That is the version this generator writes." },
    { h3: "Which fields survive the scan" },
    { p: "Name, organisation, job title, phone numbers, email, website, a single postal address and a short note arrive intact on both platforms. The structured name field matters more than it looks: a card that puts the full name in one slot can land as a surname-only contact on one phone and a first-name-only contact on another, so the family and given names are written separately." },
    { ul: [
      "Embedded photos are far too large for a scannable code, and the preview often shows a blank avatar anyway.",
      "A second or third address is frequently collapsed into one or dropped during import.",
      "Custom labels such as “Studio” are usually replaced by the phone's generic label, so the standard CELL, WORK and HOME types are the safe choice.",
    ] },
    { h3: "vCard or MeCard" },
    { p: "MeCard is a compact alternative that originated with Japanese feature phones: `MECARD:N:Smith,Jane;TEL:+14155552671;;` holds the essentials in roughly half the characters, giving a noticeably sparser code. The price is a smaller vocabulary, with no job title, no website and one of each field, and iPhone support has historically been less consistent than for vCard. When only a name and number matter, MeCard is tempting; when the contact needs a company and an email, vCard is what every address book understands." },
    { h3: "Density, printing and who can read it" },
    { p: "A card with every field filled can exceed 300 characters, which pushes the symbol to a high version with tiny modules; on an 85 × 55 mm card that means squares under half a millimetre wide, which cheap office printers blur together. Keep error correction at the basic level for a dense card, since the maximum setting adds more modules, and reserve a logo for codes with few fields." },
    { p: "Print the code on a flat area, never across a fold or a rounded corner, and keep dark modules on a light background. Soft-touch and textured stocks scatter light and reduce contrast, so order a sample before a large run. Remember too that the card is readable by anyone who photographs it: a personal mobile number or home address handed out at a trade fair is public from that moment, so include only what you would print in plain text." },
    { p: "The [business card page](/business-card-qr-code) covers layouts and minimum sizes in more depth, and the [business card guide](/guides/qr-code-on-business-card) has a printing checklist. If you only need a number dialled rather than a contact saved, a [phone number code](/phone-number-qr-code) is far smaller." },
  ],
};
