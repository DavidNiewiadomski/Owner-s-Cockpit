
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

export function OwnerAgent({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: '1',
      role: 'agent',
      content: "Hello, I'm your construction project assistant. How can I help you today?",
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
    
    // Simulate agent thinking
    setIsThinking(true);
    
    // Process the message and detect intent
    setTimeout(() => {
      const lowerCaseMessage = messageContent.toLowerCase();
      let responseType: 'text' | 'task' | 'summary' | 'alert' = 'text';
      let actionType = '';
      
      // Simple intent detection
      if (lowerCaseMessage.includes('email') || lowerCaseMessage.includes('message')) {
        responseType = 'task';
        actionType = 'email';
      } else if (lowerCaseMessage.includes('call') || lowerCaseMessage.includes('phone')) {
        responseType = 'task';
        actionType = 'call';
      } else if (lowerCaseMessage.includes('report') || lowerCaseMessage.includes('summary')) {
        responseType = 'task';
        actionType = 'report';
      } else if (lowerCaseMessage.includes('schedule') || lowerCaseMessage.includes('meeting') || lowerCaseMessage.includes('calendar')) {
        responseType = 'task';
        actionType = 'schedule';
      } else if (lowerCaseMessage.includes('remind') || lowerCaseMessage.includes('reminder')) {
        responseType = 'task';
        actionType = 'reminder';
      } else if (lowerCaseMessage.includes('alert') || lowerCaseMessage.includes('warning')) {
        responseType = 'alert';
        actionType = 'alert';
      }
      
      let responseContent = '';
      
      if (responseType === 'task') {
        switch (actionType) {
          case 'email':
            responseContent = "I'll draft an email for you. Who would you like to send it to and what should the main point be?";
            break;
          case 'call':
            responseContent = "I'll set up a call for you. Who would you like to call and what topics should I prepare for discussion?";
            break;
          case 'report':
            responseContent = "I'll generate a report for you. Which project would you like me to focus on, and what specific aspects should I include?";
            break;
          case 'schedule':
            responseContent = "I'll schedule a meeting. What date and time works for you, and who should be invited?";
            break;
          case 'reminder':
            responseContent = "I'll set a reminder for you. What would you like to be reminded about and when?";
            break;
          default:
            responseContent = "I understand you want me to take an action. Could you please clarify what you'd like me to do?";
        }
      } else if (responseType === 'alert') {
        responseContent = "I'll send an alert regarding this issue. Who needs to be notified and what's the urgency level?";
      } else {
        // General response
        responseContent = "I'm here to help with your construction projects. I can send emails, make calls, generate reports, schedule meetings, set reminders, or send alerts. What would you like me to do?";
      }
      
      // Add agent response
      const agentResponse: AgentMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: responseType,
        action: responseType === 'task' || responseType === 'alert' ? {
          type: actionType,
          status: 'pending'
        } : undefined
      };
      
      setMessages([...updatedMessages, agentResponse]);
      setIsThinking(false);
      
      // If action was detected, set it as active
      if (actionType) {
        setActiveAction(actionType);
      }
    }, 1500);
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
