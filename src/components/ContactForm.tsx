/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Mail, MessageSquare, CheckCircle, MailCheck, AlertTriangle, Inbox, Trash2 } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load and sync messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('igor_portfolio_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved messages.');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate server side posting roundtrip
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message,
        timestamp: new Date().toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      localStorage.setItem('igor_portfolio_messages', JSON.stringify(updated));

      setIsSubmitting(false);
      setSuccess(true);

      // Clear main fields
      setName('');
      setEmail('');
      setMessage('');

      // Pulse off success banner
      setTimeout(() => setSuccess(false), 6000);
    }, 850);
  };

  const deleteMessage = (id: string) => {
    const filtered = messages.filter(m => m.id !== id);
    setMessages(filtered);
    localStorage.setItem('igor_portfolio_messages', JSON.stringify(filtered));
  };

  const clearAllMessages = () => {
    setMessages([]);
    localStorage.removeItem('igor_portfolio_messages');
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background circular highlights */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neutral-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded font-mono text-xs text-neutral-600">
            <Mail size={12} className="text-neutral-500" />
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
          
          {/* Left Column: Traditional Contact Blocks & Interactive Live inbox */}
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
                    <a href="mailto:businesschmiel@gmail.com" className="text-neutral-900 hover:text-black text-sm font-semibold transition-colors">
                      businesschmiel@gmail.com
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
                    <a href="https://igorchmiel.pl" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:text-black text-sm font-semibold transition-colors">
                      igorchmiel.pl
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border border-neutral-200">
                <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                  💡 <strong>Wskazówka wdrażania:</strong> W końcowym rozwiązaniu produkcyjnym formularz ten można połączyć bezpośrednio z usługą <strong>EmailJS</strong> lub <strong>Resend</strong> za pomocą pojedynczego calla API w celu bezpośredniej wysyłki maili na pocztę.
                </p>
              </div>
            </div>

            {/* Interactive Local Inbox Dashboard */}
            <div className="bg-[#fafafa] border border-neutral-200/80 p-6 rounded space-y-4 shadow-sm">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Inbox className="text-neutral-700" size={16} />
                  <h4 className="text-neutral-800 font-sans font-extrabold text-xs uppercase tracking-wider">
                    Panel testowy (Wysłano: {messages.length})
                  </h4>
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearAllMessages}
                    className="text-neutral-400 hover:text-neutral-900 text-[10px] font-mono flex items-center space-x-1 transition-colors cursor-pointer font-bold"
                  >
                    <Trash2 size={10} />
                    <span>Usuń wszystko</span>
                  </button>
                )}
              </div>

              <div className="max-h-48 overflow-y-auto space-y-3 pr-1" id="message-inbox">
                {messages.length === 0 ? (
                  <div className="text-center py-6 text-neutral-400 text-xs font-sans leading-relaxed">
                    Brak wysłanych zapytań deweloperskich. <br />Użyj formularza obok, aby przetestować interakcję!
                  </div>
                ) : (
                  messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white border border-neutral-200 p-3.5 rounded text-[11px] space-y-1 group relative shadow-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-900 font-sans font-bold">{msg.name}</span>
                        <span className="text-neutral-450 font-mono text-[9px] font-semibold">{msg.timestamp}</span>
                      </div>
                      <div className="text-neutral-550 font-mono text-[10px] mb-1">{msg.email}</div>
                      <p className="text-neutral-600 font-sans leading-relaxed break-words">{msg.message}</p>
                      
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="absolute right-2.5 bottom-2.5 text-neutral-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                        title="Usuń wpis"
                      >
                        <Trash2 size={11} />
                      </button>
                    </motion.div>
                  ))
                )}
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
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-500 rounded py-3.5 pl-10 pr-4 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-200 transition-all font-sans"
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
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-500 rounded py-3.5 pl-10 pr-4 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-200 transition-all font-sans"
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
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-500 rounded py-3.5 pl-10 pr-4 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-200 transition-all font-sans leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Submit panel */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-neutral-900 hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-sm focus:outline-none"
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

            {/* Success Modal popup notification card */}
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
                    <p className="font-bold">Wiadomość została nadana pomyślnie!</p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Zapisano dynamiczny rekord w lokalnym kliencie (baza testowa). Aby zobaczyć zapisaną treść, przewiń do sekcji odebranej poczty po lewej stronie. Dziękujemy za wykonanie testowego formularza!
                    </p>
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
