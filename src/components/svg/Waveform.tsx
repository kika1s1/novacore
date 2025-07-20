
import React from 'react';

export const Waveform: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 100 40" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 240, 255, 0.7))' }}>
                <path d="M 0 20 L 100 20" stroke="#00f0ff" strokeWidth="0.2" opacity="0.5" />
                <path
                    className="waveform-path"
                    d="M 0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20"
                    stroke="#00f0ff"
                    strokeWidth="1"
                    fill="none"
                />
                 <circle cx="50" cy="20" r="18" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.8" />
                 <circle cx="50" cy="20" r="1" fill="#00f0ff" />
            </svg>
        </div>
    );
};
