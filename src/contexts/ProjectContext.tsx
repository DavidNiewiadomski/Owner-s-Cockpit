
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { projects } from '@/data/dashboardData';

// Define the project type
export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed';
  dueDate: string;
  teamMembers: Array<{ name: string }>;
}

interface ProjectContextType {
  selectedProject: Project | null;
  setSelectedProject: (project: Project) => void;
  allProjects: Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  // Get from localStorage or default to the first project
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  
  // On first load, try to get from localStorage
  useEffect(() => {
    const savedProjectId = localStorage.getItem('selectedProjectId');
    if (savedProjectId) {
      const project = projects.find(p => p.id === savedProjectId) || null;
      if (project) {
        setSelectedProject(project);
      } else {
        // If saved project not found, default to first project
        setSelectedProject(projects[0] || null);
      }
    } else {
      // If no saved project, default to first project
      setSelectedProject(projects[0] || null);
    }
  }, []);
  
  // Save to localStorage when changed
  useEffect(() => {
    if (selectedProject) {
      localStorage.setItem('selectedProjectId', selectedProject.id);
    }
  }, [selectedProject]);

  const value = {
    selectedProject,
    setSelectedProject,
    allProjects
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
