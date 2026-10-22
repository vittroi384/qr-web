import type { Block } from "./types";

export const TERMS_EFFECTIVE = "October 22, 2026";

/** /terms body. `{site}` is replaced with the site name at render time. */
export const TERMS: Block[] = [
  { h2: "1. What these terms cover" },
  {
    p: "These terms apply to your use of {site} (the “Service”), a website that turns text, links and other information into QR code images. By using the Service you agree to these terms. If you do not agree, please do not use it.",
  },
  { h2: "2. The Service" },
  {
    p: "The Service is free and does not require an account. QR codes are generated in your browser from what you enter. The codes are static: the content is stored in the image itself, nothing is hosted on our side and there is no link that can be edited or switched off later. The Service is supported by advertising.",
  },
  {
    p: "We may change, suspend or discontinue any part of the Service at any time without notice. Because the codes you have already saved contain their content directly, they keep working regardless of what happens to the Service.",
  },
  { h2: "3. Your content and your QR codes" },
  {
    p: "You keep all rights to the information you enter and to the QR code images you create with the Service. You may use them for any personal or commercial purpose without attribution. We claim no ownership of them.",
  },
  {
    p: "You are responsible for what you encode. That includes making sure you have the right to use any link, text, logo or other material, that the content is lawful where you publish it, and that it is accurate. We do not review the content of QR codes and cannot check where a link leads.",
  },
  { h2: "4. Acceptable use" },
  { p: "You agree not to use the Service to create QR codes that:" },
  {
    ul: [
      "lead to malware, phishing pages or other content intended to deceive or harm the person who scans them;",
      "distribute spam, or content that is illegal, defamatory or infringes someone else’s rights;",
      "impersonate another person or organisation, including by using their logo or name without permission.",
    ],
  },
  {
    p: "You also agree not to interfere with the Service, for example by sending automated requests at a volume that degrades it for others, or by trying to access parts of the site that are not public.",
  },
  { h2: "5. No warranty" },
  {
    p: "The Service is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement. We do not guarantee that the Service will be uninterrupted or error-free, or that every QR code will scan on every device and in every print. Test a code before you print it in quantity.",
  },
  { h2: "6. Limitation of liability" },
  {
    p: "To the fullest extent permitted by law, we are not liable for any indirect, incidental, special or consequential damages, or for any loss of profit, data or business, arising from your use of or inability to use the Service, including misprinted or non-scanning codes and the content of pages a code links to. Where liability cannot be excluded, it is limited to the amount you paid us for the Service, which is nothing.",
  },
  { h2: "7. Third-party services and links" },
  {
    p: "The Service shows advertising served by third parties and may link to other websites. We do not control those services or sites and are not responsible for their content or practices. Payment, messaging and map apps that open when a QR code is scanned are provided by their respective operators under their own terms.",
  },
  { h2: "8. Privacy" },
  { p: "How we handle the information you enter and basic connection details is described in the [Privacy Policy](/privacy), which forms part of these terms." },
  { h2: "9. Changes to these terms" },
  {
    p: "We may update these terms from time to time. The effective date at the top shows the current version. Continuing to use the Service after a change means you accept the updated terms.",
  },
  { h2: "10. Contact" },
  { p: "Questions about these terms can be sent through the [contact page](/contact)." },
];
