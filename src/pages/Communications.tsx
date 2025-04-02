
import React, { useState } from 'react';
import { CommunicationsLayout } from '@/components/communications/CommunicationsLayout';
import { CommunicationsHeader } from '@/components/communications/CommunicationsHeader';
import { CommunicationOptionsGrid } from '@/components/communications/CommunicationOptionsGrid';
import { CommunicationTabs } from '@/components/communications/CommunicationTabs';
import { CommunicationDialogContent } from '@/components/communications/CommunicationDialogContent';
import { CommunicationStats } from '@/components/communications/CommunicationStats';
import { 
  recentCommunications, 
  scheduledEvents, 
  communicationInsights 
} from '@/data/communications/communicationData';

const Communications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  
  // Communication type handlers
  const handleEmailClick = () => setActiveDialog('email');
  const handleMessageClick = () => setActiveDialog('message');
  const handleCallClick = () => setActiveDialog('call');
  const handleVideoClick = () => setActiveDialog('video');
  const handleMeetingClick = () => setActiveDialog('meeting');
  const handleSlackClick = () => setActiveDialog('slack');
  const handleTeamsClick = () => setActiveDialog('teams');
  
  const handleCloseDialog = () => setActiveDialog(null);
  
  const handleSubmit = (data: any) => {
    console.log('Communication submitted:', { type: activeDialog, data });
    // In a real app, we would send this data to an API
  };
  
  return (
    <CommunicationsLayout
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      activeDialog={activeDialog}
      handleCloseDialog={handleCloseDialog}
      communicationInsights={communicationInsights}
      dialogContent={
        <CommunicationDialogContent
          activeDialog={activeDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
        />
      }
    >
      <CommunicationsHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <CommunicationStats 
        emails={42}
        messages={24}
        calls={13}
        meetings={8}
        videoConferences={5}
      />
      
      <CommunicationOptionsGrid
        onEmailClick={handleEmailClick}
        onMessageClick={handleMessageClick}
        onCallClick={handleCallClick}
        onVideoClick={handleVideoClick}
        onMeetingClick={handleMeetingClick}
        onSlackClick={handleSlackClick}
        onTeamsClick={handleTeamsClick}
      />
      
      <CommunicationTabs
        communications={recentCommunications}
        scheduledEvents={scheduledEvents}
      />
    </CommunicationsLayout>
  );
};

export default Communications;
