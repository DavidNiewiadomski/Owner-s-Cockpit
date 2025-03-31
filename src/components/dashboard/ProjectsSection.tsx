
import React from 'react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
  teamMembers: { name: string; avatar?: string }[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Ensure we have valid data before rendering
  const validProjects = Array.isArray(projects) ? projects : [];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">Active Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validProjects.map((project) => (
          <ProjectCard 
            key={project.id}
            title={project.title || ""}
            description={project.description || ""}
            progress={typeof project.progress === 'number' ? project.progress : 0}
            status={
              project.status === 'on-track' || 
              project.status === 'at-risk' || 
              project.status === 'delayed' 
                ? project.status 
                : 'on-track'
            }
            dueDate={project.dueDate || ""}
            teamMembers={Array.isArray(project.teamMembers) ? project.teamMembers : []}
          />
        ))}
      </div>
    </div>
  );
}
