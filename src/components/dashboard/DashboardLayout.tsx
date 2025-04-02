
import React, { ReactNode, useState } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { CustomizationMenu } from '@/components/customization/CustomizationMenu';

interface DashboardLayoutProps {
  children: ReactNode;
  projectContext?: string;
  projectName?: string;
  initialInsights?: any[];
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export function DashboardLayout({ 
  children, 
  projectContext = "Dashboard",
  projectName = "All Projects",
  initialInsights = [],
  searchTerm = "",
  onSearch = () => {}
}: DashboardLayoutProps) {
  const [aiExpanded, setAiExpanded] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  
  const handleAssistantClick = () => {
    setAiExpanded(!aiExpanded);
  };
  
  const handleCustomizeClick = () => {
    setCustomizeOpen(!customizeOpen);
  };
  
  return (
    <div className="flex h-screen w-full bg-black">
      <SidebarNavigation 
        onAssistantClick={handleAssistantClick}
        onCustomizeClick={handleCustomizeClick}
      />
      
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <DashboardHeader onSearch={onSearch} />

        <CollapsibleAIAssistant 
          projectContext={projectContext}
          projectName={projectName}
          initialInsights={initialInsights}
          isExpanded={aiExpanded}
          onExpandChange={setAiExpanded}
        />
        
        <main className="flex-1 p-6 bg-black overflow-y-auto w-full">
          <div className="w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {customizeOpen && (
        <CustomizationMenu 
          isOpen={customizeOpen} 
          onOpenChange={setCustomizeOpen}
          pageId={projectContext.toLowerCase()}
        />
      )}
    </div>
  );
}
