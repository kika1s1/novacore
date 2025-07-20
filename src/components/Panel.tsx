import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: 'default' | 'stark' | 'minimal' | "header" |"circular" | "rectangular" | "memory";
}

const Panel: React.FC<PanelProps> = ({ 
  children, 
  className = '', 
  contentClassName = '',
  variant = 'stark',

}) => {
  const baseClasses = variant === 'stark' 
    ? 'nova-panel stark-corners' 
    : variant === 'minimal'
    ? 'holographic-border'
    : 'hud-panel box-glow-red backdrop-blur-sm';

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className={`relative w-full h-full content-wrapper ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Panel;