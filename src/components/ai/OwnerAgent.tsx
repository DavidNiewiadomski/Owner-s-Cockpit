import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, Mail, Phone, FileText, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";
import { AgentActionExecutor } from '@/components/ai/AgentActionExecutor';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { AgentHeader } from '@/components/ai/agent/AgentHeader';
import { AgentActionList } from '@/components/ai/agent/AgentActionList';
import { MessageList } from '@/components/ai/agent/MessageList';
import { MessageInput } from '@/components/ai/agent/MessageInput';
import { AgentMessage } from '@/components/ai/agent/types';
import { aiService } from '@/services/aiService';

export function OwnerAgent({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: '1',
      role: 'agent',
      content: "Hello, I'm your live AI construction project assistant powered by Google Gemini. I can help you with emails, calls, reports, scheduling, and more. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [showActions, setShowActions] = useState(false);
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    hasRecognitionSupport 
  } = useVoiceRecognition();

  // Agent actions
  const agentActions = [
    { id: 'email', label: 'Draft Email', icon: Mail },
    { id: 'call', label: 'Make Call', icon: Phone },
    { id: 'report', label: 'Generate Report', icon: FileText },
    { id: 'schedule', label: 'Schedule Meeting', icon: Calendar },
    { id: 'reminder', label: 'Set Reminder', icon: Clock },
    { id: 'alert', label: 'Send Alert', icon: AlertCircle },
  ];

  // Update input when voice recognition changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim() && !transcript) return;
    const messageContent = input.trim() || transcript;
    
    // Add user message
    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    
    // Set thinking state
    setIsThinking(true);
    
    try {
      // Get AI response
      const aiResponse = await aiService.sendMessage(`As a construction project assistant agent, help with this request: ${messageContent}. If this involves taking an action like sending emails, making calls, generating reports, scheduling meetings, setting reminders, or sending alerts, clearly indicate what action should be taken.`);
      
      // Detect if response suggests an action
      const lowerResponse = aiResponse.toLowerCase();
      let actionType = '';
      let responseType: 'text' | 'task' | 'summary' | 'alert' = 'text';
      
      if (lowerResponse.includes('email') || lowerResponse.includes('draft') || lowerResponse.includes('send')) {
        responseType = 'task';
        actionType = 'email';
      } else if (lowerResponse.includes('call') || lowerResponse.includes('phone')) {
        responseType = 'task';
        actionType = 'call';
      } else if (lowerResponse.includes('report') || lowerResponse.includes('generate')) {
        responseType = 'task';
        actionType = 'report';
      } else if (lowerResponse.includes('schedule') || lowerResponse.includes('meeting')) {
        responseType = 'task';
        actionType = 'schedule';
      } else if (lowerResponse.includes('remind') || lowerResponse.includes('reminder')) {
        responseType = 'task';
        actionType = 'reminder';
      } else if (lowerResponse.includes('alert') || lowerResponse.includes('warning')) {
        responseType = 'alert';
        actionType = 'alert';
      }
      
      const agentResponse: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: responseType,
        action: actionType ? {
          type: actionType,
          status: 'pending'
        } : undefined
      };
      
      setMessages([...updatedMessages, agentResponse]);
      
      // If action was detected, set it as active
      if (actionType) {
        setActiveAction(actionType);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response
      const fallbackResponse: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: "I'm here to help with your construction projects. I can send emails, make calls, generate reports, schedule meetings, set reminders, or send alerts. What would you like me to do?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      
      setMessages([...updatedMessages, fallbackResponse]);
    } finally {
      setIsThinking(false);
    }
  };

  const completeAction = (actionType: string) => {
    // Find the pending action message
    const actionMessageIndex = messages.findIndex(
      msg => msg.action?.type === actionType && msg.action.status === 'pending'
    );
    
    if (actionMessageIndex === -1) return;
    
    // Create a copy of messages
    const updatedMessages = [...messages];
    
    // Update the action status
    if (updatedMessages[actionMessageIndex].action) {
      updatedMessages[actionMessageIndex].action!.status = 'completed';
    }
    
    // Add a summary message
    let summaryContent = '';
    switch (actionType) {
      case 'email':
        summaryContent = "Email draft has been created and is ready for your review. I've attached the relevant project documents.";
        break;
      case 'call':
        summaryContent = "Call has been scheduled. I'll compile a summary of the conversation afterward.";
        break;
      case 'report':
        summaryContent = "Report has been generated with the latest project metrics. You can view it in your documents.";
        break;
      case 'schedule':
        summaryContent = "Meeting has been scheduled and invitations sent to all participants.";
        break;
      case 'reminder':
        summaryContent = "Reminder has been set. You'll receive a notification at the specified time.";
        break;
      case 'alert':
        summaryContent = "Alert has been sent to the project team. They'll take action accordingly.";
        break;
    }
    
    const summaryMessage: AgentMessage = {
      id: Date.now().toString(),
      role: 'agent',
      content: summaryContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'summary'
    };
    
    setMessages([...updatedMessages, summaryMessage]);
    setActiveAction(null);
    
    toast({
      title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Completed`,
      description: "The action has been completed successfully.",
    });
  };

  const toggleVoiceRecognition = () => {
    if (isListening) {
      stopListening();
      handleSendMessage();
    } else {
      setInput('');
      startListening();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md p-0 border-none bg-black/90 backdrop-blur-lg overflow-hidden">
        <div className="flex flex-col h-full">
          <AgentHeader 
            showActions={showActions} 
            toggleShowActions={() => setShowActions(!showActions)} 
          />
          
          {showActions && (
            <AgentActionList 
              actions={agentActions} 
              onSelectAction={(actionText) => {
                setInput(actionText);
                setShowActions(false);
              }} 
            />
          )}
          
          <MessageList 
            messages={messages}
            isThinking={isThinking}
            completeAction={completeAction}
          />
          
          {activeAction && (
            <Card className="mx-4 mb-4 bg-blue-950/30 border-blue-800/50">
              <CardContent className="p-3">
                <AgentActionExecutor 
                  actionType={activeAction} 
                  onComplete={() => completeAction(activeAction)}
                />
              </CardContent>
            </Card>
          )}
          
          <MessageInput
            input={input}
            setInput={setInput}
            isListening={isListening}
            hasRecognitionSupport={hasRecognitionSupport}
            toggleVoiceRecognition={toggleVoiceRecognition}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
