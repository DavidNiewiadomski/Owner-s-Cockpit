
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
  investmentMetrics, 
  financialRisks,
  impactEvents,
  mitigationStrategies
} from '@/utils/investmentData';

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
  
  // Get metrics for the selected project
  const projectMetrics = investmentMetrics[projectId as keyof typeof investmentMetrics] || investmentMetrics.all;
  const projectRisks = financialRisks[projectId as keyof typeof financialRisks] || financialRisks.all;
  
  // Filter impact events and mitigation strategies for the selected project
  const filteredImpactEvents = projectId === 'all' 
    ? impactEvents 
    : impactEvents.filter(event => event.projectId === projectId || event.projectId === 'all');
    
  const filteredMitigationStrategies = projectId === 'all'
    ? mitigationStrategies
    : mitigationStrategies.filter(strategy => strategy.projectId === projectId || strategy.projectId === 'all');
  
  useEffect(() => {
    // Update analytics or load data when project changes
    console.log(`Loading investment data for project: ${projectName}`);
  }, [projectId, projectName]);
  
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
            projectName={projectName} 
            metrics={projectMetrics}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <InvestmentMetricsCard 
              title="ROI" 
              value={`${projectMetrics.roi}%`}
              change={projectMetrics.roiChange}
              description="Return on Investment"
              positive={projectMetrics.roiChange >= 0}
            />
            <InvestmentMetricsCard 
              title="IRR" 
              value={`${projectMetrics.irr}%`}
              change={projectMetrics.irrChange}
              description="Internal Rate of Return"
              positive={projectMetrics.irrChange >= 0}
            />
            <InvestmentMetricsCard 
              title="Payback" 
              value={`${projectMetrics.paybackPeriod} yrs`}
              change={projectMetrics.paybackChange}
              description="Payback Period"
              positive={projectMetrics.paybackChange <= 0}
              inverse
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
                <BudgetOverrunChart projectId={projectId} />
                <ScheduleVarianceChart projectId={projectId} />
              </div>
              <ROITrendChart projectId={projectId} />
            </TabsContent>
            
            <TabsContent value="valuation" className="space-y-6">
              <PropertyValuationChart projectId={projectId} />
              <ImpactEventsTable events={filteredImpactEvents} />
            </TabsContent>
            
            <TabsContent value="risk" className="space-y-6">
              <FinancialRiskIndicators risks={projectRisks} />
              <MitigationStrategiesTable strategies={filteredMitigationStrategies} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
