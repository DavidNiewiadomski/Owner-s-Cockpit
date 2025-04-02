
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { OwnerQuickActions } from '@/components/dashboard/actions/OwnerQuickActions';
import { ViewerModals } from '@/components/dashboard/modals/ViewerModals';
import { RecentDocuments } from '@/components/dashboard/RecentDocuments';
import { ProjectTimeline } from '@/components/dashboard/ProjectTimeline';
import { FinancialOverview } from '@/components/dashboard/FinancialOverview';
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview';
import { IntegrationsOverview } from '@/components/dashboard/IntegrationsOverview';
import { ProjectVisualizations } from '@/components/dashboard/visualizations/ProjectVisualizations';
import { 
  documents, 
  progressChartData, 
  integrationData,
  allIntegrations, 
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
      {/* Key statistics */}
      <DashboardStats />
      
      {/* Quick action buttons */}
      <OwnerQuickActions />
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Projects overview */}
          <ProjectsOverview projects={dashboardProjects} />
          
          {/* Documents and Financials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentDocuments documents={documents.slice(0, 4)} />
            <FinancialOverview financialData={financialData} />
          </div>
          
          {/* Timeline and progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectTimeline events={timelineEvents} />
            <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-white">Project Progress</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Overall Completion</span>
                <span className="text-gray-300">65%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Foundation</span>
                    <span className="text-sm text-green-400">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Structure</span>
                    <span className="text-sm text-blue-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">MEP Systems</span>
                    <span className="text-sm text-yellow-400">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Interior Finishes</span>
                    <span className="text-sm text-purple-400">20%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - 1/3 width */}
        <div className="space-y-6">
          {/* Integrations overview */}
          <IntegrationsOverview integrations={allIntegrations.slice(0, 2)} />
          
          {/* Property highlights - if a project is selected */}
          {selectedProject && (
            <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
              <h3 className="text-lg font-semibold mb-4 text-white">Property Highlights</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-gray-200">{propertyData.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Size:</span>
                  <span className="text-gray-200">{propertyData.squareFootage.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-gray-200">Downtown, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Completion:</span>
                  <span className="text-gray-200">{propertyData.estimatedCompletionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Phase:</span>
                  <span className="text-gray-200">{propertyData.currentPhase}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Recent notifications */}
          <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-semibold mb-4 text-white flex justify-between items-center">
              <span>Recent Updates</span>
              <span className="text-xs text-gray-400">Today</span>
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-sm text-green-400">Schedule Update</p>
                <p className="text-xs text-gray-400">Foundation work is ahead of schedule by 3 days</p>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3">
                <p className="text-sm text-yellow-400">Budget Alert</p>
                <p className="text-xs text-gray-400">Electrical subcontractor costs are 5% over projections</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm text-blue-400">Weather Impact</p>
                <p className="text-xs text-gray-400">Incoming storm system may affect exterior work next week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project visualizations section */}
      {selectedProject && (
        <ProjectVisualizations 
          onOpenBIMViewer={openBIMViewer}
          onOpenRealityCaptureViewer={openRealityCaptureViewer}
        />
      )}

      {/* Modal windows for fullscreen viewers */}
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
