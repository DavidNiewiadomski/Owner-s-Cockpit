
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectTableRow } from './ProjectTableRow';

interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  phase: string;
  startDate: string;
  endDate: string;
  budget: string;
  client: string;
  location: string;
  teamMembers: Array<{ name: string; avatar?: string }>;
}

interface ProjectsTableProps {
  projects: Project[];
  expandedProject: number | null;
  toggleProjectExpand: (projectId: number) => void;
  formatDate: (dateString: string) => string;
  getStatusLabel: (status: string) => string;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  expandedProject,
  toggleProjectExpand,
  formatDate,
  getStatusLabel,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Project</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Progress</th>
                <th className="text-left py-3 px-4 font-medium">Deadline</th>
                <th className="text-left py-3 px-4 font-medium">Team</th>
                <th className="text-left py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {projects && projects.map((project) => (
                <ProjectTableRow
                  key={project.id}
                  project={project}
                  expandedProject={expandedProject}
                  toggleProjectExpand={toggleProjectExpand}
                  formatDate={formatDate}
                  getStatusLabel={getStatusLabel}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
