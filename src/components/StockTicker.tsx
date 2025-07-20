import React, { useState, useEffect } from 'react';
import type { Stock } from '../types';

interface StockTickerProps {
  stocks?: Stock[];
}

export const StockTicker: React.FC<StockTickerProps> = ({ stocks }) => {
  const [currentStocks, setCurrentStocks] = useState<Stock[]>([
    { ticker: 'SRP 500', price: 4521.23, change: -0.66, changePercent: 4.16 },
    { ticker: 'META', price: 298.45, change: 3.11, changePercent: 0.52 },
    { ticker: 'AAPL', price: 189.67, change: 1.45, changePercent: 0.44 },
  ]);

  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate real-time stock updates
    const interval = setInterval(() => {
      setCurrentStocks(prev => prev.map((stock, index) => {
        if (Math.random() > 0.7) { // 30% chance to update each stock
          setAnimatingIndex(index);
          setTimeout(() => setAnimatingIndex(null), 1000);
          
          const changeAmount = (Math.random() - 0.5) * 2; // Random change between -1 and 1
          const newPrice = Math.max(0.01, stock.price + changeAmount);
          const newChange = changeAmount;
          const newChangePercent = (changeAmount / stock.price) * 100;
          
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent
          };
        }
        return stock;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => price.toFixed(2);
  const formatChange = (change: number) => (change >= 0 ? '+' : '') + change.toFixed(2);
  const formatPercent = (percent: number) => Math.abs(percent).toFixed(2) + '%';

  return (
    <div className="space-y-3">
      {currentStocks.map((stock, index) => (
        <div 
          key={stock.ticker}
          className={`stock-ticker grid grid-cols-3 gap-2 items-center transition-all duration-500 ${
            animatingIndex === index ? 'transform scale-105' : ''
          }`}
        >
          <span className="text-cyan-300 text-glow-cyan font-medium tracking-wide">
            {stock.ticker}
          </span>
          <span 
            className={`text-right font-mono transition-colors duration-500 ${
              stock.change >= 0 
                ? 'text-green-400' 
                : 'text-red-400 text-glow-red'
            }`}
          >
            {formatChange(stock.change)}
          </span>
          <span 
            className={`text-right text-sm opacity-80 transition-colors duration-500 ${
              stock.change >= 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}
          >
            {formatPercent(stock.changePercent)}
          </span>
        </div>
      ))}
      
      {/* Data stream effect */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent data-stream" />
      </div>
    </div>
  );
};