
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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

// Financial risks data (adding this since it's missing from imports)
const financialRisks = {
  all: [
    { name: 'Market Volatility', level: 'high', impact: '$1.2M' },
    { name: 'Interest Rate Increases', level: 'medium', impact: '$450K' },
    { name: 'Regulatory Changes', level: 'low', impact: '$200K' },
    { name: 'Supply Chain Disruption', level: 'high', impact: '$850K' }
  ]
};

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
  
  // Define project metrics based on the metrics data
  const projectMetrics = {
    roi: '14.5',
    roiChange: -2.6,
    irr: '12.4',
    irrChange: -1.6,
    paybackPeriod: '4.8',
    paybackChange: 0.7
  };
  
  // Use the financial risks data
  const projectRisks = financialRisks[projectId as keyof typeof financialRisks] || financialRisks.all;
  
  // Filter impact events and mitigation strategies for the selected project
  const filteredImpactEvents = impactEventsData;
  const filteredMitigationStrategies = mitigationStrategiesData;
  
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
            label={projectName}
            metrics={investmentMetricsData}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <InvestmentMetricsCard 
              label="ROI" 
              value={`${projectMetrics.roi}%`}
              change={projectMetrics.roiChange}
              description="Return on Investment"
              positive={projectMetrics.roiChange >= 0}
            />
            <InvestmentMetricsCard 
              label="IRR" 
              value={`${projectMetrics.irr}%`}
              change={projectMetrics.irrChange}
              description="Internal Rate of Return"
              positive={projectMetrics.irrChange >= 0}
            />
            <InvestmentMetricsCard 
              label="Payback" 
              value={`${projectMetrics.paybackPeriod} yrs`}
              change={projectMetrics.paybackChange}
              description="Payback Period"
              positive={projectMetrics.paybackChange <= 0}
              inverse={true}
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
                <ScheduleVarianceChart project={projectName} />
              </div>
              <ROITrendChart project={projectName} />
            </TabsContent>
            
            <TabsContent value="valuation" className="space-y-6">
              <PropertyValuationChart project={projectName} />
              <ImpactEventsTable events={filteredImpactEvents} />
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-6">
              <FinancialRiskIndicators risks={projectRisks} />
              <MitigationStrategiesTable 
                strategies={filteredMitigationStrategies} 
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
