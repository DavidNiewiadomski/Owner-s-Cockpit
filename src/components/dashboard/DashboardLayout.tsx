
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';
import { AIAssistantSheet } from '@/components/investment/AIAssistantSheet';
import { Insight } from '@/data/investment/investmentData';

interface DashboardLayoutProps {
  children: React.ReactNode;
  projectContext?: string; // Made optional since we're now using dynamic titles
  projectName: string;
  initialInsights: Insight[];
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export function DashboardLayout({ 
  children, 
  projectContext, // This is now optional and mainly used for subtitle
  projectName, 
  initialInsights,
  searchTerm,
  onSearch 
}: DashboardLayoutProps) {
  const [isAISheetOpen, setIsAISheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex h-screen">
        <SidebarNavigation />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader 
            subtitle={projectName}
            onSearch={onSearch}
          />
          <div className="flex-1 overflow-y-auto">
            <main className="p-6 space-y-6">
              <AIInsightsCard 
                insights={initialInsights} 
                onChatOpen={() => setIsAISheetOpen(true)} 
              />
              {children}
            </main>
          </div>
        </div>
      </div>
      
      <AIAssistantSheet 
        isOpen={isAISheetOpen} 
        onOpenChange={setIsAISheetOpen} 
      />
    </div>
  );
}
