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

/** Frame colours — a varied, saturated set (captions are white on these). Names: `style.frameColors`. */
export const FRAME_COLORS = [
  { id: "black", value: "#111111" },
  { id: "red", value: "#dc2626" },
  { id: "orange", value: "#ea580c" },
  { id: "amber", value: "#d97706" },
  { id: "green", value: "#16a34a" },
  { id: "teal", value: "#0d9488" },
  { id: "sky", value: "#0284c7" },
  { id: "blue", value: "#2563eb" },
  { id: "indigo", value: "#4f46e5" },
  { id: "violet", value: "#7c3aed" },
  { id: "pink", value: "#db2777" },
  { id: "brown", value: "#92400e" },
] as const satisfies readonly { id: keyof Dict["style"]["frameColors"]; value: string }[];

export const BACKGROUNDS = [
  { id: "white", value: "#ffffff" },
  { id: "gray", value: "#f4f4f5" },
  { id: "ivory", value: "#fdf9ef" },
  { id: "transparent", value: "#ffffff00" },
] as const satisfies readonly { id: keyof Dict["style"]["backgrounds"]; value: string }[];

export const TRANSPARENT = "#ffffff00";

/** Output resolutions offered for saved PNGs. */
export const OUTPUT_SIZES = [256, 512, 1024, 2048] as const;
