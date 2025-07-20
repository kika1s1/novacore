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
  const [pulseRings, setPulseRings] = useState([0, 0, 0]);

  useEffect(() => {
    if (!animated) return;
    
    // Advanced radar sweep with variable speed
    const sweepInterval = setInterval(() => {
      setSweepAngle(prev => (prev + 3) % 360);
    }, 30);

    // Pulse rings animation
    const pulseInterval = setInterval(() => {
      setPulseRings(prev => prev.map((ring, index) => 
        (ring + (index + 1) * 2) % 360
      ));
    }, 100);

    return () => {
      clearInterval(sweepInterval);
      clearInterval(pulseInterval);
    };
  }, [animated]);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32', 
    large: 'w-full h-full'
  };

  const colorScheme = variant === 'memory' ? {
    primary: '#00d4ff',
    secondary: 'rgba(0, 212, 255, 0.8)',
    glow: 'rgba(0, 212, 255, 0.4)',
    trail: 'rgba(0, 212, 255, 0.2)'
  } : {
    primary: '#ff0040',
    secondary: 'rgba(255, 0, 64, 0.8)',
    glow: 'rgba(255, 0, 64, 0.4)',
    trail: 'rgba(255, 0, 64, 0.2)'
  };

  const getCinematicClass = () => {
    if (variant === 'core') return 'ai-reactor-core gpu-accelerated';
    if (variant === 'memory') return 'memory-core-radar gpu-accelerated';
    return 'radar-advanced gpu-accelerated';
  };

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center ${getCinematicClass()}`}>
      {/* Background ambient glow */}
      <div className="ambient-fog" />
      
      {/* Main radar SVG */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full holo-shimmer"
        style={{ 
          filter: `drop-shadow(0 0 15px ${colorScheme.glow}) drop-shadow(0 0 30px ${colorScheme.trail})` 
        }}
      >
        <defs>
          {/* Advanced gradient with multiple stops */}
          <radialGradient id={`radarGradient-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colorScheme.primary} stopOpacity="1" />
            <stop offset="30%" stopColor={colorScheme.primary} stopOpacity="0.8" />
            <stop offset="60%" stopColor={colorScheme.primary} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colorScheme.primary} stopOpacity="0" />
          </radialGradient>
          
          {/* Sweep trail gradient */}
          <linearGradient id={`sweepTrail-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorScheme.primary} stopOpacity="0" />
            <stop offset="70%" stopColor={colorScheme.primary} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colorScheme.primary} stopOpacity="1" />
          </linearGradient>
          
          {/* Enhanced glow filter */}
          <filter id={`advancedGlow-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feGaussianBlur stdDeviation="4" result="bigBlur"/>
            <feMerge> 
              <feMergeNode in="bigBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer concentric rings with pulsing */}
        {[90, 70, 50, 30].map((radius, index) => (
          <circle 
            key={radius}
            cx="100" 
            cy="100" 
            r={radius} 
            fill="none" 
            stroke={colorScheme.secondary} 
            strokeWidth={index === 0 ? "1.5" : "1"}
            opacity={0.3 + (index * 0.1)}
            filter={`url(#advancedGlow-${variant})`}
            style={{
              animation: `radar-sweep-advanced ${4 + index}s linear infinite`,
              animationDelay: `${index * 0.5}s`
            }}
          />
        ))}

        {/* Cross lines with glow */}
        <g opacity="0.5" filter={`url(#advancedGlow-${variant})`}>
          <line x1="10" y1="100" x2="190" y2="100" stroke={colorScheme.secondary} strokeWidth="1" />
          <line x1="100" y1="10" x2="100" y2="190" stroke={colorScheme.secondary} strokeWidth="1" />
          {/* Diagonal cross lines for more detail */}
          <line x1="29" y1="29" x2="171" y2="171" stroke={colorScheme.secondary} strokeWidth="0.5" opacity="0.3" />
          <line x1="171" y1="29" x2="29" y2="171" stroke={colorScheme.secondary} strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* Advanced animated sweep with trail */}
        {animated && (
          <g>
            {/* Main sweep */}
            <path
              d={`M 100 100 L 100 10 A 90 90 0 0 1 ${100 + 90 * Math.cos((sweepAngle - 90) * Math.PI / 180)} ${100 + 90 * Math.sin((sweepAngle - 90) * Math.PI / 180)} Z`}
              fill={`url(#radarGradient-${variant})`}
              opacity="0.8"
              filter={`url(#advancedGlow-${variant})`}
            />
            
            {/* Sweep trail */}
            <path
              d={`M 100 100 L 100 10 A 90 90 0 0 1 ${100 + 90 * Math.cos((sweepAngle - 120) * Math.PI / 180)} ${100 + 90 * Math.sin((sweepAngle - 120) * Math.PI / 180)} Z`}
              fill={`url(#sweepTrail-${variant})`}
              opacity="0.3"
            />
          </g>
        )}

        {/* Pulse rings for core variant */}
        {variant === 'core' && pulseRings.map((pulse, index) => (
          <circle 
            key={index}
            cx="100" 
            cy="100" 
            r={15 + (index * 10)} 
            fill="none" 
            stroke={colorScheme.primary} 
            strokeWidth="2"
            opacity={0.8 - (Math.sin(pulse * Math.PI / 180) * 0.3)}
            filter={`url(#advancedGlow-${variant})`}
          />
        ))}

        {/* Central core with pulsing */}
        <circle 
          cx="100" 
          cy="100" 
          r="6" 
          fill={colorScheme.primary}
          filter={`url(#advancedGlow-${variant})`}
          style={{
            animation: variant === 'core' ? 'reactor-core 2s ease-in-out infinite' : 'memory-heartbeat 2.5s ease-in-out infinite'
          }}
        />

        {/* Additional detail rings */}
        <circle cx="100" cy="100" r="12" fill="none" stroke={colorScheme.primary} strokeWidth="0.5" opacity="0.6" />
        <circle cx="100" cy="100" r="18" fill="none" stroke={colorScheme.primary} strokeWidth="0.5" opacity="0.4" />
      </svg>

      {/* Holographic overlay with shimmer */}
      <div 
        className="absolute inset-0 pointer-events-none holo-shimmer"
        style={{
          background: `radial-gradient(circle at center, ${colorScheme.glow} 0%, transparent 70%)`,
          animation: 'hologram-flicker 6s infinite'
        }}
      />

      {/* Particle effects overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {animated && Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: colorScheme.primary,
              left: `${50 + 30 * Math.cos((sweepAngle + i * 45) * Math.PI / 180)}%`,
              top: `${50 + 30 * Math.sin((sweepAngle + i * 45) * Math.PI / 180)}%`,
              boxShadow: `0 0 4px ${colorScheme.primary}`,
              animation: `biometric-pulse ${1 + i * 0.1}s ease-in-out infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
};