
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecentCommunications } from '@/components/communications/RecentCommunications';
import { ScheduledCommunications } from '@/components/communications/ScheduledCommunications';

interface Communication {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'video' | 'message';
  contact: {
    name: string;
    avatar?: string;
  };
  subject?: string;
  excerpt?: string;
  date: string;
  time: string;
  project: string;
}

interface ScheduledEvent {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'video';
  date: string;
  time: string;
  duration: string;
  participants: string[];
  project: string;
}

interface CommunicationTabsProps {
  communications: Communication[];
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
            communications={communications.filter(c => c.type === 'email')} 
          />
        </TabsContent>
        
        <TabsContent value="messages" className="m-0">
          <RecentCommunications 
            communications={communications.filter(c => c.type === 'message')} 
          />
        </TabsContent>
        
        <TabsContent value="calls" className="m-0">
          <RecentCommunications 
            communications={communications.filter(c => c.type === 'call' || c.type === 'video')} 
          />
        </TabsContent>
      </Tabs>
      
      <ScheduledCommunications events={scheduledEvents} />
    </div>
  );
};
