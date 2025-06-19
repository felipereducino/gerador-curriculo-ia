import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto py-6 px-4 text-center text-gray-400">
        <p>&copy; {currentYear} CurrículoPro. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
