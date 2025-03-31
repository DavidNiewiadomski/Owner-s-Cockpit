
import React from 'react';
import { Check } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export function ProjectSelector() {
  const { selectedProject, setSelectedProject, allProjects } = useProject();
  const { toast } = useToast();

  const handleSelectProject = (project: typeof allProjects[0]) => {
    setSelectedProject(project);
    toast({
      title: "Project Changed",
      description: `Now viewing ${project.title}`,
      duration: 3000,
    });
  };

  if (!selectedProject) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 w-auto px-3 flex justify-between items-center gap-2">
          <span className="truncate max-w-[150px]">{selectedProject.title}</span>
          <span className={`h-2 w-2 rounded-full ${
            selectedProject.status === 'on-track' ? 'bg-green-500' : 
            selectedProject.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {allProjects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => handleSelectProject(project)}
            className="flex justify-between items-center cursor-pointer"
          >
            <span className="truncate">{project.title}</span>
            {selectedProject.id === project.id && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
