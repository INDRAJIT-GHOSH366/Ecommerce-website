
import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

const mockNews = [
  {
    id: 1,
    title: 'Bitcoin Reaches New Monthly High Amid Institutional Interest',
    summary: 'Major financial institutions continue to show increased interest in cryptocurrency investments.',
    time: '2 hours ago',
    source: 'CryptoNews',
    sentiment: 'positive'
  },
  {
    id: 2,
    title: 'Federal Reserve Signals Potential Rate Changes',
    summary: 'Markets react to latest Federal Reserve communications regarding monetary policy.',
    time: '4 hours ago',
    source: 'Financial Times',
    sentiment: 'neutral'
  },
  {
    id: 3,
    title: 'Tech Stocks Show Mixed Performance in Trading Session',
    summary: 'Technology sector experiences varied performance with some stocks outperforming.',
    time: '6 hours ago',
    source: 'MarketWatch',
    sentiment: 'mixed'
  },
  {
    id: 4,
    title: 'Energy Sector Faces Regulatory Challenges',
    summary: 'New regulations could impact energy companies in the coming quarters.',
    time: '8 hours ago',
    source: 'Reuters',
    sentiment: 'negative'
  }
];

export const NewsPanel = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white">Market News</h3>
      </div>

      {/* News Items */}
      <div className="flex-1 overflow-y-auto">
        {mockNews.map((news) => (
          <div key={news.id} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer group transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-white mb-2 group-hover:text-trading-emerald transition-colors">
                  {news.title}
                </h4>
                <p className="text-xs text-gray-400 mb-3">
                  {news.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{news.time}</span>
                    <span>•</span>
                    <span>{news.source}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      news.sentiment === 'positive' ? 'bg-trading-success' :
                      news.sentiment === 'negative' ? 'bg-trading-danger' :
                      news.sentiment === 'mixed' ? 'bg-trading-warning' :
                      'bg-gray-400'
                    }`} />
                    <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
