import Link from "next/link";
import React from "react";

export default function CanceladoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Pagamento Cancelado
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Você cancelou o processo de pagamento. Seus dados não foram perdidos.
      </p>
      <Link
        href="/criar"
        className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-colors"
      >
        Voltar e tentar novamente
      </Link>
    </div>
  );
}
