import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { SimpleInsightsPanel } from '@/components/dashboard/SimpleInsightsPanel';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ProjectsTable } from '@/components/projects/ProjectsTable';

const projects = [
  {
    id: 1,
    title: "Downtown High-Rise",
    description: "23-story mixed-use building in the central business district.",
    status: "in-progress",
    progress: 35,
    phase: "Construction",
    startDate: "2023-11-15",
    endDate: "2025-06-30",
    budget: "$42,500,000",
    client: "Skyline Developments LLC",
    location: "San Francisco, CA",
    teamMembers: [
      { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Mark Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Robert Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ]
  },
  {
    id: 2,
    title: "Riverside Residential Complex",
    description: "Luxury waterfront condominium development with 120 units.",
    status: "on-track",
    progress: 65,
    phase: "Interior Finishes",
    startDate: "2023-06-10",
    endDate: "2024-09-15",
    budget: "$28,750,000",
    client: "River View Properties",
    location: "Portland, OR",
    teamMembers: [
      { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ]
  },
  {
    id: 3,
    title: "Corporate Office Park",
    description: "Modern office complex with four buildings and underground parking.",
    status: "at-risk",
    progress: 45,
    phase: "Structural Steel",
    startDate: "2023-08-22",
    endDate: "2025-01-10",
    budget: "$36,200,000",
    client: "TechVenture Enterprises",
    location: "Austin, TX",
    teamMembers: [
      { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Mark Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Robert Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ]
  },
  {
    id: 4,
    title: "Harbor Point Marina",
    description: "Coastal marina with boat slips, maintenance facility, and restaurant.",
    status: "on-track",
    progress: 20,
    phase: "Site Work",
    startDate: "2024-01-15",
    endDate: "2025-11-30",
    budget: "$18,500,000",
    client: "Harbor Developments Inc.",
    location: "Seattle, WA",
    teamMembers: [
      { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ]
  },
  {
    id: 5,
    title: "Metro Transportation Hub",
    description: "Central transit facility connecting bus, light rail, and regional train services.",
    status: "delayed",
    progress: 15,
    phase: "Foundation",
    startDate: "2023-09-05",
    endDate: "2026-03-20",
    budget: "$56,800,000",
    client: "Metropolitan Transit Authority",
    location: "Chicago, IL",
    teamMembers: [
      { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Mark Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Robert Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ]
  },
  {
    id: 6,
    title: "Community Health Center",
    description: "Modern medical facility with emergency department and outpatient services.",
    status: "on-track",
    progress: 80,
    phase: "Finishing",
    startDate: "2023-03-10",
    endDate: "2024-05-30",
    budget: "$24,300,000",
    client: "Regional Healthcare Network",
    location: "Denver, CO",
    teamMembers: [
      { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ]
  }
];

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'on-track':
      return 'On Track';
    case 'at-risk':
      return 'At Risk';
    case 'delayed':
      return 'Delayed';
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const Projects = () => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleProjectExpand = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const projectInsights = [
    'Budget Alert: Corporate Office Park has exceeded material budget by 7%. Review purchasing contracts.',
    'Schedule Opportunity: Downtown High-Rise is 5 days ahead of schedule. Consider advancing tenant negotiations.',
    'ROI Impact: Riverside residential sales trending 8% above projections. Expected ROI increase from 6.8% to 7.3%.'
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Projects" 
          subtitle="Manage and track your construction projects"
          onSearch={setSearchTerm} 
        />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <SimpleInsightsPanel
            title="Project Insights"
            insights={projectInsights}
          />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage and track all your construction projects</p>
          </div>
          
          <ProjectsHeader 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {viewMode === 'card' ? (
                <ProjectsGrid 
                  projects={projects} 
                  formatDate={formatDate} 
                />
              ) : (
                <ProjectsTable 
                  projects={projects}
                  expandedProject={expandedProject}
                  toggleProjectExpand={toggleProjectExpand}
                  formatDate={formatDate}
                  getStatusLabel={getStatusLabel}
                />
              )}
            </TabsContent>
            
            <TabsContent value="active">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Active projects will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Upcoming projects will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Completed projects will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Projects;
