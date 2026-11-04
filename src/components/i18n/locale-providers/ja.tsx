"use client";

import type { ReactNode } from "react";
import { ja } from "@/lib/i18n/ja";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="ja" t={ja}>{children}</DictProvider>;
}
