
import React, { useState } from 'react';
import { Search, Settings, User, Moon, Sun, TrendingUp } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import { SymbolSearch } from '@/components/ui/SymbolSearch';
import { Button } from '@/components/ui/button';

export const TopNavigation = () => {
  const { currentSymbol, timeframe, setTimeframe, chartType, setChartType, isDarkTheme, toggleTheme } = useTrading();
  const [showSearch, setShowSearch] = useState(false);

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];
  const chartTypes = ['candlestick', 'line', 'area', 'ohlc'];

  return (
    <div className="glass-panel border-b border-white/10 px-4 py-3 flex items-center justify-between relative z-50">
      {/* Left Section - Logo & Symbol */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-8 w-8 text-trading-emerald" />
          <span className="text-xl font-bold bg-gradient-to-r from-trading-emerald to-trading-sky bg-clip-text text-transparent">
            Ecommerce Service
          </span>
        </div>
        
        <div className="h-6 w-px bg-white/20" />
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="glass-button px-3 py-2 text-sm font-medium hover:text-trading-emerald"
          >
            {currentSymbol}
          </button>
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Center Section - Timeframes & Chart Types */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                timeframe === tf 
                  ? 'bg-trading-emerald text-black font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          {chartTypes.map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 text-xs rounded capitalize transition-all ${
                chartType === type 
                  ? 'bg-trading-sky text-black font-medium' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="glass-button"
        >
          {isDarkTheme ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button variant="ghost" size="sm" className="glass-button">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="glass-button">
          <User className="h-4 w-4" />
        </Button>
      </div>

      {/* Symbol Search Dropdown */}
      {showSearch && (
        <div className="absolute top-full left-4 mt-2 z-50">
          <SymbolSearch onClose={() => setShowSearch(false)} />
        </div>
      )}
    </div>
  );
};
