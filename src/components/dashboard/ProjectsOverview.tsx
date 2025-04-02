
import React from 'react';
import { cn } from '@/lib/utils';
import { Building2, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Project } from '@/data/projects/projectData';
import { useProject } from '@/contexts/ProjectContext';

interface ProjectsOverviewProps {
  projects: Project[];
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  const { setSelectedProject } = useProject();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  // Get status icon based on project status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'at-risk':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'delayed':
        return <Clock className="h-4 w-4 text-red-400" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
        <Building2 className="h-5 w-5 mr-2 text-purple-400" />
        Active Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-cyan-700 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-200 truncate">{project.title}</h4>
              {getStatusIcon(project.status)}
            </div>
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{project.description}</p>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={cn(
                  "h-1.5 rounded-full",
                  project.status === 'on-track' && "bg-green-500",
                  project.status === 'at-risk' && "bg-yellow-500",
                  project.status === 'delayed' && "bg-red-500",
                )}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="mt-3 flex justify-between items-center text-xs">
              <div className="text-gray-500">Due: {project.dueDate}</div>
              <div className={cn(
                "px-2 py-0.5 rounded-full",
                project.priority === 'high' && "bg-red-900/30 text-red-400",
                project.priority === 'medium' && "bg-yellow-900/30 text-yellow-400",
                project.priority === 'low' && "bg-green-900/30 text-green-400"
              )}>
                {project.priority}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        View All Projects
      </button>
    </div>
  );
}
