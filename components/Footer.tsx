
import React from 'react';
import { PERSONAL_INFO } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <span>Feito com</span>
          <span className="text-red-400">❤</span>
          <span>em React & Tailwind</span>
        </div>
      </div>
    </footer>
  );
};
