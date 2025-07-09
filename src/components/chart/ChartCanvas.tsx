
import React, { useRef, useEffect, useState } from 'react';
import { useTrading } from '@/context/TradingContext';

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const ChartCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentSymbol, timeframe, chartType } = useTrading();
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      const data: CandleData[] = [];
      let basePrice = 43000;
      const now = Date.now();
      
      for (let i = 100; i >= 0; i--) {
        const time = now - (i * 24 * 60 * 60 * 1000); // Daily data
        const volatility = 0.02;
        const change = (Math.random() - 0.5) * volatility;
        
        const open = basePrice;
        const close = open * (1 + change);
        const high = Math.max(open, close) * (1 + Math.random() * 0.01);
        const low = Math.min(open, close) * (1 - Math.random() * 0.01);
        const volume = Math.random() * 1000000;
        
        data.push({ time, open, high, low, close, volume });
        basePrice = close;
      }
      
      setCandleData(data);
      setIsLoading(false);
    };

    generateMockData();
  }, [currentSymbol, timeframe]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !candleData.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Calculate price range
    const prices = candleData.flatMap(d => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = priceRange * 0.1;

    // Drawing parameters
    const chartWidth = rect.width - 80;
    const chartHeight = rect.height - 60;
    const candleWidth = chartWidth / candleData.length * 0.8;
    const startX = 40;
    const startY = 30;

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = startY + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + chartWidth, y);
      ctx.stroke();
      
      // Price labels
      const price = maxPrice + padding - ((maxPrice + padding - (minPrice - padding)) / 5) * i;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px Inter';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(0), startX - 10, y + 4);
    }

    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = startX + (chartWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, startY + chartHeight);
      ctx.stroke();
    }

    // Draw candlesticks or line chart
    if (chartType === 'candlestick') {
      candleData.forEach((candle, index) => {
        const x = startX + (index * chartWidth) / candleData.length;
        const openY = startY + chartHeight - ((candle.open - (minPrice - padding)) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
        const closeY = startY + chartHeight - ((candle.close - (minPrice - padding)) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
        const highY = startY + chartHeight - ((candle.high - (minPrice - padding)) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
        const lowY = startY + chartHeight - ((candle.low - (minPrice - padding)) / (maxPrice + padding - (minPrice - padding))) * chartHeight;

        const isGreen = candle.close > candle.open;
        const color = isGreen ? '#10b981' : '#ef4444';

        // Draw wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, highY);
        ctx.lineTo(x + candleWidth / 2, lowY);
        ctx.stroke();

        // Draw body
        ctx.fillStyle = color;
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.abs(closeY - openY);
        ctx.fillRect(x, bodyTop, candleWidth, Math.max(bodyHeight, 1));
      });
    } else if (chartType === 'line') {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      candleData.forEach((candle, index) => {
        const x = startX + (index * chartWidth) / candleData.length + candleWidth / 2;
        const y = startY + chartHeight - ((candle.close - (minPrice - padding)) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }

    // Draw current price line
    if (candleData.length > 0) {
      const lastCandle = candleData[candleData.length - 1];
      const priceY = startY + chartHeight - ((lastCandle.close - (minPrice - padding)) / (maxPrice + padding - (minPrice - padding))) * chartHeight;
      
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(startX, priceY);
      ctx.lineTo(startX + chartWidth, priceY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Price label
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(startX + chartWidth + 5, priceY - 10, 70, 20);
      ctx.fillStyle = 'black';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(lastCandle.close.toFixed(0), startX + chartWidth + 40, priceY + 4);
    }

  }, [candleData, chartType]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-trading-emerald mx-auto mb-4"></div>
          <p className="text-gray-400">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative bg-gradient-to-br from-trading-navy to-slate-900">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{ display: 'block' }}
      />
      
      {/* Chart Info Overlay */}
      <div className="absolute top-4 left-4 glass-panel p-3">
        <div className="text-sm font-medium text-white mb-1">{currentSymbol}</div>
        <div className="text-xs text-gray-400">{timeframe} • {chartType}</div>
        {candleData.length > 0 && (
          <div className="text-xs text-trading-emerald mt-1">
            ${candleData[candleData.length - 1].close.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};
