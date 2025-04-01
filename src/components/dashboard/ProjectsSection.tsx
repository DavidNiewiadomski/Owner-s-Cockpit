
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
