/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowUpRight, Film, ExternalLink, Loader2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  key?: string;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoSrc, setVideoSrc] = useState(project.localVideo);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fallback to Pixabay CDN online video if local storage video fails to load
  const handleVideoError = () => {
    console.warn(`Local video not found for ${project.id}. Falling back to CDN video.`);
    setVideoSrc(project.fallbackVideo);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        setIsVideoLoading(true);
        videoRef.current.play().catch(() => {
          // Ignore autoplay blocks
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-neutral-200/85 rounded overflow-hidden shadow-sm hover:border-neutral-400 hover:shadow-md transition-all duration-300 flex flex-col h-full group"
      id={`project-card-${project.id}`}
    >
      {/* Visual Header Frame / Interactive Video Preview */}
      <div 
        onClick={() => onSelect(project)}
        className="relative h-60 w-full overflow-hidden bg-neutral-50 cursor-pointer select-none border-b border-neutral-200"
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

        {/* Ambient Gradient Thumbnail (Visible when not playing or loading) */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} flex flex-col justify-between p-6 transition-opacity duration-300 z-0 ${
          isHovered && !isVideoLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          {/* Top Row badge */}
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-800 bg-white/95 border border-neutral-200/50 px-2.5 py-1 rounded uppercase">
              {project.categoryLabel}
            </span>
            <span className="text-[10px] font-mono text-white bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded">
              © {project.completedYear}
            </span>
          </div>

          {/* Large decorative client text in background */}
          <div className="absolute inset-x-0 bottom-12 text-center text-white/10 font-sans font-bold text-5xl tracking-widest uppercase select-none group-hover:scale-105 transition-transform duration-500 pointer-events-none">
            {project.client}
          </div>

          {/* Bottom play banner */}
          <div className="flex items-center space-x-2 text-white font-mono text-xs z-10 bg-black/25 backdrop-blur-xs w-fit px-3 py-1.5 rounded">
            <div className="bg-white/20 group-hover:bg-white group-hover:text-black w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200">
              <Play size={10} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="group-hover:text-neutral-100 transition-colors uppercase tracking-wider text-[9px] font-bold">Najeźdź, by podejrzeć</span>
          </div>
        </div>

        {/* Real Live Video Player Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          onError={handleVideoError}
          onCanPlay={handleVideoCanPlay}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Video loading spinner overlay */}
        {isHovered && isVideoLoading && (
          <div className="absolute inset-0 bg-neutral-950/20 flex items-center justify-center z-30">
            <Loader2 className="text-neutral-900 animate-spin" size={24} />
          </div>
        )}

        {/* Hover overlay border highlights */}
        <div className="absolute inset-0 border border-transparent group-hover:border-neutral-400/30 rounded pointer-events-none transition-colors duration-300 z-30" />
      </div>

      {/* Card Content Footer info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-neutral-400 font-bold uppercase tracking-wider text-[9px]">{project.client}</span>
            <span className="text-neutral-500 font-semibold">{project.completedYear} r.</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(project)}
            className="text-neutral-900 hover:text-neutral-600 cursor-pointer font-sans font-extrabold text-lg leading-snug tracking-tight transition-colors"
          >
            {project.title}
          </h3>

          {/* Description summary */}
          <p className="text-neutral-500 font-sans text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Skill Tag list */}
          <div className="flex flex-wrap gap-1.5 pt-2" id={`project-tags-${project.id}`}>
            {project.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="bg-neutral-50 border border-neutral-200 text-neutral-600 hover:text-neutral-950 font-sans text-[10px] px-2 py-1 rounded transition-colors"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="bg-neutral-50 border border-neutral-200 text-neutral-400 font-sans text-[10px] px-2 py-1 rounded">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls Panel */}
        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-neutral-150 mt-6">
          <button
            onClick={() => onSelect(project)}
            className="flex items-center justify-center space-x-1 px-3 py-2.5 bg-neutral-900 hover:bg-black text-white font-sans font-bold text-xs rounded transition-all duration-200 cursor-pointer"
          >
            <Play size={10} fill="currentColor" className="mr-1" />
            <span>Wideo</span>
          </button>
          
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center space-x-1 px-3 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-neutral-800 font-sans font-bold text-xs rounded transition-all duration-200 cursor-pointer"
          >
            <span>Strona</span>
            <ExternalLink size={10} className="shrink-0" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
