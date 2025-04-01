
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  isListening: boolean;
  hasRecognitionSupport: boolean;
  toggleVoiceRecognition: () => void;
  handleSendMessage: (e?: React.FormEvent) => void;
}

export function MessageInput({
  input,
  setInput,
  isListening,
  hasRecognitionSupport,
  toggleVoiceRecognition,
  handleSendMessage
}: MessageInputProps) {
  return (
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
          disabled={isListening || (!input.trim())}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
