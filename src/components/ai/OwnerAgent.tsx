
import React, { useState, useRef, useEffect } from 'react';
import { Brain, MessageSquare, Mic, MicOff, Send, X, Mail, Phone, FileText, Calendar, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { AgentActionExecutor } from '@/components/ai/AgentActionExecutor';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';

type MessageType = 'text' | 'task' | 'summary' | 'alert';

interface AgentMessage {
  id: string;
  content: string;
  timestamp: string;
  role: 'agent' | 'user';
  type: MessageType;
  action?: {
    type: string;
    status: 'pending' | 'completed' | 'failed';
    result?: string;
  };
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      let responseType: MessageType = 'text';
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
          <SheetHeader className="p-4 border-b border-gray-800 bg-gray-900/50">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-950 mr-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <span className="text-sm text-blue-100">Owner's Agent</span>
                  <div className="flex items-center mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
              </SheetTitle>
              
              <Button 
                onClick={() => setShowActions(!showActions)} 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
              >
                Actions {showActions ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </SheetHeader>
          
          {showActions && (
            <div className="p-3 bg-gray-900/30 border-b border-gray-800 grid grid-cols-3 gap-2">
              {agentActions.map((action) => (
                <Button 
                  key={action.id} 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setInput(`I need you to ${action.label.toLowerCase()}`);
                    setShowActions(false);
                  }}
                  className="h-auto py-3 flex flex-col items-center gap-1 bg-gray-900/50 border-gray-700 hover:bg-gray-800"
                >
                  <action.icon className="h-4 w-4 text-blue-400" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  msg.role === 'user' 
                    ? "bg-blue-950/50 text-blue-50" 
                    : "bg-gray-900/70 text-gray-50",
                  msg.type === 'task' && "border-l-2 border-yellow-500",
                  msg.type === 'summary' && "border-l-2 border-green-500",
                  msg.type === 'alert' && "border-l-2 border-red-500"
                )}>
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.role === 'user' ? 'You' : 'Agent'} • {msg.timestamp}
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  
                  {msg.action && (
                    <div className="mt-2">
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs",
                          msg.action.status === 'pending' ? "bg-yellow-950/30 text-yellow-400 border-yellow-800" :
                          msg.action.status === 'completed' ? "bg-green-950/30 text-green-400 border-green-800" :
                          "bg-red-950/30 text-red-400 border-red-800"
                        )}
                      >
                        {msg.action.status === 'pending' && 'Pending Action'}
                        {msg.action.status === 'completed' && 'Completed'}
                        {msg.action.status === 'failed' && 'Failed'}
                      </Badge>
                      
                      {msg.action.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 h-7 text-xs bg-blue-950/30 hover:bg-blue-900/30 border-blue-800 text-blue-400"
                          onClick={() => completeAction(msg.action?.type || '')}
                        >
                          Execute Action
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex items-start">
                <div className="bg-gray-900/70 text-gray-50 max-w-[80%] rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">
                    Agent • Thinking...
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
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
          
          <form 
            onSubmit={handleSendMessage} 
            className="p-4 border-t border-gray-800 bg-gray-900/30"
          >
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Message your assistant..."}
                  className="bg-gray-800 border-gray-700 focus-visible:ring-blue-600 text-white pr-8"
                  disabled={isListening}
                />
                {isListening && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              
              {hasRecognitionSupport && (
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost"
                  onClick={toggleVoiceRecognition}
                  className={cn(
                    "rounded-full bg-gray-800 border border-gray-700 text-white h-10 w-10",
                    isListening && "bg-red-900/30 text-red-400 border-red-800"
                  )}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              )}
              
              <Button 
                type="submit" 
                size="icon" 
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white h-10 w-10"
                disabled={isListening || (!input.trim() && !transcript)}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
