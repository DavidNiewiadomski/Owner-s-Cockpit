
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface AgentAction {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AgentActionListProps {
  actions: AgentAction[];
  onSelectAction: (action: string) => void;
}

export function AgentActionList({ actions, onSelectAction }: AgentActionListProps) {
  return (
    <div className="p-3 bg-gray-900/30 border-b border-gray-800 grid grid-cols-3 gap-2">
      {actions.map((action) => (
        <Button 
          key={action.id} 
          variant="outline" 
          size="sm"
          onClick={() => onSelectAction(`I need you to ${action.label.toLowerCase()}`)}
          className="h-auto py-3 flex flex-col items-center gap-1 bg-gray-900/50 border-gray-700 hover:bg-gray-800"
        >
          <action.icon className="h-4 w-4 text-blue-400" />
          <span className="text-xs">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
