import React from "react";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-10 py-4 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          Currículo<span className="text-cyan-400">Pro</span>
        </h1>
        <nav>
          <a
            href="/criar"
            className="bg-white text-gray-900 font-semibold py-2 px-5 rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Começar Agora
          </a>
        </nav>
      </div>
    </header>
  );
};
