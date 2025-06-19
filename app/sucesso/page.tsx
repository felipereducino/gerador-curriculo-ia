import React from "react";
import { Suspense } from "react";
import { SuccessClient } from "./SuccessClient";

export default function SucessoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-4">
      <Suspense fallback={<p>Carregando...</p>}>
        <SuccessClient />
      </Suspense>
    </div>
  );
}
