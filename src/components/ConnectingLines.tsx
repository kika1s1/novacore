import React from 'react';

const ConnectingLines: React.FC = () => {
  return (
    <svg className="absolute top-0 left-0 w-full h-full z-0" preserveAspectRatio="none">
        <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g stroke="rgba(255, 0, 0, 0.25)" strokeWidth="1" filter="url(#glow)">
            {/* Centerpiece to Panels */}
            <line x1="50%" y1="50%" x2="33%" y2="33%" /> {/* to Novanews */}
            <line x1="50%" y1="50%" x2="68%" y2="25%" /> {/* to Memory */}
            <line x1="50%" y1="50%" x2="68%" y2="55%" /> {/* to Daemons */}
            <line x1="50%" y1="50%" x2="33%" y2="65%" /> {/* to Command */}

            {/* Vertical connections */}
            <line x1="83.33%" y1="33%" x2="83.33%" y2="41.66%" /> {/* Memory to Daemons */}
            <line x1="83.33%" y1="58.33%" x2="83.33%" y2="66.66%" /> {/* Daemons to Globe */}
            
            <line x1="16.66%" y1="33.33%" x2="16.66%" y2="41.66%" /> {/* Novanews to Breaking */}
            <line x1="16.66%" y1="45.83%" x2="16.66%" y2="50%" /> {/* Breaking to Command */}
            <line x1="16.66%" y1="75%" x2="16.66%" y2="83.33%" /> {/* Command to Bottom Left Radar */}
        </g>
    </svg>
  );
};

export default ConnectingLines;