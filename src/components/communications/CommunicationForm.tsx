
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface CommunicationFormProps {
  title: string;
  icon: React.ReactNode;
  recipientLabel?: string;
  showSubject?: boolean;
  showMessage?: boolean;
  showAttachment?: boolean;
  showSchedule?: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CommunicationForm({
  title,
  icon,
  recipientLabel = "Recipient",
  showSubject = true,
  showMessage = true,
  showAttachment = false,
  showSchedule = false,
  onClose,
  onSubmit
}: CommunicationFormProps) {
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient) {
      toast({
        title: "Missing information",
        description: `Please enter a ${recipientLabel.toLowerCase()}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        recipient,
        subject,
        message
      });
      
      toast({
        title: "Success",
        description: "Your communication has been sent!",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-lg border-cyan-900/30 bg-black/60 backdrop-blur-sm">
      <CardHeader className="border-b border-cyan-900/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-blue-200">{title}</CardTitle>
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
