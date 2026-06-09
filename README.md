# QuoteCard

**Type your text, pick a style, export a clean image.** A fast, free quote card maker for Instagram, X, and anywhere else you share words.

No accounts, no uploads — everything renders in your browser and the PNG is generated client-side.

**Live:** [quotecard-lovat.vercel.app](https://quotecard-lovat.vercel.app)

## Features

- ✍️ **Live editor** — quote + author, with a real-time preview.
- 🎨 **8 styles** — Midnight, Paper, Sunset, Mono, Forest, Mint, Noir, Blush.
- 📐 **4 formats** — Square (1080×1080), Portrait (1080×1350), Story (1080×1920), Landscape (1600×900).
- 🔠 **Typography control** — left/center alignment, adjustable text size, optional quotation mark.
- 🖼️ **Crisp PNG export** — full-resolution download, named from your quote.
- 🔒 **Private** — nothing leaves your device.

## Tech

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- [`html-to-image`](https://github.com/bubkoo/html-to-image) for client-side PNG export
- Google Fonts: Inter, Playfair Display, Fraunces, JetBrains Mono

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## How export works

The card is rendered at its true output resolution (e.g. 1080×1080) and visually scaled down for the preview with a CSS transform. On export, `html-to-image` snapshots the unscaled node after web fonts have loaded, so the downloaded PNG is pixel-perfect regardless of your screen size.

## Project structure

```
src/
  app/
    layout.tsx      # fonts + metadata
    page.tsx        # editor UI, state, and export
    globals.css     # theme tokens
  components/
    QuoteCard.tsx   # the card, rendered at full export resolution
  lib/
    presets.ts      # style presets + export formats
```

## Adding a style

Add an entry to `PRESETS` in [`src/lib/presets.ts`](src/lib/presets.ts):

```ts
{
  id: "ocean",
  name: "Ocean",
  background: "linear-gradient(150deg, #0c4a6e, #0369a1)",
  text: "#f0f9ff",
  muted: "#7dd3fc",
  accent: "#38bdf8",
  font: "serif",
  swatch: "linear-gradient(150deg, #0c4a6e, #0369a1)",
}
```

## Deploy

Deploys to [Vercel](https://vercel.com) with zero config — it's a standard Next.js app.

```bash
npx vercel        # preview
npx vercel --prod # production
```

## License

MIT
