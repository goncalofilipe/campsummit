import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/event";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Camp Summit 2026 · O futuro começa aqui. Not there.",
  description:
    "A contra-cimeira da Acampada de Lisboa pelo direito à habitação. 11 de novembro de 2026, 19h00, Pavilhão de Portugal (debaixo do toldo). Entrada livre.",
  openGraph: {
    title: "Camp Summit 2026",
    description: "11 nov · 19h00 · Pavilhão de Portugal (debaixo do toldo). Bilhetes grátis.",
    images: ["/rollup.png"],
    locale: "pt_PT",
  },
};

export const viewport: Viewport = { themeColor: "#0C1439" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
