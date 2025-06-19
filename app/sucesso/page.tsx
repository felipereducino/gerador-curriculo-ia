"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { ResumeData } from "@/lib/types";
import { getResumeDataFromSession } from "@/lib/actions";
import { ResumeTemplate } from "@/components/pdf/ResumeTemplate";

// Componente para estado de carregamento
const LoadingState = () => (
  <>
    <h1 className="text-4xl font-bold text-cyan-400 mb-4">
      Validando Pagamento...
    </h1>
    <p className="text-lg text-gray-300 mb-8">
      Estamos preparando seu currículo. Só um instante!
    </p>
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
  </>
);

// Componente para estado de erro
const ErrorState = ({ message }: { message: string }) => (
  <>
    <h1 className="text-4xl font-bold text-red-500 mb-4">Ocorreu um Erro</h1>
    <p className="text-lg text-gray-300 mb-8">{message}</p>
    <Link
      href="/criar"
      className="bg-cyan-500 text-white font-bold py-3 px-6 rounded-full hover:bg-cyan-600 transition-colors"
    >
      Tentar Novamente
    </Link>
  </>
);

export default function SucessoPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError("ID da sessão de pagamento não encontrado.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      const result = await getResumeDataFromSession(sessionId);
      if (result.error) {
        setError(result.error);
      } else if (result.resumeData && result.templateId) {
        setResumeData(result.resumeData);
        setTemplateId(result.templateId);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [sessionId]);

  // Renderiza o componente correto com base no estado
  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState message={error} />;
    }

    if (resumeData && templateId) {
      return (
        <>
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Tudo Pronto!
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Seu currículo profissional está pronto para ser baixado.
          </p>

          {/* O componente mágico do react-pdf */}
          <PDFDownloadLink
            document={<ResumeTemplate data={resumeData} />}
            fileName={`curriculo-${resumeData.personalInfo.name
              .split(" ")
              .join("-")}.pdf`}
            className="bg-green-500 text-white font-bold py-4 px-8 rounded-full hover:bg-green-600 transition-colors text-xl"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Gerando PDF..." : "Baixar meu Currículo"
            }
          </PDFDownloadLink>

          <Link href="/criar" className="mt-12 text-cyan-400 hover:underline">
            Criar um novo currículo
          </Link>
        </>
      );
    }

    return (
      <ErrorState message="Não foi possível carregar os dados do currículo." />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-4">
      {renderContent()}
    </div>
  );
}
