
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { KeyPerformanceIndicators } from '@/components/analytics/KeyPerformanceIndicators';
import { AnalyticsTabs } from '@/components/analytics/AnalyticsTabs';
import { 
  projectData,
  timelineData,
  budgetData,
  resourceData,
  performanceData,
  periods,
  analyticsInsights,
  chartColors,
  kpiData
} from '@/data/analytics/analyticsData';

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState('monthly');
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Trigger animation effect when component mounts
  useEffect(() => {
    setActiveAnimation(true);
  }, []);

  // Effect to switch between animation states for a pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnimation(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-black text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Insights Card */}
            <AIInsightsCard 
              insights={analyticsInsights} 
              onChatOpen={() => setSheetOpen(true)} 
            />
            
            <AnalyticsHeader 
              periods={periods} 
              currentPeriod={currentPeriod} 
              setCurrentPeriod={setCurrentPeriod} 
            />

            {/* Key Performance Indicators */}
            <KeyPerformanceIndicators 
              kpiData={kpiData} 
              activeAnimation={activeAnimation} 
            />
            
            {/* Tabbed Charts Section */}
            <AnalyticsTabs 
              projectData={projectData}
              timelineData={timelineData}
              budgetData={budgetData}
              resourceData={resourceData}
              performanceData={performanceData}
              colors={chartColors}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
