
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
import { progressChartData, integrationData } from '@/data/dashboardData';

export function MainDashboard() {
  const { toast } = useToast();
  const { selectedProject } = useProject();

  // Example data for the dashboard
  const recentDocuments = [
    {
      id: "1",
      name: "Project Requirements",
      type: "pdf",
      size: "2.4 MB",
      updatedAt: "2023-06-10",
      project: "East Tower"
    },
    {
      id: "2",
      name: "Site Analysis",
      type: "image",
      size: "5.1 MB",
      updatedAt: "2023-06-08",
      project: "East Tower"
    },
    {
      id: "3",
      name: "Structural Design",
      type: "cad",
      size: "12.8 MB",
      updatedAt: "2023-06-07", 
      project: "Harbor Bridge"
    },
    {
      id: "4",
      name: "Budget Forecast",
      type: "spreadsheet",
      size: "1.2 MB",
      updatedAt: "2023-06-05",
      project: "Westview Residences"
    }
  ];

  const handleViewDocument = (doc: any) => {
    toast({
      title: "Opening Document",
      description: `Loading ${doc.name}...`,
    });
  };

  // Sample projects for the dashboard
  const activeProjects = [
    {
      id: "1",
      title: "East Tower",
      description: "Mixed-use high-rise in downtown",
      progress: 65,
      status: "on-track" as const,
      dueDate: "2024-08-15",
      teamMembers: [{ name: "Alex Smith" }, { name: "Jamie Lee" }],
      priority: "High"
    },
    {
      id: "2",
      title: "Westview Residences",
      description: "Luxury apartment complex",
      progress: 42,
      status: "at-risk" as const,
      dueDate: "2024-05-30",
      teamMembers: [{ name: "Chris Morgan" }],
      priority: "Medium"
    },
    {
      id: "3",
      title: "Harbor Bridge",
      description: "Pedestrian bridge connecting waterfront",
      progress: 78,
      status: "delayed" as const,
      dueDate: "2024-03-15",
      teamMembers: [{ name: "Robin Taylor" }, { name: "Jesse Quinn" }],
      priority: "Critical"
    }
  ];

  return (
    <div className="space-y-8">
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentList 
          documents={recentDocuments} 
        />
        
        <FinancialTracking 
          budgetItems={[]} 
          changeOrders={[]} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-6">
            <ProjectsSection projects={activeProjects} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProgressChart 
                value={progressChartData[0].value}
                target={progressChartData[0].target}
                title={progressChartData[0].title}
                description={progressChartData[0].description}
              />
              <TimelineCard />
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
            items={integrationData.items}
          />
        </div>
      </div>

      {selectedProject && (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-4">Project Visualizations</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-black border-cyan-900/30 overflow-hidden">
              <BIMViewer />
            </Card>
            <Card className="bg-black border-cyan-900/30 overflow-hidden">
              <RealityCaptureViewer />
            </Card>
          </div>
          
          <PropertyDetails 
            name={selectedProject.title}
            address="123 Main Street, Downtown"
            type="Mixed-Use Development"
            size="145,000 sq ft"
            startDate="May 2023"
            estimatedCompletion="August 2024"
            completionPercentage={65}
            budget="$42.5M"
            architecturalStyle="Modern"
            sustainabilityRating="LEED Gold Target"
            primaryMaterials="Steel, Glass, Concrete"
            floorCount="28 floors"
            occupancyDate="October 2024"
          />
        </>
      )}
    </div>
  );
}
