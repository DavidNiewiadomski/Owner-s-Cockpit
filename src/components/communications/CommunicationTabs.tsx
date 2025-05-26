
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecentCommunications } from '@/components/communications/RecentCommunications';
import { ScheduledCommunications } from '@/components/communications/ScheduledCommunications';
// Local Communication type removed
import type { ScheduledEvent } from '@/data'; // Keep ScheduledEvent for now
import type { Communication } from '@/lib/supabase'; // Import Supabase Communication type

interface CommunicationTabsProps {
  communications: (Communication & { projectTitle: string })[]; // Expect enriched communications
  scheduledEvents: ScheduledEvent[];
}

export const CommunicationTabs = ({ communications, scheduledEvents }: CommunicationTabsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="m-0">
          <RecentCommunications communications={communications} />
        </TabsContent>
        
        <TabsContent value="emails" className="m-0">
          <RecentCommunications 
            communications={communications.filter(c => c.communication_type === 'email')} 
          />
        </TabsContent>
        
        <TabsContent value="messages" className="m-0">
          <RecentCommunications 
            communications={communications.filter(c => c.communication_type === 'message')} 
          />
        </TabsContent>
        
        <TabsContent value="calls" className="m-0">
          <RecentCommunications 
            communications={communications.filter(c => c.communication_type === 'call')} 
            // Assuming 'video' is not a Supabase communication_type, or needs to be handled if it is
          />
        </TabsContent>
      </Tabs>
      
      <ScheduledCommunications events={scheduledEvents} />
    </div>
  );
};
