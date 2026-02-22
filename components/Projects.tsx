
import React from 'react';
import { PROJECTS } from '../constants';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-4">Projetos Selecionados</h2>
            <p className="text-gray-600 max-w-md">Uma amostra dos meus trabalhos recentes.</p>
          </div>
          <a href="https://github.com/yasmjm" target="_blank" rel="noreferrer" className="text-sm font-semibold flex items-center gap-2 hover:text-blue-600 transition-colors">
            Ver tudo no GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="group p-8 bg-white border border-gray-100 rounded-3xl hover:shadow-xl transition-all duration-300">
              <div className="h-12 w-12 bg-gray-50 rounded-2xl mb-6 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:bg-blue-50 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-2 py-1 bg-gray-50 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href={project.link} 
                className="inline-flex items-center text-sm font-bold border-b-2 border-transparent hover:border-black pb-1 transition-all"
              >
                Detalhes do Projeto
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
