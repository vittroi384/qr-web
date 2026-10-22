import type { TypeGuide } from "../types";

export const guide: TypeGuide = {
  title: "Guide: UPI QR codes",
  blocks: [
    { h3: "UPI in two minutes" },
    { p: "The Unified Payments Interface is the real-time bank transfer network run by the National Payments Corporation of India (NPCI). It moves money straight between bank accounts at any hour, with no wallet balance to top up. Each user gets a virtual payment address, or VPA, written like `name@bank`; the part after the @ is the handle of the bank or app that issued it, so `rahul@oksbi` and `rahul@ybl` may belong to different people." },
    { p: "Most people have several VPAs because each app creates one; print the one linked to the account you check most often, since payments cannot be redirected later." },
    { h3: "What the deep link does when it is scanned" },
    { p: "A phone camera that reads `upi://pay` hands the link to an installed UPI app. PhonePe, Google Pay, Paytm, BHIM and the banks’ own apps all register for this scheme. The app resolves the VPA, fetches the verified account name from the bank, and asks the payer for the UPI PIN." },
    { p: "Static codes like this one are what a shopkeeper gets printed on a standee from their bank, minus the merchant-specific fields. Dynamic codes are generated per bill by a point-of-sale system and carry a reference id and often a signature. A static code cannot carry a per-transaction id, so matching payments to bills is done from the payer’s name and the time in your passbook." },
    { h3: "Typical places for a static code" },
    { ul: [
      "Kirana shops, chai stalls, fruit carts and auto-rickshaws, where the amount differs for every customer.",
      "Donation counters at temples, gurdwaras and NGO events, usually with no amount and a short note.",
      "Invoices and society maintenance notices with a fixed amount and the month in the note.",
    ] },
    { p: "Amounts are in rupees only; `cu=INR` is the sole currency UPI accepts. Without `am`, the payer types the amount and can type anything; with `am` set, most apps lock the field. Nothing comes back to this site or the code owner when a payment is made; your only confirmation is the app notification and your bank’s SMS, so the code cannot mark an order as paid the way a gateway does." },
    { h3: "Staying safe with a public VPA" },
    { p: "Scanning a code never requires you to enter your PIN to receive money, and no legitimate code produces a ‘collect request’ asking you to approve an incoming transfer. If an app shows a request to pay rather than a form to receive, decline it. A single wrong letter in your VPA sends every payment to a stranger or fails outright, so copy it from your app’s profile screen. Fraudsters also paste their own code over shop codes, so tell customers to compare the verified name in the app with your signboard." },
    { p: "Check the [size guide](/guides/qr-code-size-for-printing) for the scanning distance you expect, add your shop logo with the [logo tutorial](/guides/add-logo-to-qr-code), and if you also take orders by chat, put a [WhatsApp QR code](/whatsapp-qr-code) next to the payment one." },
  ],
};
