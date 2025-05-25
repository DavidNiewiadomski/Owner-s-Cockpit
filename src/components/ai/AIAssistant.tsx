
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Minimize2, Maximize2, Mic, MicOff, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { aiService, type ChatMessage } from '@/services/aiService';

export function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello, I\'m your live AI construction project assistant powered by Google Gemini. How can I help you today?',
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Add user message to conversation immediately
    const newUserMessage: ChatMessage = { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setConversation(prev => [...prev, newUserMessage]);
    
    try {
      // Get AI response
      const aiResponse = await aiService.sendMessage(userMessage);
      
      // Add AI response to conversation
      const newAiMessage: ChatMessage = { 
        role: 'assistant', 
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversation(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "AI Error",
        description: "Sorry, I'm having trouble responding right now. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
      // In a real implementation, you'd convert speech to text
      // For now, we'll just show a placeholder
      setMessage("Voice message would be transcribed here");
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
          <div className="text-sm font-medium">Live AI Assistant</div>
          <Badge variant="outline" className="text-xs bg-green-900/20 border-green-700/20 text-green-300">
            <Sparkles className="h-2.5 w-2.5 mr-1" />
            Gemini
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
                  </span>
                  <span className="text-[10px] text-gray-400 ml-2">{msg.timestamp}</span>
                </div>
                <p className="text-xs leading-relaxed">{msg.content}</p>
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/80 border-l border-construction-600/30 p-3 rounded-lg max-w-[85%] backdrop-blur-md">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-medium text-gray-300">AI Assistant</span>
                  <span className="text-[10px] text-gray-400">Thinking...</span>
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-construction-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-construction-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-construction-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            
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
                disabled={isRecording || isLoading}
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
                  disabled={isLoading || !message.trim()}
                  className="h-6 w-6 rounded-full bg-gradient-to-br from-construction-600 to-construction-700 hover:from-construction-500 hover:to-construction-600 text-white disabled:opacity-50"
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
