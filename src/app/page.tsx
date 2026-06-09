"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { QuoteCard, type Align } from "@/components/QuoteCard";
import { PRESETS, RATIOS } from "@/lib/presets";

const SAMPLE = "The best way to predict the future is to invent it.";

export default function Home() {
  const [quote, setQuote] = useState(SAMPLE);
  const [author, setAuthor] = useState("Alan Kay");
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [ratioId, setRatioId] = useState(RATIOS[0].id);
  const [align, setAlign] = useState<Align>("left");
  const [fontScale, setFontScale] = useState(1);
  const [showQuoteMark, setShowQuoteMark] = useState(true);
  const [exporting, setExporting] = useState(false);

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const ratio = RATIOS.find((r) => r.id === ratioId) ?? RATIOS[0];

  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  // Fit the full-resolution card inside the preview stage.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => {
      const { width, height } = stage.getBoundingClientRect();
      const s = Math.min(width / ratio.width, height / ratio.height);
      setScale(s > 0 ? s : 0.3);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [ratio.width, ratio.height]);

  const handleExport = useCallback(async () => {
    const node = cardRef.current;
    if (!node) return;
    setExporting(true);
    try {
      // Make sure web fonts are painted before we snapshot.
      if (document.fonts?.ready) await document.fonts.ready;
      const dataUrl = await toPng(node, {
        width: ratio.width,
        height: ratio.height,
        pixelRatio: 1,
        cacheBust: true,
      });
      const link = document.createElement("a");
      const slug =
        quote
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 40) || "quote";
      link.download = `${slug}-${ratio.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
      alert("Sorry — export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  }, [quote, ratio.width, ratio.height, ratio.id]);

  return (
    <main className="flex flex-1 flex-col lg:flex-row">
      {/* Controls */}
      <section className="w-full border-b border-zinc-200 bg-white px-6 py-7 lg:h-screen lg:w-[420px] lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <header className="mb-7">
          <h1 className="text-xl font-bold tracking-tight">
            Quote<span className="text-sky-600">Card</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Type your text, pick a style, export a clean image.
          </p>
        </header>

        <Field label="Quote">
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={4}
            maxLength={300}
            placeholder="Type or paste your quote…"
            className="w-full resize-none rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
          <div className="mt-1 text-right text-xs text-zinc-400">
            {quote.length}/300
          </div>
        </Field>

        <Field label="Author">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={60}
            placeholder="Optional"
            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
        </Field>

        <Field label="Style">
          <div className="grid grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPresetId(p.id)}
                title={p.name}
                aria-pressed={p.id === presetId}
                className={`relative aspect-square rounded-lg ring-2 ring-offset-2 transition ${
                  p.id === presetId
                    ? "ring-sky-500"
                    : "ring-transparent hover:ring-zinc-300"
                }`}
                style={{
                  background: p.swatch,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <span className="sr-only">{p.name}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-zinc-500">{preset.name}</p>
        </Field>

        <Field label="Format">
          <div className="grid grid-cols-2 gap-2">
            {RATIOS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRatioId(r.id)}
                aria-pressed={r.id === ratioId}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  r.id === ratioId
                    ? "border-sky-500 bg-sky-50 text-sky-900"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                <span className="block font-medium">{r.name}</span>
                <span className="block text-xs text-zinc-400">{r.hint}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Alignment">
          <div className="flex gap-2">
            {(["left", "center"] as Align[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAlign(a)}
                aria-pressed={a === align}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm capitalize transition ${
                  a === align
                    ? "border-sky-500 bg-sky-50 text-sky-900"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </Field>

        <Field label={`Text size · ${Math.round(fontScale * 100)}%`}>
          <input
            type="range"
            min={0.6}
            max={1.6}
            step={0.05}
            value={fontScale}
            onChange={(e) => setFontScale(Number(e.target.value))}
            className="w-full accent-sky-600"
          />
        </Field>

        <label className="mb-7 flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={showQuoteMark}
            onChange={(e) => setShowQuoteMark(e.target.checked)}
            className="size-4 accent-sky-600"
          />
          Show quotation mark
        </label>

        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="w-full rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exporting
            ? "Exporting…"
            : `Export PNG · ${ratio.width}×${ratio.height}`}
        </button>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Renders in your browser — nothing is uploaded.
        </p>
      </section>

      {/* Preview */}
      <section className="flex flex-1 items-center justify-center bg-zinc-100 p-6 lg:h-screen">
        <div
          ref={stageRef}
          className="flex h-full max-h-[80vh] w-full max-w-full items-center justify-center"
        >
          <div
            style={{
              width: ratio.width * scale,
              height: ratio.height * scale,
              boxShadow: "0 24px 60px -15px rgba(0,0,0,0.35)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: ratio.width,
                height: ratio.height,
              }}
            >
              <QuoteCard
                ref={cardRef}
                preset={preset}
                ratio={ratio}
                quote={quote}
                author={author}
                align={align}
                fontScale={fontScale}
                showQuoteMark={showQuoteMark}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </label>
      {children}
    </div>
  );
}
