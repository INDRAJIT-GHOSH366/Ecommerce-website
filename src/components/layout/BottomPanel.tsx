
import React, { useState } from 'react';
import { Brain, MessageSquare, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BottomPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');

  const aiSuggestions = [
    {
      type: 'pattern',
      confidence: 85,
      message: 'Double Top pattern detected - potential bearish reversal',
      icon: '🔺'
    },
    {
      type: 'indicator',
      confidence: 72,
      message: 'RSI approaching overbought levels (>70)',
      icon: '📊'
    },
    {
      type: 'alert',
      confidence: 95,
      message: 'Price approaching key resistance at $44,000',
      icon: '⚠️'
    }
  ];

  return (
    <div className={`glass-panel border-t border-white/10 transition-all duration-300 ${
      isExpanded ? 'h-48' : 'h-12'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('ai')}
            className={`flex items-center space-x-2 ${
              activeTab === 'ai' ? 'text-trading-emerald' : 'text-gray-400'
            }`}
          >
            <Brain className="h-4 w-4" />
            <span>AI Insights</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-2 ${
              activeTab === 'notes' ? 'text-trading-emerald' : 'text-gray-400'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Notes</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white"
        >
          <TrendingUp className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'ai' && (
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="glass-panel p-3 border border-white/10">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{suggestion.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {suggestion.message}
                        </span>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          suggestion.confidence >= 80 
                            ? 'bg-trading-success/20 text-trading-success'
                            : suggestion.confidence >= 60
                            ? 'bg-trading-warning/20 text-trading-warning'
                            : 'bg-trading-danger/20 text-trading-danger'
                        }`}>
                          {suggestion.confidence}%
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 capitalize">
                        {suggestion.type} analysis
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'notes' && (
            <div className="text-gray-400 text-sm">
              Click to add trading notes and observations...
            </div>
          )}
        </div>
      )}
    </div>
  );
};
