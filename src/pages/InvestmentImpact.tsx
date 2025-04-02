
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentTabs } from '@/components/investment/InvestmentTabs';
import { AIAssistantSheet } from '@/components/investment/AIAssistantSheet';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';
import { investmentAllocationData } from '@/data/investment/investmentData';
import { 
  generateInvestmentMetrics,
  generateInvestmentInsights,
  generateRoiData,
  generatePropertyValueData
} from '@/data/investment/investmentDataByPeriod';
import { 
  riskData, 
  riskByCategory 
} from '@/data/investment/riskData';

// Define periods for the Analytics header
const periods = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const InvestmentImpact = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState('monthly');

  // Generate data based on the current period
  const investmentMetrics = generateInvestmentMetrics(currentPeriod);
  const investmentInsights = generateInvestmentInsights(currentPeriod);
  const roiData = generateRoiData(currentPeriod);
  const propertyValueData = generatePropertyValueData(currentPeriod);

  return (
    <DashboardLayout
      projectContext="Investment Impact"
      initialInsights={investmentInsights}
    >
      <CustomizablePageLayout pageId="investment">
        <div className="max-w-7xl mx-auto px-4">
          <InvestmentHeader 
            title="Investment Impact" 
            description="Track and analyze the financial performance of your construction projects"
            onChatOpen={() => setSheetOpen(true)}
            periods={periods}
            currentPeriod={currentPeriod}
            setCurrentPeriod={setCurrentPeriod}
            className="text-white"
          />
          
          <InvestmentTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            investmentMetrics={investmentMetrics} 
            riskData={riskData} 
            riskByCategory={riskByCategory}
            roiData={roiData}
            propertyValueData={propertyValueData}
            allocationData={investmentAllocationData}
          />

          <AIAssistantSheet 
            isOpen={sheetOpen} 
            onOpenChange={setSheetOpen} 
          />
        </div>
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default InvestmentImpact;
