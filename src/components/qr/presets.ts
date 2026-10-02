import type { Dict } from "@/lib/i18n";

/** Code colours — each is ≥ 7:1 against white. Names come from the dictionary (`style.colors`). */
export const CODE_COLORS = [
  { id: "black", value: "#111111" },
  { id: "charcoal", value: "#3f3f46" },
  { id: "navy", value: "#1e3a8a" },
  { id: "blue", value: "#1d4ed8" },
  { id: "green", value: "#166534" },
  { id: "teal", value: "#115e59" },
  { id: "burgundy", value: "#881337" },
  { id: "purple", value: "#5b21b6" },
] as const satisfies readonly { id: keyof Dict["style"]["colors"]; value: string }[];

export const BACKGROUNDS = [
  { id: "white", value: "#ffffff" },
  { id: "gray", value: "#f4f4f5" },
  { id: "ivory", value: "#fdf9ef" },
  { id: "transparent", value: "#ffffff00" },
] as const satisfies readonly { id: keyof Dict["style"]["backgrounds"]; value: string }[];

export const TRANSPARENT = "#ffffff00";

/** Output resolutions offered for saved PNGs. */
export const OUTPUT_SIZES = [256, 512, 1024] as const;
