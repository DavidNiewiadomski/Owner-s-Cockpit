
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { FinancialTracking } from '@/components/dashboard/FinancialTracking';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { PropertyDetails } from '@/components/dashboard/PropertyDetails';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { BIMViewer } from '@/components/dashboard/BIMViewer';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Orbit, Maximize2, ShieldCheck, Wallet, Calendar, ListChecks } from 'lucide-react';
import { 
  documents, 
  progressChartData, 
  integrationData, 
  financialData, 
  timelineEvents, 
  propertyData 
} from '@/data/index';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects/projectData';

export function MainDashboard() {
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  const [isRealityCaptureOpen, setIsRealityCaptureOpen] = useState(false);

  // Get a subset of projects for the dashboard
  const dashboardProjects = projects.slice(0, 3);

  const handleViewDocument = (doc: any) => {
    // Function kept for future use
  };

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
      
      {/* Owner Quick Actions */}
      <Card className="bg-black border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white">Owner Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-cyan-900/20 hover:border-cyan-800 hover:text-cyan-300">
              <Link to="/action-items">
                <ListChecks className="h-6 w-6 mb-2 text-cyan-400" />
                <span className="text-sm">Action Items</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-blue-900/20 hover:border-blue-800 hover:text-blue-300">
              <Link to="/budget-financials">
                <Wallet className="h-6 w-6 mb-2 text-blue-400" />
                <span className="text-sm">Budget & Finances</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-green-900/20 hover:border-green-800 hover:text-green-300">
              <Link to="/safety-sustainability">
                <ShieldCheck className="h-6 w-6 mb-2 text-green-400" />
                <span className="text-sm">Safety Reports</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto flex-col py-4 border-gray-700 hover:bg-purple-900/20 hover:border-purple-800 hover:text-purple-300">
              <Link to="/timeline">
                <Calendar className="h-6 w-6 mb-2 text-purple-400" />
                <span className="text-sm">Timeline</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentList 
          documents={documents} 
        />
        
        <FinancialTracking
          projectName={financialData.projectName}
          totalBudget={financialData.totalBudget}
          spending={financialData.spending || []}
          changeOrders={financialData.changeOrders || []}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <ProjectsSection projects={dashboardProjects} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProgressChart data={progressChartData} />
              <TimelineCard events={timelineEvents} />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <NotificationsCard 
            notifications={[]}
          />
          
          <IntegrationCard 
            name={integrationData.name}
            logo={integrationData.logo}
            description={integrationData.description}
            connected={integrationData.connected}
            category={integrationData.category}
            onToggle={integrationData.onToggle}
          />
        </div>
      </div>

      {selectedProject && (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-4">Project Visualizations</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-black border-cyan-900/30 overflow-hidden p-4">
              <div className="flex flex-col h-80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Orbit className="h-5 w-5 mr-2 text-blue-400" />
                    <h3 className="text-lg font-medium text-white">BIM Model</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 border-blue-700 bg-blue-900/30 hover:bg-blue-800 text-white"
                    onClick={openBIMViewer}
                  >
                    <Maximize2 className="h-4 w-4 mr-1" />
                    View Full Screen
                  </Button>
                </div>
                <div className="flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                  <img 
                    src="https://www.constructible.trimble.com/hs-fs/hubfs/BIM%20in%20Construction.jpg" 
                    alt="BIM model placeholder" 
                    className="h-64 object-cover opacity-60 cursor-pointer"
                    onClick={openBIMViewer}
                  />
                </div>
              </div>
            </Card>
            <Card className="bg-black border-cyan-900/30 overflow-hidden p-4">
              <div className="flex flex-col h-80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Orbit className="h-5 w-5 mr-2 text-blue-400" />
                    <h3 className="text-lg font-medium text-white">Reality Capture</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 border-blue-700 bg-blue-900/30 hover:bg-blue-800 text-white"
                    onClick={openRealityCaptureViewer}
                  >
                    <Maximize2 className="h-4 w-4 mr-1" />
                    View Full Screen
                  </Button>
                </div>
                <div className="flex-1 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                  <div className="h-64 w-full flex items-center justify-center text-center p-6 cursor-pointer" onClick={openRealityCaptureViewer}>
                    <img 
                      src="public/lovable-uploads/e41b997b-4805-42a1-b7e3-f0d7a3ce04f9.png" 
                      alt="Project timeline tabs" 
                      className="h-auto max-w-full max-h-64 opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <PropertyDetails propertyData={propertyData} />
        </>
      )}

      {/* BIM Viewer Modal */}
      {isBIMViewerOpen && (
        <BIMViewer 
          projectName={selectedProject?.title || "Project"} 
          isOpen={isBIMViewerOpen} 
          onClose={closeBIMViewer} 
        />
      )}

      {/* Reality Capture Viewer Modal */}
      {isRealityCaptureOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80">
          <RealityCaptureViewer />
          <Button 
            className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white"
            onClick={closeRealityCaptureViewer}
          >
            Close Viewer
          </Button>
        </div>
      )}
    </div>
  );
}
