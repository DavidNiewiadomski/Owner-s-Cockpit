
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

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<ProjectOrAll | null>(null);
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
