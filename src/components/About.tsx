/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA, EXPERIENCE_STATS } from '../data';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Absolute minimal geometric lights */}
      <div className="absolute top-1/3 left-1/10 w-96 h-96 bg-neutral-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Intro & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
                <Zap size={12} className="text-brand animate-pulse" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">PARTNER WZROSTU DLA MAREK</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-neutral-900 tracking-tight leading-tight">
                Partner wzrostu dla marek, które chcą{' '}
                <span className="text-neutral-500 font-medium block mt-2">
                  realnych efektów
                </span>
              </h2>
              <p className="text-neutral-700 font-sans text-base md:text-lg leading-relaxed max-w-2xl">
                Cześć! Nazywam się <strong>Igor Chmiel</strong>. Pomagam firmom i twórcom podwoić wyniki online, oferując rozwiązania z zakresu nowoczesnego projektovania stron, optymalizacji biznesu, płatnych reklam oraz SEO. 
              </p>
              <p className="text-neutral-500 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
                Specjalizuję się w tworzeniu w pełni responsywnych, dopracowanych wizualnie i technicznie witryn, które nie tylko przyciągają oko unikalnym designem, ale są maszynami do konwersji. Swoją pracę prezentuję w formie krótkich nagrań wideo, ponieważ wierzę, że żywa interakcja ze stroną mówi więcej niż setki słów.
              </p>
            </div>

            {/* Micro-Stats Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4" id="experience-stats-grid">
              {EXPERIENCE_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-neutral-200/80 p-5 rounded text-center group hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300 shadow-sm"
                >
                  <div className="text-2xl md:text-3xl font-mono font-extrabold text-neutral-900 group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-sans mt-2 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Values Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3 bg-white p-5 rounded border border-neutral-200/80 shadow-sm">
                <div className="bg-neutral-100 p-2.5 rounded text-neutral-700 shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-neutral-900 font-sans font-bold text-sm">Zorientowanie na cel</h4>
                  <p className="text-neutral-500 font-sans text-xs mt-1 leading-relaxed">Projektuję strony pod kątem generowania zapytań i sprzedaży.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-5 rounded border border-neutral-200/80 shadow-sm">
                <div className="bg-neutral-100 p-2.5 rounded text-neutral-700 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-neutral-900 font-sans font-bold text-sm">Gwarancja optymalizacji</h4>
                  <p className="text-neutral-500 font-sans text-xs mt-1 leading-relaxed">Audyty szybkości, czysty kod i perfekcyjna responsywność (RWD).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skill Bars & Visual */}
          <div className="lg:col-span-5 bg-white border border-neutral-200/80 p-8 rounded space-y-8 relative shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-100 to-transparent rounded-tr pointer-events-none" />
            
            <div className="space-y-1">
              <h3 className="text-xl font-sans font-bold text-neutral-900 tracking-tight">
                Moje specjalizacje
              </h3>
              <p className="text-xs text-neutral-400 font-sans">
                Główne kompetencje i standardy wdrażane przy każdym projekcie.
              </p>
            </div>

            <div className="space-y-6" id="skills-list">
              {SKILLS_DATA.map((skill, i) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-end text-sm">
                    <span className="text-neutral-800 font-sans font-bold text-xs flex items-center">
                      <CheckCircle2 size={12} className="text-neutral-700 mr-2" />
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-700 font-bold bg-neutral-100 px-2 py-0.5 rounded">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Skill Progress Bar Container */}
                  <div className="h-2 bg-neutral-100 rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-brand rounded shadow-sm shadow-brand/10"
                    />
                  </div>
                  <p className="text-neutral-500 text-[11px] font-sans leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="flex items-center">
                <HeartHandshake size={14} className="text-neutral-600 mr-2" />
                Standardy WooCommerce & WordPress
              </span>
              <span>2026</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
