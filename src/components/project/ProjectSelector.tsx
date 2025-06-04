
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProject, ProjectOrAll } from '@/contexts/ProjectContext';

export function ProjectSelector() {
  const { selectedProject, setSelectedProject, allProjects } = useProject();
  const [open, setOpen] = React.useState(false);

  // Function to handle project selection
  const handleProjectSelect = (project: ProjectOrAll) => {
    setSelectedProject(project);
    setOpen(false);
  };

  // Get status color for the status indicator
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-emerald-500';
      case 'at-risk':
        return 'bg-amber-500';
      case 'delayed':
        return 'bg-rose-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Function to truncate long project titles
  const truncateTitle = (title: string, maxLength: number = 25) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  if (!selectedProject) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center justify-between gap-2 w-40 md:w-48 border-gray-700 bg-gray-900/60 text-white hover:bg-gray-800"
          onMouseEnter={() => setOpen(true)}
        >
          <div className="flex items-center gap-2 truncate">
            <span className={`h-2 w-2 rounded-full ${getStatusColor(selectedProject.status)}`} />
            <span className="truncate">{truncateTitle(selectedProject.title)}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-gray-900 border-gray-700 text-white"
        onMouseLeave={() => setOpen(false)}
      >
        <DropdownMenuItem 
          onClick={() => handleProjectSelect({ id: 'all', title: 'All Projects', status: 'on-track' })}
          className="flex items-center gap-2 hover:bg-purple-700/70 text-white hover:text-white cursor-pointer transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-gray-500" />
          <span>All Projects</span>
          {selectedProject.id === 'all' && <Check className="h-4 w-4 ml-auto" />}
        </DropdownMenuItem>
        
        {allProjects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => handleProjectSelect(project)}
            className="flex items-center gap-2 hover:bg-purple-700/70 text-white hover:text-white cursor-pointer transition-colors"
          >
            <span className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
            <span className="truncate" title={project.title}>{project.title}</span>
            {selectedProject.id === project.id && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
