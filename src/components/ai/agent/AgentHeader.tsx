
import React from 'react';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';

interface AgentHeaderProps {
  showActions: boolean;
  toggleShowActions: () => void;
}

export function AgentHeader({ showActions, toggleShowActions }: AgentHeaderProps) {
  return (
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
          onClick={toggleShowActions} 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
        >
          Actions {showActions ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </Button>
      </div>
    </SheetHeader>
  );
}
