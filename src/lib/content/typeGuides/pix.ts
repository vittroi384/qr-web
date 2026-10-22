import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Pix QR codes",
  blocks: [
    { h3: "What Pix is and why the key matters" },
    { p: "Pix is the instant payment system operated by the Banco Central do Brasil. It launched in November 2020 and settles transfers within seconds at any hour, weekends included. Instead of typing a branch and account number, the payer addresses a Pix key: a CPF or CNPJ, a mobile number, an email address, or a random key (chave aleatória, also called EVP) that the bank generates for you." },
    { p: "Whatever key you choose is visible to anyone who decodes the code, so for anything printed in public the random key is the sensible choice. A CPF is a personal tax number, and a phone number or email invites spam, while a 36-character random key points at the same account and reveals nothing about you." },
    { h3: "Static codes and dynamic codes" },
    { p: "A static code carries the key, the merchant details and optionally an amount, and the string never changes, so it can be printed once. A dynamic code is created by your bank or payment service for a single charge: it embeds a URL that the payer’s app queries, and the bank keeps a transaction record that can expire or be marked paid." },
    { p: "This generator produces static BR Codes only, which suits a stall, a donation poster or a recurring fee but gives no per-order tracking: payments through the same code look alike in your statement, and a txid is one id for all of them, not one per sale. For a reference per customer, make one code each or ask your bank for dynamic codes; the [static vs dynamic article](/guides/static-vs-dynamic-qr-codes) covers the general trade-off." },
    { h3: "What the payer can and cannot change" },
    { p: "When the amount field is empty, the bank app asks the payer to type a value. When an amount is present, most apps lock it, so the customer cannot pay less by mistake; a few apps still allow editing, so treat a fixed amount as a convenience rather than a guarantee. The CRC16 at the end of the payload rejects any edited string." },
    { ul: [
      "Print the registered name of the key holder next to the code, so the payer can compare it with what the app displays.",
      "Check your statement weekly; a sudden drop in payments usually means the code was swapped or damaged.",
    ] },
    { h3: "Sticker swapping and other risks" },
    { p: "The most common fraud against static codes is physical: someone pastes their own code over yours and collects your customers’ payments until you notice. The CRC does not help here, since the attacker’s code is internally valid. The defence is the payer checking the name shown in the app, which is why your trade name belongs in sight of the code." },
    { p: "Export the finished code as SVG for a sign or banner (see [PNG vs SVG](/guides/png-vs-svg-qr-code)) and check the [size guide for printing](/guides/qr-code-size-for-printing) before it goes on a wall. Businesses with customers in India will find the same static approach on the [UPI QR code page](/upi-qr-code)." },
  ],
};
