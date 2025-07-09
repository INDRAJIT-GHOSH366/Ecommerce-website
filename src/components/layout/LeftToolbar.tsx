
import React from 'react';
import { 
  MousePointer, 
  TrendingUp, 
  Minus, 
  Square, 
  Circle, 
  Type,
  Ruler,
  GitBranch
} from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import { Button } from '@/components/ui/button';

export const LeftToolbar = () => {
  const { selectedTool, setSelectedTool } = useTrading();

  const tools = [
    { id: 'cursor', icon: MousePointer, name: 'Cursor' },
    { id: 'trendline', icon: TrendingUp, name: 'Trend Line' },
    { id: 'horizontal', icon: Minus, name: 'Horizontal Line' },
    { id: 'rectangle', icon: Square, name: 'Rectangle' },
    { id: 'circle', icon: Circle, name: 'Circle' },
    { id: 'text', icon: Type, name: 'Text' },
    { id: 'ruler', icon: Ruler, name: 'Ruler' },
    { id: 'fibonacci', icon: GitBranch, name: 'Fibonacci' },
  ];

  return (
    <div className="glass-panel border-r border-white/10 w-16 flex flex-col items-center py-4 space-y-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Button
            key={tool.id}
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTool(tool.id)}
            className={`w-12 h-12 p-0 transition-all duration-200 group relative ${
              selectedTool === tool.id
                ? 'bg-trading-emerald/20 text-trading-emerald border border-trading-emerald/30'
                : 'glass-button hover:text-trading-emerald'
            }`}
            title={tool.name}
          >
            <Icon className="h-5 w-5" />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {tool.name}
            </div>
          </Button>
        );
      })}
    </div>
  );
};
