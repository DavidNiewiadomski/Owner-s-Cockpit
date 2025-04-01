
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { OwnerQuickActions } from '@/components/dashboard/actions/OwnerQuickActions';
import { DashboardSections } from '@/components/dashboard/sections/DashboardSections';
import { ProjectVisualizations } from '@/components/dashboard/visualizations/ProjectVisualizations';
import { ViewerModals } from '@/components/dashboard/modals/ViewerModals';
import { 
  documents, 
  progressChartData, 
  integrationData, 
  financialData, 
  timelineEvents, 
  propertyData 
} from '@/data/index';
import { projects } from '@/data/projects/projectData';

export function MainDashboard() {
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  const [isRealityCaptureOpen, setIsRealityCaptureOpen] = useState(false);

  // Get a subset of projects for the dashboard
  const dashboardProjects = projects.slice(0, 3);

  const openBIMViewer = () => {
    setIsBIMViewerOpen(true);
  };

  const closeBIMViewer = () => {
    setIsBIMViewerOpen(false);
  };

  const openRealityCaptureViewer = () => {
    setIsRealityCaptureOpen(true);
  };

  const closeRealityCaptureViewer = () => {
    setIsRealityCaptureOpen(false);
  };

  return (
    <div className="space-y-8">
      <DashboardStats />
      
      <OwnerQuickActions />
      
      <DashboardSections 
        documents={documents}
        progressChartData={progressChartData}
        integrationData={integrationData}
        financialData={financialData}
        timelineEvents={timelineEvents}
        propertyData={propertyData}
        projects={dashboardProjects}
        selectedProject={selectedProject}
      />

      {selectedProject && (
        <ProjectVisualizations 
          onOpenBIMViewer={openBIMViewer}
          onOpenRealityCaptureViewer={openRealityCaptureViewer}
        />
      )}

      <ViewerModals 
        isBIMViewerOpen={isBIMViewerOpen}
        isRealityCaptureOpen={isRealityCaptureOpen}
        selectedProject={selectedProject}
        closeBIMViewer={closeBIMViewer}
        closeRealityCaptureViewer={closeRealityCaptureViewer}
      />
    </div>
  );
}
