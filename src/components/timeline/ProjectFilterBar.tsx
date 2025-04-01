
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronDown } from 'lucide-react';

interface ProjectFilterBarProps {
  activeProject: string;
  onProjectChange: (project: string) => void;
}

export function ProjectFilterBar({ activeProject, onProjectChange }: ProjectFilterBarProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
      <TabsList className="bg-black border border-gray-800 flex-wrap w-full">
        <TabsTrigger 
          value="downtown" 
          onClick={() => onProjectChange('downtown')}
          className={activeProject === 'downtown' ? 'bg-gray-800' : ''}
        >
          Downtown High-Rise
        </TabsTrigger>
        
        <TabsTrigger 
          value="riverside" 
          onClick={() => onProjectChange('riverside')}
          className={activeProject === 'riverside' ? 'bg-gray-800' : ''}
        >
          Riverside Complex
        </TabsTrigger>
        
        <TabsTrigger 
          value="corporate" 
          onClick={() => onProjectChange('corporate')}
          className={activeProject === 'corporate' ? 'bg-gray-800' : ''}
        >
          Corporate Offices
        </TabsTrigger>
        
        <TabsTrigger 
          value="all" 
          onClick={() => onProjectChange('all')}
          className={activeProject === 'all' ? 'bg-gray-800' : ''}
        >
          All Projects
        </TabsTrigger>
      </TabsList>
      
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="gap-1 text-sm px-3 border-gray-700">
          <Calendar className="h-3.5 w-3.5" />
          <span>Date Range</span>
          <ChevronDown className="h-3.5 w-3.5 ml-1" />
        </Button>
        
        <Button variant="outline" size="sm" className="gap-1 text-sm px-3 border-gray-700">
          <span>More Filters</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
