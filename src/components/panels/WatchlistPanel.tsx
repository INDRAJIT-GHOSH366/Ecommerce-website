
import React from 'react';
import { Plus, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import { Button } from '@/components/ui/button';

export const WatchlistPanel = () => {
  const { watchlist, removeFromWatchlist, setCurrentSymbol } = useTrading();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Watchlist</h3>
          <Button size="sm" variant="ghost" className="glass-button p-1">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Watchlist Items */}
      <div className="flex-1 overflow-y-auto">
        {watchlist.map((item) => (
          <div
            key={item.symbol}
            className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-colors"
            onClick={() => setCurrentSymbol(item.symbol)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">
                    {item.symbol}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(item.symbol);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3 text-red-400" />
                  </Button>
                </div>
                <div className="text-xs text-gray-400 mb-2">{item.name}</div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-white">
                    ${item.price.toLocaleString()}
                  </span>
                  <div className={`flex items-center space-x-1 text-xs ${
                    item.change >= 0 ? 'text-trading-success' : 'text-trading-danger'
                  }`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}</span>
                    <span>({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mini Sparkline */}
            <div className="mt-2 h-8 bg-white/5 rounded relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-between px-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-t transition-all ${
                      item.change >= 0 ? 'bg-trading-success' : 'bg-trading-danger'
                    }`}
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      opacity: 0.3 + Math.random() * 0.7 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
