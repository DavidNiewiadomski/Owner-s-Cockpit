
import React, { ReactNode } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { Dialog } from '@/components/ui/dialog';

interface CommunicationsLayoutProps {
  children: ReactNode;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeDialog: string | null;
  handleCloseDialog: () => void;
  dialogContent: ReactNode;
  communicationInsights: any[];
}

export const CommunicationsLayout = ({
  children,
  searchTerm,
  setSearchTerm,
  activeDialog,
  handleCloseDialog,
  dialogContent,
  communicationInsights
}: CommunicationsLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-black">
      <SidebarNavigation />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 pt-6 pb-0">
            <CollapsibleAIAssistant
              projectContext="your communications"
              initialInsights={communicationInsights}
            />
          </div>
          
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Communication Form Dialogs */}
      <Dialog open={activeDialog !== null} onOpenChange={() => activeDialog && handleCloseDialog()}>
        {dialogContent}
      </Dialog>
    </div>
  );
};
