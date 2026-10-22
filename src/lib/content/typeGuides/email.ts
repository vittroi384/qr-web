import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Email QR codes",
  blocks: [
    { h3: "Anatomy of a mailto link" },
    { p: "The `mailto:` scheme dates from the earliest web standards and is defined today by RFC 6068. After the address, a question mark introduces header fields joined by `&`: `subject` and `body`, but also `cc` and `bcc`, which most mail apps still honour. Several recipients can be listed with commas before the question mark. The text parts must be percent-encoded: a space becomes `%20`, an ampersand inside the text becomes `%26`, and a line break in the body is written as `%0D%0A`, the carriage-return and line-feed pair the standard asks for." },
    { p: "Because encoding roughly triples the length of punctuation-heavy text, a body of three sentences can push the symbol up several versions. A subject plus a one-line prompt keeps it compact." },
    { h3: "How each platform reacts" },
    { p: "An iPhone shows a mail icon with the address in the camera banner, and tapping it opens whichever app is chosen as the default mail app in Settings. Android hands the link to the default client, or shows a chooser if more than one is installed. Desktop scanners and laptop webcams pass the link to the operating system, where a browser may route it to a web mail service such as Gmail or Outlook on the web if that service has registered itself as the handler. On a device with no mail account configured, the link may open an empty setup screen or do nothing at all, and nothing warns you that it happened." },
    { p: "The subject and body survive the transfer in every mainstream client, but formatting does not. Bold text, HTML and attachments cannot be expressed, and some clients strip leading blank lines from the body." },
    { h3: "Putting an address on paper" },
    { p: "Anything printed in public can be photographed and decoded by anyone, including scripts that harvest addresses for spam lists. The exposure is the same as writing the address in plain text, with the difference that a code is slightly less obvious to a passer-by yet trivial for software. Use a role address such as `hello@` or `bookings@` that can be filtered or retired, rather than a personal mailbox, and consider a distinct address per campaign so you can tell where unwanted mail originated and close that door later." },
    { p: "If replies need structure, a short web form reached through a URL code collects fields in a predictable order and works for people who only ever use web mail. A mailto code wins when you want the sender to keep a copy in their own sent folder, or when the audience is known to have a mail app set up." },
    { h3: "Related codes" },
    { p: "For an ongoing conversation rather than a single message, a [WhatsApp code](/whatsapp-qr-code) opens a chat thread, and a [vCard code](/vcard-qr-code) lets the person save the address alongside a phone number instead of writing to it immediately. For printing on cards, the [business card guide](/guides/qr-code-on-business-card) covers sizing and placement." },
  ],
};
