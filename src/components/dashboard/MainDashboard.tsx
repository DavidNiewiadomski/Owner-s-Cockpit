
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PropertyDetails } from '@/components/dashboard/PropertyDetails';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { FinancialTracking } from '@/components/dashboard/FinancialTracking';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { OwnerActionItems } from '@/components/dashboard/OwnerActionItems';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { 
  propertyData, 
  timelineEvents, 
  documents, 
  progressChartData, 
  financialData, 
  projects,
  notifications,
  integrationData
} from '@/data/dashboardData';

export function MainDashboard() {
  const { toast } = useToast();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <DashboardStats />
      </div>
      
      <div className="col-span-1 lg:col-span-2">
        <PropertyDetails 
          propertyName={propertyData.propertyName}
          propertyType={propertyData.propertyType}
          location={propertyData.location}
          squareFootage={propertyData.squareFootage}
          floors={propertyData.floors}
          constructionStartDate={propertyData.constructionStartDate}
          estimatedCompletionDate={propertyData.estimatedCompletionDate}
          currentPhase={propertyData.currentPhase}
          completionPercentage={propertyData.completionPercentage}
          keyContacts={propertyData.keyContacts}
          permits={propertyData.permits}
          inspections={propertyData.inspections}
        />
      </div>
      
      <div className="col-span-1">
        <TimelineCard 
          events={timelineEvents}
          showFinancialImpact={true}
          onViewRealityCapture={(event) => {
            toast({
              title: "Reality Capture",
              description: `Viewing ${event.title} reality capture`,
            });
          }}
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <ProgressChart data={progressChartData} />
      </div>
      
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <DocumentList 
          documents={documents} 
          onViewDocument={(doc) => {
            toast({
              title: "Document",
              description: `Viewing ${doc.name}`,
            });
          }}
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <FinancialTracking 
          projectName={financialData.projectName}
          totalBudget={financialData.totalBudget}
          spending={financialData.spending}
          changeOrders={financialData.changeOrders}
        />
      </div>
      
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <RealityCaptureViewer />
      </div>
      
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <ProjectsSection 
          projects={projects}
        />
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <OwnerActionItems />
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <NotificationsCard notifications={notifications} />
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-1">
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
  );
}
