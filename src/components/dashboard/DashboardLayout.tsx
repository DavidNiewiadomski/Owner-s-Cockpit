
import React, { ReactNode } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';

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
  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={onSearch} />

        <CollapsibleAIAssistant 
          projectContext={projectContext}
          projectName={projectName}
          initialInsights={initialInsights}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
