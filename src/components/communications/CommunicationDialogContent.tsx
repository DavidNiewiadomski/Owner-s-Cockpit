
import React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { CommunicationForm } from '@/components/communications/CommunicationForm';
import { Mail, MessageSquare, Phone, Video, Calendar, Slack } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext'; // Import useProject
import type { Communication } from '@/lib/supabase'; // Import Supabase Communication type

interface CommunicationDialogContentProps {
  activeDialog: string | null;
  onClose: () => void;
  // The onSubmit prop in CommunicationForm expects Omit<Communication, 'id' | 'created_at' | 'updated_at' | 'sender_id'>
  // Ensure this onSubmit prop matches that, or adjust as necessary if it's a generic handler.
  // For now, keeping 'any' as it was, but ideally this should be typed.
  onSubmit: (data: Omit<Communication, 'id' | 'created_at' | 'updated_at' | 'sender_id'>) => void;
}

export const CommunicationDialogContent = ({ 
  activeDialog, 
  onClose, 
  onSubmit 
}: CommunicationDialogContentProps) => {
  const { selectedProject } = useProject();
  const currentProjectId = selectedProject?.id === 'all' ? undefined : selectedProject?.id;

  if (!activeDialog) return null;

  let communicationType: Communication['communication_type'];
  let formProps: any = { // Using 'any' for formProps for brevity, can be typed more strictly
    onClose,
    onSubmit,
    projectId: currentProjectId,
  };

  switch (activeDialog) {
    case 'email':
      communicationType = 'email';
      formProps = {
        ...formProps,
        modalTitle: "Send Email",
        icon: <Mail className="h-5 w-5 text-blue-400" />,
        recipientLabel: "Email Address",
        showSubject: true,
        showMessage: true,
        showAttachment: true,
        communicationType,
      };
      break;
    case 'message':
      communicationType = 'message';
      formProps = {
        ...formProps,
        modalTitle: "Send Message",
        icon: <MessageSquare className="h-5 w-5 text-green-400" />,
        recipientLabel: "Recipient",
        showSubject: false,
        showMessage: true,
        communicationType,
      };
      break;
    case 'call':
      communicationType = 'call';
      formProps = {
        ...formProps,
        modalTitle: "Log a Call",
        icon: <Phone className="h-5 w-5 text-yellow-400" />,
        recipientLabel: "Phone Number",
        showSubject: false, // Calls might not have a "subject" in the same way emails do
        showMessage: true, // For call notes/summary
        showSchedule: true,
        communicationType,
      };
      break;
    case 'video': // Mapped to 'meeting'
      communicationType = 'meeting';
      formProps = {
        ...formProps,
        modalTitle: "Log Video Conference",
        icon: <Video className="h-5 w-5 text-red-400" />,
        recipientLabel: "Participants",
        showSubject: true,
        showMessage: true, // For meeting notes/summary
        showSchedule: true,
        communicationType,
      };
      break;
    case 'meeting':
      communicationType = 'meeting';
      formProps = {
        ...formProps,
        modalTitle: "Schedule Meeting",
        icon: <Calendar className="h-5 w-5 text-purple-400" />,
        recipientLabel: "Participants",
        showSubject: true,
        showMessage: true,
        showSchedule: true,
        communicationType,
      };
      break;
    case 'slack': // Mapped to 'message'
    case 'teams': // Mapped to 'message'
      communicationType = 'message';
      formProps = {
        ...formProps,
        modalTitle: activeDialog === 'slack' ? "Slack Message" : "MS Teams Message",
        icon: activeDialog === 'slack' ? <Slack className="h-5 w-5 text-pink-400" /> : <MessageSquare className="h-5 w-5 text-blue-500" />,
        recipientLabel: "Channel or User",
        showSubject: false,
        showMessage: true,
        communicationType,
      };
      break;
    default:
      return null; // Or some default UI / error
  }
  
  return (
    <DialogContent className="p-0 border-none bg-transparent max-w-none">
      <CommunicationForm {...formProps} />
    </DialogContent>
  );
};
