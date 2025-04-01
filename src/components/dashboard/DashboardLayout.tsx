
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
    <div className="flex h-screen bg-black overflow-hidden">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={onSearch} />

        <CollapsibleAIAssistant 
          projectContext={projectContext}
          projectName={projectName}
          initialInsights={initialInsights}
        />
        
        <main className="flex-1 p-6 bg-black overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
