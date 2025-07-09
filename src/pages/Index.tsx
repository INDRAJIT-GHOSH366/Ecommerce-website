
import React from 'react';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { LeftToolbar } from '@/components/layout/LeftToolbar';
import { ChartCanvas } from '@/components/chart/ChartCanvas';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { BottomPanel } from '@/components/layout/BottomPanel';
import { TradingProvider } from '@/context/TradingContext';

const Index = () => {
  return (
    <TradingProvider>
      <div className="min-h-screen bg-trading-navy flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation />
        
        {/* Main Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Toolbar */}
          <LeftToolbar />
          
          {/* Main Chart Area */}
          <div className="flex-1 flex flex-col">
            <ChartCanvas />
            <BottomPanel />
          </div>
          
          {/* Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </TradingProvider>
  );
};

export default Index;
