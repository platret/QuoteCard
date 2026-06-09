export type FontKey = "serif" | "fraunces" | "sans" | "mono";

export const FONT_STACKS: Record<FontKey, string> = {
  serif: "var(--font-playfair), Georgia, serif",
  fraunces: "var(--font-fraunces), Georgia, serif",
  sans: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
};

export type Preset = {
  id: string;
  name: string;
  /** CSS background value applied to the card. */
  background: string;
  /** Quote text color. */
  text: string;
  /** Author / attribution color. */
  muted: string;
  /** Decorative accent (quote mark, rule). */
  accent: string;
  font: FontKey;
  /** Italic quote text. */
  italic?: boolean;
  /** Swatch preview gradient for the picker. */
  swatch: string;
};

export const PRESETS: Preset[] = [
  {
    id: "midnight",
    name: "Midnight",
    background: "linear-gradient(150deg, #0f172a 0%, #1e293b 100%)",
    text: "#f8fafc",
    muted: "#94a3b8",
    accent: "#38bdf8",
    font: "serif",
    swatch: "linear-gradient(150deg, #0f172a, #1e293b)",
  },
  {
    id: "paper",
    name: "Paper",
    background: "#f5f1e8",
    text: "#1c1917",
    muted: "#78716c",
    accent: "#b45309",
    font: "fraunces",
    italic: true,
    swatch: "#f5f1e8",
  },
  {
    id: "sunset",
    name: "Sunset",
    background: "linear-gradient(135deg, #fb7185 0%, #f59e0b 100%)",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.82)",
    accent: "#fff7ed",
    font: "fraunces",
    swatch: "linear-gradient(135deg, #fb7185, #f59e0b)",
  },
  {
    id: "mono",
    name: "Mono",
    background: "#ffffff",
    text: "#09090b",
    muted: "#71717a",
    accent: "#09090b",
    font: "mono",
    swatch: "#ffffff",
  },
  {
    id: "forest",
    name: "Forest",
    background: "linear-gradient(160deg, #064e3b 0%, #065f46 100%)",
    text: "#ecfdf5",
    muted: "#6ee7b7",
    accent: "#34d399",
    font: "serif",
    swatch: "linear-gradient(160deg, #064e3b, #065f46)",
  },
  {
    id: "mint",
    name: "Mint",
    background: "linear-gradient(135deg, #d1fae5 0%, #bfdbfe 100%)",
    text: "#0f172a",
    muted: "#475569",
    accent: "#0ea5e9",
    font: "sans",
    swatch: "linear-gradient(135deg, #d1fae5, #bfdbfe)",
  },
  {
    id: "noir",
    name: "Noir",
    background: "#09090b",
    text: "#fafafa",
    muted: "#a1a1aa",
    accent: "#fafafa",
    font: "fraunces",
    italic: true,
    swatch: "#09090b",
  },
  {
    id: "blush",
    name: "Blush",
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    text: "#831843",
    muted: "#be185d",
    accent: "#ec4899",
    font: "fraunces",
    italic: true,
    swatch: "linear-gradient(135deg, #fdf2f8, #fce7f3)",
  },
];

export type RatioKey = "square" | "portrait" | "story" | "landscape";

export type Ratio = {
  id: RatioKey;
  name: string;
  /** Export pixel dimensions. */
  width: number;
  height: number;
  hint: string;
};

export const RATIOS: Ratio[] = [
  { id: "square", name: "Square", width: 1080, height: 1080, hint: "Instagram post" },
  { id: "portrait", name: "Portrait", width: 1080, height: 1350, hint: "Instagram portrait" },
  { id: "story", name: "Story", width: 1080, height: 1920, hint: "Story / Reel" },
  { id: "landscape", name: "Landscape", width: 1600, height: 900, hint: "X / banner" },
];
