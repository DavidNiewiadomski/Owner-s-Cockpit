
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';
import { AIAssistantSheet } from '@/components/investment/AIAssistantSheet';
import { Insight } from '@/data/investment/investmentData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  projectContext: string;
  projectName: string;
  initialInsights: Insight[];
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export function DashboardLayout({ 
  children, 
  projectContext, 
  projectName, 
  initialInsights,
  searchTerm,
  onSearch 
}: DashboardLayoutProps) {
  const [isAISheetOpen, setIsAISheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <SidebarNavigation />
        <div className="flex-1">
          <DashboardHeader 
            title={projectContext}
            subtitle={projectName}
            onSearch={onSearch}
          />
          <main className="p-6 space-y-6">
            <AIInsightsCard 
              insights={initialInsights} 
              onChatOpen={() => setIsAISheetOpen(true)} 
            />
            {children}
          </main>
        </div>
      </div>
      
      <AIAssistantSheet 
        isOpen={isAISheetOpen} 
        onOpenChange={setIsAISheetOpen} 
      />
    </div>
  );
}
