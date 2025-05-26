
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import type { Communication } from '@/lib/supabase'; // Import Supabase Communication type

interface CommunicationFormProps {
  title: string; // This prop will be used as the modal title, not directly for communicationData.title
  icon: React.ReactNode;
  communicationType: Communication['communication_type']; // New prop
  projectId?: string; // New prop
  recipientLabel?: string;
  showSubject?: boolean;
  showMessage?: boolean;
  showAttachment?: boolean;
  showSchedule?: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Communication, 'id' | 'created_at' | 'updated_at' | 'sender_id'>) => void; // Updated onSubmit data type
}

export function CommunicationForm({
  title: modalTitle, // Renamed prop to avoid confusion with communication title
  icon,
  communicationType, // Use new prop
  projectId, // Use new prop
  recipientLabel = "Recipient",
  showSubject = true,
  showMessage = true,
  showAttachment = false,
  showSchedule = false,
  onClose,
  onSubmit
}: CommunicationFormProps) {
  const { toast } = useToast(); // Keep toast for local validation/error feedback
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Recipient validation (as per previous step, kept for relevant types)
    if (!recipient && (communicationType === 'email' || communicationType === 'message')) {
      toast({
        title: "Missing information",
        description: `Please enter a ${recipientLabel.toLowerCase()}.`,
        variant: "destructive"
      });
      return;
    }
    
    let finalTitle = subject.trim();
    if (!showSubject || !finalTitle) {
      const typeLabel = communicationType.charAt(0).toUpperCase() + communicationType.slice(1);
      if (recipient) {
        finalTitle = `${typeLabel} to/with ${recipient.trim()}`;
      } else {
        finalTitle = `${typeLabel} Log`;
      }
    }
    if (!finalTitle.trim() && (communicationType === 'email' || communicationType === 'message')) {
       toast({
        title: "Missing information",
        description: "Please provide a subject or message content to generate a title.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const communicationData: Omit<Communication, 'id' | 'created_at' | 'updated_at' | 'sender_id'> = {
      title: finalTitle,
      content: message.trim(),
      communication_type: communicationType,
      project_id: projectId,
      recipient_ids: recipient ? [recipient.trim()] : [],
    };

    try {
      await onSubmit(communicationData); // onSubmit now returns a Promise
      // Success toast and onClose are now handled by the parent component
      // Reset form state after successful submission handled by parent calling onClose, which can trigger reset.
    } catch (error) {
      // Display error toast if onSubmit promise rejects
      console.error("Error submitting communication:", error);
      toast({ 
        title: "Error Sending Communication", 
        description: (error instanceof Error ? error.message : "An unexpected error occurred."), 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
      // onClose(); // IMPORTANT: Parent component is now responsible for calling onClose
    }
  };
  
  return (
    <Card className="w-full max-w-lg border-cyan-900/30 bg-black/60 backdrop-blur-sm">
      <CardHeader className="border-b border-cyan-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-blue-200">{modalTitle}</CardTitle> {/* Use modalTitle prop */}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription className="text-gray-400">
          Fill in the details below to send your communication
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-300 mb-1">
              {recipientLabel}
            </label>
            <Input 
              id="recipient" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-blue-950/20 border-blue-900/40 text-blue-100"
              placeholder={`Enter ${recipientLabel.toLowerCase()}`}
            />
          </div>
          
          {showSubject && (
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Subject
              </label>
              <Input 
                id="subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-blue-950/20 border-blue-900/40 text-blue-100"
                placeholder="Enter subject"
              />
            </div>
          )}
          
          {showMessage && (
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Message
              </label>
              <Textarea 
                id="message" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-blue-950/20 border-blue-900/40 text-blue-100 min-h-24"
                placeholder="Type your message here"
              />
            </div>
          )}
          
          {showAttachment && (
            <div>
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-300 mb-1">
                Attachment
              </label>
              <Input 
                id="attachment" 
                type="file"
                className="bg-blue-950/20 border-blue-900/40 text-blue-100"
              />
            </div>
          )}
          
          {showSchedule && (
            <div>
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-300 mb-1">
                Schedule (Optional)
              </label>
              <Input 
                id="schedule" 
                type="datetime-local"
                className="bg-blue-950/20 border-blue-900/40 text-blue-100"
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-cyan-900/30 pt-4">
          <div className="flex gap-2 ml-auto">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="border-cyan-900/40 text-gray-400"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-700 hover:bg-cyan-600 text-cyan-50"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
