"use client";

import type { ReactNode } from "react";
import { hi } from "@/lib/i18n/hi";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="hi" t={hi}>{children}</DictProvider>;
}
