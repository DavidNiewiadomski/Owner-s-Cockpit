
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { InvestmentOverviewContent } from './InvestmentOverviewContent';
import { ROIAnalysisContent } from './ROIAnalysisContent';
import { InvestmentAllocationContent } from './InvestmentAllocationContent';
import { RiskManagementContent } from './RiskManagementContent';
import { PropertiesContent } from './PropertiesContent';

interface InvestmentMetric {
  label: string;
  original: string;
  current: string;
  impact: "positive" | "negative";
  variance: string;
}

interface Insight {
  title: string;
  content: string;
  type: "info" | "warning" | "success";
}

interface InvestmentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  investmentMetrics: InvestmentMetric[];
  investmentInsights?: Insight[];
  riskData: any[];
  riskByCategory: any[];
  roiData?: any[];
  propertyValueData?: any[];
  allocationData?: any[];
  onChatOpen?: () => void;
}

export function InvestmentTabs({ 
  activeTab, 
  setActiveTab,
  investmentMetrics,
  investmentInsights = [],
  riskData,
  riskByCategory,
  roiData,
  propertyValueData,
  allocationData,
  onChatOpen = () => {}
}: InvestmentTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
      <TabsList className="flex overflow-x-auto w-full mb-6 bg-black border border-gray-800 rounded-lg p-1">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:bg-construction-600 data-[state=active]:text-white"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="roi" 
          className="data-[state=active]:bg-construction-600 data-[state=active]:text-white"
        >
          ROI Analysis
        </TabsTrigger>
        <TabsTrigger 
          value="allocation" 
          className="data-[state=active]:bg-construction-600 data-[state=active]:text-white"
        >
          Allocation
        </TabsTrigger>
        <TabsTrigger 
          value="risk" 
          className="data-[state=active]:bg-construction-600 data-[state=active]:text-white"
        >
          Risk Management
        </TabsTrigger>
        <TabsTrigger 
          value="properties" 
          className="data-[state=active]:bg-construction-600 data-[state=active]:text-white"
        >
          Properties
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <InvestmentOverviewContent 
          investmentMetrics={investmentMetrics} 
          propertyValueData={propertyValueData}
          insights={investmentInsights}
          onChatOpen={onChatOpen}
        />
      </TabsContent>

      <TabsContent value="roi">
        <ROIAnalysisContent 
          roiData={roiData}
          propertyValueData={propertyValueData}
        />
      </TabsContent>

      <TabsContent value="allocation">
        <InvestmentAllocationContent 
          allocationData={allocationData} 
        />
      </TabsContent>

      <TabsContent value="risk">
        <RiskManagementContent 
          riskData={riskData} 
          riskByCategory={riskByCategory} 
        />
      </TabsContent>

      <TabsContent value="properties">
        <PropertiesContent 
          properties={[]} 
          allocationData={allocationData} 
        />
      </TabsContent>
    </Tabs>
  );
}
