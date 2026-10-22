import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: Bitcoin and crypto wallet QR codes",
  blocks: [
    { h3: "Payment URIs and where they came from" },
    { p: "Bitcoin wallets share a text form for payment requests, BIP-21: the scheme `bitcoin:`, then the address, then optional query parameters such as `amount` in whole coins, `label` for the recipient and `message` for a note. Litecoin, Dogecoin and Bitcoin Cash copied the convention with their own scheme names, and Solana wallets accept a similar `solana:` link. A wallet that cannot parse the parameters will usually still extract the address." },
    { p: "Ethereum is the outlier. Its addresses start with `0x` and are shared between ether and every ERC-20 token, so a code that contains only the address is deliberately neutral. The person paying picks the token and the network (mainnet or a layer 2) in their wallet, and you should state both next to the code, because tokens sent on the wrong network are often unrecoverable." },
    { h3: "Address formats and wallet support" },
    { p: "Bitcoin has four address styles in circulation: legacy addresses starting with 1, pay-to-script-hash addresses starting with 3, native SegWit (bech32) addresses starting with `bc1q`, and Taproot addresses starting with `bc1p`. All are valid, but older wallets and some exchanges still reject `bc1p` and occasionally `bc1q`. A `bc1q` address is the safest middle ground today; if payments will come from exchange withdrawals, confirm the exchange supports your format before printing." },
    { h3: "Amounts, reuse and privacy" },
    { p: "Including an `amount` spares the payer a long fraction and the decimal slip that turns 0.001 into 0.01. The drawback is that coin prices move hourly, so an amount worth 20 euros at print time may be double or half that a month later. A good compromise is to fix the amount on screens you control and leave it out on paper." },
    { p: "Every payment to a printed address is permanently visible on the public ledger, linked to every other payment to the same address, so anyone can total your donations. Wallets built on HD seeds can give each code a fresh address, and a separate wallet account for a long-lived tip jar keeps that history away from your main funds." },
    { h3: "Checks before anyone scans" },
    { ul: [
      "Scan the finished code with your own wallet and read the address it shows against your receiving screen, character by character.",
      "There is no chargeback: a transfer to a mistyped or malicious address is final.",
      "Clipboard malware on desktops swaps copied addresses for the attacker’s; verify the first and last six characters after pasting.",
      "Never encode a private key, extended public key or seed phrase; a receiving address is the only thing that belongs in a public code.",
    ] },
    { p: "Static wallet codes suit donation links in a README or stream overlay, invoices paid in coins, and tip jars at meetups. Print them with the [logo option](/guides/add-logo-to-qr-code) if you want the coin symbol in the middle, keep the modules large enough per the [size guide](/guides/qr-code-size-for-printing), and pair the code with a [vCard](/vcard-qr-code) so payers can also reach you off-chain." },
  ],
};
