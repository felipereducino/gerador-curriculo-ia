import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center text-center bg-gray-900 overflow-hidden"
    >
      {/* Background com gradiente e efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Crie um Currículo Profissional com{" "}
          <span className="text-cyan-400">Inteligência Artificial</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Transforme suas informações em um currículo impressionante em minutos.
          Escolha um template, preencha seus dados e deixe nossa IA fazer o
          resto.
        </p>
        <div className="mt-10">
          <Button
            variant="default"
            color="primary"
            size="lg"
            className="font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-cyan-500/30 transition-transform duration-300 hover:scale-105"
          >
            <Link href="/criar">Criar meu Currículo por R$ 9,90</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
