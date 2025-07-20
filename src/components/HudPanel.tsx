import React from 'react';

interface HudPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  clipPath: string;
}

export const HudPanel: React.FC<HudPanelProps> = ({ title, children, className = '', clipPath }) => {
  return (
    <div
      className={`h-full w-full bg-black/30 border border-red-500/40 backdrop-blur-sm p-3 flex flex-col ${className}`}
      style={{ clipPath: clipPath }}
    >
      {title && (
         <h2 className="font-tech uppercase tracking-widest text-red-500 text-glow-red mb-2 text-lg flex-shrink-0">{title}</h2>
      )}
      <div className="font-tech text-cyan-300 text-glow-cyan flex-grow overflow-hidden">
        {children}
      </div>
    </div>
  );
};