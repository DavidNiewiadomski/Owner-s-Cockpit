
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle } from 'lucide-react';
import { InvestmentOverviewContent } from '@/components/investment/InvestmentOverviewContent';
import { RiskManagementContent } from '@/components/investment/RiskManagementContent';
import { ROIAnalysisContent } from '@/components/investment/ROIAnalysisContent';
import { InvestmentAllocationContent } from '@/components/investment/InvestmentAllocationContent';
import { PropertiesContent } from '@/components/investment/PropertiesContent';
import { InvestmentMetric } from '@/data/investment/investmentData';
import { Risk, CategoryData } from '@/data/investment/riskData';

interface InvestmentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  investmentMetrics: InvestmentMetric[];
  riskData: Risk[];
  riskByCategory: CategoryData[];
}

export function InvestmentTabs({ 
  activeTab, 
  setActiveTab, 
  investmentMetrics, 
  riskData, 
  riskByCategory 
}: InvestmentTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
      <TabsList className="bg-black border border-gray-800">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        <TabsTrigger value="allocation">Investment Allocation</TabsTrigger>
        <TabsTrigger value="properties">Properties</TabsTrigger>
        <TabsTrigger value="risks">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Risk Management
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <InvestmentOverviewContent investmentMetrics={investmentMetrics} />
      </TabsContent>
      
      <TabsContent value="roi" className="space-y-6">
        <ROIAnalysisContent />
      </TabsContent>
      
      <TabsContent value="allocation" className="space-y-6">
        <InvestmentAllocationContent />
      </TabsContent>
      
      <TabsContent value="properties" className="space-y-6">
        <PropertiesContent />
      </TabsContent>
      
      <TabsContent value="risks" className="space-y-6">
        <RiskManagementContent riskData={riskData} riskByCategory={riskByCategory} />
      </TabsContent>
    </Tabs>
  );
}
