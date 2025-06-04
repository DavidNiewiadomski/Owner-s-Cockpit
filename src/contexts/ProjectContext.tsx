
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projects as projectsFromData } from '@/data/projects/projectData';

// Define the Project type based on our data structure
export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "on-track" | "at-risk" | "delayed" | "completed" | "upcoming";
  dueDate: string;
  startDate?: string;
  budget?: string;
  client?: string;
  location?: string;
  phase?: string;
  stage?: "site-selection" | "planning-design" | "construction" | "facility-management";
  teamMembers: { name: string; avatar?: string }[];
  priority: "High" | "Medium" | "Low";
}

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
        // Use the projects from our data file directly
        console.log('ProjectContext loading projects:', projectsFromData.map(p => ({ id: p.id, title: p.title })));
        setProjects(projectsFromData);
        
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
