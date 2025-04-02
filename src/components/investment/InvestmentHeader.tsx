
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MessageSquare } from 'lucide-react';

interface InvestmentHeaderProps {
  title: string;
  description: string;
  onChatOpen?: () => void;
  className?: string;
}

export function InvestmentHeader({ title, description, onChatOpen, className }: InvestmentHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 pb-4 border-b border-gray-800">
      <div className="mb-4 lg:mb-0">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">{title}</h1>
        <p className="text-gray-300 text-base">{description}</p>
      </div>
      {onChatOpen && (
        <div className="w-full lg:w-auto">
          <Button 
            variant="outline" 
            className="border-gray-700 bg-black hover:bg-gray-900 text-white h-10"
            onClick={onChatOpen}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Chat
          </Button>
        </div>
      )}
    </div>
  );
}
