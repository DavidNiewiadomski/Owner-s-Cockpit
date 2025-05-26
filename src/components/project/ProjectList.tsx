
import React, { useState } from 'react';
import { Project } from '@/data/projects/projectData';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

  const getStatusClass = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "upcoming":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "on-track":
        return "On Track";
      case "at-risk":
        return "At Risk";
      case "delayed":
        return "Delayed";
      case "completed":
        return "Completed";
      case "upcoming":
        return "Upcoming";
      default:
        return status;
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
              <th className="text-left py-3 px-4 font-medium">Deadline</th>
              <th className="text-left py-3 px-4 font-medium">Team</th>
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
                      <div className="flex justify-between text-xs mb-1">
                        <span>{project.phase}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                      <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex -space-x-2">
                      {project.teamMembers.slice(0, 3).map((member, i) => (
                        <Avatar key={i} className="h-7 w-7 border-2 border-background">
                          {member.avatar ? (
                            <AvatarImage src={member.avatar} alt={member.name} />
                          ) : (
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      ))}
                      {project.teamMembers.length > 3 && (
                        <Avatar className="h-7 w-7 border-2 border-background">
                          <AvatarFallback className="text-xs bg-muted">
                            +{project.teamMembers.length - 3}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {expandedProject === project.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
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
                              <span>{new Date(project.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">End:</span>
                              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Budget</h4>
                          <p className="text-sm">{project.budget}</p>
                          <h4 className="text-sm font-medium mt-2 mb-1">Client</h4>
                          <p className="text-sm">{project.client}</p>
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
