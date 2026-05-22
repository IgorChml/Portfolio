/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successType, setSuccessType] = useState<'simulated' | 'real'>('simulated');
  const [errorMsg, setErrorMsg] = useState('');

  // Local state to keep track if Resend key is configured on the backend
  const [isResendConfigured, setIsResendConfigured] = useState(false);

  // Check backend Resend configuration status on load
  useEffect(() => {
    fetch('/api/config')
      .then((res) => {
        if (!res.ok) throw new Error('config endpoint failed');
        return res.json();
      })
      .then((data) => {
        setIsResendConfigured(!!data.isResendConfigured);
      })
      .catch((err) => {
        console.warn('API config lookup error:', err);
        setIsResendConfigured(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Serwer zwrócił błąd podczas wysyłki wiadomości.');
        }

        setIsSubmitting(false);
        setSuccess(true);
        setSuccessType(data.simulated ? 'simulated' : 'real');

        // Clear input form fields
        setName('');
        setEmail('');
        setMessage('');

        // Dismiss success notification after 8 seconds
        setTimeout(() => setSuccess(false), 8000);
      })
      .catch((err: any) => {
        console.error('Resend delivery submission error:', err);
        setIsSubmitting(false);
        setErrorMsg(err.message || 'Wystąpił problem z połączeniem podczas wysyłania wiadomości.');
      });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background circular highlights */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neutral-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-brand-light border border-brand/20 px-3 py-1.5 rounded font-mono text-xs text-brand">
            <Mail size={12} className="text-brand" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">POTRZEBUJESZ STRONY? NAPISZ DO MNIE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-neutral-900 tracking-tight">
            Rozpocznijmy Twój projekt{' '}
            <span className="text-neutral-500 font-medium block mt-2">
              już dziś
            </span>
          </h2>
          <p className="text-neutral-500 font-sans text-sm md:text-base leading-relaxed">
            Napisz do mnie – odpowiadam zazwyczaj w ciągu 24 godzin. Porozmawiajmy o darmowej wycenie i stwórzmy stronę, która deklasuje konkurencję.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Traditional Contact Blocks & Professional Benefits Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#fafafa] border border-neutral-200/80 p-8 rounded space-y-6 shadow-sm">
              <h3 className="text-lg font-sans font-bold text-neutral-900 tracking-tight">
                Metody bezpośrednie
              </h3>

              <div className="space-y-4 font-sans">
                {/* Method 1: Email */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded border border-neutral-200">
                  <div className="bg-neutral-100 p-3 rounded text-neutral-700 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-neutral-450 text-[10px] font-mono uppercase tracking-wider block font-bold">Adres E-mail</span>
                    <a href="mailto:kontakt@igorchmiel.pl" className="text-neutral-900 hover:text-brand text-sm font-semibold transition-colors">
                      kontakt@igorchmiel.pl
                    </a>
                  </div>
                </div>

                {/* Method 2: Website */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded border border-neutral-200">
                  <div className="bg-neutral-100 p-3 rounded text-neutral-700 shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="text-neutral-450 text-[10px] font-mono uppercase tracking-wider block font-bold">Portfolio online</span>
                    <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:text-brand text-sm font-semibold transition-colors">
                      igorchmiel.pl
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Client Value Proposition Card */}
            <div className="bg-[#fafafa] border border-neutral-200/80 p-8 rounded space-y-6 shadow-sm">
              <h3 className="text-sm font-sans font-extrabold text-neutral-800 tracking-wider uppercase">
                Gwarancja jakości współpracy
              </h3>
              
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-neutral-900 font-sans font-bold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111]" />
                    <span>Indywidualne podejście</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed pl-3.5">
                    Każda witryna projektowana jest od zera, bez gotowych szablonów. Dopasowuję kod i design w 100% pod Twoją markę i cele biznesowe.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-neutral-900 font-sans font-bold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111]" />
                    <span>Prędkość i SEO</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed pl-3.5">
                    Stosuję wyłącznie czysty, semantyczny kod, co przekłada się na wyniki 95+ w Google Lighthouse oraz znakomitą bazę pod pozycjonowanie.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-neutral-900 font-sans font-bold text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111]" />
                    <span>Bezpieczeństwo i wsparcie</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 font-sans leading-relaxed pl-3.5">
                    Zapewniam pełną pomoc techniczną przy wdrożeniu i hostingach, a także gwarancję stabilności oraz darmową opiekę powdrożeniową.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact HTML5 Form Card */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-8 rounded shadow-sm">
            <h3 className="text-neutral-900 font-sans font-bold text-lg mb-6 flex items-center">
              <MessageSquare size={16} className="text-neutral-600 mr-2.5" />
              Napisz wiadomość
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5" id="portfolio-contact-form">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Imię i nazwisko</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-neutral-400">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="np. Jan Kowalski"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand rounded py-3.5 pl-10 pr-4 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Adres E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-neutral-400">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="np. jan@przyklad.pl"
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand rounded py-3.5 pl-10 pr-4 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-1.5">
                <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Treść wiadomości</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3 text-neutral-400">
                    <MessageSquare size={14} />
                  </div>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Opisz krótko swój projekt deweloperski, preferowany czas realizacji oraz zakładane funkcjonalności..."
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-brand rounded py-3.5 pl-10 pr-4 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all font-sans leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Submit panel */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-brand hover:bg-brand-dark text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-md shadow-brand/10 focus:outline-none"
                >
                  {isSubmitting ? (
                    <span>Szyfrowanie i wysyłka...</span>
                  ) : (
                    <>
                      <span>Wyślij zapytanie</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Success and Error Modal notifications */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-emerald-50 border border-emerald-250 text-emerald-800 rounded flex items-start space-x-3 text-xs"
                >
                  <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-600" />
                  <div className="space-y-1">
                    <p className="font-bold">Wiadomość została wysłana pomyślnie!</p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Dziękuję za kontakt! Wiadomość została przesłana na adres <strong>kontakt@igorchmiel.pl</strong>. Otrzymasz odpowiedź tak szybko, jak to możliwe.
                    </p>
                  </div>
                </motion.div>
              )}

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded flex items-start space-x-3 text-xs"
                >
                  <AlertTriangle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                  <div className="space-y-1">
                    <p className="font-bold">Błąd podczas wysyłania wiadomości</p>
                    <p className="text-[11px] leading-relaxed">{errorMsg}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
