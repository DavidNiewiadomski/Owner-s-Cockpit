
import React from 'react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { projects } from '@/data/projects/projectData';

interface ProjectsSectionProps {
  projects?: typeof projects;
}

export function ProjectsSection({ projects: providedProjects }: ProjectsSectionProps) {
  const projectsToShow = providedProjects || projects;
  
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-100">Active Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsToShow.map((project) => (
          <div key={project.id}>
            <ProjectCard 
              id={project.id}
              title={project.title}
              description={project.description}
              progress={project.progress}
              status={project.status === "completed" || project.status === "upcoming" 
                ? "on-track" 
                : project.status}
              dueDate={project.dueDate}
              teamMembers={project.teamMembers}
              priority={project.priority}
            />
          </div>
        ))}
      </div>
    </>
  );
}
