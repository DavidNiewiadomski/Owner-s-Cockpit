
import React, { ReactNode, useState } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { CustomizationMenu } from '@/components/customization/CustomizationMenu';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  const currentPageId = location.pathname.replace('/', '') || 'dashboard';
  
  const handleAssistantClick = () => {
    setAiExpanded(!aiExpanded);
  };
  
  const handleCustomizeClick = () => {
    setCustomizeOpen(!customizeOpen);
  };
  
  return (
    <div className="min-h-screen w-full bg-black flex overflow-hidden">
      <SidebarNavigation 
        onAssistantClick={handleAssistantClick}
        onCustomizeClick={handleCustomizeClick}
        className="flex-shrink-0"
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader 
          title="Dashboard"
          searchTerm={searchTerm}
          onSearch={onSearch}
          showSearch={true}
        />

        <main className="flex-1 overflow-y-auto bg-black p-6">
          {initialInsights.length > 0 && (
            <div className="mb-6">
              <CollapsibleAIAssistant 
                projectContext={projectContext}
                projectName={projectName}
                initialInsights={initialInsights}
              />
            </div>
          )}
          
          <div className="w-full max-w-none">
            {children}
          </div>
        </main>
      </div>
      
      <CustomizationMenu 
        isOpen={customizeOpen} 
        onClose={() => setCustomizeOpen(false)} 
        pageId={currentPageId}
      />
    </div>
  );
}
