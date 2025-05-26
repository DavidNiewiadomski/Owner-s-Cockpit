
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn, formatDate } from '@/lib/utils'; // Import formatDate
import { Project } from '@/lib/supabase'; // Import Supabase Project type

// Removed internal Project interface

interface ProjectsOverviewProps {
  projects: Project[];
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  // formatDate is now imported from @/lib/utils

  // Get status color - updated for Supabase status values
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': // was 'on-track'
        return 'bg-green-600';
      case 'on-hold': // was 'at-risk'
        return 'bg-yellow-500';
      // 'delayed' is not a direct status, 'active' or 'on-hold' might imply delay via progress
      case 'planning': // was 'upcoming'
        return 'bg-purple-600';
      case 'completed':
        return 'bg-blue-600';
      case 'cancelled': // new status
        return 'bg-gray-700'; // Using a slightly darker gray for cancelled
      default:
        return 'bg-gray-600'; // Default for unexpected status
    }
  };

  // getPriorityBadge function removed as project.priority is not available

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-white">Active Projects</h3>
        <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center font-medium">
          <span>View All</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </button>
      </div>
      
      <div className="space-y-5">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-gray-900/80 border border-gray-800 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-white text-base">{project.title}</h4>
                {/* project.description is optional in Supabase type, handle if undefined */}
                <p className="text-xs text-gray-300">{project.description || 'No description available.'}</p>
              </div>
              {/* Priority badge removed */}
            </div>
            
            <div className="mb-3">
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
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full mr-2",
                  getStatusColor(project.status)
                )}></div>
                <span className="text-xs text-white font-medium uppercase tracking-wide">
                  {/* Display Supabase status, capitalize first letter */}
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              <span className="text-xs text-gray-300 font-medium">
                Due {project.end_date ? formatDate(project.end_date) : 'N/A'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
