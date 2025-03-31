
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
  return (
    <React.Fragment>
      <tr 
        className="border-b hover:bg-muted/50 cursor-pointer"
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
              project.status === "on-track" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
            } ${
              project.status === "at-risk" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
            } ${
              project.status === "delayed" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
            } ${
              project.status === "in-progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
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
            <span>{formatDate(project.endDate)}</span>
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
        <tr className="bg-muted/30">
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
                    <span>{formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">End:</span>
                    <span>{formatDate(project.endDate)}</span>
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
  );
};
