import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KnowledgeHub } from './components/Interests.'; // 1. Importe o novo componente
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* About Preview Section */}
        <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-32">
              <h2 className="text-3xl font-bold">Sobre Mim</h2>
            </div>
            
            <div className="md:col-span-8 space-y-8">
              <div className="space-y-4">
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  Estudante de Análise e Desenvolvimento de Sistemas, pela Universidade de Fortaleza, que acredita que a tecnologia atinge seu potencial máximo quando unida a múltiplas áreas do saber: "você nasceu para saber mais".
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Minha trajetória é guiada por um perfil polímata: uma curiosidade incansável que me leva a integrar a precisão da engenharia de software com a profundidade da filosofia e o foco em resultados. Sou especialista em navegar pela complexidade da web através de scrapers avançados e construir infraestruturas robustas utilizando AWS e Node.js.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-blue-600"></span>
                  O que me torna "fora da curva"
                </h3>
                
                <div className="grid gap-6">
                  <div className="group">
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Visão de Produto</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Não apenas desenvolvo; busco entender o produto de ponta a ponta para garantir que cada automação e projeto gere eficiência e retorno real.
                    </p>
                  </div>

                  <div className="group">
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Mentalidade Analítica e Digital</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Meu interesse por filosofia me permite abordar desafios técnicos com uma lógica rigorosa. Em paralelo, minha forte mentalidade digital e foco em dados me dão a clareza para priorizar o desenvolvimento de sistemas que realmente agregam valor e escalam no longo prazo.
                    </p>
                  </div>

                  <div className="group">
                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Adaptabilidade</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Transito entre a manutenção de sistemas legados em PHP e a construção do novo com stacks modernas como Next.js e Supabase.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 italic font-medium pt-4 border-t border-gray-100">
                Encaro cada linha de código como uma oportunidade de criar sistemas que sejam, ao mesmo tempo, invisíveis e altamente funcionais.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Inserindo a Curadoria logo após o Sobre Mim */}
        <KnowledgeHub />

        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;