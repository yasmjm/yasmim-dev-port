import React from 'react';
import { PERSONAL_INFO } from '../constants';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            Disponível para novos projetos
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
            Criando sistemas <br />
            <span className="text-gray-400 italic">inteligentes</span> e automações.
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            E aí, eu sou a {PERSONAL_INFO.name}. {PERSONAL_INFO.role} focada em entregar eficiência através da tecnologia.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <a href="#projects" className="px-8 py-3 bg-black text-white rounded-xl hover:shadow-lg transition-all">
              Ver Projetos
            </a>
<a 
  href={PERSONAL_INFO.linkedin} 
  target="_blank" 
  rel="noreferrer" 
  className="px-8 py-3 border border-gray-200 rounded-xl font-medium flex items-center gap-2
             transition-all duration-300 
             hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/5 hover:-translate-y-1 hover:shadow-md"
>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
  LinkedIn
</a>
          </div>
        </div>
        
        {/* Container da Foto com efeito de Hover (group) */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 group">
          {/* Fundo que rotaciona no hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-gray-100 rounded-3xl -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
          
          {/* Container da Imagem com Zoom no hover */}
          <div className="absolute inset-0 bg-white border border-gray-100 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
            <img 
              src="/1765415142930.jpg" 
              alt={PERSONAL_INFO.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};