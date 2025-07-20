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

  useEffect(() => {
    // Animate load bars on mount
    const timer = setTimeout(() => {
      setAnimatedLoads(processes.map(p => p.load));
    }, 500);

    // Simulate real-time load changes
    const interval = setInterval(() => {
      setAnimatedLoads(prev => prev.map((load, index) => {
        const process = processes[index];
        if (Math.random() > 0.8) { // 20% chance to update
          const variation = (Math.random() - 0.5) * 20; // ±10 variation
          return Math.max(0, Math.min(process.maxLoad, load + variation));
        }
        return load;
      }));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [processes]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'critical': return 'bg-red-500';
      case 'idle': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-cyan-500';
    }
  };

  const getLoadColor = (load: number, maxLoad: number) => {
    const percentage = (load / maxLoad) * 100;
    if (percentage > 90) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="h-full">
      <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-400 text-glow-red mb-4 font-bold">
        DAEMONS
      </h2>
      
      <div className="space-y-3">
        {processes.map((process, index) => (
          <div key={process.id} className="space-y-1">
            {/* Process name and status */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-mono">{process.name}</span>
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-2 h-2 rounded-full ${getStatusColor(process.status)} ${
                    process.status === 'active' ? 'animate-pulse' : ''
                  }`}
                />
                <span className="text-cyan-400 text-xs">
                  {Math.round(animatedLoads[index])}%
                </span>
              </div>
            </div>
            
            {/* Load bar */}
            <div className="w-full bg-red-900/30 h-2 rounded-sm overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out ${getLoadColor(animatedLoads[index], process.maxLoad)}`}
                style={{ 
                  width: `${(animatedLoads[index] / process.maxLoad) * 100}%`,
                  boxShadow: `0 0 10px ${
                    animatedLoads[index] > 90 ? 'rgba(255, 0, 0, 0.5)' : 
                    animatedLoads[index] > 70 ? 'rgba(255, 255, 0, 0.3)' : 
                    'rgba(0, 255, 0, 0.3)'
                  }`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* System status summary */}
      <div className="mt-4 pt-3 border-t border-red-500/30">
        <div className="flex justify-between text-xs">
          <span className="text-red-400/60">SYS LOAD</span>
          <span className="text-cyan-400">
            {Math.round(animatedLoads.reduce((a, b) => a + b, 0) / processes.length)}%
          </span>
        </div>
        <div className="mt-1 w-full bg-red-900/30 h-1 rounded-sm overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000"
            style={{ 
              width: `${(animatedLoads.reduce((a, b) => a + b, 0) / processes.length)}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};