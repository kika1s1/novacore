import React, { useEffect, useRef } from 'react';

interface WaveformDisplayProps {
  type?: 'signal' | 'audio' | 'neural' | 'quantum';
  animated?: boolean;
}

export const WaveformDisplay: React.FC<WaveformDisplayProps> = ({ 
  type = 'signal', 
  animated = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced wave data generation with multiple harmonics
    const generateWaveData = () => {
      const points: number[] = [];
      const numPoints = 150; // More points for smoother curves
      
      for (let i = 0; i < numPoints; i++) {
        let value = 0;
        
        switch (type) {
          case 'signal':
            // Complex signal with multiple harmonics
            value = Math.sin(i * 0.08) * 0.6 + 
                   Math.sin(i * 0.04) * 0.3 + 
                   Math.sin(i * 0.16) * 0.1;
            break;
          case 'audio':
            // Audio-like waveform with noise
            value = Math.sin(i * 0.12) * 0.5 + 
                   Math.sin(i * 0.24) * 0.2 + 
                   (Math.random() - 0.5) * 0.15;
            break;
          case 'neural':
            // Neural activity pattern
            value = Math.sin(i * 0.1) * 0.7 + 
                   Math.cos(i * 0.06) * 0.3 + 
                   Math.sin(i * 0.2) * 0.1;
            break;
          case 'quantum':
            // Quantum fluctuation pattern
            value = (Math.random() - 0.5) * 0.9 + 
                   Math.sin(i * 0.08) * 0.4 + 
                   Math.cos(i * 0.12) * 0.2;
            break;
        }
        
        points.push(value);
      }
      
      return points;
    };

    let time = 0;
    const animate = () => {
      if (!animated) return;
      
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Clear with slight trail effect for cinematic look
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Generate dynamic waveform data with time-based evolution
      const points = generateWaveData().map((point, index) => {
        const timeOffset = time * 0.03;
        let dynamicValue = point;
        
        switch (type) {
          case 'signal':
            dynamicValue = Math.sin((index + timeOffset) * 0.08) * 0.6 + 
                          Math.sin((index + timeOffset) * 0.04) * 0.3 +
                          Math.sin((index + timeOffset) * 0.16) * 0.1;
            break;
          case 'neural':
            dynamicValue = Math.sin((index + timeOffset) * 0.1) * 0.7 + 
                          Math.cos((index + timeOffset) * 0.06) * 0.3 +
                          (Math.random() - 0.5) * 0.05;
            break;
          case 'quantum':
            dynamicValue = (Math.random() - 0.5) * 0.9 + 
                          Math.sin((index + timeOffset) * 0.08) * 0.4;
            break;
          case 'audio':
            dynamicValue = Math.sin((index + timeOffset) * 0.12) * 0.5 + 
                          Math.sin((index + timeOffset) * 0.24) * 0.2 +
                          (Math.random() - 0.5) * 0.1;
            break;
        }
        
        return dynamicValue;
      });

      const primaryColor = type === 'signal' ? '#00d4ff' : '#ff0040';
      const secondaryColor = type === 'signal' ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 0, 64, 0.6)';

      // Draw multiple waveform layers for depth
      for (let layer = 0; layer < 3; layer++) {
        ctx.strokeStyle = layer === 0 ? primaryColor : secondaryColor;
        ctx.lineWidth = layer === 0 ? 3 : 1;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = layer === 0 ? 15 : 5;
        ctx.globalAlpha = layer === 0 ? 1 : 0.6 - (layer * 0.2);
        
        ctx.beginPath();
        
        points.forEach((point, index) => {
          const x = (index / (points.length - 1)) * width;
          const layerOffset = layer * 0.1;
          const y = height / 2 + ((point + layerOffset) * height * 0.35);
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            // Use quadratic curves for smoother lines
            const prevX = ((index - 1) / (points.length - 1)) * width;
            const prevY = height / 2 + ((points[index - 1] + layerOffset) * height * 0.35);
            const cpX = (prevX + x) / 2;
            const cpY = (prevY + y) / 2;
            ctx.quadraticCurveTo(cpX, cpY, x, y);
          }
        });
        
        ctx.stroke();
      }

      // Add particle effects along the waveform
      if (time % 3 === 0) {
        for (let i = 0; i < 5; i++) {
          const particleIndex = Math.floor(Math.random() * points.length);
          const x = (particleIndex / (points.length - 1)) * width;
          const y = height / 2 + (points[particleIndex] * height * 0.35);
          
          ctx.fillStyle = primaryColor;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Reset alpha and composite mode
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (animated) {
      animate();
    } else {
      // Enhanced static waveform
      const points = generateWaveData();
      
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const primaryColor = type === 'signal' ? '#00d4ff' : '#ff0040';
      
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 15;
      
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height / 2 + (point * height * 0.35);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevX = ((index - 1) / (points.length - 1)) * width;
          const prevY = height / 2 + (points[index - 1] * height * 0.35);
          const cpX = (prevX + x) / 2;
          const cpY = (prevY + y) / 2;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      });
      ctx.stroke();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type, animated]);

  const primaryColor = type === 'signal' ? '#00d4ff' : '#ff0040';

  return (
    <div className="w-full h-full relative gpu-accelerated biometric-wave">
      {/* Ambient fog background */}
      <div className="ambient-fog" />
      
      {/* Main canvas */}
      <canvas 
        ref={canvasRef}
        className="w-full h-full holo-shimmer"
        style={{ 
          filter: `drop-shadow(0 0 10px ${primaryColor}) drop-shadow(0 0 20px ${primaryColor}60)` 
        }}
      />
      
      {/* Enhanced grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <svg className="w-full h-full">
          <defs>
            <pattern id={`waveGrid-${type}`} width="15" height="15" patternUnits="userSpaceOnUse">
              <path 
                d="M 15 0 L 0 0 0 15" 
                fill="none" 
                stroke={primaryColor} 
                strokeWidth="0.5"
              />
            </pattern>
            <filter id={`gridGlow-${type}`}>
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill={`url(#waveGrid-${type})`}
            filter={`url(#gridGlow-${type})`}
          />
          
          {/* Center line */}
          <line 
            x1="0" y1="50%" 
            x2="100%" y2="50%" 
            stroke={primaryColor} 
            strokeWidth="0.5" 
            opacity="0.4"
            filter={`url(#gridGlow-${type})`}
          />
        </svg>
      </div>
      
      {/* Enhanced status indicator */}
      <div className="absolute top-3 right-3 text-xs">
        <div className="flex items-center space-x-3 bg-black/40 px-2 py-1 rounded border border-red-900/50">
          <div 
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: animated ? '#00ff00' : '#ffaa00',
              boxShadow: `0 0 8px ${animated ? '#00ff00' : '#ffaa00'}`,
              animation: animated ? 'biometric-pulse 1s ease-in-out infinite' : 'none'
            }}
          />
          <span 
            className="font-mono text-glow-cyan"
            style={{ color: primaryColor }}
          >
            {type.toUpperCase()}
          </span>
          <span className="text-cyan-400 font-mono text-xs">
            {animated ? 'LIVE' : 'STATIC'}
          </span>
        </div>
      </div>

      {/* Frequency bands indicator */}
      <div className="absolute bottom-3 left-3 flex space-x-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-black/60 border border-red-900/50"
            style={{
              height: `${20 + Math.random() * 20}px`,
              backgroundColor: primaryColor,
              opacity: 0.3 + (Math.random() * 0.4),
              animation: `biometric-pulse ${1 + i * 0.1}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              boxShadow: `0 0 4px ${primaryColor}`
            }}
          />
        ))}
      </div>
    </div>
  );
};