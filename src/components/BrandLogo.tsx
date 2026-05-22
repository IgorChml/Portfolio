import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export default function BrandLogo({ className = '', size }: BrandLogoProps) {
  const inlineStyle = size ? { width: size, height: size } : undefined;
  
  return (
    <img
      src="/logo.png"
      alt="Igor Chmiel Logo"
      className={`shrink-0 select-none object-contain ${className}`}
      style={inlineStyle}
      referrerPolicy="no-referrer"
      id="brand-logo-img"
    />
  );
}
