// Order = display order, most-used first. The first six are the everyday ones (phones show only
// these until "More types"): website, Wi-Fi sign, WhatsApp chat, business card, social profile,
// menu/PDF. Then plain text and the contact channels, the regional bank-transfer codes (Pix, UPI,
// EPC — daily use in their markets), and finally the occasional ones.
export const QR_TYPES = ["url", "wifi", "whatsapp", "vcard", "social", "file", "text", "email", "phone", "sms", "pix", "upi", "epc", "geo", "event", "payment", "crypto"] as const;
export type QrType = (typeof QR_TYPES)[number];

export const QR_TYPE_LABELS: Record<QrType, string> = {
  url: "URL / 링크",
  social: "SNS / 앱 링크",
  whatsapp: "WhatsApp",
  text: "텍스트",
  wifi: "Wi-Fi",
  vcard: "연락처",
  email: "이메일",
  sms: "문자(SMS)",
  phone: "전화번호",
  geo: "위치",
  event: "일정",
  payment: "결제 링크",
  crypto: "암호화폐",
  file: "PDF / 파일 링크",
  pix: "Pix (브라질)",
  upi: "UPI (인도)",
  epc: "EPC / GiroCode (유럽 SEPA)",
};

export const QR_TYPE_DESCRIPTIONS: Record<QrType, string> = {
  url: "스캔하면 웹사이트가 바로 열립니다.",
  social: "인스타그램·유튜브·카카오톡 오픈채팅 등 아이디만 넣으면 링크를 만들어 줍니다.",
  whatsapp: "스캔하면 번호와 메시지가 채워진 WhatsApp 대화가 열립니다.",
  text: "메모, 시리얼 번호 등 임의의 텍스트를 담습니다.",
  wifi: "스캔하면 Wi-Fi에 자동으로 연결됩니다.",
  vcard: "스캔하면 연락처가 주소록에 저장됩니다.",
  email: "받는 사람·제목·본문이 채워진 메일 작성 화면이 열립니다.",
  sms: "번호와 내용이 채워진 문자 작성 화면이 열립니다.",
  phone: "스캔하면 바로 전화를 걸 수 있습니다.",
  geo: "스캔하면 지도 앱에서 좌표를 보여줍니다.",
  event: "스캔하면 캘린더에 일정이 추가됩니다.",
  payment: "PayPal·Venmo·Cash App 등 결제 페이지를 엽니다. 금액을 미리 넣을 수도 있습니다.",
  crypto: "지갑 주소와 금액을 넣으면 스캔 시 지갑 앱에 그대로 채워집니다.",
  file: "Google Drive·Dropbox 등에 올려 둔 PDF/파일 주소를 QR로 만듭니다.",
  pix: "브라질 중앙은행 BR Code 규격의 정적 Pix QR입니다. Pix 키·수취인·금액을 담아 은행 앱이 바로 읽습니다.",
  upi: "인도 NPCI 규격의 upi://pay 링크입니다. UPI ID·이름·금액을 담아 PhonePe·Google Pay 등이 바로 읽습니다.",
  epc: "유럽 SEPA 송금용 EPC QR(GiroCode)입니다. IBAN·수취인·금액을 담아 독일·오스트리아 등 은행 앱이 바로 읽습니다.",
};

