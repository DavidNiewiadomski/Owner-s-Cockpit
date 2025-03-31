
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart4, ArrowDownUp, CheckCircle, Calendar } from 'lucide-react';

interface TimelineViewSelectorProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function TimelineViewSelector({ activeView, onViewChange }: TimelineViewSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        size="sm" 
        className="gap-1" 
        onClick={() => onViewChange("gantt")} 
        variant={activeView === "gantt" ? "default" : "outline"}
      >
        <BarChart4 className="h-4 w-4" />
        <span>Gantt</span>
      </Button>
      <Button 
        size="sm" 
        className="gap-1" 
        onClick={() => onViewChange("delays")} 
        variant={activeView === "delays" ? "default" : "outline"}
      >
        <ArrowDownUp className="h-4 w-4" />
        <span>Delays</span>
      </Button>
      <Button 
        size="sm" 
        className="gap-1" 
        onClick={() => onViewChange("milestone")} 
        variant={activeView === "milestone" ? "default" : "outline"}
      >
        <CheckCircle className="h-4 w-4" />
        <span>Milestones</span>
      </Button>
      <Button 
        size="sm" 
        className="gap-1" 
        onClick={() => onViewChange("activities")} 
        variant={activeView === "activities" ? "default" : "outline"}
      >
        <Calendar className="h-4 w-4" />
        <span>Activities</span>
      </Button>
    </div>
  );
}
