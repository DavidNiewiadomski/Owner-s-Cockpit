
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Download, HelpCircle, MessageSquare } from 'lucide-react';

interface InvestmentHeaderProps {
  title: string;
  description: string;
  onChatOpen?: () => void;
  className?: string;
}

export function InvestmentHeader({ title, description, onChatOpen, className }: InvestmentHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-white text-base font-medium">{description}</p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center space-x-2">
        <Button variant="outline" className="border-gray-700 bg-black hover:bg-gray-900 text-white">
          <Clock className="h-4 w-4 mr-2" />
          Historical Data
        </Button>
        <Button variant="outline" className="border-gray-700 bg-black hover:bg-gray-900 text-white">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
        {onChatOpen && (
          <Button 
            variant="outline" 
            className="border-gray-700 bg-black hover:bg-gray-900 text-white"
            onClick={onChatOpen}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            AI Chat
          </Button>
        )}
        <Button className="bg-construction-600 hover:bg-construction-700 text-white font-medium">
          <DollarSign className="h-4 w-4 mr-2" />
          Financial Report
        </Button>
      </div>
    </div>
  );
}
