import React, { useState, useEffect } from 'react';

interface DaemonProcess {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'critical' | 'offline';
  load: number;
  maxLoad: number;
}

export const DaemonMonitor: React.FC = () => {
  const [processes] = useState<DaemonProcess[]>([
    { id: 'core', name: 'CORE.SYS', status: 'active', load: 85, maxLoad: 100 },
    { id: 'neural', name: 'NEURAL.NET', status: 'active', load: 72, maxLoad: 100 },
    { id: 'security', name: 'SEC.GUARD', status: 'critical', load: 95, maxLoad: 100 },
    { id: 'data', name: 'DATA.PROC', status: 'idle', load: 23, maxLoad: 100 },
    { id: 'comm', name: 'COMM.LINK', status: 'active', load: 67, maxLoad: 100 },
  ]);

  const [animatedLoads, setAnimatedLoads] = useState<number[]>(processes.map(() => 0));
  const [pulseIntensity, setPulseIntensity] = useState<number[]>(processes.map(() => 0));

  useEffect(() => {
    // Animate load bars on mount with staggered timing
    const timer = setTimeout(() => {
      setAnimatedLoads(processes.map(p => p.load));
    }, 500);

    // Real-time load simulation with more dynamic behavior
    const interval = setInterval(() => {
      setAnimatedLoads(prev => prev.map((load, index) => {
        const process = processes[index];
        if (Math.random() > 0.7) { // 30% chance to update
          const variation = (Math.random() - 0.5) * 25; // ±12.5 variation
          return Math.max(5, Math.min(process.maxLoad, load + variation));
        }
        return load;
      }));
    }, 1500);

    // Pulse intensity for glow effects
    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => prev.map(() => Math.random()));
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, [processes]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#00ff00';
      case 'critical': return '#ff0040';
      case 'idle': return '#ffaa00';
      case 'offline': return '#666666';
      default: return '#00d4ff';
    }
  };

  const getLoadColor = (load: number, maxLoad: number) => {
    const percentage = (load / maxLoad) * 100;
    if (percentage > 90) return '#ff0040';
    if (percentage > 70) return '#ffaa00';
    return '#00ff00';
  };

  const getLoadGradient = (load: number, maxLoad: number) => {
    const percentage = (load / maxLoad) * 100;
    if (percentage > 90) {
      return 'linear-gradient(90deg, #ff0040 0%, #ff4060 50%, #ff0040 100%)';
    } else if (percentage > 70) {
      return 'linear-gradient(90deg, #ffaa00 0%, #ffcc40 50%, #ffaa00 100%)';
    }
    return 'linear-gradient(90deg, #00ff00 0%, #40ff40 50%, #00ff00 100%)';
  };

  return (
    <div className="h-full gpu-accelerated">
      <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-400 text-glow-red mb-4 font-bold holo-shimmer">
        DAEMONS
      </h2>
      
      <div className="space-y-4">
        {processes.map((process, index) => (
          <div key={process.id} className="space-y-2 panel-interactive">
            {/* Process name and status */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-mono text-glow-cyan">{process.name}</span>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: getStatusColor(process.status),
                    boxShadow: `0 0 8px ${getStatusColor(process.status)}, 0 0 16px ${getStatusColor(process.status)}40`,
                    animation: process.status === 'active' ? 'biometric-pulse 1.5s ease-in-out infinite' : 
                              process.status === 'critical' ? 'biometric-pulse 0.8s ease-in-out infinite' : 'none'
                  }}
                />
                <span 
                  className="text-cyan-400 text-xs font-mono"
                  style={{
                    textShadow: `0 0 5px #00d4ff, 0 0 10px #00d4ff${Math.round(pulseIntensity[index] * 100).toString(16)}`
                  }}
                >
                  {Math.round(animatedLoads[index])}%
                </span>
              </div>
            </div>
            
            {/* Enhanced load bar with CGI effects */}
            <div className="relative w-full h-3 bg-black/60 rounded-sm overflow-hidden border border-red-900/50">
              {/* Background grid pattern */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(255,0,64,0.3) 1px, transparent 1px)',
                  backgroundSize: '4px 100%'
                }}
              />
              
              {/* Main load bar */}
              <div
                className={`daemon-bar h-full relative overflow-hidden`}
                style={{ 
                  width: `${(animatedLoads[index] / process.maxLoad) * 100}%`,
                  background: getLoadGradient(animatedLoads[index], process.maxLoad),
                  boxShadow: `0 0 10px ${getLoadColor(animatedLoads[index], process.maxLoad)}, 
                             0 0 20px ${getLoadColor(animatedLoads[index], process.maxLoad)}60,
                             inset 0 0 10px ${getLoadColor(animatedLoads[index], process.maxLoad)}40`,
                  animation: `daemon-activity ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    animation: 'holo-shimmer 2s linear infinite'
                  }}
                />
              </div>
              
              {/* Overflow glow effect */}
              {animatedLoads[index] > 90 && (
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,0,64,0.3) 0%, transparent 70%)',
                    animation: 'biometric-pulse 0.5s ease-in-out infinite'
                  }}
                />
              )}
            </div>

            {/* Process activity indicators */}
            <div className="flex justify-between text-xs opacity-60">
              <span className="text-cyan-400 font-mono">{process.status.toUpperCase()}</span>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: i < (animatedLoads[index] / 20) ? getLoadColor(animatedLoads[index], process.maxLoad) : '#333',
                      animation: i < (animatedLoads[index] / 20) ? `biometric-pulse ${0.5 + i * 0.1}s ease-in-out infinite` : 'none',
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced system status summary */}
      <div className="mt-6 pt-4 border-t border-red-500/30 relative">
        <div className="ambient-fog" />
        
        <div className="flex justify-between text-xs mb-2">
          <span className="text-red-400/80 font-mono text-glow-red">SYS LOAD</span>
          <span 
            className="text-cyan-400 font-mono"
            style={{
              textShadow: '0 0 8px #00d4ff, 0 0 16px #00d4ff60'
            }}
          >
            {Math.round(animatedLoads.reduce((a, b) => a + b, 0) / processes.length)}%
          </span>
        </div>
        
        <div className="relative w-full h-2 bg-black/60 rounded-sm overflow-hidden border border-red-900/50">
          <div
            className="h-full relative"
            style={{ 
              width: `${(animatedLoads.reduce((a, b) => a + b, 0) / processes.length)}%`,
              background: 'linear-gradient(90deg, #00ff00 0%, #ffaa00 50%, #ff0040 100%)',
              boxShadow: '0 0 10px rgba(255,0,64,0.6), 0 0 20px rgba(255,0,64,0.3)',
              animation: 'biometric-pulse 2s ease-in-out infinite'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                animation: 'holo-shimmer 3s linear infinite'
              }}
            />
          </div>
        </div>

        {/* System health indicator */}
        <div className="flex justify-center mt-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: animatedLoads.reduce((a, b) => a + b, 0) / processes.length > 80 ? '#ff0040' : '#00ff00',
              boxShadow: `0 0 10px ${animatedLoads.reduce((a, b) => a + b, 0) / processes.length > 80 ? '#ff0040' : '#00ff00'}`,
              animation: 'reactor-core 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
};