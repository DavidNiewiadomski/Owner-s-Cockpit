
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
  const [visibleKpis, setVisibleKpis] = useState(kpiData.slice(0, 4));
  const [showAllKpis, setShowAllKpis] = useState(false);

  // Toggle between showing 4 KPIs and all KPIs
  const toggleKpiView = () => {
    setShowAllKpis(!showAllKpis);
    setVisibleKpis(showAllKpis ? kpiData.slice(0, 4) : kpiData);
  };

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

  // Show all KPIs by default
  useEffect(() => {
    setVisibleKpis(kpiData);
    setShowAllKpis(true);
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

            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-white">Key Performance Indicators</h2>
              <button 
                onClick={toggleKpiView} 
                className="text-xs text-construction-300 hover:text-construction-200"
              >
                {showAllKpis ? 'Show Fewer' : 'Show All'}
              </button>
            </div>

            {/* Key Performance Indicators */}
            <KeyPerformanceIndicators 
              kpiData={visibleKpis} 
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
