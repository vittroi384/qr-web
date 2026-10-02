export const QR_TYPES = ["url", "social", "text", "wifi", "vcard", "email", "sms", "phone", "geo", "event"] as const;
export type QrType = (typeof QR_TYPES)[number];

export const QR_TYPE_LABELS: Record<QrType, string> = {
  url: "URL / 링크",
  social: "SNS / 앱 링크",
  text: "텍스트",
  wifi: "Wi-Fi",
  vcard: "연락처",
  email: "이메일",
  sms: "문자(SMS)",
  phone: "전화번호",
  geo: "위치",
  event: "일정",
};

export const QR_TYPE_DESCRIPTIONS: Record<QrType, string> = {
  url: "스캔하면 웹사이트가 바로 열립니다.",
  social: "인스타그램·유튜브·카카오톡 오픈채팅 등 아이디만 넣으면 링크를 만들어 줍니다.",
  text: "메모, 시리얼 번호 등 임의의 텍스트를 담습니다.",
  wifi: "스캔하면 Wi-Fi에 자동으로 연결됩니다.",
  vcard: "스캔하면 연락처가 주소록에 저장됩니다.",
  email: "받는 사람·제목·본문이 채워진 메일 작성 화면이 열립니다.",
  sms: "번호와 내용이 채워진 문자 작성 화면이 열립니다.",
  phone: "스캔하면 바로 전화를 걸 수 있습니다.",
  geo: "스캔하면 지도 앱에서 좌표를 보여줍니다.",
  event: "스캔하면 캘린더에 일정이 추가됩니다.",
};

export type UrlPayload = { url: string };
export type SocialPayload = { platform: string; handle: string };
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
  text: TextPayload;
  wifi: WifiPayload;
  vcard: VCardPayload;
  email: EmailPayload;
  sms: SmsPayload;
  phone: PhonePayload;
  geo: GeoPayload;
  event: EventPayload;
};

export type QrPayload = QrPayloadMap[QrType];

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type QrStyleOptions = {
  size: number;
  margin: number;
  darkColor: string;
  lightColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  logoDataUrl: string | null;
};

export const DEFAULT_STYLE: QrStyleOptions = {
  size: 512,
  margin: 4,
  darkColor: "#111111",
  lightColor: "#ffffff",
  errorCorrectionLevel: "M",
  logoDataUrl: null,
};

export const DEFAULT_PAYLOADS: QrPayloadMap = {
  url: { url: "" },
  social: { platform: "instagram", handle: "" },
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
};

export type LogEvent = "generate" | "download_png" | "download_svg" | "copy" | "print" | "batch";
export const LOG_EVENTS: readonly LogEvent[] = ["generate", "download_png", "download_svg", "copy", "print", "batch"];
