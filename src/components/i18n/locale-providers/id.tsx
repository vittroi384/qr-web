"use client";

import type { ReactNode } from "react";
import { id } from "@/lib/i18n/id";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="id" t={id}>{children}</DictProvider>;
}
