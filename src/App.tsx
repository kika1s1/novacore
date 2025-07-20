import React, { useState, useEffect } from "react";
import Panel from "./components/Panel";
import ConnectingLines from "./components/ConnectingLines";
import Globe from "./components/Globe";
import { HudPanel } from "./components/HudPanel";
import { Radar } from "./components/svg/Radar";
// import { Waveform } from "./components/svg/Waveform";
import { Command } from "./components/Command";

// --- SVG Icons --- //
const RadarIcon: React.FC<{ spinning?: boolean }> = ({ spinning = false }) => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-cyan-400"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g
      filter="url(#cyanGlow)"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    >
      <circle cx="50" cy="50" r="45" opacity="0.4" />
      <circle cx="50" cy="50" r="30" opacity="0.4" />
      <circle cx="50" cy="50" r="15" opacity="0.4" />
      <line x1="50" y1="5" x2="50" y2="95" opacity="0.4" />
      <line x1="5" y1="50" x2="95" y2="50" opacity="0.4" />
      {spinning && (
        <path
          d="M 50 50 L 50 5 A 45 45 0 0 1 85.35 27.5 Z"
          fill="currentColor"
          opacity="0.3"
          className="animate-sweep"
        />
      )}
    </g>
  </svg>
);

// const GlobeIcon: React.FC = () => (
//     <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400 animate-pulse-light" preserveAspectRatio="xMidYMid meet">
//         <defs>
//              <filter id="globeGlow" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
//                 <feMerge>
//                     <feMergeNode in="blur" />
//                     <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//             </filter>
//         </defs>
//         <g filter="url(#globeGlow)" stroke="currentColor" strokeWidth="0.75" fill="none">
//             <circle cx="50" cy="50" r="48" strokeWidth="1.5" opacity="0.8" />
//             <path d="M50,2 a48,48 0 1,0 0,96 a48,48 0 1,0 0,-96" fill="currentColor" opacity="0.1" />
//             {/* Grid Lines */}
//             <path d="M10 50 Q 50 30 90 50" opacity="0.6"/>
//             <path d="M10 50 Q 50 70 90 50" opacity="0.6"/>
//             <path d="M20 25 Q 50 35 80 25" opacity="0.6"/>
//             <path d="M20 75 Q 50 65 80 75" opacity="0.6"/>
//             <path d="M50 2 Q 30 50 50 98" opacity="0.6"/>
//             <path d="M50 2 Q 70 50 50 98" opacity="0.6"/>
//             <path d="M25 20 Q 35 50 25 80" opacity="0.6"/>
//             <path d="M75 20 Q 65 50 75 80" opacity="0.6"/>
//         </g>
//     </svg>
// );

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

const CenterpieceIcon: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full text-red-500 animate-pulse-light"
    preserveAspectRatio="xMidYMid meet"
  >
    <g fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="50" cy="50" r="45" opacity="0.3" />
      <circle cx="50" cy="50" r="35" opacity="0.5" />
      <circle cx="50" cy="50" r="25" opacity="0.7" />
      <circle cx="50" cy="50" r="15" opacity="0.8" />
    </g>
  </svg>
);

// const RedRadarIcon: React.FC = () => (
//   <svg
//     viewBox="0 0 100 100"
//     className="w-full h-full text-red-500"
//     preserveAspectRatio="xMidYMid meet"
//   >
//     <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6">
//       <circle cx="50" cy="50" r="45" />
//       <circle cx="50" cy="50" r="30" />
//       <circle cx="50" cy="50" r="15" />
//       <circle cx="50" cy="50" r="5" fill="currentColor" />
//     </g>
//   </svg>
// );

// --- UI Panels --- //
const NovaNewsPanel: React.FC = () => (
  <Panel className="h-full" contentClassName="p-3">
    <h2 className="text-sm sm:text-base uppercase tracking-widest text-cyan-400 text-glow-cyan mb-3">
      NOVANEWS
    </h2>
    <div className="space-y-2 text-xs sm:text-sm">
      <div className="grid grid-cols-3 gap-2 items-center">
        <span className="text-cyan-300">SRP 500</span>
        <span className="text-red-400 text-glow-red text-right">-0.66</span>
        <span className="text-red-500/80 text-right">4.16%</span>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <span className="text-cyan-300">META</span>
        <span className="text-red-400 text-glow-red text-right">+3.11</span>
        <span className="text-red-500/80 text-right">0.52%</span>
      </div>
      <div className="grid grid-cols-3 gap-2 items-center">
        <span className="text-cyan-300">AAPL</span>
        <span className="text-red-400 text-glow-red text-right">1.45</span>
        <span className="text-red-500/80 text-right">0.44%</span>
      </div>
    </div>
  </Panel>
);

const BreakingNewsPanel: React.FC = () => (
  <Panel className="h-full" contentClassName="p-3 flex flex-col justify-center">
    <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-400 text-glow-red mb-2">
      BREAKING NEWS
    </h2>
    <div className="flex space-x-2 text-xs sm:text-[10px] xl:text-xs">
      <button className="flex-1 p-1 border border-red-500/50 text-red-400/80 hover:bg-red-500/20 hover:text-red-400 transition-colors">
        ALL SPORTS
      </button>
      <button className="flex-1 p-1 border border-red-500/50 text-red-400/80 hover:bg-red-500/20 hover:text-red-400 transition-colors">
        SPORT A
      </button>
    </div>
  </Panel>
);

