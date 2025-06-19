"use client";

import { ResumeData } from "@/lib/types";
import React from "react";

interface ResumePreviewProps {
  data: ResumeData;
  templateId: string;
}

const templateStyles: {
  [key: string]: { header: string; name: string; sectionTitle: string };
} = {
  moderno: {
    header: "bg-gray-700 text-white",
    name: "text-cyan-400 text-3xl",
    sectionTitle: "border-b-2 border-cyan-400 text-white",
  },
  classico: {
    header: "bg-gray-200 text-gray-800",
    name: "text-blue-800 text-4xl text-center",
    sectionTitle: "border-b-2 border-gray-400 text-gray-800",
  },
  criativo: {
    header: "bg-purple-800 text-white",
    name: "text-yellow-300 text-3xl font-serif",
    sectionTitle: "border-l-4 border-yellow-300 pl-2 text-white",
  },
};

export const ResumePreview = ({ data, templateId }: ResumePreviewProps) => {
  const styles = templateStyles[templateId] || templateStyles.moderno;

  return (
    <div className="p-6 bg-white rounded-lg shadow-2xl h-full sticky top-24">
      <div className={`p-8 ${styles.header} rounded-t-lg`}>
        <h2 className={`font-bold ${styles.name}`}>
          {data.personalInfo.name || "Seu Nome Aqui"}
        </h2>
        <div className="flex justify-center flex-wrap gap-x-4 mt-2 text-sm">
          <span>{data.personalInfo.email || "seu.email@exemplo.com"}</span>
          <span>{data.personalInfo.phone || "(XX) XXXXX-XXXX"}</span>
          {data.personalInfo.linkedin && (
            <span>{data.personalInfo.linkedin}</span>
          )}
        </div>
      </div>

      <div className="p-8 bg-gray-50 space-y-6 text-gray-700">
        {data.summary && (
          <div>
            <h3 className={`text-xl font-bold mb-2 ${styles.sectionTitle}`}>
              Resumo
            </h3>
            <p className="text-gray-600 whitespace-pre-wrap">{data.summary}</p>
          </div>
        )}

        {data.experiences.length > 0 && (
          <div>
            <h3 className={`text-xl font-bold mb-2 ${styles.sectionTitle}`}>
              Experiência
            </h3>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <h4 className="font-bold">{exp.title || "Cargo"}</h4>
                  <p className="italic text-sm">
                    {exp.company || "Empresa"} | {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="mt-1 text-gray-600 whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h3 className={`text-xl font-bold mb-2 ${styles.sectionTitle}`}>
              Educação
            </h3>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold">{edu.degree || "Curso"}</h4>
                  <p className="italic text-sm">
                    {edu.institution || "Instituição"} | {edu.startDate} -{" "}
                    {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- NOVA SEÇÃO DE HABILIDADES NA PRÉ-VISUALIZAÇÃO --- */}
        {data.skills.length > 0 && data.skills[0] !== "" && (
          <div>
            <h3 className={`text-xl font-bold mb-2 ${styles.sectionTitle}`}>
              Habilidades
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
