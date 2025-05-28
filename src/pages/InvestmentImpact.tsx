
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentTabs } from '@/components/investment/InvestmentTabs';
import { AIAssistantSheet } from '@/components/investment/AIAssistantSheet';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';
import { 
  investmentMetrics, 
  investmentInsights 
} from '@/data/investment/investmentData';
import { 
  riskData, 
  riskByCategory 
} from '@/data/investment/riskData';

const InvestmentImpact = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <DashboardLayout
      projectContext="Investment Impact"
      projectName="All Projects"
      initialInsights={investmentInsights}
    >
      <CustomizablePageLayout pageId="investment">
        <div className="max-w-7xl mx-auto px-4">
          <InvestmentHeader 
            title="Investment Impact" 
            description="Track and analyze the financial performance of your construction projects"
            onChatOpen={() => setSheetOpen(true)}
            className="text-white"
          />
          
          <InvestmentTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            investmentMetrics={investmentMetrics} 
            riskData={riskData} 
            riskByCategory={riskByCategory} 
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
