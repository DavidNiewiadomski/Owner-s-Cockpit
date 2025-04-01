
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Orbit, Maximize2 } from 'lucide-react';
import { 
  documents, 
  progressChartData, 
  integrationData, 
  financialData, 
  timelineEvents, 
  propertyData 
} from '@/data/index';

export function MainDashboard() {
  const { toast } = useToast();
  const { selectedProject } = useProject();
  const [isBIMViewerOpen, setIsBIMViewerOpen] = useState(false);
  const [isRealityCaptureOpen, setIsRealityCaptureOpen] = useState(false);

  const handleViewDocument = (doc: any) => {
    toast({
      title: "Opening Document",
      description: `Loading ${doc.name}...`,
    });
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
            <ProjectsSection projects={documents.map(doc => ({
              id: doc.id,
              title: doc.project,
              description: doc.name,
              progress: 65,
              status: "on-track" as const,
              dueDate: doc.updatedAt,
              teamMembers: [{ name: doc.author || 'Team Member' }],
              priority: "Medium"
            }))} />
            
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
                    <Orbit className="h-12 w-12 text-blue-500 mb-4" />
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
