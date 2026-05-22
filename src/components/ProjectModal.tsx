/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, X, ExternalLink, Calendar, CheckSquare, Layers, Award, Info, RefreshCw } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState(project.localVideo);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isErrorFallback, setIsErrorFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Error recovery on modal loading
  const handleVideoError = () => {
    console.warn(`Local video not found for ${project.id} in theater view. Falling back to CDN.`);
    setVideoSrc(project.fallbackVideo);
    setIsErrorFallback(true);
  };

  useEffect(() => {
    // Reset source and states when project shifts
    setVideoSrc(project.localVideo);
    setIsPlaying(true);
    setIsMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setIsErrorFallback(false);
  }, [project]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" id="theater-modal-overlay">
        {/* Semi-transparent dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#06070a]/90 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        />

        {/* Modal Outer frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl bg-white border border-neutral-200 rounded overflow-hidden shadow-2xl flex flex-col lg:flex-row z-10 max-h-[90vh] lg:max-h-[85vh]"
        >
          {/* Close Floating Action Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 bg-white/90 text-neutral-800 hover:text-black p-2 rounded border border-neutral-200 hover:border-neutral-300 hover:scale-105 transition-all cursor-pointer shadow-sm"
            title="Zamknij odtwarzacz"
            id="close-modal-btn"
          >
            <X size={18} />
          </button>

          {/* Left / Top Side: Cinema Screening Player Viewport */}
          <div className="lg:w-3/5 bg-black flex flex-col justify-center relative group min-h-[250px] sm:min-h-[350px] md:min-h-[420px]">
            {/* Visual Screen frame overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Video element */}
            <video
              ref={videoRef}
              src={videoSrc}
              onError={handleVideoError}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              autoPlay
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain max-h-[50vh] lg:max-h-full"
              onClick={togglePlay}
            />

            {/* Custom Control Bar Workspace (Visible on hover and on play states) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col space-y-3 z-20 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              
              {/* Seek Bar Slider */}
              <div className="flex items-center space-x-3 w-full">
                <span className="font-mono text-[10px] text-slate-300 min-w-[28px]">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 accent-brand h-1 bg-white/20 rounded-lg cursor-pointer appearance-none range-sm focus:outline-none"
                />
                <span className="font-mono text-[10px] text-slate-300 min-w-[28px]">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Lower Control button board */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-neutral-300 p-1 rounded transition-colors cursor-pointer"
                    title={isPlaying ? 'Wstrzymaj' : 'Odtwórz'}
                  >
                    {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-neutral-300 p-1 rounded transition-colors cursor-pointer"
                    title={isMuted ? 'Wyłącz wyciszenie' : 'Wycisz'}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  {/* Fallback indicator */}
                  {isErrorFallback && (
                    <span className="text-[9px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded flex items-center">
                      <RefreshCw size={8} className="mr-1 animate-spin" />
                      Tryb Demo (Wideo CDN)
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  {project.categoryLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Right / Bottom Side: Project Specs Sidebar details */}
          <div className="lg:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white border-l border-neutral-20 w-fit">
            <div className="space-y-6">
              {/* Category & Completed Year metadata badge line */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-neutral-800 bg-neutral-50 border border-neutral-200 font-mono font-bold tracking-wider px-2.5 py-1 rounded uppercase text-[10px]">
                  {project.categoryLabel}
                </span>
                <span className="flex items-center text-neutral-500 font-mono bg-neutral-50 px-2.5 py-1 rounded border border-neutral-200 text-[10px]">
                  <Calendar size={12} className="mr-1.5 text-neutral-400" />
                  {project.completedYear} Rok
                </span>
              </div>

              {/* Title Header */}
              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-2xl text-neutral-900 tracking-tight leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Klient: <strong className="text-neutral-700 font-bold">{project.client}</strong>
                </p>
              </div>

              {/* Descriptions block */}
              <p className="text-neutral-500 font-sans text-xs leading-relaxed font-medium">
                {project.detailedDescription || project.description}
              </p>

              {/* Core Features list workspace */}
              <div className="space-y-3">
                <h4 className="text-neutral-800 font-sans font-extrabold text-xs uppercase tracking-wider flex items-center">
                  <CheckSquare size={14} className="text-neutral-600 mr-2" />
                  Główne Wdrożenia & Funkcje
                </h4>
                <ul className="space-y-2" id={`modal-features-${project.id}`}>
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-xs text-neutral-600 font-sans leading-relaxed">
                      <span className="text-neutral-400 mr-2 font-mono shrink-0 select-none">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tag collection */}
              <div className="space-y-2">
                <h4 className="text-neutral-800 font-sans font-extrabold text-xs uppercase tracking-wider flex items-center">
                  <Layers size={14} className="text-neutral-600 mr-2" />
                  Struktura Technologiczna
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-neutral-50 hover:bg-neutral-100 text-neutral-700 hover:text-black border border-neutral-200 text-[10px] font-mono px-2.5 py-1 rounded transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Website CTA Button line */}
            <div className="pt-8 border-t border-neutral-200 mt-8 flex flex-col space-y-3">
              <a
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-brand hover:bg-brand-dark text-white font-sans font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 shadow-md shadow-brand/10 cursor-pointer hover:scale-[1.01]"
              >
                <span>Odwiedź stronę roboczą</span>
                <ExternalLink size={12} />
              </a>
              <p className="text-[10px] text-neutral-400 text-center font-sans tracking-wide">
                Strona otwiera się bezpiecznie w nowej karcie przeglądarki.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
