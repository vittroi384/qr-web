import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Phone number QR codes",
  blocks: [
    { h3: "The tel scheme" },
    { p: "`tel:` is defined in RFC 3966 and is understood by every smartphone camera as well as by desktop systems that have a softphone registered. The number should be written as a global number: a plus sign, the country code, then the subscriber number without the leading trunk zero. `+442079460000` can be dialled from any country, whereas `02079460000` only works inside the United Kingdom and will fail, or reach a wrong number, for a visitor whose phone is roaming on another network." },
    { p: "The standard also permits visual separators such as hyphens and dots and an `;ext=` parameter for extensions, but support on handsets is uneven, which is why an extension belongs beside the code as printed text." },
    { h3: "What appears on screen" },
    { p: "A phone never dials on its own from a scan. iOS shows the number in a banner and then a confirmation sheet with a Call button; Android places the number in the dialer with the call key waiting. This two-step design guards against codes that would silently ring premium-rate lines, and it also means the person can copy the number, save it to a contact or send a message to it instead of calling. Older feature phones without a camera scanner gain nothing from the code, so the digits should remain readable without it." },
    { h3: "Numbers that behave differently" },
    { p: "Landlines, mobiles and toll-free numbers all encode the same way, but their reachability differs. Toll-free prefixes such as 800 or 0800 are usually national; dialled from abroad they may be blocked or charged. Short codes and emergency numbers like 112 or 911 are not global numbers and should not be put in a code. Shared-cost and premium-tariff numbers deserve a note next to the code stating the price, as the scanning phone displays nothing about cost." },
    { p: "Businesses with several lines sometimes make one code per department rather than one switchboard number, which spares callers a menu system." },
    { h3: "On vehicles, posters and badges" },
    { p: "Click-to-call codes work best where typing a number is awkward: the back of a tractor-trailer, a scaffold banner, a lost-pet poster on a lamppost, a locksmith's door at night. A tel code is among the smallest symbols possible, so it can be printed as a 2 cm square on a lanyard badge labelled “Emergency contact” or on a child's school bag tag. On vehicles the code has to be legible at a standstill from the next car, which means 20 to 30 cm wide at minimum and a spot that is not covered by road dirt or a number plate." },
    { p: "If callers should also be able to save your details, a [vCard code](/vcard-qr-code) stores name, number and address in one scan, and a [WhatsApp code](/whatsapp-qr-code) suits audiences who prefer messaging. The [print size guide](/guides/qr-code-size-for-printing) explains how to size a code for roadside distances." },
  ],
};
