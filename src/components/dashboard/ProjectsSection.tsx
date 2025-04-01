
import React from 'react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/data/projects/projectData';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { toast } = useToast();
  
  const handleSelectProject = (project: Project) => {
    toast({
      title: "Project Selected",
      description: `Viewing ${project.title}`,
    });
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-100">Active Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} onClick={() => handleSelectProject(project)}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </>
  );
}
