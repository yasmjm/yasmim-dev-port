
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, PERSONAL_INFO } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold tracking-tight">
          Bem-Vindo(a)<span className="text-blue-600">.</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href={`mailto:${PERSONAL_INFO.email}`}
            className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
          >
            Fale Comigo
          </a>
        </div>
      </div>
    </nav>
  );
};
