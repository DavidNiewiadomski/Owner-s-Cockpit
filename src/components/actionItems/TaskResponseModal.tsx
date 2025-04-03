
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTaskResponseModal } from '@/hooks/useTaskResponseModal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Phone, CheckCircle, Copy, Send } from 'lucide-react';

export function TaskResponseModal() {
  const { isOpen, selectedTask, closeModal } = useTaskResponseModal();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('email');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedTask) return null;

  // Generate different response types based on the task
  const getEmailDraft = () => {
    const task = selectedTask;
    return {
      to: `stakeholders@${task.project.toLowerCase().replace(/\s+/g, '')}.com`,
      subject: `RE: ${task.title}`,
      body: `Hello,

I'm reaching out regarding the ${task.title} for the ${task.project} project.

${task.description}

Could you please review and provide your approval/feedback at your earliest convenience? This is ${task.priority === 'high' ? 'urgent and requires immediate attention' : 'important for our project timeline'}.

Relevant documents can be found in the project repository under ${task.project}/documentation.

Thank you for your assistance.

Best regards,
[Your Name]`
    };
  };

  const getMessageDraft = () => {
    const task = selectedTask;
    return `Hi team, I need your input on the ${task.title} for ${task.project}. ${task.description} Please let me know your thoughts ${task.priority === 'high' ? 'ASAP' : 'when you have a moment'}. Thanks!`;
  };

  const getPhoneCallScript = () => {
    const task = selectedTask;
    return `Hello, this is [Your Name] from the ${task.project} project team.

I'm calling about the ${task.title} that requires your attention.

Key points to discuss:
- ${task.description}
- The deadline is ${new Date(task.dueDate).toLocaleDateString()}
- This is a ${task.priority} priority item
- We need your ${task.type} to proceed

Do you have any questions or concerns about this task?
When do you think you'll be able to complete this?

Thank you for your time.`;
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this content wherever you need it."
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSend = () => {
    setIsLoading(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Communication sent",
        description: `Your ${activeTab} has been sent successfully.`
      });
      closeModal();
    }, 1500);
  };

  // Draft content based on active tab
  const emailDraft = getEmailDraft();
  const messageDraft = getMessageDraft();
  const phoneScript = getPhoneCallScript();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-black border-gray-700 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-cyan-400" />
            AI-Assisted Response for: {selectedTask.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Choose a communication method and use these AI-generated drafts to complete this task quickly.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </TabsTrigger>
            <TabsTrigger value="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Script
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">To:</label>
              <Input value={emailDraft.to} className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Subject:</label>
              <Input value={emailDraft.subject} className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Message:</label>
              <Textarea 
                value={emailDraft.body} 
                className="bg-gray-900 border-gray-700 text-white min-h-[200px]" 
              />
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="gap-2 text-gray-300 border-gray-700" 
                onClick={() => handleCopyContent(emailDraft.body)}
              >
                <Copy className="h-4 w-4" />
                {isCopied && activeTab === 'email' ? 'Copied!' : 'Copy'}
              </Button>
              <Button 
                className="gap-2 bg-cyan-700 hover:bg-cyan-600" 
                onClick={handleSend}
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
                {isLoading && activeTab === 'email' ? 'Sending...' : 'Send Email'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="message" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Message:</label>
              <Textarea 
                value={messageDraft} 
                className="bg-gray-900 border-gray-700 text-white min-h-[150px]" 
              />
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="gap-2 text-gray-300 border-gray-700" 
                onClick={() => handleCopyContent(messageDraft)}
              >
                <Copy className="h-4 w-4" />
                {isCopied && activeTab === 'message' ? 'Copied!' : 'Copy'}
              </Button>
              <Button 
                className="gap-2 bg-cyan-700 hover:bg-cyan-600" 
                onClick={handleSend}
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
                {isLoading && activeTab === 'message' ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Call Script:</label>
              <Textarea 
                value={phoneScript} 
                className="bg-gray-900 border-gray-700 text-white min-h-[250px]" 
              />
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                className="gap-2 text-gray-300 border-gray-700" 
                onClick={() => handleCopyContent(phoneScript)}
              >
                <Copy className="h-4 w-4" />
                {isCopied && activeTab === 'phone' ? 'Copied!' : 'Copy'}
              </Button>
              <Button 
                className="gap-2 bg-cyan-700 hover:bg-cyan-600"
                onClick={() => {
                  toast({
                    title: "Phone Call Initiated",
                    description: "The AI assistant is ready to make this call for you."
                  });
                }}
              >
                <Phone className="h-4 w-4" />
                Start Call
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
