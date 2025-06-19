import React from "react";

// Ícones SVG para cada feature (exemplo)
const TemplateIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-cyan-400"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);
const AIIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-cyan-400"
  >
    <path d="M12 8V4H8"></path>
    <rect x="4" y="12" width="16" height="8" rx="2"></rect>
    <path d="M4 12v-2a2 2 0 0 1 2-2h4"></path>
    <path d="m14 14 2 2 4-4"></path>
  </svg>
);
const PDFIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-cyan-400"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const features = [
  {
    icon: <TemplateIcon />,
    title: "Templates Modernos",
    description:
      "Escolha entre diversos modelos de currículos criados por designers profissionais.",
  },
  {
    icon: <AIIcon />,
    title: "Otimização com IA",
    description:
      "Nossa IA sugere melhorias e palavras-chave para destacar suas habilidades.",
  },
  {
    icon: <PDFIcon />,
    title: "Download Imediato em PDF",
    description:
      "Após o pagamento, baixe seu currículo em alta resolução, pronto para enviar.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tudo que você precisa para se destacar
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Simplificamos o processo para que você foque no que realmente
            importa: sua carreira.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 bg-gray-900/50 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500/10">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
