
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentMetricsSection } from '@/components/investment/InvestmentMetricsSection';
import { InvestmentTabContent } from '@/components/investment/InvestmentTabContent';
import { InvestmentInsights } from '@/components/investment/InvestmentInsights';
import { useProject } from '@/contexts/ProjectContext';
import { 
  investmentMetricsData, 
  impactEventsData,
  mitigationStrategiesData,
  budgetOverrunsData,
  projectOptions
} from '@/utils/investmentData';

// Chart colors for consistency across visualizations
const chartColors = {
  primary: '#3b82f6',    // blue-500
  secondary: '#22c55e',  // green-500
  accent: '#f97316',     // orange-500
  warning: '#f59e0b',    // amber-500
  info: '#06b6d4',       // cyan-500
  background: '#171717', // neutral-900
  gridLine: '#333333'    // neutral-700
};

// Financial risks data
const financialRisks = {
  all: [
    { name: 'Market Volatility', level: 'high', impact: '$1.2M' },
    { name: 'Interest Rate Increases', level: 'medium', impact: '$450K' },
    { name: 'Regulatory Changes', level: 'low', impact: '$200K' },
    { name: 'Supply Chain Disruption', level: 'high', impact: '$850K' }
  ]
};

// Mock schedule variance data
const scheduleVarianceData = [
  { project: 'East Tower', originalDuration: 120, currentDuration: 145 },
  { project: 'Green Valley', originalDuration: 90, currentDuration: 100 },
  { project: 'Bridge Project', originalDuration: 180, currentDuration: 190 }
];

// Mock ROI trend data
const roiTrendData = [
  { month: 'Jan', original: 12, current: 11.5 },
  { month: 'Feb', original: 12.5, current: 11.8 },
  { month: 'Mar', original: 13, current: 12 },
  { month: 'Apr', original: 13.5, current: 12.3 },
  { month: 'May', original: 14, current: 12.7 },
  { month: 'Jun', original: 14.2, current: 13 }
];

// Mock property valuation data
const propertyValuationData = [
  { month: 'Jan', initial: 100, current: 98 },
  { month: 'Feb', initial: 100, current: 97 },
  { month: 'Mar', initial: 100, current: 96 },
  { month: 'Apr', initial: 100, current: 97 },
  { month: 'May', initial: 100, current: 99 },
  { month: 'Jun', initial: 100, current: 101 }
];

const InvestmentImpact = () => {
  const [activeTab, setActiveTab] = useState('financial');
  const { selectedProject } = useProject();
  const projectId = selectedProject?.id || 'all';
  const projectName = selectedProject?.title || 'All Projects';
  
  // Define metrics for investment metrics cards
  const roiMetrics = {
    label: "ROI",
    original: "16.8%",
    current: "14.5%",
    impact: "negative" as const,
    variance: "-2.3%"
  };
  
  const irrMetrics = {
    label: "IRR",
    original: "14.0%",
    current: "12.4%",
    impact: "negative" as const,
    variance: "-1.6%"
  };
  
  const paybackMetrics = {
    label: "Payback",
    original: "4.1 yrs",
    current: "4.8 yrs",
    impact: "negative" as const,
    variance: "+0.7 yrs"
  };
  
  // Get the insights for the selected project
  const { investmentInsights } = InvestmentInsights({ projectId, projectName });
  
  // Filter for the selected project
  const projectRisks = financialRisks[projectId as keyof typeof financialRisks] || financialRisks.all;
  
  // Handle changes to the project selection
  const handleProjectChange = (value: string) => {
    console.log(`Project changed to: ${value}`);
    // This would typically update the selected project in a context or state
  };
  
  // Handle download report action
  const handleDownloadReport = () => {
    console.log('Downloading investment impact report');
  };

  useEffect(() => {
    // Update analytics or load data when project changes
    console.log(`Loading investment data for project: ${projectName}`);
  }, [projectId, projectName]);
  
  // Handle strategy action function
  const handleStrategyAction = (id: number, action: string) => {
    console.log(`Strategy ${id} action: ${action}`);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Investment Impact" 
          subtitle="Financial analysis and risk assessment"
        />
        
        <CollapsibleAIAssistant 
          projectContext="Investment Impact"
          projectName={projectName}
          initialInsights={investmentInsights}
        />
        
        <main className="flex-1 p-6">
          <InvestmentHeader 
            selectedProject={projectId}
            projectOptions={projectOptions}
            onProjectChange={handleProjectChange}
            onDownloadReport={handleDownloadReport}
          />
          
          <InvestmentMetricsSection 
            roiMetrics={roiMetrics}
            irrMetrics={irrMetrics}
            paybackMetrics={paybackMetrics}
          />
          
          <InvestmentTabContent 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            budgetOverrunsData={budgetOverrunsData}
            scheduleVarianceData={scheduleVarianceData}
            roiTrendData={roiTrendData}
            propertyValuationData={propertyValuationData}
            impactEventsData={impactEventsData}
            projectRisks={projectRisks}
            mitigationStrategiesData={mitigationStrategiesData}
            chartColors={chartColors}
            onStrategyAction={handleStrategyAction}
          />
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
