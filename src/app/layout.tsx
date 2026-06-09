import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  JetBrains_Mono,
  Fraunces,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteCard — Clean quote cards for social",
  description:
    "Type your text, pick a style, export a crisp image. A fast, free quote card maker for Instagram, X, and beyond.",
  openGraph: {
    title: "QuoteCard — Clean quote cards for social",
    description:
      "Type your text, pick a style, export a crisp image. Free quote card maker.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
