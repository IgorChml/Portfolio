/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ChevronRight, FileCode, Film, Sparkles, FolderPlus, X } from 'lucide-react';

interface CustomInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomInstructions({ isOpen, onClose }: CustomInstructionsProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  
  // Interactive generator state
  const [title, setTitle] = useState('Projekt Nowej Witryny');
  const [clientId, setClientId] = useState('Klient Sp. z o.o.');
  const [category, setCategory] = useState<'ecommerce' | 'services' | 'portfolio'>('services');
  const [description, setDescription] = useState('Szybka witryna z ofertą usługową i mapami zasięgu.');
  const [videoFile, setVideoFile] = useState('nowy-projekt.mp4');
  const [siteUrl, setSiteUrl] = useState('https://nowastrona.pl');
  const [tagsInput, setTagsInput] = useState('React, Tailwind, SEO, WordPress');
  const [copiedGenerated, setCopiedGenerated] = useState(false);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'ecommerce': return 'E-commerce';
      case 'services': return 'Strona Usługowa';
      case 'portfolio': return 'Portfolio';
      default: return 'Projekt';
    }
  };

  const getThumbnailGradient = (cat: string) => {
    switch (cat) {
      case 'ecommerce': return 'from-emerald-950 to-amber-950';
      case 'services': return 'from-blue-950 to-indigo-950';
      case 'portfolio': return 'from-purple-950 to-pink-950';
      default: return 'from-slate-950 to-zinc-900';
    }
  };

  // Generate TS object dynamically based on user input
  const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
  const formattedFeatures = [
    'Kompleksowy responsywny design mobilny (RWD)',
    'Pełne wdrożenie meta-tagów SEO i optymalizacja grafik',
    'Interaktywny system pozyskiwania kontaktów i formularze'
  ];

  const generatedCode = `  {
    id: '${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}',
    title: '${title}',
    client: '${clientId}',
    category: '${category}',
    categoryLabel: '${getCategoryLabel(category)}',
    description: '${description}',
    detailedDescription: '${description} Strona została zrealizowana zgodnie ze specyfikacją klienta przy użyciu nowoczesnych standardów programistycznych, ze szczególnym uwzględnieniem szybkości wczytywania i płynności interakcji.',
    tags: ${JSON.stringify(tagsArray)},
    localVideo: '/videos/${videoFile}',
    fallbackVideo: 'https://cdn.pixabay.com/video/2016/09/21/5176-182859013_medium.mp4',
    siteUrl: '${siteUrl}',
    features: ${JSON.stringify(formattedFeatures, null, 6).replace(/\n\s*\]/, '\n    ]')},
    thumbnailGradient: '${getThumbnailGradient(category)}',
    completedYear: ${new Date().getFullYear()}
  }`;

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    if (id === 99) {
      setCopiedGenerated(true);
      setTimeout(() => setCopiedGenerated(false), 2000);
    } else {
      setCopiedStep(id);
      setTimeout(() => setCopiedStep(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop screen lock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-white text-neutral-800 h-full overflow-y-auto border-l border-neutral-200 flex flex-col shadow-2xl z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/85 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="bg-neutral-100 p-2 rounded text-neutral-800">
                  <FileCode size={18} />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-neutral-900 text-base">Instrukcja Dodawania Projektów</h3>
                  <p className="text-xs text-neutral-500 font-mono">Dostosuj portfolio do swoich potrzeb (DIY)</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-black p-2 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-6 space-y-10 flex-1">
              {/* Introduction box */}
              <div className="bg-neutral-50 rounded border border-neutral-200 p-5 space-y-3">
                <span className="flex items-center text-neutral-800 text-xs font-mono font-bold">
                  <Sparkles size={14} className="mr-2 text-neutral-600" />
                  SZYBKI PORADNIK DLA DEVELOPERA
                </span>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  To portfolio zostało przygotowane tak, aby móc elastycznie zasilać je nowymi danymi. Na poziomie kodu, baza projektów zlokalizowana jest całkowicie w jednym pliku <code>src/data.ts</code>, a klipy wideo wczytywane są z katalogu zasobów publicznych.
                </p>
              </div>

              {/* Step list */}
              <div className="space-y-6">
                <h4 className="text-neutral-900 font-sans font-bold text-sm tracking-tight flex items-center">
                  <FolderPlus size={16} className="text-neutral-700 mr-2" />
                  Przewodnik Krok po Kroku
                </h4>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="bg-neutral-50/50 p-4 rounded border border-neutral-200 relative overflow-hidden group">
                    <div className="flex items-start space-x-3">
                      <div className="bg-neutral-900 text-white font-mono text-xs font-bold w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="space-y-2 flex-1">
                        <h5 className="text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider">Przygotowanie Klipu Wideo</h5>
                        <p className="text-neutral-600 text-xs font-sans leading-relaxed">
                          Nagraj krótką prezentację swojej witryny (preferowany krótki pionowy lub poziomy screencast trwający do 30 sekund). Eksportuj wideo do formatu <strong>MP4</strong>, zakodowanym kodekiem H.264 o maksymalnej wadze 5-10MB (umożliwi to szybkie ładowanie się wideo klientowi).
                        </p>
                        <div className="bg-white p-2.5 rounded border border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                          <span className="flex items-center"><Film size={12} className="mr-1.5 text-neutral-600" /> Preferowana rozdzielczość: fHD 1080p lub HD 720p</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-neutral-50/50 p-4 rounded border border-neutral-200 relative overflow-hidden group">
                    <div className="flex items-start space-x-3">
                      <div className="bg-neutral-900 text-white font-mono text-xs font-bold w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="space-y-2 flex-1">
                        <h5 className="text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider">Dodanie pliku do projektu</h5>
                        <p className="text-neutral-600 text-xs font-sans leading-relaxed">
                          Załóż katalog o nazwie <code>public/videos/</code> w głównym katalogu projektu i umieść tam swoje pliki wideo:
                        </p>
                        <div className="bg-neutral-50 p-3 rounded border border-neutral-200 font-mono text-[11px] text-neutral-800 space-y-1">
                          <p className="font-bold">📂 Twój-Projekt-Portfolio /</p>
                          <p className="pl-4 text-neutral-400">📂 public /</p>
                          <p className="pl-8 text-neutral-500">📂 videos /</p>
                          <p className="pl-12 text-neutral-900 flex items-center font-semibold"><ChevronRight size={10} className="mr-1 text-neutral-650" /> nowy-projekt.mp4</p>
                          <p className="pl-12 text-neutral-400">📄 kocibaits.mp4, artwall-design.mp4 ...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-neutral-50/50 p-4 rounded border border-neutral-200 relative overflow-hidden group">
                    <div className="flex items-start space-x-3">
                      <div className="bg-neutral-900 text-white font-mono text-xs font-bold w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="space-y-2 flex-1">
                        <h5 className="text-neutral-950 text-xs font-sans font-bold uppercase tracking-wider">Aktualizacja kodu src/data.ts</h5>
                        <p className="text-neutral-600 text-xs font-sans leading-relaxed">
                          Zaimplementuj nowy wpis w tablicy de-serializacji <code>PROJECTS_DATA</code> w pliku <code>src/data.ts</code>. Wykorzystaj przygotowany generator poniżej, aby otrzymać gotowy kod dla swojego projektu!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Code Generator Form */}
              <div className="bg-white rounded border border-neutral-200 p-6 space-y-6 shadow-sm">
                <div>
                  <h4 className="text-neutral-900 font-sans font-extrabold text-sm tracking-tight flex items-center">
                    <Sparkles size={16} className="mr-2 text-neutral-700" />
                    Interaktywny Kreator Projektu (Kod TS)
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5">Wypełnij formularz, aby natychmiast wygenerować obiekt TypeScript do wklejenia.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Nazwa Projektu (Tytuł)</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Nazwa Klienta</label>
                    <input
                      type="text"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Kategoria projektu</label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500"
                    >
                      <option value="ecommerce">E-commerce / Sklep online</option>
                      <option value="services">Strona Usługowa / Biznesowa</option>
                      <option value="portfolio">Portfolio / Landing Page</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Nazwa Pliku Wideo (.mp4)</label>
                    <input
                      type="text"
                      value={videoFile}
                      onChange={(e) => setVideoFile(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Link URL do strony żywej (jeśli istnieje)</label>
                    <input
                      type="text"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Krótki opis</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded p-3 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-neutral-500 font-sans text-xs font-bold uppercase tracking-wider block">Tagi technologiczne (oddzielone przecinkami)</label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-1.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                {/* Display Generated Output Code Block */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center bg-neutral-100 px-4 py-2.5 rounded-t border-t border-x border-neutral-200">
                    <span className="font-mono text-[10px] text-neutral-500 font-semibold">Wygenerowany obiekt TypeScript do wklejenia</span>
                    <button
                      onClick={() => copyToClipboard(generatedCode, 99)}
                      className="flex items-center space-x-1 hover:text-black hover:border-neutral-400 text-neutral-500 text-xs font-mono transition-colors cursor-pointer bg-white px-2.5 py-1 rounded border border-neutral-200 font-bold"
                    >
                      {copiedGenerated ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span className="text-emerald-600">Skopiowano!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Skopiuj kod</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-neutral-900 rounded-b border-b border-x border-neutral-200 text-[10px] font-mono text-neutral-300 overflow-x-auto max-h-72 select-all">
                    {generatedCode}
                  </pre>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 text-center text-[10px] font-mono text-neutral-450 font-bold">
              Igor Chmiel © 2026. Skonstruowano do samodzielnego montażu (DIY)
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
