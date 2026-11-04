"use client";

import type { ReactNode } from "react";
import { zh } from "@/lib/i18n/zh";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="zh" t={zh}>{children}</DictProvider>;
}
