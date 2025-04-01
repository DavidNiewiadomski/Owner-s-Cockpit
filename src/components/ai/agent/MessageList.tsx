
import React, { useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AgentMessage } from '@/components/ai/agent/types';

interface MessageListProps {
  messages: AgentMessage[];
  isThinking: boolean;
  completeAction: (actionType: string) => void;
}

export function MessageList({ messages, isThinking, completeAction }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
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
  );
}
