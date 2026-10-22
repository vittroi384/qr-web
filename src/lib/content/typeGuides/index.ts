import type { QrType } from "@/lib/qr/types";
import type { TypeGuide } from "../types";
import { guide as url } from "./url";
import { guide as wifi } from "./wifi";
import { guide as whatsapp } from "./whatsapp";
import { guide as vcard } from "./vcard";
import { guide as social } from "./social";
import { guide as file } from "./file";
import { guide as text } from "./text";
import { guide as email } from "./email";
import { guide as phone } from "./phone";
import { guide as sms } from "./sms";
import { guide as pix } from "./pix";
import { guide as upi } from "./upi";
import { guide as epc } from "./epc";
import { guide as geo } from "./geo";
import { guide as event } from "./event";
import { guide as payment } from "./payment";
import { guide as crypto } from "./crypto";

/** English guide per QR type, shown collapsed under the FAQ on the type's landing page. */
export const TYPE_GUIDES: Record<QrType, TypeGuide> = { url, wifi, whatsapp, vcard, social, file, text, email, phone, sms, pix, upi, epc, geo, event, payment, crypto };
