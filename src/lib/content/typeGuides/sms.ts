import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: SMS QR codes",
  blocks: [
    { h3: "SMSTO versus sms:" },
    { p: "Two notations exist for a message code. `SMSTO:number:text` comes from the early Japanese barcode conventions and is what libraries such as ZXing adopted; `sms:number?body=text` follows the URI style used on the web. Phone cameras read both, but SMSTO has the edge on older Android scanners, and its body needs no percent-encoding, so a message with spaces, apostrophes and accents can be written exactly as it should appear." },
    { h3: "What the person sees and pays" },
    { p: "Scanning opens the messaging app with the recipient and text already in place; the person reads it, may change every character and has to tap send. Nothing leaves the phone before that tap. The message then travels as an ordinary SMS, so the sender's plan or prepaid balance is charged at the usual rate, and a tourist roaming abroad may pay considerably more. If the destination is a short code rather than a full number, charges can be higher still and the code may be unreachable from foreign SIM cards." },
    { h3: "Where the format earns its keep" },
    { p: "Keyword opt-ins are the classic use: a sign reads “Scan to join” and the message says `JOIN` or `COFFEE`, which a messaging platform matches against a list. Because the keyword is pre-typed, the misspellings that would silently fail are avoided. Support requests follow the same pattern, with a text like `Table 12 needs help` prefilled on a card. Event check-in can prefill a ticket reference so staff see who has arrived, and a queue system can prefill a position number. Any situation where a short machine-readable string must reach you from someone who has no app and perhaps no data connection qualifies." },
    { p: "Keep the message short for two reasons. A longer body makes the symbol denser, and people are more inclined to edit or delete part of a long prefilled message, which breaks keyword matching on your side." },
    { h3: "iPhone and Android differences" },
    { p: "iOS shows a Messages icon in the camera banner and opens the conversation with that number, placing the text in the compose field. Android behaviour depends on the default SMS app: Google Messages and Samsung Messages both honour the body, but some carrier or third-party apps ignore it and open an empty composer. Dual-SIM phones may ask which line to send from. Numbers written with `+` and the country code behave most consistently; local-format numbers are interpreted according to the home country of the SIM." },
    { p: "Where replies need photos or should not incur carrier fees, a [WhatsApp code](/whatsapp-qr-code) offers a comparable experience over data. When the message should land in an inbox rather than on a phone, an [email code](/email-qr-code) carries a longer body, and a [phone number code](/phone-number-qr-code) covers the people who would rather call." },
  ],
};
