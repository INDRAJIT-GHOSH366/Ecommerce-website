
import React, { createContext, useContext, useState, useEffect } from 'react';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface Alert {
  id: string;
  symbol: string;
  condition: string;
  value: number;
  triggered: boolean;
}

interface TradingContextType {
  currentSymbol: string;
  setCurrentSymbol: (symbol: string) => void;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  chartType: string;
  setChartType: (type: string) => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (symbol: string) => void;
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSymbol, setCurrentSymbol] = useState('BTC/USD');
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedTool, setSelectedTool] = useState('cursor');
  
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 43250, change: 1250, changePercent: 2.98 },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 2650, change: -85, changePercent: -3.11 },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 185.25, change: 2.15, changePercent: 1.17 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -5.25, changePercent: -2.07 },
  ]);
  
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const addToWatchlist = (item: WatchlistItem) => {
    setWatchlist(prev => [...prev, item]);
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(item => item.symbol !== symbol));
  };

  const addAlert = (alert: Alert) => {
    setAlerts(prev => [...prev, alert]);
  };

  return (
    <TradingContext.Provider value={{
      currentSymbol,
      setCurrentSymbol,
      timeframe,
      setTimeframe,
      chartType,
      setChartType,
      isDarkTheme,
      toggleTheme,
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      alerts,
      addAlert,
      selectedTool,
      setSelectedTool,
    }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};
