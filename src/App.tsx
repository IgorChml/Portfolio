/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowDownCircle, Mail } from 'lucide-react';

import Header from './components/Header';
import About from './components/About';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ContactForm from './components/ContactForm';
import BrandLogo from './components/BrandLogo';

import { PROJECTS_DATA } from './data';
import { Project } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ecommerce' | 'services' | 'portfolio'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Update mouse position normalized relative to screen center (-1 to 1)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

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

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
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
      <Header />

      {/* Hero Section */}
      <section 
        id="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden bg-neutral-950"
      >
        {/* Subtle, auto-playing, muted high-definition video background with micro opposite parallax */}
        <motion.div
          animate={{
            x: mouseOffset.x * -18,
            y: mouseOffset.y * -18,
          }}
          transition={{ type: 'spring', stiffness: 40, damping: 22 }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden scale-[1.08]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
            src="https://cdn.pixabay.com/video/2022/10/24/136270-763428987_medium.mp4"
          />
        </motion.div>

        {/* Elegant dark overlay gradients to secure text readability */}
        <div className="absolute inset-0 bg-neutral-950/75 z-0 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-0 pointer-events-none" />
        
        {/* Absolute minimal geometric lights with opposite parallax displacement */}
        <motion.div
          animate={{
            x: mouseOffset.x * -45,
            y: mouseOffset.y * -45,
          }}
          transition={{ type: 'spring', stiffness: 35, damping: 24 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none z-0"
        />

        <div className="max-w-7xl mx-auto px-6 text-center space-y-10 relative z-10 w-full flex flex-col items-center">
          
          {/* Elegant subtitled badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-2 rounded font-mono text-xs text-neutral-200 cursor-default select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Premium Web Design & Business Solution</span>
          </motion.div>

          {/* Master headlines with multi-depth parallax response */}
          <div className="space-y-4 max-w-4xl w-full">
            <motion.div
              animate={{
                x: mouseOffset.x * 16,
                y: mouseOffset.y * 16,
              }}
              transition={{ type: 'spring', stiffness: 45, damping: 24 }}
            >
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
                Moje Portfolio Stron Internetowych{' '}<br />
                <span className="font-medium text-neutral-300 text-3xl sm:text-4xl md:text-5xl block mt-4">
                  Prezentowane w formie klipów wideo
                </span>
              </h1>
            </motion.div>

            <motion.div
              animate={{
                x: mouseOffset.x * 9,
                y: mouseOffset.y * 9,
              }}
              transition={{ type: 'spring', stiffness: 45, damping: 24 }}
              className="mt-4"
            >
              <p className="text-neutral-300 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Projektuję nowoczesne, zoptymalizowane pod kątem konwersji i pozycjonowania strony internetowe dla małych oraz średnich firm. Zobacz, jak wyglądają i działają moje realizacje w akcji na żywo.
              </p>
            </motion.div>
          </div>

          {/* Call To Actions Bar */}
          <motion.div
            animate={{
              x: mouseOffset.x * 5,
              y: mouseOffset.y * 5,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 26 }}
            className="w-full sm:w-auto flex justify-center z-10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleScrollToProjects}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-white hover:bg-neutral-100 text-neutral-900 font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <Play size={12} fill="currentColor" className="ml-0.5" />
                <span>Obejrzyj realizacje wideo</span>
              </button>
              
              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/25 text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 cursor-pointer hover:scale-[1.01]"
              >
                <Mail size={12} className="text-neutral-300" />
                <span>Skontaktuj się ze mną</span>
              </button>
            </div>
          </motion.div>

          {/* Bottom mouse-scroll cue indicator */}
          <div className="pt-16 hidden sm:block">
            <button 
              onClick={handleScrollToProjects}
              className="flex flex-col items-center space-y-2 text-neutral-400 hover:text-white transition-colors cursor-pointer group animate-fade-in"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">Przewiń na dół</span>
              <ArrowDownCircle size={18} className="animate-bounce text-neutral-300 group-hover:text-black transition-colors" />
            </button>
          </div>

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
                      ? 'bg-brand text-white border-brand shadow-md shadow-brand/10'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-brand-light hover:text-brand hover:border-brand-light'
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
            <BrandLogo className="w-8 h-8" />
            <span>Igor Chmiel — Portfolio Stron Internetowych w Wideo</span>
          </div>

          {/* Quick legal/nav links */}
          <div className="flex flex-wrap gap-6 text-neutral-500">
            <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors font-semibold">igorchmiel.pl</a>
            <a href="mailto:kontakt@igorchmiel.pl" className="hover:text-brand transition-colors font-semibold">E-mail</a>
            <span>© 2026. Wszystkie prawa zastrzeżone.</span>
          </div>
        </div>
      </footer>

      {/* Theater Cinematic Video Player modal window overlay */}
      <ProjectModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />

    </div>
  );
}
