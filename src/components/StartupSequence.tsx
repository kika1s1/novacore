import React, { useState, useEffect } from 'react';

interface StartupSequenceProps {
  onComplete: () => void;
}

export const StartupSequence: React.FC<StartupSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    'INITIALIZING NOVACORE SYSTEMS...',
    'LOADING NEURAL NETWORKS...',
    'ESTABLISHING SECURE CONNECTIONS...',
    'CALIBRATING HOLOGRAPHIC DISPLAYS...',
    'ACTIVATING AI PROTOCOLS...',
    'SYSTEMS ONLINE - WELCOME TO NOVACORE'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= bootSequence.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="startup-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path 
                d="M 50 0 L 0 0 0 50" 
                fill="none" 
                stroke="#ff0040" 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#startup-grid)" />
        </svg>
      </div>

      <div className="text-center space-y-8 max-w-2xl mx-auto px-8">
        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-red-500 text-glow-red tracking-widest mb-4">
            NOVACORE
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
        </div>

        {/* Boot sequence text */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-cyan-400 text-glow-cyan font-mono text-lg tracking-wide">
            {bootSequence[currentStep]}
            <span className="terminal-cursor">_</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between text-xs text-cyan-400 mb-2">
            <span>BOOT PROGRESS</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-red-900/30 h-2 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-cyan-400 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* System status indicators */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          {[
            { label: 'CORE SYS', status: progress > 20 ? 'ONLINE' : 'LOADING' },
            { label: 'NEURAL NET', status: progress > 40 ? 'ONLINE' : 'LOADING' },
            { label: 'SECURITY', status: progress > 60 ? 'ONLINE' : 'LOADING' },
            { label: 'HOLO DISP', status: progress > 80 ? 'ONLINE' : 'LOADING' }
          ].map((system, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-cyan-300">{system.label}</span>
              <span 
                className={`${
                  system.status === 'ONLINE' 
                    ? 'text-green-400' 
                    : 'text-yellow-400 animate-pulse'
                }`}
              >
                {system.status}
              </span>
            </div>
          ))}
        </div>

        {/* Warning text */}
        {progress > 90 && (
          <div className="text-red-400 text-xs font-mono animate-pulse">
            CLASSIFIED SYSTEM - AUTHORIZED PERSONNEL ONLY
          </div>
        )}
      </div>

      {/* Scanning line effect */}
      <div 
        className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
        style={{
          top: `${20 + (progress * 0.6)}%`,
          transition: 'top 0.1s ease-out'
        }}
      />
    </div>
  );
};