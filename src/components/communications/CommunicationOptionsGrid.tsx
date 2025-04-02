
import React from 'react';
import { CommunicationOption } from '@/components/communications/CommunicationOption';
import { Mail, MessageSquare, Phone, Video, Calendar, Slack } from 'lucide-react';

interface CommunicationOptionsGridProps {
  onEmailClick: () => void;
  onMessageClick: () => void;
  onCallClick: () => void;
  onVideoClick: () => void;
  onMeetingClick: () => void;
  onSlackClick: () => void;
  onTeamsClick: () => void;
}

export const CommunicationOptionsGrid = ({
  onEmailClick,
  onMessageClick,
  onCallClick,
  onVideoClick,
  onMeetingClick,
  onSlackClick,
  onTeamsClick
}: CommunicationOptionsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      <CommunicationOption
        title="Send Email"
        description="Compose and send an email to project stakeholders"
        icon={Mail}
        iconColor="text-blue-400"
        onClick={onEmailClick}
      />
      
      <CommunicationOption
        title="Send Message"
        description="Send a direct message to team members"
        icon={MessageSquare}
        iconColor="text-green-400"
        onClick={onMessageClick}
      />
      
      <CommunicationOption
        title="Make a Call"
        description="Initiate a phone call with project contacts"
        icon={Phone}
        iconColor="text-yellow-400"
        onClick={onCallClick}
      />
      
      <CommunicationOption
        title="Video Conference"
        description="Start or schedule a video meeting"
        icon={Video}
        iconColor="text-red-400"
        onClick={onVideoClick}
      />
      
      <CommunicationOption
        title="Schedule Meeting"
        description="Set up in-person or virtual meetings"
        icon={Calendar}
        iconColor="text-purple-400"
        onClick={onMeetingClick}
      />
      
      <CommunicationOption
        title="Slack Message"
        description="Send a message to Slack channels or users"
        icon={Slack}
        iconColor="text-pink-400"
        onClick={onSlackClick}
      />
      
      <CommunicationOption
        title="MS Teams Message"
        description="Communicate via Microsoft Teams"
        icon={MessageSquare}
        iconColor="text-blue-500"
        onClick={onTeamsClick}
      />
    </div>
  );
};
