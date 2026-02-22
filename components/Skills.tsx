import React from 'react';
import { SKILLS } from '../constants';

export const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  // Mapeamento de cores para manter a identidade visual das tecnologias
  const getSkillStyles = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('node')) return 'hover:border-green-500 hover:text-green-600 hover:bg-green-50';
    if (lowerName.includes('next') || lowerName.includes('react')) return 'hover:border-black hover:text-black hover:bg-gray-100';
    if (lowerName.includes('puppeteer') || lowerName.includes('automation')) return 'hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50';
    if (lowerName.includes('aws')) return 'hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50';
    if (lowerName.includes('supabase') || lowerName.includes('sql')) return 'hover:border-emerald-400 hover:text-emerald-500 hover:bg-emerald-50';
    if (lowerName.includes('php')) return 'hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50';
    if (lowerName.includes('python')) return 'hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50';
    return 'hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50';
  };

  return (
    <section id="skills" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Stack Tecnológica</h2>
          <p className="text-gray-600">Ferramentas e tecnologias que utilizo no dia a dia para criar automações e sistemas escaláveis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 transition-colors hover:bg-white hover:shadow-sm">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.filter(s => s.category === category).map(skill => (
                  <span 
                    key={skill.name}
                    className={`px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm font-medium shadow-sm 
                               transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-md
                               ${getSkillStyles(skill.name)}`}
                  >
                    {skill.name}
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