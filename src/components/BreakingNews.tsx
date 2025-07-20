import React, { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  category: string;
  headline: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const BreakingNews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL SPORTS' | 'SPORT A'>('ALL SPORTS');
  const [currentNews] = useState<NewsItem[]>([
    { id: 1, category: 'SPORTS', headline: 'Championship finals begin tonight', priority: 'high' },
    { id: 2, category: 'SPORT A', headline: 'Record broken in qualifying rounds', priority: 'medium' },
    { id: 3, category: 'SPORTS', headline: 'Weather conditions optimal for event', priority: 'low' },
  ]);
  
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setDisplayIndex(prev => (prev + 1) % currentNews.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentNews.length]);

  const filteredNews = activeCategory === 'ALL SPORTS' 
    ? currentNews 
    : currentNews.filter(news => news.category === 'SPORT A');

  const currentItem = filteredNews[displayIndex % filteredNews.length];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 text-glow-red';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-cyan-400 text-glow-cyan';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-sm sm:text-base uppercase tracking-widest text-red-400 text-glow-red mb-3 font-bold">
        BREAKING NEWS
      </h2>
      
      {/* Category buttons */}
      <div className="flex space-x-2 mb-4">
        {(['ALL SPORTS', 'SPORT A'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex-1 p-2 text-xs font-medium transition-all duration-300 nova-button ${
              activeCategory === category 
                ? 'bg-red-500/30 border-red-400 text-red-300' 
                : 'border-red-500/50 text-red-400/80 hover:bg-red-500/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News ticker */}
      <div className="flex-1 relative overflow-hidden">
        <div 
          className={`transition-all duration-300 ${
            isAnimating ? 'transform translate-y-2 opacity-0' : 'transform translate-y-0 opacity-100'
          }`}
        >
          {currentItem && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-300 uppercase tracking-wider">
                  {currentItem.category}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${getPriorityColor(currentItem.priority)}`}>
                {currentItem.headline}
              </p>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-red-900/50">
          <div 
            className="h-full bg-red-500 transition-all duration-4000 ease-linear"
            style={{ 
              width: `${((displayIndex % filteredNews.length) + 1) / filteredNews.length * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Alert indicator */}
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-red-500/60">LIVE</span>
        <div className="flex space-x-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className={`w-1 h-1 rounded-full ${
                i <= displayIndex % 3 ? 'bg-red-500' : 'bg-red-900'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};