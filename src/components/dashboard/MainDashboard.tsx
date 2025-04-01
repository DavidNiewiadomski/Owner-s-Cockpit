
import React from 'react';
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

  const handleViewDocument = (doc: any) => {
    toast({
      title: "Opening Document",
      description: `Loading ${doc.name}...`,
    });
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
            <Card className="bg-black border-cyan-900/30 overflow-hidden">
              <BIMViewer isOpen={true} onClose={() => {}} />
            </Card>
            <Card className="bg-black border-cyan-900/30 overflow-hidden">
              <RealityCaptureViewer />
            </Card>
          </div>
          
          <PropertyDetails propertyData={propertyData} />
        </>
      )}
    </div>
  );
}
