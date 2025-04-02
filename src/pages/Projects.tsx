
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectTabs } from '@/components/project/ProjectTabs';
import { AIProjectRecommendations } from '@/components/project/AIProjectRecommendations';
import { Search, Plus, Filter, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/data/projects/projectData';

const projectInsights = [
  {
    title: 'Budget Alert',
    content: 'Harbor Point Marina has exceeded material budget by 7%. Review purchasing contracts.',
    type: 'warning' as const
  },
  {
    title: 'Schedule Opportunity',
    content: 'East Tower is 5 days ahead of schedule. Consider advancing tenant negotiations.',
    type: 'success' as const
  },
  {
    title: 'ROI Impact',
    content: 'Lakefront Residences sales trending 8% above projections. Expected ROI increase from 6.8% to 7.3%.',
    type: 'info' as const
  },
  {
    title: 'Resource Allocation',
    content: 'Westside Park has 3 overlapping critical path activities next week. Consider resource reallocation.',
    type: 'warning' as const
  },
  {
    title: 'Permit Approved',
    content: 'Tech Innovation Campus final inspection permits approved. Ready for client handover.',
    type: 'success' as const
  }
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout 
      projectContext="your projects" 
      initialInsights={projectInsights}
      onSearch={setSearchTerm}
    >
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Badge variant="outline" className="bg-construction-900/30 border-construction-700/30 text-construction-400 text-xs">
            <Brain className="h-3 w-3 mr-1" />
            AI Enhanced
          </Badge>
        </div>
        <p className="text-muted-foreground">Manage and track all your construction projects</p>
      </div>
      
      {/* AI Project Recommendations */}
      <AIProjectRecommendations projects={projects} />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search projects..." 
            className="pl-8 w-full bg-black border-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <Button variant="outline" size="sm" className="gap-1 border-gray-800">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>
      
      <ProjectTabs 
        projects={projects} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        searchTerm={searchTerm} 
      />
    </DashboardLayout>
  );
};

export default Projects;
