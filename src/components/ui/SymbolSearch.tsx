
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';

const mockSymbols = [
  { symbol: 'BTC/USD', name: 'Bitcoin', price: 43250, change: 2.98, category: 'crypto' },
  { symbol: 'ETH/USD', name: 'Ethereum', price: 2650, change: -3.11, category: 'crypto' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.25, change: 1.17, category: 'stocks' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -2.07, category: 'stocks' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.80, change: 0.85, category: 'stocks' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 1.24, category: 'stocks' },
  { symbol: 'EUR/USD', name: 'Euro Dollar', price: 1.0845, change: 0.12, category: 'forex' },
  { symbol: 'GBP/USD', name: 'British Pound', price: 1.2680, change: -0.08, category: 'forex' },
];

interface SymbolSearchProps {
  onClose: () => void;
}

export const SymbolSearch: React.FC<SymbolSearchProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [filteredSymbols, setFilteredSymbols] = useState(mockSymbols);
  const { setCurrentSymbol } = useTrading();

  useEffect(() => {
    const filtered = mockSymbols.filter(
      symbol =>
        symbol.symbol.toLowerCase().includes(query.toLowerCase()) ||
        symbol.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSymbols(filtered);
  }, [query]);

  const handleSymbolSelect = (symbol: string) => {
    setCurrentSymbol(symbol);
    onClose();
  };

  return (
    <div className="glass-panel p-4 w-96 max-h-96 overflow-hidden flex flex-col border border-white/20 rounded-lg">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symbols..."
          className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-trading-emerald transition-colors"
          autoFocus
        />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {filteredSymbols.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No symbols found</p>
          </div>
        ) : (
          filteredSymbols.map((symbol) => (
            <div
              key={symbol.symbol}
              onClick={() => handleSymbolSelect(symbol.symbol)}
              className="p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-trading-emerald transition-colors">
                      {symbol.symbol}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      symbol.category === 'crypto' ? 'bg-orange-500/20 text-orange-400' :
                      symbol.category === 'stocks' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {symbol.category}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">{symbol.name}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-mono text-white mb-1">
                    ${symbol.price.toLocaleString()}
                  </div>
                  <div className={`flex items-center space-x-1 text-xs ${
                    symbol.change >= 0 ? 'text-trading-success' : 'text-trading-danger'
                  }`}>
                    {symbol.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{symbol.change >= 0 ? '+' : ''}{symbol.change.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
