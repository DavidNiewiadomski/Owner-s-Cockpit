
import React from 'react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { Project } from '@/lib/supabase'; // Changed import

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-100">Active Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} /> 
            {/* Props passed as a single project object. Status mapping removed. */}
          </div>
        ))}
      </div>
    </>
  );
}
