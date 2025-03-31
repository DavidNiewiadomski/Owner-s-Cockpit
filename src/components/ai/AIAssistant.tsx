
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Minimize2, Maximize2, Mic, MicOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
  timestamp: string;
  isVoiceMessage?: boolean;
}

export function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello, I\'m your construction project assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to conversation
    const userMessage: Message = { 
      role: 'user', 
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (message.toLowerCase().includes('progress')) {
        response = 'The East Tower project is currently at 75% completion, on track for the September deadline.';
      } else if (message.toLowerCase().includes('budget')) {
        response = 'The current budget utilization is at 62%, with $4.2M spent of the total $6.8M allocation.';
      } else if (message.toLowerCase().includes('issue') || message.toLowerCase().includes('problem')) {
        response = 'There are currently 12 open issues across all projects. The most critical ones are related to material delivery delays.';
      } else {
        response = 'I\'m here to help you manage your construction projects. You can ask about project progress, budget status, or any issues that need attention.';
      }
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversation([...newConversation, assistantMessage]);
    }, 1000);
  };

  const toggleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startRecording(stream);
      } catch (err) {
        toast({
          title: "Microphone Access Denied",
          description: "Please enable microphone access to use voice chat.",
          variant: "destructive"
        });
        console.error("Error accessing microphone:", err);
      }
    }
  };

  const startRecording = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      // In a real app, you'd send this blob to a speech-to-text service
      // For demo purposes, we'll simulate a response
      const userMessage: Message = {
        role: 'user',
        content: "Voice message transcription would appear here",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isVoiceMessage: true
      };
      
      const newConversation = [...conversation, userMessage];
      setConversation(newConversation);
      
      // Simulate AI response to voice message
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: "I've received your voice message. In a real implementation, I would process your audio and respond accordingly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setConversation([...newConversation, assistantMessage]);
      }, 1000);
      
      // Stop all tracks
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
    setIsRecording(true);
    
    toast({
      title: "Recording Started",
      description: "Speak now. Click the mic button again to stop.",
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        description: "Processing your voice message...",
      });
    }
  };

  return (
    <Card className={cn("mb-6 transition-all duration-300 bg-gray-800/90 border-gray-700 shadow-xl backdrop-blur-md", 
      isExpanded ? "max-h-96" : "max-h-16"
    )}>
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
        <CardTitle className="text-md flex items-center text-white">
          <div className="relative mr-2">
            <Bot className="w-5 h-5 text-construction-400" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-construction-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-construction-500"></span>
            </span>
          </div>
          AI Assistant
          <Badge variant="outline" className="ml-2 bg-construction-600/20 text-construction-100 border-construction-600/30 text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 text-gray-300 hover:text-white hover:bg-gray-700/50"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="px-4 pt-3 pb-4">
          <div className="h-48 overflow-y-auto mb-4 space-y-3 pr-2 scrollbar-none" id="message-container">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-3 rounded-lg max-w-[80%] transition-all animate-fade-in",
                  msg.role === 'assistant' 
                    ? "bg-gradient-to-br from-gray-700/90 to-gray-800/90 text-gray-100 mr-auto border-l-2 border-construction-500" 
                    : "bg-gradient-to-br from-construction-600/20 to-construction-700/20 ml-auto text-construction-100 border-r-2 border-construction-500"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium">
                    {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                    {msg.isVoiceMessage && ' (Voice)'}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
                </div>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-gray-750/30 p-1.5 rounded-lg border border-gray-700">
            <Input 
              placeholder="Ask about your projects..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isRecording}
              className="flex-1 bg-gray-700/50 border-gray-600 text-white focus-visible:ring-construction-500"
            />
            <Button 
              type="button" 
              size="icon" 
              onClick={toggleVoiceRecording}
              className={cn(
                "transition-colors duration-200 text-white",
                isRecording 
                  ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                  : "bg-gray-600 hover:bg-gray-700"
              )}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button type="submit" size="icon" className="bg-construction-600 hover:bg-construction-700 text-white transition-colors duration-200">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
