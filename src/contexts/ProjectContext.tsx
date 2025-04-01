
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

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  // Get from localStorage or default to the first project
  const [selectedProject, setSelectedProject] = useState<ProjectOrAll | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>(initialProjects);
  
  // On first load, try to get from localStorage
  useEffect(() => {
    const savedProjectId = localStorage.getItem('selectedProjectId');
    if (savedProjectId) {
      if (savedProjectId === 'all') {
        setSelectedProject({ id: 'all', title: 'All Projects', status: 'on-track' });
      } else {
        const project = initialProjects.find(p => p.id === savedProjectId) || null;
        if (project) {
          setSelectedProject(project);
        } else {
          // If saved project not found, default to first project
          setSelectedProject(initialProjects[0] || null);
        }
      }
    } else {
      // If no saved project, default to first project
      setSelectedProject(initialProjects[0] || null);
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
    allProjects,
    // For backward compatibility with existing code
    currentProject: selectedProject,
    projects: initialProjects
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
