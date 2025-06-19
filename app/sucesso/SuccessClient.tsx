"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeTemplate } from "@/components/pdf/ResumeTemplate";
import { getResumeDataFromSession } from "@/lib/actions";
import { ResumeData } from "@/lib/types";

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

export function SuccessClient() {
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

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!resumeData || !templateId)
    return (
      <ErrorState message="Não foi possível carregar os dados do currículo." />
    );

  return (
    <>
      <h1 className="text-4xl font-bold text-green-400 mb-4">Tudo Pronto!</h1>
      <p className="text-lg text-gray-300 mb-8">
        Seu currículo profissional está pronto para ser baixado.
      </p>

      <PDFDownloadLink
        document={<ResumeTemplate data={resumeData} />}
        fileName={`curriculo-${resumeData.personalInfo.name
          .split(" ")
          .join("-")}.pdf`}
        className="bg-green-500 text-white font-bold py-4 px-8 rounded-full hover:bg-green-600 transition-colors text-xl"
      >
        {({ loading }) => (loading ? "Gerando PDF..." : "Baixar meu Currículo")}
      </PDFDownloadLink>

      <Link href="/criar" className="mt-12 text-cyan-400 hover:underline">
        Criar um novo currículo
      </Link>
    </>
  );
}
