import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    // Usamos um fundo base para toda a página
    <div className="bg-gray-900">
      <Header />
      <main>
        <Hero />
        <Features />
        {/* Futuramente aqui entrará a seção de criação do currículo */}
        <CTA />
      </main>
    </div>
  );
}
