
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
  
  // Get the current page ID from the location path
  const currentPageId = location.pathname.replace('/', '') || 'dashboard';
  
  const handleAssistantClick = () => {
    setAiExpanded(!aiExpanded);
  };
  
  const handleCustomizeClick = () => {
    setCustomizeOpen(!customizeOpen);
  };
  
  return (
    <div className="flex h-screen w-full bg-black overflow-hidden">
      <SidebarNavigation 
        onAssistantClick={handleAssistantClick}
        onCustomizeClick={handleCustomizeClick}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader onSearch={onSearch} />

        <main className="flex-1 overflow-y-auto bg-black">
          {/* Only render the CollapsibleAIAssistant if initialInsights has items */}
          {initialInsights.length > 0 && (
            <div className="p-6 pt-6 pb-0">
              <CollapsibleAIAssistant 
                projectContext={projectContext}
                projectName={projectName}
                initialInsights={initialInsights}
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="w-full mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Customization Menu */}
      <CustomizationMenu 
        isOpen={customizeOpen} 
        onClose={() => setCustomizeOpen(false)} 
        pageId={currentPageId}
      />
    </div>
  );
}
