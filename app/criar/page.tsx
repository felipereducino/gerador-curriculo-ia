"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ResumeData } from "@/lib/types";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { TemplateSelector } from "@/components/TemplateSelector";
import { createCheckoutSession } from "@/lib/actions";

const initialData: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", linkedin: "" },
  summary: "",
  experiences: [],
  education: [],
  skills: [],
};

export default function CriarPage() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [template, setTemplate] = useState("moderno");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePayment = async () => {
    setIsRedirecting(true);
    const result = await createCheckoutSession(data, template);

    if (result.url) {
      window.location.href = result.url;
    } else if (result.error) {
      alert(`Erro: ${result.error}`);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      {/* 2. NOVO HEADER DA PÁGINA */}
      <header className="container mx-auto mb-12">
        <nav>
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-white">
              Currículo<span className="text-cyan-400">Pro</span>
            </h1>
          </Link>
        </nav>
      </header>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <TemplateSelector
            selectedTemplate={template}
            onSelectTemplate={setTemplate}
          />
          <ResumeForm data={data} setData={setData} />
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-8">
            <ResumePreview data={data} templateId={template} />
            <div className="mt-6">
              <Button
                color="primary"
                size="lg"
                className="w-full font-bold"
                onClick={handlePayment}
                disabled={isRedirecting}
              >
                {isRedirecting
                  ? "Redirecionando..."
                  : "Ir para o Pagamento e Download"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
