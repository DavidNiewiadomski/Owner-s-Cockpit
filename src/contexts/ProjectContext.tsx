
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { projects as initialProjects } from '@/data/dashboardData';

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

// Extended type for the "All Projects" option
export type ProjectOrAll = Project | { 
  id: 'all'; 
  title: 'All Projects'; 
  status: 'on-track' | 'at-risk' | 'delayed';
};

interface ProjectContextType {
  selectedProject: ProjectOrAll | null;
  setSelectedProject: (project: ProjectOrAll) => void;
  allProjects: Project[];
}

const defaultContextValue: ProjectContextType = {
  selectedProject: null,
  setSelectedProject: () => {},
  allProjects: []
};

export const ProjectContext = createContext<ProjectContextType>(defaultContextValue);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<ProjectOrAll | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    try {
      if (Array.isArray(initialProjects)) {
        const safeProjects = initialProjects.map(project => ({
          id: project.id || '',
          title: project.title || '',
          description: project.description || '',
          progress: typeof project.progress === 'number' ? project.progress : 0,
          status: project.status || 'on-track',
          dueDate: project.dueDate || '',
          teamMembers: Array.isArray(project.teamMembers) ? project.teamMembers : []
        }));
        
        setAllProjects(safeProjects);
        
        if (safeProjects.length > 0) {
          setSelectedProject(safeProjects[0]);
        }
      } else {
        console.error("initialProjects is not an array:", initialProjects);
        setAllProjects([]);
      }
    } catch (error) {
      console.error("Error initializing project data:", error);
      setAllProjects([]);
    }
  }, []);
  
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
