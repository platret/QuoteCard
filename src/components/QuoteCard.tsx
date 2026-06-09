import { forwardRef } from "react";
import { FONT_STACKS, type Preset, type Ratio } from "@/lib/presets";

export type Align = "left" | "center";

type Props = {
  preset: Preset;
  ratio: Ratio;
  quote: string;
  author: string;
  align: Align;
  /** User multiplier on the auto-computed font size. */
  fontScale: number;
  showQuoteMark: boolean;
};

/**
 * Pick a quote font size (in card px) from the text length and card size so
 * short quotes fill the frame and long ones stay readable.
 */
function autoFontSize(quote: string, ratio: Ratio): number {
  const len = Math.max(quote.trim().length, 1);
  const area = ratio.width * ratio.height;
  // Scale base size with the card's diagonal so every ratio feels balanced.
  const base = Math.sqrt(area) * 0.14;
  const shrink = Math.min(1, 90 / len);
  return Math.max(ratio.width * 0.035, base * Math.pow(shrink, 0.42));
}

export const QuoteCard = forwardRef<HTMLDivElement, Props>(function QuoteCard(
  { preset, ratio, quote, author, align, fontScale, showQuoteMark },
  ref,
) {
  const pad = ratio.width * 0.1;
  const fontSize = autoFontSize(quote, ratio) * fontScale;
  const text = quote.trim() || "Type your quote on the left…";

  return (
    <div
      ref={ref}
      style={{
        width: ratio.width,
        height: ratio.height,
        background: preset.background,
        color: preset.text,
        fontFamily: FONT_STACKS[preset.font],
        padding: pad,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showQuoteMark && (
        <div
          style={{
            fontFamily: FONT_STACKS.serif,
            fontSize: fontSize * 2.6,
            lineHeight: 0.8,
            color: preset.accent,
            opacity: 0.9,
            marginBottom: fontSize * 0.1,
            userSelect: "none",
          }}
        >
          &ldquo;
        </div>
      )}

      <p
        style={{
          fontSize,
          lineHeight: 1.22,
          fontWeight: preset.font === "sans" ? 600 : 500,
          fontStyle: preset.italic ? "italic" : "normal",
          letterSpacing: preset.font === "mono" ? "-0.02em" : "-0.01em",
          margin: 0,
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
          textWrap: "balance",
        }}
      >
        {text}
      </p>

      {author.trim() && (
        <div
          style={{
            marginTop: fontSize * 0.7,
            display: "flex",
            alignItems: "center",
            gap: pad * 0.25,
            justifyContent: align === "center" ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <span
            style={{
              width: ratio.width * 0.05,
              height: 2,
              background: preset.accent,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: FONT_STACKS.sans,
              fontSize: Math.max(fontSize * 0.3, ratio.width * 0.02),
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: preset.muted,
            }}
          >
            {author.trim()}
          </span>
        </div>
      )}
    </div>
  );
});
