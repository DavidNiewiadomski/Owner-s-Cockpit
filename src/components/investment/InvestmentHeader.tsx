
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface Period {
  value: string;
  label: string;
}

interface InvestmentHeaderProps {
  title: string;
  description: string;
  onChatOpen: () => void;
  periods?: Period[];
  currentPeriod?: string;
  setCurrentPeriod?: (period: string) => void;
  className?: string;
}

export function InvestmentHeader({ 
  title, 
  description, 
  onChatOpen,
  periods,
  currentPeriod,
  setCurrentPeriod,
  className 
}: InvestmentHeaderProps) {
  return (
    <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 lg:mt-0 space-y-3 sm:space-y-0 sm:space-x-4">
        {periods && currentPeriod && setCurrentPeriod && (
          <div className="flex items-center bg-black rounded-md p-1 border border-gray-700">
            {periods.map(period => (
              <Button 
                key={period.value}
                variant="ghost" 
                size="sm"
                className={`px-3 py-1 text-xs rounded-sm transition-all duration-300 ${
                  currentPeriod === period.value 
                    ? 'bg-construction-900/40 text-construction-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setCurrentPeriod(period.value)}
              >
                {period.label}
              </Button>
            ))}
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onChatOpen}
          className="border-cyan-800/50 bg-cyan-900/20 hover:bg-cyan-800/30 text-white group"
        >
          <MessageSquare className="h-4 w-4 mr-2 text-cyan-400 group-hover:text-cyan-300" />
          Ask Investment AI
        </Button>
      </div>
    </div>
  );
}
