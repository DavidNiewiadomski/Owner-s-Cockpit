
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useToast } from '@/hooks/use-toast';

// Component imports
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentMetricsCard } from '@/components/investment/InvestmentMetricsCard';
import { ROITrendChart } from '@/components/investment/ROITrendChart';
import { ImpactEventsTable } from '@/components/investment/ImpactEventsTable';
import { ScheduleVarianceChart } from '@/components/investment/ScheduleVarianceChart';
import { BudgetOverrunChart } from '@/components/investment/BudgetOverrunChart';
import { PropertyValuationChart } from '@/components/investment/PropertyValuationChart';
import { FinancialRiskIndicators } from '@/components/investment/FinancialRiskIndicators';
import { MitigationStrategiesTable } from '@/components/investment/MitigationStrategiesTable';

// Data imports
import {
  projectOptions,
  investmentMetrics,
  roiData,
  schedulingImpactData,
  costOverrunData,
  valuationImpactData,
  impactEvents,
  mitigationStrategies
} from '@/utils/investmentData';

const InvestmentImpact = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAnimation, setActiveAnimation] = useState(false);
  
  // Custom color scheme for futuristic look
  const colors = {
    primary: '#38bdf8',
    secondary: '#4ade80',
    accent: '#f43f5e',
    warning: '#fb923c',
    info: '#a78bfa',
    background: 'rgba(255, 255, 255, 0.05)',
    gridLine: 'rgba(255, 255, 255, 0.1)'
  };
  
  // Effect for animation states
  useEffect(() => {
    setActiveAnimation(true);
    
    const interval = setInterval(() => {
      setActiveAnimation(prev => !prev);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleStrategyAction = (id: number, action: string) => {
    toast({
      title: `Strategy ${action}`,
      description: `Mitigation strategy #${id} has been ${action.toLowerCase()}`,
      duration: 3000,
    });
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloading",
      description: "Investment impact analysis report is being generated",
      duration: 3000,
    });
  };

  const handleViewScenario = (scenarioId: string) => {
    toast({
      id: crypto.randomUUID(),
      title: "Scenario Analysis",
      description: `Viewing detailed analysis for scenario ${scenarioId}`,
      duration: 3000,
    });
  };

  const handleRunSimulation = () => {
    toast({
      id: crypto.randomUUID(),
      title: "Simulation In Progress",
      description: "Running investment impact simulation with updated parameters",
      duration: 3000,
    });
  };

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <CollapsibleAIAssistant 
              projectName="investment portfolio"
              insights={[
                "Schedule delays have reduced projected IRR by 1.1%",
                "Material cost increases are the primary driver of budget overruns",
                "Implementing proposed mitigation strategies could recover 0.7% ROI",
                "Cash flow projections indicate a 3-month delay to break-even point"
              ]}
            />
            
            <InvestmentHeader 
              selectedProject={selectedProject}
              projectOptions={projectOptions}
              onProjectChange={setSelectedProject}
              onDownloadReport={handleDownloadReport}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <InvestmentMetricsCard 
                metrics={investmentMetrics}
                activeAnimation={activeAnimation}
              />
              
              <ROITrendChart 
                data={roiData}
                colors={colors}
              />
            </div>
            
            <ImpactEventsTable events={impactEvents} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ScheduleVarianceChart 
                data={schedulingImpactData}
                colors={colors}
              />
              
              <BudgetOverrunChart data={costOverrunData} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <PropertyValuationChart 
                data={valuationImpactData}
                colors={colors}
              />
              
              <FinancialRiskIndicators />
            </div>
            
            <MitigationStrategiesTable 
              strategies={mitigationStrategies}
              onStrategyAction={handleStrategyAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
