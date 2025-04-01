import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PropertyDetails } from '@/components/dashboard/PropertyDetails';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { FinancialTracking } from '@/components/dashboard/FinancialTracking';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';
import { ProjectsSection } from '@/components/dashboard/ProjectsSection';
import { useProject } from '@/contexts/ProjectContext';
import { OwnerActionItems } from '@/components/dashboard/OwnerActionItems';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';

const propertyData = {
  name: "Riverfront Tower",
  address: "123 Skyline Avenue, Downtown, CA",
  type: "Mixed-Use Development",
  size: "450,000 sq ft",
  startDate: "March 15, 2022",
  estimatedCompletion: "June 30, 2024",
  completionPercentage: "42", // This needs to be converted to a number
  budget: "$85M",
  architecturalStyle: "Modern Contemporary",
  sustainabilityRating: "LEED Platinum",
  primaryMaterials: "Glass, Steel, Concrete",
  floorCount: "32 floors",
  occupancyDate: "August 15, 2024"
};

// AI-generated insights for the dashboard
const dashboardInsights = [
  {
    title: "Schedule Update",
    content: "Foundation work is ahead of schedule by 3 days.",
    type: "success" as const
  },
  {
    title: "Budget Alert",
    content: "Electrical subcontractor costs are 5% over projections.",
    type: "warning" as const
  },
  {
    title: "Weather Impact",
    content: "Incoming storm system may affect exterior work next week.",
    type: "info" as const
  },
  {
    title: "Material Delay",
    content: "Custom glass panels shipment delayed by 2 weeks.",
    type: "warning" as const
  }
];

const Index = () => {
  const { toast } = useToast();
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fix the type error by ensuring completionPercentage is always a number
  const completionPercentage = typeof propertyData.completionPercentage === 'string' 
    ? parseFloat(propertyData.completionPercentage) || 0 // Use 0 as fallback if parsing fails
    : Number(propertyData.completionPercentage) || 0;

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />

        <CollapsibleAIAssistant 
          projectContext="Dashboard"
          projectName={selectedProject?.title || "All Projects"}
          initialInsights={dashboardInsights}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-radial from-black to-gray-950">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <DashboardStats />
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <PropertyDetails property={propertyData} completionPercentage={completionPercentage} />
            </div>
            
            <div className="col-span-1">
              <TimelineCard />
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <ProgressChart completionPercentage={completionPercentage} />
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <DocumentList />
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <FinancialTracking />
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <RealityCaptureViewer />
            </div>
            
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <ProjectsSection />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <OwnerActionItems />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <NotificationsCard />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <IntegrationCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
