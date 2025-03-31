
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
  investmentMetricsData,
  impactEventsData,
  mitigationStrategiesData,
  budgetOverrunsData
} from '@/utils/investmentData';

// Need to create these missing data sets as they are used by components but not exported in investmentData.ts
const roiData = [
  { month: 'Jan', original: 14.2, current: 14.2 },
  { month: 'Feb', original: 14.3, current: 14.0 },
  { month: 'Mar', original: 14.4, current: 13.6 },
  { month: 'Apr', original: 14.5, current: 13.1 },
  { month: 'May', original: 14.6, current: 12.8 },
  { month: 'Jun', original: 14.7, current: 12.4 },
  { month: 'Jul', original: 14.8, current: 12.0 },
  { month: 'Aug', original: 14.9, current: 11.9 }
];

const schedulingImpactData = [
  { project: 'East Tower', originalDuration: 120, currentDuration: 165 },
  { project: 'West Wing', originalDuration: 90, currentDuration: 90 },
  { project: 'North Bridge', originalDuration: 60, currentDuration: 90 },
  { project: 'South Avenue', originalDuration: 75, currentDuration: 90 },
  { project: 'Downtown Heights', originalDuration: 100, currentDuration: 125 }
];

const costOverrunData = budgetOverrunsData; // Using existing budgetOverrunsData as costOverrunData 

const valuationImpactData = [
  { month: 'Jan', initial: 100, current: 100 },
  { month: 'Feb', initial: 100, current: 99 },
  { month: 'Mar', initial: 100, current: 97 },
  { month: 'Apr', initial: 100, current: 95 },
  { month: 'May', initial: 100, current: 93 },
  { month: 'Jun', initial: 100, current: 91 },
  { month: 'Jul', initial: 100, current: 90 },
  { month: 'Aug', initial: 100, current: 89 }
];

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
                metrics={investmentMetricsData}
                activeAnimation={activeAnimation}
              />
              
              <ROITrendChart 
                data={roiData}
                colors={colors}
              />
            </div>
            
            <ImpactEventsTable events={impactEventsData} />
            
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
              strategies={mitigationStrategiesData}
              onStrategyAction={handleStrategyAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
