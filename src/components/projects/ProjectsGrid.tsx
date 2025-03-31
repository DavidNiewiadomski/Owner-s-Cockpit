
import React from 'react';
import { ProjectCard } from '@/components/dashboard/ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  startDate: string;
  endDate: string;
  budget: string;
  client: string;
  location: string;
  teamMembers: Array<{ name: string; avatar?: string }>;
}

interface ProjectsGridProps {
  projects: Project[];
  formatDate: (dateString: string) => string;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, formatDate }) => {
  // Function to convert status to the specific type expected by ProjectCard
  const mapStatus = (status: string): "on-track" | "at-risk" | "delayed" => {
    if (status === "on-track" || status === "in-progress") return "on-track";
    if (status === "at-risk") return "at-risk";
    if (status === "delayed") return "delayed";
    return "on-track"; // Default fallback
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          progress={project.progress}
          status={mapStatus(project.status)}
          dueDate={formatDate(project.endDate)}
          teamMembers={project.teamMembers}
        />
      ))}
    </div>
  );
};
