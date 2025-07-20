import React, { useEffect, useState } from 'react';

interface RadarCoreProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'core' | 'memory' | 'scanner';
  animated?: boolean;
}

export const RadarCore: React.FC<RadarCoreProps> = ({ 
  size = 'large', 
  variant = 'core',
  animated = true 
}) => {
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    if (!animated) return;
    
    const interval = setInterval(() => {
      setSweepAngle(prev => (prev + 2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [animated]);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32', 
    large: 'w-full h-full'
  };

  const colorScheme = variant === 'memory' ? {
    primary: '#00d4ff',
    secondary: 'rgba(0, 212, 255, 0.6)',
    glow: 'rgba(0, 212, 255, 0.3)'
  } : {
    primary: '#ff0040',
    secondary: 'rgba(255, 0, 64, 0.6)',
    glow: 'rgba(255, 0, 64, 0.3)'
  };

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full"
        style={{ filter: `drop-shadow(0 0 10px ${colorScheme.glow})` }}
      >
        <defs>
          <radialGradient id={`radarGradient-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colorScheme.primary} stopOpacity="0.8" />
            <stop offset="70%" stopColor={colorScheme.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colorScheme.primary} stopOpacity="0.1" />
          </radialGradient>
          
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer rings */}
        <circle 
          cx="100" 
          cy="100" 
          r="90" 
          fill="none" 
          stroke={colorScheme.secondary} 
          strokeWidth="1"
          opacity="0.4"
          filter={`url(#glow-${variant})`}
        />
        <circle 
          cx="100" 
          cy="100" 
          r="70" 
          fill="none" 
          stroke={colorScheme.secondary} 
          strokeWidth="1"
          opacity="0.5"
          filter={`url(#glow-${variant})`}
        />
        <circle 
          cx="100" 
          cy="100" 
          r="50" 
          fill="none" 
          stroke={colorScheme.secondary} 
          strokeWidth="1"
          opacity="0.6"
          filter={`url(#glow-${variant})`}
        />
        <circle 
          cx="100" 
          cy="100" 
          r="30" 
          fill="none" 
          stroke={colorScheme.secondary} 
          strokeWidth="1"
          opacity="0.7"
          filter={`url(#glow-${variant})`}
        />

        {/* Cross lines */}
        <line 
          x1="10" y1="100" 
          x2="190" y2="100" 
          stroke={colorScheme.secondary} 
          strokeWidth="1" 
          opacity="0.4"
          filter={`url(#glow-${variant})`}
        />
        <line 
          x1="100" y1="10" 
          x2="100" y2="190" 
          stroke={colorScheme.secondary} 
          strokeWidth="1" 
          opacity="0.4"
          filter={`url(#glow-${variant})`}
        />

        {/* Animated sweep */}
        {animated && (
          <path
            d={`M 100 100 L 100 10 A 90 90 0 0 1 ${100 + 90 * Math.cos((sweepAngle - 90) * Math.PI / 180)} ${100 + 90 * Math.sin((sweepAngle - 90) * Math.PI / 180)} Z`}
            fill={`url(#radarGradient-${variant})`}
            opacity="0.6"
          />
        )}

        {/* Center dot */}
        <circle 
          cx="100" 
          cy="100" 
          r="4" 
          fill={colorScheme.primary}
          filter={`url(#glow-${variant})`}
        />

        {/* Pulse rings */}
        {variant === 'core' && (
          <>
            <circle 
              cx="100" 
              cy="100" 
              r="15" 
              fill="none" 
              stroke={colorScheme.primary} 
              strokeWidth="2"
              opacity="0.8"
              className="core-radar"
            />
            <circle 
              cx="100" 
              cy="100" 
              r="25" 
              fill="none" 
              stroke={colorScheme.primary} 
              strokeWidth="1"
              opacity="0.6"
              className="core-radar"
              style={{ animationDelay: '0.5s' }}
            />
          </>
        )}
      </svg>

      {/* Holographic overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colorScheme.glow} 0%, transparent 70%)`,
          animation: 'hologram-flicker 4s infinite'
        }}
      />
    </div>
  );
};