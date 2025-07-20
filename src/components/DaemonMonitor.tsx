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

  // All load bars are red
  const getLoadColor = () => 'bg-red-500';

  return (
    <div className="h-full">
      <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-500 text-glow-red mb-4 font-bold">
        DAEMONS
      </h2>
      <div className="space-y-3">
        {processes.map((process, index) => (
          <div key={process.id} className="space-y-1">
            {/* Only percentage and bar visible */}
            <div className="flex items-center justify-end text-xs mb-1">
              <span className="text-red-500 text-xs font-bold">
                {Math.round(animatedLoads[index])}%
              </span>
            </div>
            <div className="w-full bg-red-900/30 h-2 rounded-sm overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out ${getLoadColor()}`}
                style={{ 
                  width: `${(animatedLoads[index] / process.maxLoad) * 100}%`,
                  boxShadow: `0 0 10px rgba(255, 0, 0, 0.7)`
                }}
              />
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};