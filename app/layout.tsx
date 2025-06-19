import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerador de Currículo com IA | Crie o seu em Minutos",
  description:
    "Crie um currículo profissional e otimizado com a ajuda da Inteligência Artificial. Apenas R$ 9,90.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body className={`${inter.className} bg-gray-900 antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
