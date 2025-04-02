
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed' | 'upcoming';
  dueDate: string;
  teamMembers: { name: string }[];
  priority: string; // "High" | "Medium" | "Low"
}

interface ProjectsOverviewProps {
  projects: Project[];
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500';
      case 'at-risk':
        return 'bg-yellow-500';
      case 'delayed':
        return 'bg-red-500';
      case 'completed':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Get priority badge styles
  const getPriorityBadge = (priority: string) => {
    if (priority === "High") {
      return "bg-red-900/30 text-red-400 border-red-700/30";
    } else if (priority === "Medium") {
      return "bg-yellow-900/30 text-yellow-400 border-yellow-700/30";
    } else if (priority === "Low") {
      return "bg-green-900/30 text-green-400 border-green-700/30";
    }
    return "bg-gray-900/30 text-gray-400 border-gray-700/30";
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-white">Active Projects</h3>
        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center">
          <span>View All</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </button>
      </div>
      
      <div className="space-y-5">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-white">{project.title}</h4>
                <p className="text-xs text-gray-400">{project.description}</p>
              </div>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full border",
                getPriorityBadge(project.priority)
              )}>
                {project.priority}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-white">{project.progress}%</span>
              </div>
              <Progress 
                value={project.progress} 
                max={100}
                className="h-1.5 bg-gray-800"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  getStatusColor(project.status)
                )}></div>
                <span className="text-xs text-gray-300 capitalize">{project.status.replace('-', ' ')}</span>
              </div>
              <span className="text-xs text-gray-400">Due {formatDate(project.dueDate)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
