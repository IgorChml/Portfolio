/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Code, ArrowDownCircle, Mail, Globe, Sparkles, BookOpen } from 'lucide-react';

import Header from './components/Header';
import About from './components/About';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ContactForm from './components/ContactForm';
import CustomInstructions from './components/CustomInstructions';

import { PROJECTS_DATA } from './data';
import { Project } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ecommerce' | 'services' | 'portfolio'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Filter project database matching categories
  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#fafafa] text-neutral-800 min-h-screen selection:bg-neutral-900 selection:text-white antialiased overflow-x-hidden">
      
      {/* Dynamic Header */}
      <Header onGuideToggle={() => setIsGuideOpen(!isGuideOpen)} isGuideOpen={isGuideOpen} />

      {/* Hero Section */}
      <section 
        id="hero"
        className="min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden bg-white"
      >
        {/* Crisp grid pattern decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
        
        {/* Absolute minimal geometric lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neutral-100 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10 w-full flex flex-col items-center">
          
          {/* Top micro badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded font-mono text-xs text-neutral-600 cursor-pointer hover:bg-neutral-100 transition-colors"
            onClick={() => setIsGuideOpen(true)}
          >
            <Sparkles size={11} className="text-neutral-500 animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Nowość: Prezentacje wideo HD</span>
          </motion.div>

          {/* Master headlines */}
          <div className="space-y-4 max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-none"
            >
              Moje Portfolio Stron Internetowych{' '}<br />
              <span className="font-medium text-neutral-500 text-3xl sm:text-4xl md:text-5xl block mt-4">
                Prezentowane w formie klipów wideo
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-500 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Projektuję nowoczesne, zoptymalizowane pod kątem konwersji i pozycjonowania strony internetowe dla małych oraz średnich firm. Zobacz, jak wyglądają i działają moje realizacje w akcji na żywo.
            </motion.p>
          </div>

          {/* Call To Actions Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-neutral-900 hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 cursor-pointer shadow-sm shadow-neutral-200"
            >
              <Play size={12} fill="currentColor" className="ml-0.5" />
              <span>Obejrzyj realizacje wideo</span>
            </button>
            
            <button
              onClick={() => setIsGuideOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-white border border-neutral-250 hover:bg-neutral-50 text-neutral-800 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 cursor-pointer"
            >
              <Code size={12} className="text-neutral-500" />
              <span>Instrukcja dodawania</span>
            </button>
          </motion.div>

          {/* Bottom mouse-scroll cue indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-16 hidden sm:block"
          >
            <button 
              onClick={handleScrollToProjects}
              className="flex flex-col items-center space-y-2 text-neutral-400 hover:text-black transition-colors cursor-pointer group"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors">Przewiń na dół</span>
              <ArrowDownCircle size={18} className="animate-bounce text-neutral-300 group-hover:text-black transition-colors" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* About Section ("O mnie") */}
      <About />

      {/* Projects Section ("Projekty") */}
      <section id="projects" className="py-24 bg-[#fafafa] border-t border-b border-neutral-200/80 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Header row containing title and filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#999]">GALERIA KLIPÓW WIDEO</span>
              <h2 className="text-2xl md:text-3xl font-sans font-extrabold text-neutral-900 tracking-tight">
                Zrealizowane Witryny & Sklepy Internetowe
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-sans leading-relaxed">
                Najeźdź kursorem myszy na dowolną kartę projektu poniżej, aby <strong>odtworzyć mini-wideo prezentacyjne w pętli</strong>. Kliknij kartę, aby otworzyć odtwarzacz w trybie kinowym ze specyfikacją techniczną.
              </p>
            </div>

            {/* Category Filter Elements */}
            <div className="flex flex-wrap gap-2 pt-2 lg:pt-0" id="project-filters">
              {[
                { id: 'all', label: 'Wszystkie' },
                { id: 'ecommerce', label: 'Sklepy E-commerce' },
                { id: 'services', label: 'Strony Usługowe' },
                { id: 'portfolio', label: 'Portfolio i LP' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as any)}
                  className={`px-4 py-2 rounded text-xs font-sans font-bold border transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="projects-grid">
            {filteredProjects.map(proj => (
              <ProjectCard 
                key={proj.id} 
                project={proj} 
                onSelect={(p) => setActiveProject(p)} 
              />
            ))}
          </div>

          {/* Empty fallback state for lists */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-neutral-200 text-neutral-400 text-sm font-sans">
              Brak projektów w wybranej kategorii. Wybierz inną kategorię lub zresetuj filtr.
            </div>
          )}
        </div>
      </section>

      {/* Contact Section ("Kontakt") */}
      <ContactForm />

      {/* Footer copyright space */}
      <footer className="bg-white border-t border-neutral-200 py-12 relative z-10 text-[11px] font-mono text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-neutral-900 text-white font-mono font-bold w-6 h-6 rounded flex items-center justify-center text-xs">
              IC
            </div>
            <span>Igor Chmiel — Portfolio Stron Internetowych w Wideo</span>
          </div>

          {/* Quick legal/nav links */}
          <div className="flex flex-wrap gap-6 text-neutral-500">
            <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-semibold">igorchmiel.pl</a>
            <a href="mailto:businesschmiel@gmail.com" className="hover:text-black transition-colors font-semibold">E-mail</a>
            <span>© 2026. Wszystkie prawa zastrzeżone.</span>
          </div>
        </div>
      </footer>

      {/* Theater Cinematic Video Player modal window overlay */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />

      {/* Developer Instruction sandbox code generator block */}
      <CustomInstructions 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />

    </div>
  );
}
