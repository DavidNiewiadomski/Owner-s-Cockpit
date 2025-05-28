
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { Dialog } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CommunicationsLayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeDialog: string | null;
  handleCloseDialog: () => void;
  communicationInsights: any[];
  dialogContent: React.ReactNode;
}

export function CommunicationsLayout({
  children,
  searchTerm,
  setSearchTerm,
  activeDialog,
  handleCloseDialog,
  communicationInsights,
  dialogContent
}: CommunicationsLayoutProps) {
  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <ScrollArea className="flex-1">
          <main className="container mx-auto py-6 px-4 md:px-6">
            <CollapsibleAIAssistant 
              projectContext="Communications"
              projectName="All Projects"
              initialInsights={communicationInsights}
            />
            {children}
          </main>
        </ScrollArea>
      </div>
      
      <Dialog open={!!activeDialog} onOpenChange={handleCloseDialog}>
        {dialogContent}
      </Dialog>
    </div>
  );
}
