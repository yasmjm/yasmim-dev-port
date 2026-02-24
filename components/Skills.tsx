import React, { useState } from 'react';
import { SKILLS } from '../constants';
import { Skill } from '../types';

// Componente Interno para a Tag de Habilidade
const SkillItem: React.FC<{ skill: Skill; styles: string }> = ({ skill, styles }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className={`px-4 py-2 bg-white border border-gray-100 rounded-lg text-sm font-medium shadow-sm 
                   transition-all duration-300 cursor-default inline-block
                   ${isHovered ? '-translate-y-1 shadow-md ' + styles : ''}`}
      >
        {skill.name}
      </span>

      {/* Tooltip com o tempo de experiência */}
      {isHovered && skill.experience && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 animate-in fade-in zoom-in duration-200">
          {skill.experience}
          {/* Triângulo inferior do balão */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  const getSkillStyles = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('node')) return 'border-green-500 text-green-600 bg-green-50';
    if (lowerName.includes('next') || lowerName.includes('react')) return 'border-black text-black bg-gray-100';
    if (lowerName.includes('puppeteer') || lowerName.includes('automation') || lowerName.includes('scraping')) return 'border-blue-400 text-blue-500 bg-blue-50';
    if (lowerName.includes('aws')) return 'border-orange-400 text-orange-500 bg-orange-50';
    if (lowerName.includes('supabase') || lowerName.includes('sql')) return 'border-emerald-400 text-emerald-500 bg-emerald-50';
    if (lowerName.includes('php')) return 'border-indigo-400 text-indigo-500 bg-indigo-50';
    if (lowerName.includes('python')) return 'border-yellow-400 text-yellow-600 bg-yellow-50';
    return 'border-blue-500 text-blue-600 bg-blue-50';
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
              <div className="flex flex-wrap gap-3">
                {SKILLS.filter(s => s.category === category).map(skill => (
                  <SkillItem 
                    key={skill.name} 
                    skill={skill} 
                    styles={getSkillStyles(skill.name)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};