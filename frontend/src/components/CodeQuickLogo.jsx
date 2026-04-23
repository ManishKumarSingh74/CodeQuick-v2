import React, { useId } from 'react';

const CodeQuickLogo = ({ className = "", width = 40, height = 40 }) => {
  const gradId = useId().replace(/:/g, '');
  const glowId = useId().replace(/:/g, '');

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-500 ${className}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* The 'C' Arc (Code) */}
      <path 
        d="M18 6 A14 14 0 0 0 18 34" 
        stroke={`url(#${gradId})`}
        strokeWidth="3" 
        filter={`url(#${glowId})`}
      />
      
      {/* The First Chevron (Quick) */}
      <path 
        d="M18 12 L26 20 L18 28" 
        stroke={`url(#${gradId})`}
        strokeWidth="3" 
        opacity="0.8"
        filter={`url(#${glowId})`}
      />
      
      {/* The Second Chevron (Quick) */}
      <path 
        d="M26 12 L34 20 L26 28" 
        stroke={`url(#${gradId})`}
        strokeWidth="3" 
        opacity="0.4"
        filter={`url(#${glowId})`}
      />
    </svg>
  );
};

export default CodeQuickLogo;
