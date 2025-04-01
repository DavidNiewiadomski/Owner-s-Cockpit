
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Project } from '@/data/projects/projectData';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { ProjectList } from '@/components/project/ProjectList';
import { ProjectEmptyState } from '@/components/project/ProjectEmptyState';

interface ProjectTabsProps {
  projects: Project[];
  viewMode: 'card' | 'list';
  setViewMode: (mode: 'card' | 'list') => void;
  searchTerm: string;
}

export function ProjectTabs({ projects, viewMode, setViewMode, searchTerm }: ProjectTabsProps) {
  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get projects for each tab
  const activeProjects = filteredProjects.filter(p => 
    p.status === 'on-track' || p.status === 'at-risk' || p.status === 'delayed'
  );
  const upcomingProjects = filteredProjects.filter(p => p.status === 'upcoming');
  const completedProjects = filteredProjects.filter(p => p.status === 'completed');

  // Project display based on view mode
  const renderProjects = (projectsToRender: Project[]) => {
    if (projectsToRender.length === 0) {
      return <ProjectEmptyState searchTerm={searchTerm} />;
    }

    return viewMode === 'card' ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsToRender.map(project => (
          <ProjectCard 
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            progress={project.progress}
            status={project.status === "completed" || project.status === "upcoming" 
              ? "on-track" 
              : project.status}
            dueDate={project.dueDate}
            teamMembers={project.teamMembers}
            priority={project.priority}
          />
        ))}
      </div>
    ) : (
      <ProjectList projects={projectsToRender} />
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <div className="flex items-center border border-gray-800 rounded-md overflow-hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setViewMode('card')} 
            className={viewMode === 'card' ? 'bg-gray-800' : ''}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setViewMode('list')} 
            className={viewMode === 'list' ? 'bg-gray-800' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-black border border-gray-800 mb-6">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderProjects(filteredProjects)}
        </TabsContent>
        
        <TabsContent value="active">
          {renderProjects(activeProjects)}
        </TabsContent>
        
        <TabsContent value="upcoming">
          {renderProjects(upcomingProjects)}
        </TabsContent>
        
        <TabsContent value="completed">
          {renderProjects(completedProjects)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
