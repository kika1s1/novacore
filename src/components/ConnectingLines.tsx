import React from "react";

const ConnectingLines: React.FC = () => {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="rgba(255, 0, 0, 0.4)" strokeWidth="0.3" filter="url(#glow)">
        {/* Center to Panels */}
        <line x1="40" y1="42" x2="33" y2="33" /> {/* Novanews */}
        <line x1="60" y1="42" x2="80" y2="25" /> {/* Memory */}
        <line x1="61" y1="50" x2="70" y2="50" /> {/* Daemons */}
        <line x1="40" y1="70" x2="45" y2="57.5" /> {/* Command */}
        <line x1="38.5" y1="47.5" x2="33" y2="45" /> {/* Command */}
        <line x1="39" y1="50" x2="30" y2="55" /> {/* Command */}
        <line x1="56" y1="57" x2="68" y2="65" /> {/* Command */}


        {/* Vertical branches on right side */}
        <line x1="83.33" y1="33" x2="83.33" y2="41.66" /> {/* Memory to Daemons */}
        <line x1="83.33" y1="58.33" x2="83.33" y2="66.66" /> {/* Daemons to Globe */}

        {/* Vertical branches on left side */}
        <line x1="16.66" y1="33.33" x2="16.66" y2="41.66" /> {/* Novanews to Breaking */}
        <line x1="16.66" y1="45.83" x2="16.66" y2="60" /> {/* Breaking to Command */}
        {/* <line x1="16.66" y1="75" x2="16.66" y2="83.33" /> */}
      </g>
    </svg>
  );
};

export default ConnectingLines;
