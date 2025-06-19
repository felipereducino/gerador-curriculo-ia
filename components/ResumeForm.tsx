"use client";

import React, { useState } from "react";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateSummaryWithAI } from "@/lib/actions";

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const ResumeForm = ({ data, setData }: ResumeFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // --- FUNÇÕES GENÉRICAS PARA MANIPULAR O FORMULÁRIO ---

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, summary: e.target.value }));
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const result = await generateSummaryWithAI(data);
    setIsGenerating(false);

    if (result.summary) {
      setData((prev) => ({ ...prev, summary: result.summary }));
    } else if (result.error) {
      alert(`Erro: ${result.error}`);
    }
  };

  // --- LÓGICA PARA EXPERIÊNCIA PROFISSIONAL ---

  const handleAddExperience = () => {
    setData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: crypto.randomUUID(),
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const handleExperienceChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [name]: value } : exp
      ),
    }));
  };

  // --- LÓGICA PARA EDUCAÇÃO ---

  const handleAddEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: crypto.randomUUID(),
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleEducationChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      ),
    }));
  };

  // NOVA FUNÇÃO para lidar com as Habilidades
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
    setData((prev) => ({ ...prev, skills: skillsArray }));
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg space-y-8">
      {/* Informações Pessoais (sem alterações) */}
      <div className="space-y-4">
        {/* ... código existente ... */}
        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
          Informações Pessoais
        </h3>
        <Input
          name="name"
          label="Nome Completo"
          value={data.personalInfo.name}
          onChange={handlePersonalInfoChange}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={data.personalInfo.email}
          onChange={handlePersonalInfoChange}
        />
        <Input
          name="phone"
          label="Telefone"
          value={data.personalInfo.phone}
          onChange={handlePersonalInfoChange}
        />
        <Input
          name="linkedin"
          label="URL do LinkedIn"
          value={data.personalInfo.linkedin}
          onChange={handlePersonalInfoChange}
        />
      </div>

      {/* --- SEÇÃO DE EXPERIÊNCIA ATUALIZADA --- */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
          Experiência Profissional
        </h3>
        {data.experiences.map((exp, index) => (
          <div
            key={index}
            className="p-4 bg-gray-700/50 rounded-lg space-y-4 relative"
          >
            <Button
              onClick={() => handleRemoveExperience(exp.id)}
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 !p-2 h-auto"
            >
              Remover
            </Button>
            <Input
              name="title"
              label="Cargo"
              value={exp.title}
              onChange={(e) => handleExperienceChange(exp.id, e)}
            />
            <Input
              name="company"
              label="Empresa"
              value={exp.company}
              onChange={(e) => handleExperienceChange(exp.id, e)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="startDate"
                label="Data de Início"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(exp.id, e)}
              />
              <Input
                name="endDate"
                label="Data de Fim"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(exp.id, e)}
              />
            </div>
            <Textarea
              name="description"
              label="Descrição"
              value={exp.description}
              onChange={(e) => handleExperienceChange(exp.id, e)}
            />
          </div>
        ))}
        <Button
          onClick={handleAddExperience}
          variant="default"
          className="w-full"
        >
          Adicionar Experiência
        </Button>
      </div>

      {/* --- SEÇÃO DE EDUCAÇÃO ATUALIZADA --- */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
          Educação
        </h3>
        {data.education.map((edu, index) => (
          <div
            key={index}
            className="p-4 bg-gray-700/50 rounded-lg space-y-4 relative"
          >
            <Button
              onClick={() => handleRemoveEducation(edu.id)}
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 !p-2 h-auto"
            >
              Remover
            </Button>
            <Input
              name="institution"
              label="Instituição de Ensino"
              value={edu.institution}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
            <Input
              name="degree"
              label="Curso / Graduação"
              value={edu.degree}
              onChange={(e) => handleEducationChange(edu.id, e)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                name="startDate"
                label="Data de Início"
                value={edu.startDate}
                onChange={(e) => handleEducationChange(edu.id, e)}
              />
              <Input
                name="endDate"
                label="Data de Fim"
                value={edu.endDate}
                onChange={(e) => handleEducationChange(edu.id, e)}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={handleAddEducation}
          variant="default"
          className="w-full"
        >
          Adicionar Formação
        </Button>
      </div>

      {/* --- NOVA SEÇÃO DE HABILIDADES --- */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-2">
          Habilidades
        </h3>
        <Input
          name="skills"
          label="Liste suas habilidades (separadas por vírgula)"
          value={data.skills.join(", ")}
          onChange={handleSkillsChange}
          placeholder="Ex: React, Node.js, Liderança, Scrum"
        />
      </div>

      {/* Resumo Profissional (sem alterações) */}
      <div className="space-y-4">
        {/* ... código existente ... */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h3 className="text-xl font-semibold text-white">
            Resumo Profissional
          </h3>
          <Button
            variant="default"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isGenerating}
            className="flex items-center space-x-2"
          >
            {isGenerating ? "Gerando..." : "✨ Gerar com IA"}
          </Button>
        </div>
        <Textarea
          name="summary"
          label="Fale sobre você"
          value={data.summary}
          onChange={handleSummaryChange}
          placeholder="Preencha suas informações e clique em 'Gerar com IA', ou escreva seu próprio resumo aqui."
          rows={6}
        />
      </div>
    </div>
  );
};
