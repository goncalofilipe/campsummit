import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/event";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Camp Summit 2026 · O futuro começa aqui. Not there.",
  description:
    "A contra-cimeira da Acampada de Lisboa pelo direito à habitação. 12 de novembro de 2026. Concentração na Alameda dos Oceanos, em frente ao Centro Comercial Vasco da Gama, das 17h30 às 19h. Iniciativa pública de conversa na Praça do Oriente, das 19h às 00h30. Entrada livre.",
  openGraph: {
    title: "Camp Summit 2026",
    description:
      "12 nov · Concentração na Alameda dos Oceanos, 17h30 às 19h · Conversa pública na Praça do Oriente, 19h às 00h30. Bilhetes grátis.",
    images: ["/cartaz.png"],
    locale: "pt_PT",
  },
};

export const viewport: Viewport = { themeColor: "#0C1439" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
