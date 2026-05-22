import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export default function BrandLogo({ className = '', size }: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);
  const inlineStyle = size ? { width: size, height: size } : undefined;
  
  // Render the user's custom PNG file if available.
  // Falls back immediately to our precise vector SVG recreation if not found.
  if (!imageError) {
    return (
      <img
        src="/Fav_Igor_Chmiel (1).png"
        alt="Igor Chmiel Logo"
        className={`shrink-0 select-none object-contain ${className}`}
        style={inlineStyle}
        onError={() => setImageError(true)}
        referrerPolicy="no-referrer"
        id="brand-logo-img"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`shrink-0 select-none ${className}`}
      style={inlineStyle}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="brand-logo-svg"
    >
      {/* Outer Brand Circular Badge filled with the brand color #155DFC */}
      <circle cx="50" cy="50" r="50" fill="#155DFC" />
      
      {/* Premium Stylized White Crest Emblem */}
      <path
        d="M 42.5 20.4 L 42.5 32.5 A 14.5 14.5 0 1 1 57.5 32.5 L 57.5 20.4 A 25.7 25.7 0 1 0 42.5 20.4 Z"
        fill="white"
      />
      {/* Pedestal Base */}
      <path
        d="M 25 64 H 75 V 70.5 Q 75 75 70.5 75 H 29.5 Q 25 75 25 70.5 Z"
        fill="white"
      />
    </svg>
  );
}
