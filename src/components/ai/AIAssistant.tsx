
import React, { useState } from 'react';
import { Bot, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MessageRole = 'user' | 'assistant';

interface Message {
  role: MessageRole;
  content: string;
}

export function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello, I\'m your construction project assistant. How can I help you today?'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to conversation
    const userMessage: Message = { role: 'user', content: message };
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
      
      const assistantMessage: Message = { role: 'assistant', content: response };
      setConversation([...newConversation, assistantMessage]);
    }, 1000);
  };

  return (
    <Card className={cn("mb-6 transition-all duration-300 bg-gray-800 border-gray-700 shadow-lg", 
      isExpanded ? "max-h-96" : "max-h-16"
    )}>
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-gray-700">
        <CardTitle className="text-md flex items-center text-white">
          <Bot className="w-5 h-5 mr-2 text-construction-400" />
          AI Assistant
        </CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-8 w-8 text-gray-300 hover:text-white"
        >
          {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="px-4 pt-3 pb-4">
          <div className="h-48 overflow-y-auto mb-4 space-y-3 pr-2">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-3 rounded-lg max-w-[80%]",
                  msg.role === 'assistant' 
                    ? "bg-gray-700 text-gray-100 mr-auto" 
                    : "bg-construction-600/20 ml-auto text-construction-100"
                )}
              >
                {msg.content}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Input 
              placeholder="Ask about your projects..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white"
            />
            <Button type="submit" size="icon" className="bg-construction-600 hover:bg-construction-700 text-white">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
