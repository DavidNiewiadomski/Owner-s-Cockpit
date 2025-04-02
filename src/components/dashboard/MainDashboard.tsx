
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { ProjectVisualizations } from '@/components/dashboard/visualizations/ProjectVisualizations';
import { OwnerQuickActions } from '@/components/dashboard/actions/OwnerQuickActions';
import { ViewerModals } from '@/components/dashboard/modals/ViewerModals';
import { DashboardSections } from '@/components/dashboard/sections/DashboardSections';
import { documents as recentDocuments } from '@/data/documents/documentData';
import { projects } from '@/data/projects/projectData';
import { notifications } from '@/data/notifications/notificationData';

export function MainDashboard() {
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  const [isRealityCaptureViewerOpen, setIsRealityCaptureViewerOpen] = useState(false);
  
  const handleOpenBIMViewer = () => {
    setIsBIMViewerOpen(true);
  };
  
  const handleOpenRealityCaptureViewer = () => {
    setIsRealityCaptureViewerOpen(true);
  };

  const handleCloseBIMViewer = () => {
    setIsBIMViewerOpen(false);
  };
  
  const handleCloseRealityCaptureViewer = () => {
    setIsRealityCaptureViewerOpen(false);
  };
  
  return (
    <>
      {/* Owner Quick Actions moved to the top */}
      <div className="mb-8">
        <OwnerQuickActions />
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-3">
          <ProjectsSection projects={projects.slice(0, 2)} />
        </div>
      </div>
      
      <DashboardSections 
        recentDocuments={recentDocuments} 
        notifications={notifications} 
      />
      
      <ProjectVisualizations 
        onOpenBIMViewer={handleOpenBIMViewer} 
        onOpenRealityCaptureViewer={handleOpenRealityCaptureViewer} 
      />
      
      <ViewerModals 
        isBIMViewerOpen={isBIMViewerOpen}
        isRealityCaptureOpen={isRealityCaptureViewerOpen}
        closeBIMViewer={handleCloseBIMViewer}
        closeRealityCaptureViewer={handleCloseRealityCaptureViewer}
      />
    </>
  );
}
