import React from 'react';
import { Brain, PiggyBank, Terminal, ArrowUpRight } from 'lucide-react';

const KNOWLEDGE_HUB = [
  {
    title: 'Filosofia e Lógica',
    type: 'Leituras & Estudos',
    icon: <Brain className="w-5 h-5 text-indigo-500" />,
    description: 'Estudo de lógica e ética aplicada para aprimorar a resolução de problemas complexos no desenvolvimento.',
    tags: ['Estoicismo', 'Lógica', 'Clássicos']
  },
  {
    title: 'Finanças e Estratégia',
    type: 'Análise de Mercado',
    icon: <PiggyBank className="w-5 h-5 text-emerald-500" />,
    description: 'Foco em eficiência técnica e ROI, garantindo que cada automação gere valor real para o produto.',
    tags: ['Investimentos', 'Eficiência', 'Gestão']
  },
  {
    title: 'Engenharia de Automação',
    type: 'Conteúdo Técnico',
    icon: <Terminal className="w-5 h-5 text-orange-500" />,
    description: 'Acompanhando tendências globais de Web Scraping, arquitetura Node.js e integração de IAs.',
    tags: ['Puppeteer', 'IA', 'Cloud Architecture']
  }
];

export const KnowledgeHub: React.FC = () => {
  return (
    <section id="knowledge" className="py-20 px-6 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Curadoria de Conhecimento</h2>
            <p className="text-gray-600 italic">
              "Você nasceu para saber mais". Uma amostra do que molda minha visão polímata e técnica no dia a dia.
            </p>
          </div>
          <a 
            href="https://medium.com/@mariayasmimsousaalmeida" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            Acompanhe minhas análises no Medium 
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KNOWLEDGE_HUB.map((item) => (
            <div 
              key={item.title}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.type}</span>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};