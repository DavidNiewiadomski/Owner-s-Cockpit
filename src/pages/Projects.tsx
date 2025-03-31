import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { SimpleInsightsPanel } from '@/components/dashboard/SimpleInsightsPanel';
import { 
  Search, Plus, Filter, Building, Calendar, Clock, MoreHorizontal, 
  ArrowUpRight, ChevronDown, ChevronUp, Columns, List, Users 
} from 'lucide-react';

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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search projects..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => setViewMode('card')} className={viewMode === 'card' ? 'bg-accent' : ''}>
                  <Columns className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-accent' : ''}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {viewMode === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      progress={project.progress}
                      status={project.status as "on-track" | "at-risk" | "delayed"}
                      dueDate={formatDate(project.endDate)}
                      teamMembers={project.teamMembers}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Project</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-left py-3 px-4 font-medium">Progress</th>
                            <th className="text-left py-3 px-4 font-medium">Deadline</th>
                            <th className="text-left py-3 px-4 font-medium">Team</th>
                            <th className="text-left py-3 px-4 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project) => (
                            <React.Fragment key={project.id}>
                              <tr 
                                className="border-b hover:bg-muted/50 cursor-pointer"
                                onClick={() => toggleProjectExpand(project.id)}
                              >
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <div>
                                      <p className="font-medium">{project.title}</p>
                                      <p className="text-sm text-muted-foreground">{project.location}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block ${
                                      project.status === "on-track" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                    } ${
                                      project.status === "at-risk" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                    } ${
                                      project.status === "delayed" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                    } ${
                                      project.status === "in-progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                    }`}
                                  >
                                    {getStatusLabel(project.status)}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="w-32">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>{project.phase}</span>
                                      <span>{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                    <span>{formatDate(project.endDate)}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex -space-x-2">
                                    {project.teamMembers.slice(0, 3).map((member, i) => (
                                      <Avatar key={i} className="h-7 w-7 border-2 border-background">
                                        {member.avatar ? (
                                          <AvatarImage src={member.avatar} alt={member.name} />
                                        ) : (
                                          <AvatarFallback className="text-xs">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        )}
                                      </Avatar>
                                    ))}
                                    {project.teamMembers.length > 3 && (
                                      <Avatar className="h-7 w-7 border-2 border-background">
                                        <AvatarFallback className="text-xs bg-muted">
                                          +{project.teamMembers.length - 3}
                                        </AvatarFallback>
                                      </Avatar>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  {expandedProject === project.id ? (
                                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </td>
                              </tr>
                              
                              {expandedProject === project.id && (
                                <tr className="bg-muted/30">
                                  <td colSpan={6} className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div>
                                        <h4 className="text-sm font-medium mb-1">Description</h4>
                                        <p className="text-sm text-muted-foreground">{project.description}</p>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-medium mb-1">Timeline</h4>
                                        <div className="space-y-1 text-sm">
                                          <div className="flex items-center gap-1">
                                            <span className="text-muted-foreground">Start:</span>
                                            <span>{formatDate(project.startDate)}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <span className="text-muted-foreground">End:</span>
                                            <span>{formatDate(project.endDate)}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h4 className="text-sm font-medium mb-1">Budget</h4>
                                        <p className="text-sm">{project.budget}</p>
                                        <h4 className="text-sm font-medium mt-2 mb-1">Client</h4>
                                        <p className="text-sm">{project.client}</p>
                                      </div>
                                      
                                      <div className="md:col-span-3 flex justify-end">
                                        <Button variant="outline" size="sm" className="text-sm gap-1">
                                          <span>View Details</span>
                                          <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
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
