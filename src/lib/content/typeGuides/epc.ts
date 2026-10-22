import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: EPC and GiroCode QR codes",
  blocks: [
    { h3: "One format, several names" },
    { p: "The European Payments Council publishes the Quick Response Code guideline, document EPC069-12, that defines how a SEPA credit transfer can be packed into a QR code. German and Austrian banks market it as GiroCode. Dutch and Belgian apps simply call it a payment QR, and Finnish banks adopted the same layout for invoices. The Swiss QR-bill (Zahlen mit Code, QR-Rechnung) is a different design with a Swiss cross in the middle and its own data structure; neither format reads in the other’s apps." },
    { p: "Behind the picture is a plain-text block, one field per line. `BCD` marks the service tag, `002` the version, `1` says the text is UTF-8, and `SCT` names the SEPA credit transfer. Then come the optional BIC, the beneficiary name, the IBAN, the amount written as `EUR` followed by the value, an empty purpose line, the remittance information and an optional message to the payer." },
    { h3: "Which apps read it" },
    { p: "Most banking apps in Germany, Austria, the Netherlands and Belgium include a scanner on the transfer screen; the app photographs the code, fills the form, and the customer approves with their usual TAN or biometric step. The format has no online component: the app reads the text locally, so the code works on paper, on a screen or in a PDF." },
    { ul: [
      "Invoices from freelancers and tradespeople, printed near the payment details block.",
      "Membership fee letters from clubs and associations, with the member number in the reference.",
      "Donation appeals from parishes and charities, usually with the amount left open.",
      "Rent or deposit requests from private landlords, so the reference lands correctly in the statement.",
    ] },
    { h3: "What the format cannot do" },
    { p: "An EPC code describes a euro transfer between two SEPA accounts and nothing else. It cannot take a card payment, cannot pull money from the payer, and cannot hold any currency other than the euro. The payer always sees a filled-in transfer form and must confirm it, so proof of payment still comes from the bank statement. The issuer receives no scan event or callback, and neither does this generator." },
    { h3: "Getting the details right" },
    { p: "Write amounts with two decimals and no thousands separator, so `EUR1250.00` rather than `EUR1.250`. Keep the remittance text short: although the field allows 140 characters, many banks show only the first 35 or so in the statement, so put the invoice number first. If you have a structured creditor reference starting with `RF`, use it, because banks match it automatically. Before printing, read the IBAN back from the generated code with your own app; the check digits catch transposed characters but not a wrong account that happens to be valid." },
    { p: "Codes on letters are usually small, so follow the [printing size guide](/guides/qr-code-size-for-printing). If the invoice also goes out as a PDF, see the [PDF QR code page](/pdf-qr-code), and for payments outside the euro area look at the [Pix](/pix-qr-code) and [PayPal](/paypal-qr-code) code types." },
  ],
};
