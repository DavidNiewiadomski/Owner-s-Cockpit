
import React, { useState } from 'react';
import { Project } from '@/lib/supabase'; // Changed import
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
// Avatar components removed as teamMembers are not directly available
import { Calendar, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const getStatusClass = (status: Project['status']) => {
    switch (status) {
      case "active": // Was 'on-track'
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "on-hold": // Was 'at-risk'
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "planning": // Was 'upcoming'
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "cancelled": // New status
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400";
      // 'delayed' is not a direct status in Supabase, 'active' or 'on-hold' might cover it with progress.
      default:
        return "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300"; // Default for unexpected status
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case "active":
        return "Active";
      case "on-hold":
        return "On Hold";
      case "planning":
        return "Planning";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1); // Capitalize if unknown
    }
  };

  return (
    <Card>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 font-medium">Project</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Progress</th>
              <th className="text-left py-3 px-4 font-medium">End Date</th> 
              {/* <th className="text-left py-3 px-4 font-medium">Team</th> Removed */}
              <th className="text-left py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <React.Fragment key={project.id}>
                <tr 
                  className="border-b border-gray-800 hover:bg-gray-900/30 cursor-pointer"
                  onClick={() => toggleProjectExpand(project.id)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block ${
                        getStatusClass(project.status)
                      }`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-32">
                      <div className="flex justify-end text-xs mb-1">
                        {/* project.phase removed */}
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{project.end_date ? formatDate(project.end_date) : 'N/A'}</span>
                    </div>
                  </td>
                  {/* Team members column removed */}
                  <td className="py-3 px-4 text-right"> 
                    {expandedProject === project.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" /> {/* Ensure project.id is string */}
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </td>
                </tr>
                
                {expandedProject === project.id && (
                  <tr className="bg-gray-900/20">
                    <td colSpan={6} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Description</h4>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Timeline</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Start:</span>
                              <span>{project.start_date ? formatDate(project.start_date) : 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">End:</span>
                              <span>{project.end_date ? formatDate(project.end_date) : 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Budget</h4>
                          <p className="text-sm">
                            {project.budget ? project.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}
                          </p>
                          <h4 className="text-sm font-medium mt-2 mb-1">Client</h4>
                          <p className="text-sm">{project.client_name || 'N/A'}</p>
                        </div>
                        
                        <div className="md:col-span-3 flex justify-end">
                          <Button variant="outline" size="sm" className="text-sm gap-1">
                            <span>View Details</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