// const CommandPanel: React.FC = () => (
//   <Panel className="h-full" contentClassName="p-3 overflow-y-auto">
//     <>
//       <h2 className="text-sm sm:text-base uppercase tracking-widest text-cyan-400 text-glow-cyan mb-3">
//         COMMAND
//       </h2>
//       <div className="space-y-2 text-xs sm:text-sm">
//         <p className="text-cyan-300">&gt; what is the status?</p>
//         <p className="text-cyan-300">&gt; All systems are operational</p>
        
//         <form className="flex-shrink-0 ">
//           <div className="flex items-center bg-black/30 border-t">
//             <span className="text-cyan-400 pl-2">&gt;</span>
//             <input
//               type="text"
//               className="w-full bg-transparent p-2 text-cyan-300 focus:outline-none placeholder-cyan-700 caret-cyan-400"
//               placeholder="Enter command..."
//               autoFocus
//             />
//           </div>
//         </form>
//       </div>
//     </>
//   </Panel>
// );
const Memory: React.FC = () => (
  <Panel
    className="h-full"
    contentClassName="p-3"
  >
    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 text-glow-red tracking-widest">
      MEMORY
    </span>
  </Panel>
);

const MemoryPanel: React.FC = () => (
  <div className="h-full relative pt-4">
    <Panel className="h-full" contentClassName="p-3">
      <div className="w-full h-full">
        <RadarIcon spinning={true} />


      </div>
    </Panel>
  </div>
);

const DaemonsPanel: React.FC = () => {
  const targetWidths = [90, 80, 95, 60, 70];
  const initialWidths = [0, 0, 0, 0, 0];
  const [widths, setWidths] = useState(initialWidths);

  useEffect(() => {
    const toggles = [true, true, true, true, true]; // forward flags for each bar
    const intervals: NodeJS.Timeout[] = [];

    targetWidths.forEach((target, i) => {
      const interval = setInterval(() => {
        setWidths((prev) =>
          prev.map((v, index) =>
            index === i
              ? toggles[i]
                ? target
                : 0
              : v
          )
        );
        toggles[i] = !toggles[i];
      }, 1000 + i * 300); // delay each by 300ms more
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <Panel className="h-full" contentClassName="p-3">
      <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-400 text-glow-red mb-3">
        DAEMONS
      </h2>
      <div className="space-y-2 sm:space-y-2.5 pt-1">
        {widths.map((width, index) => (
          <div key={index} className="w-full bg-red-900/50 h-1.5 sm:h-2">
            <div
              className="bg-red-500 h-full transition-all duration-1000 ease-in-out"
              style={{ width: `${width}%` }}
            ></div>
          </div>
        ))}
      </div>
    </Panel>
  );
};
// --- Main App Component --- //
export default function App() {
  return (
    <main className=" text-red-400 min-h-screen p-2 sm:p-4 lg:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-7xl aspect-[16/10]">
        <ConnectingLines />
        <div className="relative z-10 grid grid-cols-12 grid-rows-12 gap-4 w-full h-full">
          {/* Top Left Title */}
          <div className="col-start-1 col-span-4 row-start-1 row-span-1">
            <Panel
              className="h-full"
              contentClassName="flex items-center justify-start p-3"
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 text-glow-red tracking-widest">
                NOVACORE
              </h1>
            </Panel>
          </div>

          {/* Left Column */}
          <div className="col-start-1 col-span-4 row-start-2 row-span-3">
            <NovaNewsPanel />
          </div>
          <div className="col-start-1 col-span-4 row-start-5 row-span-2">
            <BreakingNewsPanel />
          </div>
          <div className="col-start-1 col-span-4 row-start-7 row-span-2">
            {/* <CommandPanel /> */}
            <Panel  className="h-full"
              contentClassName="p-3">
              <Command />
            </Panel>
          </div>
          {/* <div className="col-start-2 col-span-2 row-start-9 row-span-3">
            <Panel className="h-full" contentClassName="p-3">
              <RedRadarIcon />
            </Panel>
          </div> */}
          <div className="col-start-1 col-span-2 row-start-9 row-span-3">
            <HudPanel
              title=""
              clipPath="polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))"
            >
              <Radar size={0} />
            </HudPanel>
          </div>

          {/* Center Column */}
          <div className="col-start-5 col-span-4 row-start-4 row-span-5 flex items-center justify-center">
            <CenterpieceIcon />
          </div>
          {/* <div className="col-start-5 col-span-4 row-start-9 row-span-2">
            <Panel
              className="h-full"
              contentClassName="flex items-center justify-center p-3"
            >
              <SignalIcon />
            </Panel>
          </div> */}
          <div className="col-start-4 col-span-4 row-start-10 row-span-2">
            <HudPanel
              title=""
              clipPath="polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)"
            >
              <SignalIcon />
            </HudPanel>
          </div>

          {/* Right Column */}
          <div className="col-start-9 col-span-4 row-start-1 row-span-1">
            <Memory />
          </div>
          <div className="col-start-9 col-span-4 row-start-2 row-span-3">
            <MemoryPanel />
          </div>
          <div className="col-start-9 col-span-4 row-start-5 row-span-3">
            <DaemonsPanel />
          </div>
          <div className="col-start-9 col-span-4 row-start-8 row-span-4">
            <Panel className="h-full" contentClassName="p-3">
              <Globe />
            </Panel>
          </div>
        </div>
      </div>
    </main>
  );
}
