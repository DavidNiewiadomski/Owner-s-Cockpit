
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

// Sample timeline events for the TimelineCard component
const timelineEvents = [
  {
    id: "1",
    title: "Foundation Complete",
    date: "March 12, 2024",
    description: "Foundation work completed ahead of schedule",
    status: "completed" as const,
    impact: "high" as const,
    financial: {
      amount: 15000,
      type: "under" as const
    },
    realityCapture: {
      available: true,
      date: "March 12, 2024",
      url: "https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg"
    }
  },
  {
    id: "2",
    title: "Structural Framework",
    date: "April 15, 2024",
    description: "Steel framework installation in progress",
    status: "in-progress" as const,
    realityCapture: {
      available: true,
      date: "April 10, 2024",
      url: "https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-construction-site-nav_0.jpg"
    }
  },
  {
    id: "3",
    title: "Equipment Delivery",
    date: "April 25, 2024",
    description: "Elevator equipment delivery scheduled",
    status: "upcoming" as const
  },
  {
    id: "4",
    title: "Window Installation",
    date: "May 1, 2024",
    description: "Custom window delivery delayed by supplier",
    status: "delayed" as const,
    impact: "medium" as const,
    financial: {
      amount: 12000,
      type: "over" as const
    }
  }
];

// Sample documents for the DocumentList component
const documents = [
  {
    id: "1",
    name: "Building Permit",
    type: "pdf",
    date: "Feb 10, 2024",
    size: "2.4 MB",
    status: "approved",
    author: "City Planning Dept."
  },
  {
    id: "2",
    name: "Architectural Plans",
    type: "dwg",
    date: "Jan 25, 2024",
    size: "15.8 MB",
    status: "final",
    author: "Smith & Partners"
  },
  {
    id: "3",
    name: "MEP Specifications",
    type: "pdf",
    date: "Mar 5, 2024",
    size: "8.2 MB",
    status: "review",
    author: "Engineering Solutions Inc."
  }
];

// Sample projects for the ProjectsSection component
const projects = [
  {
    id: "1",
    title: "East Tower",
    progress: 42,
    status: "On Track",
    priority: "High"
  },
  {
    id: "2",
    title: "Westside Park",
    progress: 28,
    status: "Delayed",
    priority: "Medium"
  },
  {
    id: "3",
    title: "North Bridge",
    progress: 65,
    status: "Ahead",
    priority: "High"
  }
];

// Sample notifications for the NotificationsCard component
const notifications = [
  {
    id: "1",
    title: "Budget Adjustment",
    description: "Budget increase of $250K approved for electrical work",
    date: "1 hour ago",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    title: "New Document",
    description: "Updated floor plans uploaded by Smith Architects",
    date: "3 hours ago",
    read: true,
    priority: "medium"
  },
  {
    id: "3",
    title: "Schedule Change",
    description: "Roofing work rescheduled to next week due to weather",
    date: "1 day ago",
    read: false,
    priority: "high"
  }
];

// Sample data for the IntegrationCard component
const integrationData = {
  name: "Procore",
  logo: "https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiQXUP0vpS-5-_2MW5XLBCraizY5UVA8RWm6sD6I8IAzpiAMFcBkQI",
  description: "Construction management platform",
  connected: true,
  lastSync: "15 minutes ago",
  items: 128
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

  // Sample financial data for FinancialTracking component
  const financialData = {
    projectName: selectedProject?.title || "All Projects",
    totalBudget: 85000000,
    spending: 35700000,
    changeOrders: 1250000
  };

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
        
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <DashboardStats />
            </div>
            
            <div className="col-span-1 lg:col-span-2">
              <PropertyDetails 
                name={propertyData.name}
                address={propertyData.address}
                type={propertyData.type}
                size={propertyData.size}
                startDate={propertyData.startDate}
                estimatedCompletion={propertyData.estimatedCompletion}
                completionPercentage={completionPercentage}
                budget={propertyData.budget}
                architecturalStyle={propertyData.architecturalStyle}
                sustainabilityRating={propertyData.sustainabilityRating}
                primaryMaterials={propertyData.primaryMaterials}
                floorCount={propertyData.floorCount}
                occupancyDate={propertyData.occupancyDate}
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
              <ProgressChart 
                value={completionPercentage}
                target={100}
                title="Project Completion"
                description={`${completionPercentage}% complete`}
              />
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
                onSelectProject={(project) => {
                  toast({
                    title: "Project Selected",
                    description: `Viewing ${project.title}`,
                  });
                }}
              />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <OwnerActionItems />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <NotificationsCard 
                notifications={notifications}
                onViewAll={() => {
                  toast({
                    title: "Notifications",
                    description: "Viewing all notifications",
                  });
                }}
                onMarkRead={() => {
                  toast({
                    title: "Notifications",
                    description: "Marked all as read",
                  });
                }}
              />
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <IntegrationCard 
                name={integrationData.name}
                logo={integrationData.logo}
                description={integrationData.description}
                connected={integrationData.connected}
                lastSync={integrationData.lastSync}
                items={integrationData.items}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
