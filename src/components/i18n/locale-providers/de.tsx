"use client";

import type { ReactNode } from "react";
import { de } from "@/lib/i18n/de";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="de" t={de}>{children}</DictProvider>;
}
