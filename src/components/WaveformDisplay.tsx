import React, { useRef, useEffect } from 'react';


const SignalIcon: React.FC = () => (
  <svg
    viewBox="0 0 100 20"
    className="w-full h-full text-cyan-400 opacity-10"
    preserveAspectRatio="none"
  >
    <path
      d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.8"
      className="text-glow-cyan"
    />
  </svg>
);
interface WaveformDisplayProps {
  type?: 'signal' | 'audio' | 'neural' | 'quantum';
  animated?: boolean;
}

const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  type = 'signal',
  animated = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

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

    // Generate initial data points
    const generateWaveData = () => {
      const points: number[] = [];
      const numPoints = 100;
      
      for (let i = 0; i < numPoints; i++) {
        let value = 0;
        
        switch (type) {
          case 'signal':
            value = Math.sin(i * 0.1) * 0.5 + Math.sin(i * 0.05) * 0.3;
            break;
          case 'audio':
            value = Math.sin(i * 0.2) * 0.4 + Math.random() * 0.1;
            break;
          case 'neural':
            value = Math.sin(i * 0.15) * 0.6 + Math.cos(i * 0.08) * 0.2;
            break;
          case 'quantum':
            value = (Math.random() - 0.5) * 0.8 + Math.sin(i * 0.12) * 0.4;
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
      
      ctx.clearRect(0, 0, width, height);
      
      // Generate dynamic waveform data
      const points = generateWaveData().map((point, index) => {
        const timeOffset = time * 0.02;
        let dynamicValue = point;
        
        switch (type) {
          case 'signal':
            dynamicValue = Math.sin((index + timeOffset) * 0.1) * 0.5 + 
                          Math.sin((index + timeOffset) * 0.05) * 0.3;
            break;
          case 'neural':
            dynamicValue = Math.sin((index + timeOffset) * 0.15) * 0.6 + 
                          Math.cos((index + timeOffset) * 0.08) * 0.2 +
                          (Math.random() - 0.5) * 0.1;
            break;
          case 'quantum':
            dynamicValue = (Math.random() - 0.5) * 0.8 + 
                          Math.sin((index + timeOffset) * 0.12) * 0.4;
            break;
        }
        
        return dynamicValue;
      });

      // Draw waveform
      ctx.strokeStyle = type === 'signal' ? '#00d4ff' : '#ff0040';
      ctx.lineWidth = 0.2;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 5;
      
      ctx.beginPath();
      
      points.forEach((point, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height / 2 + (point * height * 0.3);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Add glow effect
      ctx.globalCompositeOperation = 'screen';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      
      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (animated) {
      animate();
    } else {
      // Static waveform
      const points = generateWaveData();
      
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      ctx.strokeStyle = type === 'signal' ? '#00d4ff' : '#ff0040';
      ctx.lineWidth = 2;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height / 2 + (point * height * 0.3);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
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

  return (
    <div className="w-full h-full relative">
      <SignalIcon />

      
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M 20 0 L 0 0 0 20" 
                fill="none" 
                stroke={type === 'signal' ? '#13d4fc' : '#ff0040'} 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
     
    </div>
  );
};

export default WaveformDisplay;