import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className = '', contentClassName = '' }) => {
  return (
    <div className={`hud-panel box-glow-red backdrop-blur-sm ${className}`}>
      <div className={`relative w-full h-full content-wrapper ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Panel;