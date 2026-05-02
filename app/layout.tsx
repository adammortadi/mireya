export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/storefront/SiteChrome";
import { getCatalogCategories } from "@/lib/db/catalog";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mireya | Handmade with love in Morocco",
  description: "Cute pouches & bags, crafted with love in Morocco.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCatalogCategories();

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteChrome categories={categories}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
