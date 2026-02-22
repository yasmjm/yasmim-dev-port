
import React from 'react';
import { PERSONAL_INFO } from '../constants';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-black text-white overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
          Vamos construir algo <br />
          <span className="text-gray-500">incrível juntos.</span>
        </h2>
        
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          Estou sempre interessada em novos desafios e projetos inovadores. Sinta-se à vontade para entrar em contato!
        </p>

        <a 
          href={`mailto:${PERSONAL_INFO.email}`} 
          className="inline-block text-2xl md:text-3xl font-light hover:text-blue-400 transition-colors border-b border-gray-800 pb-2 mb-16"
        >
          {PERSONAL_INFO.email}
        </a>

        <div className="flex justify-center gap-8">
          <a href={PERSONAL_INFO.linkedin} className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
          <a href={PERSONAL_INFO.github} className="text-gray-400 hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </section>
  );
};
