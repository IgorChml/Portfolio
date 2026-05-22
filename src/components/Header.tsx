/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80 py-4 shadow-sm shadow-neutral-100/50'
          : 'bg-white/90 backdrop-blur-md py-6 border-b border-neutral-100/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Title */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer group"
          id="logo-container"
        >
          <BrandLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-neutral-900 font-sans font-extrabold tracking-tight text-lg group-hover:text-brand transition-colors">
              Igor Chmiel
            </span>
            <span className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase leading-none mt-0.5 font-bold">
              Premium Web Design
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
          <button
            onClick={() => scrollToSection('about')}
            className="text-neutral-600 hover:text-brand font-sans font-semibold text-sm transition-colors cursor-pointer"
          >
            O mnie
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-neutral-600 hover:text-brand font-sans font-semibold text-sm transition-colors cursor-pointer"
          >
            Projekty wideo
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-neutral-600 hover:text-brand font-sans font-semibold text-sm transition-colors cursor-pointer"
          >
            Kontakt
          </button>

          {/* Date Stamp */}
          <div className="text-[10px] text-neutral-500 font-mono flex items-center bg-neutral-50 px-2.5 py-1.5 rounded border border-neutral-200/85">
            <Calendar size={10} className="mr-1.5 text-neutral-400" />
            <span>{formattedDate}</span>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-neutral-700 hover:text-brand hover:bg-brand-light p-2 rounded transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-panel"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-200 py-6 px-6 shadow-md animate-fade-in"
        >
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-neutral-800 hover:text-brand font-sans font-bold text-sm py-2 transition-colors border-b border-neutral-100"
            >
              O mnie
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-left text-neutral-800 hover:text-brand font-sans font-bold text-sm py-2 transition-colors border-b border-neutral-100"
            >
              Projekty wideo
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-neutral-800 hover:text-brand font-sans font-bold text-sm py-2 transition-colors border-b border-neutral-100"
            >
              Kontakt
            </button>
            
            <div className="text-[10px] text-neutral-400 font-mono text-center pt-2">
              Lokalny czas: {formattedDate}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
