"use client";

import React from "react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const templates = [
  { id: "moderno", name: "Moderno" },
  { id: "classico", name: "Clássico" },
  { id: "criativo", name: "Criativo" },
];

export const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">
        Escolha um Template
      </h3>
      <div className="flex space-x-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`w-full h-24 rounded-md flex items-center justify-center font-bold transition-all duration-200
              ${
                selectedTemplate === template.id
                  ? "ring-4 ring-cyan-400 bg-gray-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};
