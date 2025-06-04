
import React from 'react';
import { ArrowRight, MapPin, Building2, Wrench } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { projects } from '@/data/projects/projectData';

// Convert projectData projects to match the component's expected format
const convertedProjects = projects.map(project => ({
  id: project.id,
  title: project.title,
  description: project.description,
  progress: project.progress,
  status: project.phase || project.status,
  stage: project.stage || 'construction',
  priority: project.priority,
  icon: project.stage === 'site-selection' ? MapPin : 
        project.stage === 'facility-management' ? Wrench : Building2,
  color: project.stage === 'site-selection' ? 'bg-blue-600' :
         project.stage === 'facility-management' ? 'bg-green-600' : 'bg-red-600'
}));

export function ProjectsOverview() {
  const getPriorityBadge = (priority: string) => {
    if (priority === "High") {
      return "bg-red-700 text-white border-red-600 font-bold";
    } else if (priority === "Medium") {
      return "bg-yellow-600 text-white border-yellow-500 font-bold";
    }
    return "bg-gray-700 text-white border-gray-600 font-bold";
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'site-selection':
        return 'text-blue-400';
      case 'construction':
        return 'text-red-400';
      case 'facility-management':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-white">Active Real Estate Projects</h3>
        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center font-medium">
          <span>View All</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </button>
      </div>
      
      <div className="space-y-4">
        {convertedProjects.map((project) => {
          const IconComponent = project.icon;
          return (
            <div key={project.id} className="p-4 bg-gray-900/80 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-full", project.color)}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-base">{project.title}</h4>
                    <p className="text-xs text-gray-300 mt-1">{project.description}</p>
                    <p className={cn("text-xs font-medium mt-1", getStageColor(project.stage))}>
                      {project.stage} • {project.status}
                    </p>
                  </div>
                </div>
                <Badge className={cn(
                  "text-xs px-2 py-1 rounded-full border",
                  getPriorityBadge(project.priority)
                )}>
                  {project.priority}
                </Badge>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-medium">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <Progress 
                  value={project.progress} 
                  max={100}
                  className="h-1.5 bg-gray-800"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
