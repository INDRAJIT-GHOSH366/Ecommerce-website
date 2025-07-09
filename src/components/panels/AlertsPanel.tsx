
import React, { useState } from 'react';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { useTrading } from '@/context/TradingContext';
import { Button } from '@/components/ui/button';

export const AlertsPanel = () => {
  const { alerts } = useTrading();
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-white">Price Alerts</h3>
          <Button 
            size="sm" 
            variant="ghost" 
            className="glass-button p-1"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Create Alert Form */}
      {showCreateForm && (
        <div className="p-4 border-b border-white/10 glass-panel m-2 rounded-lg">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Symbol</label>
              <input 
                type="text" 
                placeholder="BTC/USD"
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-trading-emerald"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Condition</label>
              <select className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-trading-emerald">
                <option value="above">Price Above</option>
                <option value="below">Price Below</option>
                <option value="change">% Change</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Target Price</label>
              <input 
                type="number" 
                placeholder="45000"
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-trading-emerald"
              />
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1 bg-trading-emerald hover:bg-trading-emerald/80 text-black">
                Create Alert
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="flex-1"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <Bell className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No alerts set</p>
            <p className="text-xs">Create your first alert above</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="p-3 border-b border-white/5 hover:bg-white/5 group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white mb-1">
                    {alert.symbol}
                  </div>
                  <div className="text-xs text-gray-400">
                    {alert.condition} ${alert.value.toLocaleString()}
                  </div>
                  <div className={`text-xs mt-1 ${
                    alert.triggered ? 'text-trading-success' : 'text-gray-400'
                  }`}>
                    {alert.triggered ? 'Triggered' : 'Active'}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20"
                >
                  <Trash2 className="h-3 w-3 text-red-400" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
