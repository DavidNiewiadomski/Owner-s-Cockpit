
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
  team?: Array<any>;
  daysRemaining?: number;
  budgetUtilization?: number;
  completion?: string | number;
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
  currentProject: ProjectOrAll | null;
  projects: Project[];
}

// Create a default context value to avoid the need for optional chaining
const defaultContextValue: ProjectContextType = {
  selectedProject: null,
  setSelectedProject: () => {},
  allProjects: [],
  currentProject: null,
  projects: []
};

const ProjectContext = createContext<ProjectContextType>(defaultContextValue);

export function ProjectProvider({ children }: { children: ReactNode }) {
  // Initialize with safe default values
  const [selectedProject, setSelectedProject] = useState<ProjectOrAll | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  
  // Safely handle initialProjects
  useEffect(() => {
    try {
      // Ensure initialProjects is an array
      if (Array.isArray(initialProjects)) {
        setAllProjects(initialProjects);
        
        // Set a default selected project
        const firstProject = initialProjects.length > 0 ? initialProjects[0] : null;
        setSelectedProject(firstProject);
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
    allProjects,
    // For backward compatibility with existing code
    currentProject: selectedProject,
    projects: Array.isArray(initialProjects) ? initialProjects : []
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
