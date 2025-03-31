
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Share2, Download } from 'lucide-react';

interface ProjectFilterBarProps {
  activeProject: string;
  onProjectChange: (project: string) => void;
}

export function ProjectFilterBar({ activeProject, onProjectChange }: ProjectFilterBarProps) {
  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
      <TabsList>
        <TabsTrigger value="downtown" onClick={() => onProjectChange('downtown')}>Downtown High-Rise</TabsTrigger>
        <TabsTrigger value="riverside" onClick={() => onProjectChange('riverside')}>Riverside Complex</TabsTrigger>
        <TabsTrigger value="corporate" onClick={() => onProjectChange('corporate')}>Corporate Offices</TabsTrigger>
        <TabsTrigger value="all" onClick={() => onProjectChange('all')}>All Projects</TabsTrigger>
      </TabsList>
      
      <div className="flex items-center gap-2">
        <Select defaultValue="timeline">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="timeline">Timeline View</SelectItem>
            <SelectItem value="milestone">Milestone View</SelectItem>
            <SelectItem value="calendar">Calendar View</SelectItem>
            <SelectItem value="critical">Critical Path</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  );
}
