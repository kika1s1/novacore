
import React from 'react';

interface RadarProps {
    size: number;
}

export const Radar: React.FC<RadarProps> = ({ size }) => {
    const color = size > 100 ? "#00f0ff" : "#ff2a2a";
    const glowFilter = size > 100 ? "drop-shadow(0 0 10px rgba(0, 240, 255, 0.7))" : "drop-shadow(0 0 10px rgba(255, 42, 42, 0.7))";
    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: glowFilter }}>
                <defs>
                    <radialGradient id={`radarGradient-${color}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="0.5" opacity="0.8" />
                <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="0.25" opacity="0.6" />
                <circle cx="50" cy="50" r="24" fill="none" stroke={color} strokeWidth="0.25" opacity="0.6" />
                <circle cx="50" cy="50" r="12" fill="none" stroke={color} strokeWidth="0.25" opacity="0.6" />
                <line x1="50" y1="2" x2="50" y2="98" stroke={color} strokeWidth="0.25" opacity="0.6" />
                <line x1="2" y1="50" x2="98" y2="50" stroke={color} strokeWidth="0.25" opacity="0.6" />
                <g className="animate-sweep" style={{ transformOrigin: '50% 50%' }}>
                     <path d="M 50 50 L 50 2" stroke={color} strokeWidth="1" />
                     <path d="M 50 50 L 50 2" fill={`url(#radarGradient-${color})`} stroke="none" transform="scale(1.96)" style={{ transformOrigin: '50% 50%' }}/>
                </g>
                <circle cx="50" cy="50" r="2" fill={color} />
            </svg>
        </div>
    );
};
