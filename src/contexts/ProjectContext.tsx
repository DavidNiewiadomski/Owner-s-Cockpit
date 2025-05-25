
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getProjects } from '@/services/dataService';
import type { Project } from '@/lib/supabase';

interface ProjectContextType {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  projects: Project[];
  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
        
        // Set the first active project as default
        const activeProject = projectsData.find(p => p.status === 'active');
        if (activeProject && !selectedProject) {
          setSelectedProject(activeProject);
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
