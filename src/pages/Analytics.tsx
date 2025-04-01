
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { AnalyticsTabs } from '@/components/analytics/AnalyticsTabs';
import { KeyPerformanceIndicators } from '@/components/analytics/KeyPerformanceIndicators';
import { 
  projectData, 
  timelineData, 
  budgetData, 
  resourceData, 
  performanceData, 
  chartColors,
  analyticsInsights, 
  kpiData
} from '@/data/analytics/analyticsData';

const Analytics = () => {
  return (
    <DashboardLayout
      projectContext="Analytics"
      initialInsights={analyticsInsights}
    >
      <div className="max-w-7xl mx-auto">
        <AnalyticsHeader />
        
        <KeyPerformanceIndicators kpiData={kpiData} />
        
        <AnalyticsTabs 
          projectData={projectData}
          timelineData={timelineData}
          budgetData={budgetData}
          resourceData={resourceData}
          performanceData={performanceData}
          colors={chartColors}
        />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
