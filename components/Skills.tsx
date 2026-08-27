'use client';

import React, { useState } from 'react';
import { SKILLS } from '@/constants';
import { Skill, SkillCategory } from '@/types';

/** O site é em português; as categorias vinham cruas do tipo, em inglês. */
const CATEGORY_LABEL: Record<SkillCategory, string> = {
  Backend: 'Backend',
  Automation: 'Automação',
  AI: 'IA',
  Frontend: 'Frontend',
  Database: 'Banco de Dados',
  'Cloud/Infra': 'Cloud / Infra',
  DevOps: 'DevOps',
  Tools: 'Ferramentas',
};

const SkillItem: React.FC<{ skill: Skill; styles: string }> = ({ skill, styles }) => {
  const [isActive, setIsActive] = useState(false);
  const tooltipId = `exp-${skill.name.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div className="relative">
      {/*
        Era uma <span> com onMouseEnter: no celular e no teclado o tempo de
        experiência nunca aparecia. Vira botão para responder a toque e foco.
      */}
      <button
        type="button"
        aria-describedby={skill.experience ? tooltipId : undefined}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onClick={() => setIsActive((v) => !v)}
        className={`inline-block cursor-default rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
          isActive ? `-translate-y-1 shadow-md ${styles}` : 'border-gray-100'
        }`}
      >
        {skill.name}
      </button>

      {skill.experience && (
        <span
          id={tooltipId}
          role="tooltip"
          hidden={!isActive}
          className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-[10px] text-white shadow-lg"
        >
          {skill.experience}
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-800" />
        </span>
      )}
    </div>
  );
};

export const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));

  const getSkillStyles = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('node')) return 'border-green-500 text-green-600 bg-green-50';
    if (lowerName.includes('next') || lowerName.includes('react'))
      return 'border-black text-black bg-gray-100';
    if (
      lowerName.includes('puppeteer') ||
      lowerName.includes('rpa') ||
      lowerName.includes('scraping')
    )
      return 'border-blue-400 text-blue-500 bg-blue-50';
    if (lowerName.includes('aws') || lowerName.includes('amazon'))
      return 'border-orange-400 text-orange-500 bg-orange-50';
    if (lowerName.includes('supabase') || lowerName.includes('postgres'))
      return 'border-emerald-400 text-emerald-500 bg-emerald-50';
    if (lowerName.includes('php')) return 'border-indigo-400 text-indigo-500 bg-indigo-50';
    if (lowerName.includes('terraform')) return 'border-purple-400 text-purple-600 bg-purple-50';
    if (lowerName.includes('rabbit')) return 'border-orange-500 text-orange-600 bg-orange-50';
    if (lowerName.includes('azure')) return 'border-sky-400 text-sky-600 bg-sky-50';
    if (lowerName.includes('claude')) return 'border-amber-400 text-amber-600 bg-amber-50';
    if (lowerName.includes('vendure')) return 'border-rose-400 text-rose-600 bg-rose-50';
    if (lowerName.includes('python')) return 'border-yellow-400 text-yellow-600 bg-yellow-50';
    return 'border-blue-500 text-blue-600 bg-blue-50';
  };

  return (
    <section id="skills" className="border-y border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16">
          <h2 className="mb-4 text-3xl font-bold">Stack Tecnológica</h2>
          <p className="text-gray-600">
            Ferramentas e tecnologias que utilizo no dia a dia para criar automações e sistemas
            escaláveis.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-colors hover:bg-white hover:shadow-sm"
            >
              {/* Era text-gray-400 sobre branco: contraste abaixo do mínimo legível. */}
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-gray-500">
                {CATEGORY_LABEL[category]}
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.filter((s) => s.category === category).map((skill) => (
                  <SkillItem
                    key={`${category}-${skill.name}`}
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
