
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinancialImpactTab } from './FinancialImpactTab';
import { ValuationImpactTab } from './ValuationImpactTab';
import { RiskAnalysisTab } from './RiskAnalysisTab';

interface InvestmentTabContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  budgetOverrunsData: any[];
  scheduleVarianceData: any[];
  roiTrendData: any[];
  propertyValuationData: any[];
  impactEventsData: any[];
  projectRisks: { name: string; level: string; impact: string; }[];
  mitigationStrategiesData: any[];
  chartColors: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    info: string;
    background: string;
    gridLine: string;
  };
  onStrategyAction: (id: number, action: string) => void;
}

export const InvestmentTabContent: React.FC<InvestmentTabContentProps> = ({
  activeTab,
  setActiveTab,
  budgetOverrunsData,
  scheduleVarianceData,
  roiTrendData,
  propertyValuationData,
  impactEventsData,
  projectRisks,
  mitigationStrategiesData,
  chartColors,
  onStrategyAction
}) => {
  return (
    <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-gray-800">
        <TabsTrigger value="financial">Financial Impact</TabsTrigger>
        <TabsTrigger value="valuation">Property Valuation</TabsTrigger>
        <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="financial" className="space-y-6">
        <FinancialImpactTab 
          budgetOverrunsData={budgetOverrunsData}
          scheduleVarianceData={scheduleVarianceData}
          roiTrendData={roiTrendData}
          chartColors={chartColors}
        />
      </TabsContent>
      
      <TabsContent value="valuation" className="space-y-6">
        <ValuationImpactTab
          propertyValuationData={propertyValuationData}
          impactEventsData={impactEventsData}
          chartColors={chartColors}
        />
      </TabsContent>
      
      <TabsContent value="risk" className="space-y-6">
        <RiskAnalysisTab
          projectRisks={projectRisks}
          mitigationStrategiesData={mitigationStrategiesData}
          onStrategyAction={onStrategyAction}
        />
      </TabsContent>
    </Tabs>
  );
};
