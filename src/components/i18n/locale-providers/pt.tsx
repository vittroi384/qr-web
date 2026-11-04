"use client";

import type { ReactNode } from "react";
import { pt } from "@/lib/i18n/pt";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="pt" t={pt}>{children}</DictProvider>;
}
