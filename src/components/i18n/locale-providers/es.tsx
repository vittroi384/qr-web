"use client";

import type { ReactNode } from "react";
import { es } from "@/lib/i18n/es";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="es" t={es}>{children}</DictProvider>;
}
