import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTA = () => {
  return (
    <section id="criar" className="bg-gray-900">
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Pronto para conquistar sua próxima vaga?
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          Não perca mais tempo. Tenha um currículo de destaque hoje mesmo por um
          preço simbólico.
        </p>
        <div className="mt-8">
          <Button
            variant="default"
            color="primary"
            size="lg"
            className="font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-cyan-500/30 transition-transform duration-300 hover:scale-105"
          >
            <Link href="/criar">Garantir meu Currículo por R$ 9,90</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
