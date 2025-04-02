
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { AnalyticsTabs } from '@/components/analytics/AnalyticsTabs';
import { KeyPerformanceIndicators } from '@/components/analytics/KeyPerformanceIndicators';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';
import { chartColors } from '@/data/analytics/analyticsData';
import {
  generateKpiData,
  generateProjectData,
  generateTimelineData,
  generateBudgetData,
  generateResourceData,
  generatePerformanceData,
  generateInsights
} from '@/data/analytics/analyticsDataByPeriod';

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
  
  // Generate data based on the current period
  const kpiData = generateKpiData(currentPeriod);
  const projectData = generateProjectData(currentPeriod);
  const timelineData = generateTimelineData(currentPeriod);
  const budgetData = generateBudgetData(currentPeriod);
  const resourceData = generateResourceData(currentPeriod);
  const performanceData = generatePerformanceData(currentPeriod);
  const analyticsInsights = generateInsights(currentPeriod);

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
