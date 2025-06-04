
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProjects } from '@/services/dataService';
import type { Project } from '@/lib/supabase';

export type ProjectOrAll = Project | { id: 'all'; title: 'All Projects'; status: string };

interface ProjectContextType {
  selectedProject: ProjectOrAll | null;
  setSelectedProject: (project: ProjectOrAll | null) => void;
  projects: Project[];
  allProjects: Project[];
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Create the "All Projects" default option
const ALL_PROJECTS_OPTION: ProjectOrAll = { id: 'all', title: 'All Projects', status: 'on-track' };

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<ProjectOrAll | null>(ALL_PROJECTS_OPTION);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        
        // Ensure "All Projects" remains selected if no other selection has been made
        if (!selectedProject || selectedProject.id === 'all') {
          setSelectedProject(ALL_PROJECTS_OPTION);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const value = {
    selectedProject,
    setSelectedProject,
    projects,
    allProjects: projects, // Adding allProjects as an alias for projects
    loading
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
