
import React from 'react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
  teamMembers: { name: string }[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-100">Active Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </>
  );
}
