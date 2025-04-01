
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart2, Clock, Calendar, CheckSquare } from 'lucide-react';

interface TimelineViewSelectorProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function TimelineViewSelector({ activeView, onViewChange }: TimelineViewSelectorProps) {
  return (
    <div className="flex items-center border border-gray-800 rounded-md overflow-hidden">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onViewChange('gantt')} 
        className={`h-9 px-3 ${activeView === 'gantt' ? 'bg-gray-800' : ''}`}
      >
        <BarChart2 className="h-4 w-4 mr-1.5" />
        <span className="text-xs">Gantt</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onViewChange('milestone')} 
        className={`h-9 px-3 ${activeView === 'milestone' ? 'bg-gray-800' : ''}`}
      >
        <Calendar className="h-4 w-4 mr-1.5" />
        <span className="text-xs">Milestones</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onViewChange('activities')} 
        className={`h-9 px-3 ${activeView === 'activities' ? 'bg-gray-800' : ''}`}
      >
        <CheckSquare className="h-4 w-4 mr-1.5" />
        <span className="text-xs">Activities</span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onViewChange('delays')} 
        className={`h-9 px-3 ${activeView === 'delays' ? 'bg-gray-800' : ''}`}
      >
        <Clock className="h-4 w-4 mr-1.5" />
        <span className="text-xs">Delays</span>
      </Button>
    </div>
  );
}
