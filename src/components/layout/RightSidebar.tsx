
import React, { useState } from 'react';
import { WatchlistPanel } from '@/components/panels/WatchlistPanel';
import { AlertsPanel } from '@/components/panels/AlertsPanel';
import { NewsPanel } from '@/components/panels/NewsPanel';
import { Button } from '@/components/ui/button';

export const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState('watchlist');

  const tabs = [
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'news', label: 'News' },
  ];

  return (
    <div className="glass-panel border-l border-white/10 w-80 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-none border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-trading-emerald text-trading-emerald'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'watchlist' && <WatchlistPanel />}
        {activeTab === 'alerts' && <AlertsPanel />}
        {activeTab === 'news' && <NewsPanel />}
      </div>
    </div>
  );
};
