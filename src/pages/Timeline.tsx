
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, FileText, HardHat, Truck, Building, AlertTriangle, CheckCircle, ArrowRight, Filter } from 'lucide-react';

// Sample timeline data
const timelineData = [
  {
    id: 1,
    date: "2023-11-15",
    formattedDate: "Nov 15, 2023",
    events: [
      {
        id: 101,
        type: "milestone",
        time: "09:30 AM",
        title: "Project Kickoff Meeting",
        description: "Initial meeting with all stakeholders to define project scope and timeline.",
        project: "Downtown High-Rise",
        users: [
          { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Mark Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      },
      {
        id: 102,
        type: "document",
        time: "11:45 AM",
        title: "Site Survey Report Uploaded",
        description: "Detailed topographical survey of the construction site.",
        project: "Downtown High-Rise",
        user: { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 2,
    date: "2023-11-20",
    formattedDate: "Nov 20, 2023",
    events: [
      {
        id: 103,
        type: "approval",
        time: "10:15 AM",
        title: "Permit Application Approved",
        description: "Construction permits approved by the city council.",
        project: "Downtown High-Rise",
        user: { name: "Robert Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 3,
    date: "2023-12-01",
    formattedDate: "Dec 1, 2023",
    events: [
      {
        id: 104,
        type: "construction",
        time: "08:00 AM",
        title: "Excavation Work Begins",
        description: "Ground breaking and site preparation started.",
        project: "Downtown High-Rise",
        user: { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      },
      {
        id: 105,
        type: "delivery",
        time: "02:30 PM",
        title: "Material Delivery",
        description: "Delivery of steel reinforcement for foundation.",
        project: "Downtown High-Rise",
        user: { name: "Mark Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 4,
    date: "2023-12-15",
    formattedDate: "Dec 15, 2023",
    events: [
      {
        id: 106,
        type: "issue",
        time: "11:20 AM",
        title: "Foundation Issue Detected",
        description: "Soil composition requires deeper foundation than initially planned.",
        project: "Downtown High-Rise",
        user: { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 5,
    date: "2023-12-18",
    formattedDate: "Dec 18, 2023",
    events: [
      {
        id: 107,
        type: "meeting",
        time: "09:00 AM",
        title: "Emergency Planning Meeting",
        description: "Meeting to address the foundation issue and revise plans.",
        project: "Downtown High-Rise",
        users: [
          { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      },
      {
        id: 108,
        type: "document",
        time: "03:45 PM",
        title: "Revised Foundation Plans",
        description: "Updated engineering drawings for the foundation.",
        project: "Downtown High-Rise",
        user: { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 6,
    date: "2024-01-10",
    formattedDate: "Jan 10, 2024",
    events: [
      {
        id: 109,
        type: "approval",
        time: "02:15 PM",
        title: "Revised Plans Approved",
        description: "City inspector approved the changes to the foundation design.",
        project: "Downtown High-Rise",
        user: { name: "Robert Smith", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 7,
    date: "2024-01-15",
    formattedDate: "Jan 15, 2024",
    events: [
      {
        id: 110,
        type: "construction",
        time: "07:30 AM",
        title: "Foundation Work Resumes",
        description: "Construction of the deeper foundation begins.",
        project: "Downtown High-Rise",
        user: { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 8,
    date: "2024-02-20",
    formattedDate: "Feb 20, 2024",
    events: [
      {
        id: 111,
        type: "milestone",
        time: "04:00 PM",
        title: "Foundation Complete",
        description: "Foundation work completed successfully and ready for the next phase.",
        project: "Downtown High-Rise",
        users: [
          { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      }
    ]
  },
  {
    id: 9,
    date: "2024-02-28",
    formattedDate: "Feb 28, 2024",
    events: [
      {
        id: 112,
        type: "delivery",
        time: "09:30 AM",
        title: "Structural Steel Delivery",
        description: "First shipment of structural steel for building frame.",
        project: "Downtown High-Rise",
        user: { name: "Mark Johnson", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      }
    ]
  },
  {
    id: 10,
    date: "2024-03-05",
    formattedDate: "Mar 5, 2024",
    events: [
      {
        id: 113,
        type: "construction",
        time: "07:00 AM",
        title: "Steel Framing Begins",
        description: "Construction of the main structural frame.",
        project: "Downtown High-Rise",
        user: { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
      },
      {
        id: 114,
        type: "meeting",
        time: "02:00 PM",
        title: "Client Progress Meeting",
        description: "Monthly progress update with the client.",
        project: "Downtown High-Rise",
        users: [
          { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      }
    ]
  },
  {
    id: 11,
    date: "2024-04-15",
    formattedDate: "Apr 15, 2024 (Today)",
    events: [
      {
        id: 115,
        type: "milestone",
        time: "11:00 AM",
        title: "First Floor Complete",
        description: "Completion of the first floor structure and concrete pouring.",
        project: "Downtown High-Rise",
        users: [
          { name: "John Dawson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
          { name: "Alex Rodriguez", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
        ]
      }
    ],
    isToday: true
  }
];

// Function to get icon based on event type
const getEventIcon = (type: string) => {
  switch (type) {
    case 'milestone':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'approval':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'construction':
      return <HardHat className="h-5 w-5 text-yellow-500" />;
    case 'delivery':
      return <Truck className="h-5 w-5 text-purple-500" />;
    case 'issue':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'meeting':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    default:
      return <Building className="h-5 w-5 text-gray-500" />;
  }
};

// Function to get badge color based on event type
const getEventBadgeClass = (type: string) => {
  switch (type) {
    case 'milestone':
      return "bg-green-500/10 text-green-500";
    case 'document':
      return "bg-blue-500/10 text-blue-500";
    case 'approval':
      return "bg-green-500/10 text-green-500";
    case 'construction':
      return "bg-yellow-500/10 text-yellow-500";
    case 'delivery':
      return "bg-purple-500/10 text-purple-500";
    case 'issue':
      return "bg-red-500/10 text-red-500";
    case 'meeting':
      return "bg-blue-500/10 text-blue-500";
    default:
      return "bg-gray-500/10 text-gray-500";
  }
};

const Timeline = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader title="Project Timeline" subtitle="Track progress and events across your projects" />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="downtown">Downtown High-Rise</TabsTrigger>
                <TabsTrigger value="riverside">Riverside Complex</TabsTrigger>
                <TabsTrigger value="corporate">Corporate Offices</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            
            <TabsContent value="all" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Timeline */}
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {timelineData.map((timelineItem) => (
                      <div key={timelineItem.id} className="relative">
                        <div className="flex items-center md:justify-center">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border md:mx-auto">
                            <Calendar className="h-5 w-5 text-foreground" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:justify-center mt-3">
                          <div className="md:w-[150px] md:text-right md:pr-8 flex-shrink-0">
                            <p className="font-semibold text-foreground">{timelineItem.formattedDate}</p>
                            {timelineItem.isToday && (
                              <Badge className="md:ml-auto" variant="outline">Today</Badge>
                            )}
                          </div>
                          
                          <div className="pt-1 md:w-[calc(100%-150px)] md:pl-8 md:border-l border-border">
                            <div className="space-y-4">
                              {timelineItem.events.map((event) => (
                                <div key={event.id} className="p-4 bg-card border rounded-lg">
                                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                    <div className="flex items-center gap-2">
                                      <div className="flex-shrink-0">
                                        {getEventIcon(event.type)}
                                      </div>
                                      <h4 className="font-semibold">{event.title}</h4>
                                      <Badge variant="outline" className={getEventBadgeClass(event.type)}>
                                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>{event.time}</span>
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                                  
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex items-center">
                                      <Badge variant="secondary" className="mr-2">{event.project}</Badge>
                                    </div>
                                    
                                    <div className="flex items-center gap-1">
                                      {event.users ? (
                                        <div className="flex -space-x-2">
                                          {event.users.map((user, index) => (
                                            <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                              <AvatarImage src={user.avatar} alt={user.name} />
                                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                          ))}
                                        </div>
                                      ) : event.user ? (
                                        <Avatar className="h-6 w-6 border-2 border-background">
                                          <AvatarImage src={event.user.avatar} alt={event.user.name} />
                                          <AvatarFallback>{event.user.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                      ) : null}
                                      
                                      <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                                        <span>Details</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="downtown" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Filtered view for Downtown High-Rise project will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="riverside" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Filtered view for Riverside Complex project will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="corporate" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Filtered view for Corporate Offices project will be displayed here.
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

export default Timeline;
