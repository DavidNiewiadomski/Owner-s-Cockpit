
import React from 'react';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { FinancialTracking } from '@/components/dashboard/FinancialTracking';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { PropertyDetails } from '@/components/dashboard/PropertyDetails';

interface DashboardSectionsProps {
  documents: any[];
  progressChartData: any[];
  integrationData: any;
  financialData: any;
  timelineEvents: any[];
  propertyData: any;
  projects: any[];
  selectedProject: any;
}

export function DashboardSections({
  documents,
  progressChartData,
  integrationData,
  financialData,
  timelineEvents,
  propertyData,
  projects,
  selectedProject
}: DashboardSectionsProps) {
  return (
    <>
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
            <ProjectsSection projects={projects} />
            
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
        <PropertyDetails propertyData={propertyData} />
      )}
    </>
  );
}
