"use client";

import type { ReactNode } from "react";
import { fr } from "@/lib/i18n/fr";
import { DictProvider } from "../I18nContext";

export default function Provider({ children }: { children: ReactNode }) {
  return <DictProvider locale="fr" t={fr}>{children}</DictProvider>;
}
