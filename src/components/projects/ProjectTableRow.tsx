
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  phase: string;
  startDate: string;
  endDate: string;
  budget: string;
  client: string;
  location: string;
  teamMembers: Array<{ name: string; avatar?: string }>;
}

interface ProjectTableRowProps {
  project: Project;
  expandedProject: number | null;
  toggleProjectExpand: (projectId: number) => void;
  formatDate: (dateString: string) => string;
  getStatusLabel: (status: string) => string;
}

export const ProjectTableRow: React.FC<ProjectTableRowProps> = ({
  project,
  expandedProject,
  toggleProjectExpand,
  formatDate,
  getStatusLabel,
}) => {
  // Ensure all values exist or provide defaults
  const safeProject = {
    id: project.id || 0,
    title: project.title || "",
    location: project.location || "",
    status: project.status || "",
    phase: project.phase || "",
    progress: project.progress || 0,
    endDate: project.endDate || "",
    startDate: project.startDate || "",
    description: project.description || "",
    budget: project.budget || "",
    client: project.client || "",
    teamMembers: project.teamMembers || []
  };

  return (
    <React.Fragment>
      <tr 
        className="border-b hover:bg-muted/50 cursor-pointer"
        onClick={() => toggleProjectExpand(safeProject.id)}
      >
        <td className="py-3 px-4">
          <div className="flex items-center">
            <div>
              <p className="font-medium">{safeProject.title}</p>
              <p className="text-sm text-muted-foreground">{safeProject.location}</p>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block ${
              safeProject.status === "on-track" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            } ${
              safeProject.status === "at-risk" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
            } ${
              safeProject.status === "delayed" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            } ${
              safeProject.status === "in-progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
            }`}
          >
            {getStatusLabel(safeProject.status)}
          </span>
        </td>
        <td className="py-3 px-4">
          <div className="w-32">
            <div className="flex justify-between text-xs mb-1">
              <span>{safeProject.phase}</span>
              <span>{safeProject.progress}%</span>
            </div>
            <Progress value={safeProject.progress} className="h-2" />
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span>{formatDate(safeProject.endDate)}</span>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex -space-x-2">
            {safeProject.teamMembers.slice(0, 3).map((member, i) => (
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
            {safeProject.teamMembers.length > 3 && (
              <Avatar className="h-7 w-7 border-2 border-background">
                <AvatarFallback className="text-xs bg-muted">
                  +{safeProject.teamMembers.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </td>
        <td className="py-3 px-4 text-right">
          {expandedProject === safeProject.id ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </td>
      </tr>
      
      {expandedProject === safeProject.id && (
        <tr className="bg-muted/30">
          <td colSpan={6} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{safeProject.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Timeline</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Start:</span>
                    <span>{formatDate(safeProject.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">End:</span>
                    <span>{formatDate(safeProject.endDate)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Budget</h4>
                <p className="text-sm">{safeProject.budget}</p>
                <h4 className="text-sm font-medium mt-2 mb-1">Client</h4>
                <p className="text-sm">{safeProject.client}</p>
              </div>
              
              <div className="md:col-span-3 flex justify-end">
                <Button variant="outline" size="sm" className="text-sm gap-1">
                  View Details
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};
