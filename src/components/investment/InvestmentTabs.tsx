
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
    <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
      <TabsList className="bg-gray-900/40 border border-gray-800 rounded-md p-1 w-full flex justify-between overflow-x-auto">
        <TabsTrigger 
          value="overview" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="roi" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          ROI Analysis
        </TabsTrigger>
        <TabsTrigger 
          value="allocation" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          Investment Allocation
        </TabsTrigger>
        <TabsTrigger 
          value="properties" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          Properties
        </TabsTrigger>
        <TabsTrigger 
          value="risks" 
          className="text-base font-medium px-4 py-2 data-[state=active]:bg-cyan-900/40 data-[state=active]:text-cyan-400 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Risk Management
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6 animate-in fade-in-50 duration-300">
        <InvestmentOverviewContent investmentMetrics={investmentMetrics} />
      </TabsContent>
      
      <TabsContent value="roi" className="space-y-6 animate-in fade-in-50 duration-300">
        <ROIAnalysisContent />
      </TabsContent>
      
      <TabsContent value="allocation" className="space-y-6 animate-in fade-in-50 duration-300">
        <InvestmentAllocationContent />
      </TabsContent>
      
      <TabsContent value="properties" className="space-y-6 animate-in fade-in-50 duration-300">
        <PropertiesContent />
      </TabsContent>
      
      <TabsContent value="risks" className="space-y-6 animate-in fade-in-50 duration-300">
        <RiskManagementContent riskData={riskData} riskByCategory={riskByCategory} />
      </TabsContent>
    </Tabs>
  );
}
