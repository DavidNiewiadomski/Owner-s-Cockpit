
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function ProjectProgress() {
  const projects = [
    {
      name: 'Riverside Towers',
      progress: 85,
      status: 'on-track',
      startDate: 'Jan 15, 2023',
      endDate: 'Jun 30, 2024'
    },
    {
      name: 'Oakwood Residences',
      progress: 62,
      status: 'at-risk',
      startDate: 'Mar 10, 2023',
      endDate: 'Aug 15, 2024'
    },
    {
      name: 'Metro Commercial Center',
      progress: 43,
      status: 'on-track',
      startDate: 'May 05, 2023',
      endDate: 'Sep 30, 2024'
    },
    {
      name: 'Parkview Apartments',
      progress: 28,
      status: 'delayed',
      startDate: 'Jul 20, 2023',
      endDate: 'Dec 15, 2024'
    },
  ];

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'default';
      case 'at-risk':
        return 'secondary';
      case 'delayed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-white">{project.name}</p>
              <p className="text-xs text-muted-foreground">
                {project.startDate} - {project.endDate}
              </p>
            </div>
            <Badge variant={getBadgeVariant(project.status)}>
              {project.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={project.progress} className="h-2" />
            <span className="text-sm font-medium w-8 text-white">{project.progress}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
