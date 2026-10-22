import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: WhatsApp QR codes",
  blocks: [
    { h3: "Inside a wa.me link" },
    { p: "`wa.me` is a redirect service run by WhatsApp. The path is the phone number in E.164 form with every non-digit removed, and the optional `text` parameter carries a percent-encoded message, so a space becomes `%20`, an ampersand `%26` and a line break `%0A`. There is no parameter for the sender's name or an attachment." },
    { p: "On a phone without WhatsApp, the redirect lands on a page that offers the store download, with a “Continue to chat” button that only works once the app exists. On a desktop browser the same page offers WhatsApp Web, so a code on a slide can still start a conversation from a laptop with a linked account." },
    { h3: "Personal, Business and the catalogue" },
    { p: "A personal number and a WhatsApp Business number are reached by the same link; the difference shows on the receiving side, where a Business profile adds a verified name, opening hours, an address and automatic greeting or away messages. Business accounts can also publish a catalogue with its own shareable address, and the Business app can issue a short link of the form `wa.me/message/…` with a default message attached; paste either into a [URL code](/url-qr-code) if you prefer it to a plain chat link." },
    { h3: "Where a chat code earns its place" },
    { ul: [
      "On packaging and warranty cards, where a pre-filled “Question about order” line replaces a support email nobody wants to type.",
      "At an order desk or takeaway counter, so regulars send their usual order instead of queueing.",
      "On event lanyards and venue signs, pointing to the organiser's number for lost-and-found and schedule questions.",
      "On a tradesperson's van or a market stall, where a conversation is more natural than a web form.",
    ] },
    { p: "For an event group chat, paste the group invite link into a URL code instead; a wa.me chat code reaches one number, not a group." },
    { h3: "Pitfalls, and the other WhatsApp QR code" },
    { p: "WhatsApp also has its own QR code under the profile menu, meant for adding a contact in person from inside the app. It is read by WhatsApp's scanner rather than the camera app and carries no message, so it is not a substitute for a printed chat code." },
    { p: "Country codes are the usual failure: a number typed without one, or with a trunk zero kept after it, opens an empty or wrong chat. Pre-filled text that reads like an advertisement, in capitals or with emojis, makes people hesitate and delete it; a neutral prompt such as “Hi, I have a question about…” is sent far more often. Changing the business number orphans every printed code at once, so a number on packaging should be one you intend to keep for years." },
    { p: "When the audience might not have WhatsApp, an [SMS code](/sms-qr-code) or a [phone number code](/phone-number-qr-code) works on every handset, and the [troubleshooting guide](/guides/qr-code-wont-scan) covers codes shown on slides and screens." },
  ],
};
