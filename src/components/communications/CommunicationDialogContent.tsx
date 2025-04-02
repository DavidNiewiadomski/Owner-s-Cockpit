
import React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { CommunicationForm } from '@/components/communications/CommunicationForm';
import { Mail, MessageSquare, Phone, Video, Calendar, Slack } from 'lucide-react';

interface CommunicationDialogContentProps {
  activeDialog: string | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CommunicationDialogContent = ({ 
  activeDialog, 
  onClose, 
  onSubmit 
}: CommunicationDialogContentProps) => {
  if (!activeDialog) return null;
  
  return (
    <DialogContent className="p-0 border-none bg-transparent max-w-none">
      {activeDialog === 'email' && (
        <CommunicationForm
          title="Send Email"
          icon={<Mail className="h-5 w-5 text-blue-400" />}
          recipientLabel="Email Address"
          showSubject={true}
          showMessage={true}
          showAttachment={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      
      {activeDialog === 'message' && (
        <CommunicationForm
          title="Send Message"
          icon={<MessageSquare className="h-5 w-5 text-green-400" />}
          recipientLabel="Recipient"
          showSubject={false}
          showMessage={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      
      {activeDialog === 'call' && (
        <CommunicationForm
          title="Make a Call"
          icon={<Phone className="h-5 w-5 text-yellow-400" />}
          recipientLabel="Phone Number"
          showSubject={false}
          showMessage={false}
          showSchedule={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      
      {activeDialog === 'video' && (
        <CommunicationForm
          title="Video Conference"
          icon={<Video className="h-5 w-5 text-red-400" />}
          recipientLabel="Participants"
          showSubject={true}
          showMessage={false}
          showSchedule={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      
      {activeDialog === 'meeting' && (
        <CommunicationForm
          title="Schedule Meeting"
          icon={<Calendar className="h-5 w-5 text-purple-400" />}
          recipientLabel="Participants"
          showSubject={true}
          showMessage={true}
          showSchedule={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      
      {activeDialog === 'slack' && (
        <CommunicationForm
          title="Slack Message"
          icon={<Slack className="h-5 w-5 text-pink-400" />}
          recipientLabel="Channel or User"
          showSubject={false}
          showMessage={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      
      {activeDialog === 'teams' && (
        <CommunicationForm
          title="MS Teams Message"
          icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
          recipientLabel="Channel or User"
          showSubject={false}
          showMessage={true}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </DialogContent>
  );
};
