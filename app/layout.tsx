import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { siteUrl } from "@/lib/site";

const manrope = localFont({
  src: [
    { path: "../node_modules/@fontsource/manrope/files/manrope-cyrillic-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2", weight: "400" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-cyrillic-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2", weight: "500" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-cyrillic-700-normal.woff2", weight: "700" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-latin-700-normal.woff2", weight: "700" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-cyrillic-800-normal.woff2", weight: "800" },
    { path: "../node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl).origin,
  title: "PULSE — Clean energy for curious minds",
  description:
    "Sparkling functional energy drink with clean caffeine, L-theanine and zero sugar. Three flavours. No sugar crash. Built for focus.",
  keywords: [
    "functional drink",
    "clean energy",
    "zero sugar energy drink",
    "L-theanine",
    "sparkling water caffeine",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "PULSE",
    title: "PULSE — Clean energy for curious minds",
    description:
      "Sparkling functional energy drink with clean caffeine, L-theanine and zero sugar. Three flavours. No sugar crash. Built for focus.",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "PULSE clean energy drink cans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PULSE — Clean energy for curious minds",
    description:
      "Sparkling functional energy drink with clean caffeine, L-theanine and zero sugar. Three flavours. No sugar crash. Built for focus.",
    images: [`${siteUrl}/opengraph-image.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
