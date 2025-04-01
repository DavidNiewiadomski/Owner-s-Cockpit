
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Minimize2, Maximize2, Mic, MicOff, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
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
    <div className="flex flex-col h-full bg-transparent text-white">
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-construction-900/30 to-black/40 border-b border-construction-800/30">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-7 w-7 rounded-full bg-black/40 border border-construction-600/30">
            <Bot className="h-3.5 w-3.5 text-construction-400" />
          </div>
          <div className="text-sm font-medium">AI Assistant</div>
          <Badge variant="outline" className="text-xs bg-construction-900/20 border-construction-700/20 text-construction-300">
            <Sparkles className="h-2.5 w-2.5 mr-1" />
            Pro
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-6 rounded-full bg-black/20 hover:bg-construction-900/40 transition-colors"
        >
          {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
        </Button>
      </div>

      {isExpanded && (
        <>
          <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-3" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 100%)' }}>
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative p-3 rounded-lg max-w-[85%] animate-fade-in group",
                  msg.role === 'assistant' 
                    ? "bg-gradient-to-br from-gray-800/70 to-gray-900/80 border-l border-construction-600/30 ml-0 mr-auto backdrop-blur-md" 
                    : "bg-gradient-to-br from-construction-900/40 to-construction-950/60 border-r border-construction-600/20 ml-auto backdrop-blur-sm shadow-lg"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-construction-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-medium text-gray-300">
                    {msg.role === 'assistant' ? 'AI Assistant' : 'You'}
                    {msg.isVoiceMessage && ' (Voice)'}
                  </span>
                  <span className="text-[10px] text-gray-400 ml-2">{msg.timestamp}</span>
                </div>
                <p className="text-xs leading-relaxed">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form 
            onSubmit={handleSendMessage} 
            className="p-3 border-t border-white/5 bg-gradient-to-b from-gray-900/40 to-black/60 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 bg-gray-900/30 backdrop-blur-md rounded-full border border-white/5 px-3 py-1 focus-within:border-construction-600/50 transition-colors shadow-inner">
              <Input 
                placeholder="Ask about your projects..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isRecording}
                className="border-0 bg-transparent text-xs h-8 focus-visible:ring-0 placeholder:text-gray-500 shadow-none"
              />
              <div className="flex items-center gap-1">
                <Button 
                  type="button" 
                  size="icon" 
                  onClick={toggleVoiceRecording}
                  className={cn(
                    "h-6 w-6 rounded-full bg-black/50 hover:bg-black/80 transition-colors",
                    isRecording ? "text-red-400" : "text-gray-400"
                  )}
                >
                  {isRecording ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                </Button>
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-6 w-6 rounded-full bg-gradient-to-br from-construction-600 to-construction-700 hover:from-construction-500 hover:to-construction-600 text-white"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