export type UrlPayload = { url: string };
export type SocialPayload = { platform: string; handle: string };
export type WhatsAppPayload = { phone: string; message: string };
export type PaymentPayload = { provider: string; handle: string; amount: string };
export type CryptoPayload = { coin: string; address: string; amount: string; label: string };
export type FilePayload = { url: string };
/** Static Pix "BR Code" (Banco Central do Brasil). `key` is the Pix key: CPF/CNPJ, e-mail, +55 phone or EVP UUID. */
export type PixPayload = { key: string; name: string; city: string; amount: string; description: string; txid: string };
/** NPCI UPI deep link. `vpa` is the UPI ID ("name@bank"). */
export type UpiPayload = { vpa: string; name: string; amount: string; note: string };
/** EPC QR / GiroCode (SEPA credit transfer). `remittance` is the payment reference shown to the payee. */
export type EpcPayload = { name: string; iban: string; bic: string; amount: string; remittance: string; info: string };
export type TextPayload = { text: string };
export type WifiPayload = {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
};
export type VCardPayload = {
  firstName: string;
  lastName: string;
  org: string;
  title: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
  note: string;
};
export type EmailPayload = { to: string; subject: string; body: string };
export type SmsPayload = { phone: string; message: string };
export type PhonePayload = { phone: string };
export type GeoPayload = { lat: string; lng: string };
export type EventPayload = {
  title: string;
  location: string;
  description: string;
  start: string; // datetime-local input value
  end: string;
  allDay: boolean;
};

export type QrPayloadMap = {
  url: UrlPayload;
  social: SocialPayload;
  whatsapp: WhatsAppPayload;
  text: TextPayload;
  wifi: WifiPayload;
  vcard: VCardPayload;
  email: EmailPayload;
  sms: SmsPayload;
  phone: PhonePayload;
  geo: GeoPayload;
  event: EventPayload;
  payment: PaymentPayload;
  crypto: CryptoPayload;
  file: FilePayload;
  pix: PixPayload;
  upi: UpiPayload;
  epc: EpcPayload;
};

export type QrPayload = QrPayloadMap[QrType];

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

/**
 * Decorative frame around the saved image: a coloured border plus a one-line label bar under the
 * code ("Scan me", …). Presets fill the label with the dictionary text of the UI language;
 * editing that text turns the preset into "custom".
 */
export const FRAME_PRESETS = ["none", "scan", "wifi", "menu", "review", "pay", "custom"] as const;
export type FramePreset = (typeof FRAME_PRESETS)[number];
/** Presets that come with a default label (every preset except "none" and "custom"). */
export type FrameTextPreset = Exclude<FramePreset, "none" | "custom">;

export type QrStyleOptions = {
  size: number;
  margin: number;
  darkColor: string;
  lightColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  logoDataUrl: string | null;
  frame: FramePreset;
  /** Label under the code; empty → border only. */
  frameText: string;
  /** Border and label-bar colour. Empty string = follow `darkColor`. */
  frameColor: string;
};

export const DEFAULT_STYLE: QrStyleOptions = {
  size: 512,
  margin: 4,
  darkColor: "#111111",
  lightColor: "#ffffff",
  errorCorrectionLevel: "M",
  logoDataUrl: null,
  frame: "none",
  frameText: "",
  frameColor: "",
};

export const DEFAULT_PAYLOADS: QrPayloadMap = {
  url: { url: "" },
  social: { platform: "instagram", handle: "" },
  whatsapp: { phone: "", message: "" },
  text: { text: "" },
  wifi: { ssid: "", password: "", encryption: "WPA", hidden: false },
  vcard: {
    firstName: "",
    lastName: "",
    org: "",
    title: "",
    phone: "",
    mobile: "",
    email: "",
    website: "",
    address: "",
    note: "",
  },
  email: { to: "", subject: "", body: "" },
  sms: { phone: "", message: "" },
  phone: { phone: "" },
  geo: { lat: "", lng: "" },
  event: { title: "", location: "", description: "", start: "", end: "", allDay: false },
  payment: { provider: "paypal", handle: "", amount: "" },
  crypto: { coin: "bitcoin", address: "", amount: "", label: "" },
  file: { url: "" },
  pix: { key: "", name: "", city: "", amount: "", description: "", txid: "" },
  upi: { vpa: "", name: "", amount: "", note: "" },
  epc: { name: "", iban: "", bic: "", amount: "", remittance: "", info: "" },
};

export type LogEvent = "generate" | "download_png" | "download_svg" | "copy" | "print" | "batch";
export const LOG_EVENTS: readonly LogEvent[] = ["generate", "download_png", "download_svg", "copy", "print", "batch"];
