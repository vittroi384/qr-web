"use client";

import type { ReactNode } from "react";
import { ko } from "@/lib/i18n/ko";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="ko" t={ko}>{children}</DictProvider>;
}
