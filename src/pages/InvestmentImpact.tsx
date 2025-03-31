
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentMetricsCard } from '@/components/investment/InvestmentMetricsCard';
import { BudgetOverrunChart } from '@/components/investment/BudgetOverrunChart';
import { ScheduleVarianceChart } from '@/components/investment/ScheduleVarianceChart';
import { PropertyValuationChart } from '@/components/investment/PropertyValuationChart';
import { FinancialRiskIndicators } from '@/components/investment/FinancialRiskIndicators';
import { ROITrendChart } from '@/components/investment/ROITrendChart';
import { ImpactEventsTable } from '@/components/investment/ImpactEventsTable';
import { MitigationStrategiesTable } from '@/components/investment/MitigationStrategiesTable';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';
import { 
  investmentMetricsData, 
  impactEventsData,
  mitigationStrategiesData,
  budgetOverrunsData,
  projectOptions
} from '@/utils/investmentData';

// Mock data for chart colors
const chartColors = {
  primary: '#3b82f6',    // blue-500
  secondary: '#22c55e',  // green-500
  accent: '#f97316',     // orange-500
  warning: '#f59e0b',    // amber-500
  info: '#06b6d4',       // cyan-500
  background: '#171717', // neutral-900
  gridLine: '#333333'    // neutral-700
};

// Financial risks data (adding this since it's missing from imports)
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
  
  // Create investment insights based on the project
  const investmentInsights = [
    {
      title: 'ROI Forecast',
      content: projectId === '1' ? 'East Tower ROI forecast adjusted to 18.2% (down 1.3%) due to material cost increases' :
               projectId === '2' ? 'Green Valley ROI holding steady at 22.1% despite schedule delays' :
               projectId === '3' ? 'Bridge project ROI projected at 15.6%, below initial target of 17%' :
               'Portfolio ROI forecast adjusted to 19.5% (down 0.8%) due to market conditions',
      type: 'info' as const
    },
    {
      title: 'Budget Alert',
      content: projectId === '1' ? 'East Tower contingency fund usage at 62%, exceeding projected 40% at this stage' :
               projectId === '2' ? 'Green Valley budget line items for landscaping exceed allocation by 23%' :
               projectId === '3' ? 'Bridge project emergency reinforcement costs require budget reallocation' :
               'Three projects currently exceeding quarterly budget allocation by >15%',
      type: 'warning' as const
    },
    {
      title: 'Market Impact',
      content: projectId === '1' ? 'Luxury condo market showing 6% appreciation, positive for East Tower valuation' :
               projectId === '2' ? 'Sustainable development tax incentives increase Green Valley projected returns' :
               projectId === '3' ? 'Infrastructure funding increase approved, positive for Bridge project financing' :
               'Construction material costs stabilizing, positive outlook for Q3 procurement',
      type: 'success' as const
    }
  ];
  
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <InvestmentMetricsCard 
              metrics={[roiMetrics]} 
              activeAnimation={true}
            />
            <InvestmentMetricsCard 
              metrics={[irrMetrics]} 
              activeAnimation={true}
            />
            <InvestmentMetricsCard 
              metrics={[paybackMetrics]} 
              activeAnimation={true}
            />
          </div>
          
          <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="financial">Financial Impact</TabsTrigger>
              <TabsTrigger value="valuation">Property Valuation</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BudgetOverrunChart data={budgetOverrunsData} />
                <ScheduleVarianceChart data={scheduleVarianceData} colors={chartColors} />
              </div>
              <ROITrendChart data={roiTrendData} colors={chartColors} />
            </TabsContent>
            
            <TabsContent value="valuation" className="space-y-6">
              <PropertyValuationChart data={propertyValuationData} colors={chartColors} />
              <ImpactEventsTable events={impactEventsData} />
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-6">
              <FinancialRiskIndicators risks={projectRisks} />
              <MitigationStrategiesTable 
                strategies={mitigationStrategiesData} 
                onStrategyAction={handleStrategyAction} 
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
