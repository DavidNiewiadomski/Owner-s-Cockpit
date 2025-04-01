
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentTabs } from '@/components/investment/InvestmentTabs';
import { AIAssistantSheet } from '@/components/investment/AIAssistantSheet';
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
      initialInsights={investmentInsights}
    >
      <div className="max-w-7xl mx-auto">
        <InvestmentHeader 
          title="Investment Impact" 
          description="Track and analyze the financial performance of your construction projects"
          onChatOpen={() => setSheetOpen(true)}
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
    </DashboardLayout>
  );
};

export default InvestmentImpact;
