import React, { useState } from "react";
import Panel from "./components/Panel";
import Globe from "./components/Globe";
import { Command } from "./components/Command";
import { RadarCore } from "./components/RadarCore";
import { StockTicker } from "./components/StockTicker";
import { BreakingNews } from "./components/BreakingNews";
import { DaemonMonitor } from "./components/DaemonMonitor";
import { WaveformDisplay } from "./components/WaveformDisplay";
import { StartupSequence } from "./components/StartupSequence";



// --- UI Panels --- //
const NovaNewsPanel: React.FC = () => (
  <Panel className="h-full panel-interactive holo-shimmer" contentClassName="p-3">
    <h2 className="text-sm sm:text-base uppercase tracking-widest text-cyan-400 text-glow-cyan mb-3 font-bold holo-text">
      NOVANEWS
    </h2>
    <StockTicker />
  </Panel>
);

const BreakingNewsPanel: React.FC = () => (
  <Panel className="h-full panel-interactive holo-shimmer" contentClassName="p-3">
    <BreakingNews />
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
    variant="memory"
    className="h-full panel-interactive holo-shimmer"
    contentClassName="p-3"
  >
    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 text-glow-red tracking-widest holo-text">
      MEMORY
    </span>
  </Panel>
);

const MemoryPanel: React.FC = () => (
  <Panel className="h-full panel-interactive holo-shimmer" contentClassName="p-3">
    <RadarCore size="large" variant="memory" animated={true} />
  </Panel>
);

const DaemonsPanel: React.FC = () => (
  <Panel className="h-full panel-interactive holo-shimmer" contentClassName="p-3">
    <DaemonMonitor />
  </Panel>
);
// --- Main App Component --- //
export default function App() {
  const [showStartup, setShowStartup] = useState(true);

  const handleStartupComplete = () => {
    setShowStartup(false);
  };

  if (showStartup) {
    return <StartupSequence onComplete={handleStartupComplete} />;
  }

  return (
    <main className="text-red-400 h-screen w-screen p-8 flex items-center justify-center circuit-bg gpu-accelerated">
      {/* Ambient fog overlay */}
      <div className="ambient-fog" />

      <div className="relative w-full h-full max-w-[85vw] max-h-[80vh] parallax-layer">
        <div className="relative z-10 grid grid-cols-12 grid-rows-12 gap-3 w-full h-full">
          {/* Top Left Title */}
          <div className="col-start-1 col-span-4 row-start-1 row-span-1">
            <Panel
              variant="header"
              className="h-full panel-interactive holo-shimmer"
              contentClassName="flex items-center justify-start p-3"
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 text-glow-red tracking-widest holo-text">
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
            <Panel className="h-full panel-interactive holo-shimmer" contentClassName="p-3">
              <Command />
            </Panel>
          </div>

          <div className="col-start-1 col-span-2 row-start-9 row-span-3">
            <Panel
              variant="circular"
              className="h-full panel-interactive"
              contentClassName="p-3 flex items-center justify-center"
            >
              <RadarCore size="medium" variant="scanner" animated={true} />
            </Panel>
          </div>

          {/* Center Column */}
          <div className="col-start-5 col-span-4 row-start-4 row-span-5 flex items-center justify-center">
            <RadarCore size="large" variant="core" animated={true} />
          </div>

          <div className="col-start-4 col-span-4 row-start-10 row-span-2">
            <Panel
              variant="rectangular"
              className="h-full panel-interactive holo-shimmer"
              contentClassName="p-3"
            >
              <WaveformDisplay type="signal" animated={true} />
            </Panel>
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
            <Panel className="h-full panel-interactive holo-shimmer globe-container" contentClassName="p-3">
              <div className="globe-cinematic">
                <Globe />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </main>
  );
}
