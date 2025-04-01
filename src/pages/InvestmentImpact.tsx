
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { InvestmentHeader } from '@/components/investment/InvestmentHeader';
import { InvestmentTabs } from '@/components/investment/InvestmentTabs';
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';
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
    <div className="flex min-h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={(term) => console.log('Search term:', term)} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <AIInsightsCard 
              insights={investmentInsights} 
              onChatOpen={() => setSheetOpen(true)} 
            />
            
            <InvestmentHeader 
              title="Investment Impact" 
              description="Track and analyze the financial performance of your construction projects" 
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
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
