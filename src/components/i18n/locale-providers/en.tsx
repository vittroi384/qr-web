"use client";

import type { ReactNode } from "react";
import { en } from "@/lib/i18n/en";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="en" t={en}>{children}</DictProvider>;
}
