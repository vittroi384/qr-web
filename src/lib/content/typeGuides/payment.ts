import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: PayPal and payment link QR codes",
  blocks: [
    { h3: "How each provider builds its link" },
    { p: "Every service in this group exposes a public profile at a predictable address, and the username is the only variable. PayPal.Me uses `paypal.me/name`, Venmo `venmo.com/u/name`, Cash App `cash.app/$cashtag`, Buy Me a Coffee `buymeacoffee.com/name`, Ko-fi `ko-fi.com/name`, Patreon `patreon.com/name`, Revolut `revolut.me/name` and Wise `wise.com/pay/me/name`. The address is public by design, so the code only saves the typing." },
    { p: "Only three of these accept an amount in the URL: PayPal and Cash App as a path segment, Venmo as query parameters. PayPal additionally lets you add a three-letter currency code after the amount, such as `/25EUR`, for customers who pay in a currency other than your account's default. Venmo and Cash App settle in US dollars. The remaining services take the amount on their own page, often as preset tiers set in your dashboard." },
    { h3: "What the payer sees" },
    { p: "The link opens a confirmation screen in the payer's own app or browser, never a completed transaction. They see your display name and avatar, can edit the amount, add a note, and choose a funding source before tapping pay. That last step is where the fee question lives: in general, services charge the recipient when a payment is marked as goods and services or arrives at a business account, and little or nothing for personal transfers between friends. Business accounts offer invoicing and dispute handling in return, so read your provider's current schedule before deciding which account type the code should point at." },
    { h3: "Physical placements that work" },
    { p: "An invoice footer with the exact total pre-filled shortens the time between sending and being paid, and a stall sign with no amount handles variable baskets. Tip jars, busking cases, collection plates and charity tins all benefit from an empty-amount code for people who carry no coins. Print the provider's name and your handle in plain text next to the code so a payer can read it before scanning or type it in instead." },
    { p: "Fraud is the main reason to add that text. A known scam covers a legitimate code with a sticker pointing at the scammer's account; staff do not notice because the code looks identical, and the customer sees a plausible page. Laminate codes, inspect them at opening, and glance at the recipient name on the customer's screen when the sale is large." },
    { h3: "When the code outlives the account" },
    { p: "Changing your username breaks every printed code at once, since the old address stops resolving or may later be claimed by someone else, so treat the handle as permanent. Country restrictions can also surprise travellers: Venmo is domestic to the United States, Cash App covers few countries, and PayPal.Me is not offered in every market where PayPal operates, so a tourist may scan successfully and still be unable to pay." },
    { p: "For bank-to-bank transfers that avoid wallet fees, regional schemes may suit better: [Pix](/pix-qr-code) in Brazil, [UPI](/upi-qr-code) in India and [EPC transfers](/epc-qr-code) in the euro area each have their own code format on this site." },
  ],
};
