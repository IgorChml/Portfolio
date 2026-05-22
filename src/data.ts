/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from './types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'kocibaits',
    title: 'Sklep internetowy Kocibaits',
    client: 'KociBaits',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    description: 'Responsywna strona e-commerce z systemem płatności i zarządzaniem zamówieniami dedykowana dla wędkarzy karpiowych.',
    detailedDescription: 'Nowoczesny sklep internetowy stworzony dla renomowanej marki zanęt karpiowych KociBaits. Projekt opiera się na szybkim systemie zakupowym, intuicyjnej nawigacji i elastycznych filtrach wyszukiwania produktów. Wdrożono bezpieczne płatności online oraz automatyczną obsługę procesów magazynowych i logistycznych.',
    tags: ['E-commerce', 'WooCommerce', 'Płatności Online', 'UX/UI', 'RWD'],
    localVideo: '/videos/kocibaits.mp4',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // beautiful water/lake fishing vibe
    siteUrl: 'https://www.kocibaits.pl',
    features: [
      'Kompleksowy system koszyka zakupowego i kasy ekspresowej',
      'Integracja z bramkami płatności (BLIK, Przelewy24)',
      'Dwukierunkowa synchronizacja stanów magazynowych',
      'Responsywna wyszukiwarka produktów z podpowiadaniem fraz',
      'Zoptymalizowana ścieżka zakupowa zmniejszająca wskaźnik porzuconych koszyków'
    ],
    thumbnailGradient: 'from-amber-950 to-emerald-950',
    completedYear: 2024
  },
  {
    id: 'cml-klimatyzacje',
    title: 'Strona dla firmy montującej klimatyzacje',
    client: 'CML Klimatyzacje',
    category: 'services',
    categoryLabel: 'Strona Usługowa',
    description: 'Strona dla monterów klimatyzacji zintegrowana z opiniami Google oraz dedykowanym formularzem wyceny.',
    detailedDescription: 'Profesjonalna platforma wizerunkowa dla firmy CML Klimatyzacje obsługującej Poznań i okoliczne miejscowości. Głównym celem było maksymalne uproszczenie kontaktu i generowanie leadów. Strona zawiera interaktywny formularz darmowej wyceny oraz dynamiczny widget pobierający najnowsze, pięciogwiazdkowe opinie z Google Maps.',
    tags: ['Strona firmowa', 'Lead Generation', 'Google API', 'Kalkulator', 'SEO lokalne'],
    localVideo: '/videos/cml-klimatyzacje.mp4',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // clean cooling fan / modern interior breeze
    siteUrl: 'https://cml-klimatyzacje.vercel.app',
    features: [
      'Dedykowany wielokrokowy konfigurator/formularz wyceny usług',
      'Integracja i filtrowanie rzeczywistych opinii klientów z Profilu Google',
      'Kalkulator doboru rekomendowanej mocy urządzeń klimatyzacyjnych',
      'Interaktywna mapa zasięgu świadczonych usług montażowych',
      'Wyniki prędkości wczytywania bliskie ideałowi na urządzeniach mobilnych'
    ],
    thumbnailGradient: 'from-blue-950 to-cyan-950',
    completedYear: 2025
  },
  {
    id: 'artwall-design',
    title: 'Sklep internetowy z autorskimi plakatami',
    client: 'Artwall Design',
    category: 'ecommerce',
    categoryLabel: 'E-commerce',
    description: 'Sklep internetowy z autorskimi plakatami premium AI z płatnościami online, dostawami InPost i pełną optymalizacją pod SEO.',
    detailedDescription: 'Zaprojektowany od podstaw butik internetowy z plakatami dekoracyjnymi wytwarzanymi we współpracy ze sztuczną inteligencją. Każdy element strony odzwierciedla artystyczny i luksusowy charakter oferowanych produktów. Serwis wyposażono w moduł kompletowania dostawy do Paczkomatów oraz zaawansowaną optymalizację meta tagów pod wyszukiwarkę Google.',
    tags: ['Plakaty AI', 'React', 'Sklep premium', 'InPost API', 'SEO On-Page'],
    localVideo: '/videos/artwall-design.mp4',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', // gorgeous colorful abstract ink artwork
    siteUrl: 'https://artwalldesign.com.pl',
    features: [
      'Intuicyjna galeria plakatów z wizualizacjami we wnętrzach pokojowych',
      'Dynamiczne dopasowywanie rozmiarów ramy i wyliczanie cen w czasie rzeczywistym',
      'Wdrażanie kurierów i punktów odbioru (Paczkomaty InPost) bezpośrednio na mapie',
      'Zaprojektowana unikalna struktura kategorii pod pozycjonowanie długiego ogona (Long-tail SEO)',
      'Szybki system transakcyjny zabezpieczany protokołem SSL'
    ],
    thumbnailGradient: 'from-purple-950 to-pink-950',
    completedYear: 2025
  },
  {
    id: 'igorchmiel-portfolio',
    title: 'Moje portfolio i oferta dla małych firm',
    client: 'Igor Chmiel',
    category: 'portfolio',
    categoryLabel: 'Portfolio',
    description: 'Strona internetowa prezentująca pełną ofertę moich profesjonalnych usług deweloperskich oraz autorskie cenniki.',
    detailedDescription: 'Osobista marka i centralny hub usługowy realizowany na potrzeby pozyskiwania mikro, małych i średnich przedsiębiorstw. Strona w klarowny sposób dzieli ofertę na pakiety startowe i zaawansowane, demonstrując proces powstawania stron www, profesjonalizm technologiczny oraz zebrane dotychczas cyfrowe realizacje.',
    tags: ['Portfolio', 'Strona osobista', 'Bento Grid', 'Interaktywny Cennik', 'Lead Magnet'],
    localVideo: '/videos/igor-chmiel.mp4',
    fallbackVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', // sleek modern UI and tech analytics dashboard
    siteUrl: 'https://igorchmiel.pl',
    features: [
      'Modułowy, przykuwający uwagę układ sekcji bento',
      'Interaktywne tabele cenowe z czytelnym zestawieniem korzyści handlowych',
      'System dynamicznego odtwarzania wideo prezentujących wybrane strony na żywo',
      'Bezpośrednie odsyłacze do profili społecznościowych i formularz kontaktu bezpośredniego',
      'Animacje ruchu dla podbicia wrażenia luksusu i dopracowania detali'
    ],
    thumbnailGradient: 'from-slate-950 to-blue-950',
    completedYear: 2026
  }
];

export const SKILLS_DATA = [
  { name: 'Tworzenie Stron E-commerce', level: 95, desc: 'Dedykowane sklepy WooCommerce, Shopify oraz architektury headless.' },
  { name: 'Optymalizacja Szybkości & SEO', level: 92, desc: 'Profesjonalne pozycjonowanie w Google, maksymalizacja ocen Core Web Vitals.' },
  { name: 'Responsywny Design (RWD)', level: 98, desc: 'Idealne dostosowanie do telefonów, tabletów oraz szerokich ekranów monitorów.' },
  { name: 'Integracje API & Płatności', level: 90, desc: 'Wdrażanie bram cashowych, systemów kurierskich, opinii Google i map.' },
  { name: 'Montaż Wideo / Screencasty', level: 85, desc: 'Tworzenie estetycznych prezentacji uwieczniających działanie gotowych serwisów.' }
];

export const EXPERIENCE_STATS = [
  { label: 'Zrealizowanych Stron', value: '25+' },
  { label: 'Średni Czas Ładowania', value: '< 1.2s' },
  { label: 'Średni Wynik SEO', value: '98%' },
  { label: 'Zadowolenie Klientów', value: '100%' },
];
