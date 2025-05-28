
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { AnalyticsTabs } from '@/components/analytics/AnalyticsTabs';
import { KeyPerformanceIndicators } from '@/components/analytics/KeyPerformanceIndicators';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';
import { 
  projectData, 
  timelineData, 
  budgetData, 
  resourceData, 
  performanceData, 
  chartColors,
  kpiData,
  analyticsInsights
} from '@/data/analytics/analyticsData';

// Define periods for the Analytics header
const periods = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const Analytics = () => {
  const [currentPeriod, setCurrentPeriod] = useState('monthly');
  const [activeAnimation, setActiveAnimation] = useState(false);

  // Effect to switch between animation states for pulse effect
  useEffect(() => {
    setActiveAnimation(true);
    const interval = setInterval(() => {
      setActiveAnimation(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout
      projectContext="Analytics"
      projectName="All Projects"
      initialInsights={analyticsInsights}
    >
      <CustomizablePageLayout pageId="analytics">
        <div className="max-w-7xl mx-auto">
          <AnalyticsHeader 
            periods={periods}
            currentPeriod={currentPeriod}
            setCurrentPeriod={setCurrentPeriod}
          />
          
          <KeyPerformanceIndicators 
            kpiData={kpiData} 
            activeAnimation={activeAnimation}
          />
          
          <AnalyticsTabs 
            projectData={projectData}
            timelineData={timelineData}
            budgetData={budgetData}
            resourceData={resourceData}
            performanceData={performanceData}
            colors={chartColors}
          />
        </div>
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default Analytics;
