
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  FileText, 
  HardHat, 
  Truck, 
  Building, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Share2,
  PrinterIcon,
  PlusCircle,
  CalendarIcon,
  ArrowDownUp,
  BarChart4,
  Info
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, CartesianGrid } from 'recharts';

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

// Gantt chart data for Downtown High-Rise project
const ganttData = [
  { name: 'Site Preparation', actualStart: 0, actualEnd: 4, plannedStart: 0, plannedEnd: 5, completion: 100 },
  { name: 'Foundation', actualStart: 4, actualEnd: 8, plannedStart: 5, plannedEnd: 10, completion: 100 },
  { name: 'Structural Framework', actualStart: 8, actualEnd: 15, plannedStart: 10, plannedEnd: 18, completion: 100 },
  { name: 'Exterior Walls', actualStart: 15, actualEnd: 18, plannedStart: 18, plannedEnd: 22, completion: 60 },
  { name: 'Roofing', actualStart: 18, actualEnd: null, plannedStart: 22, plannedEnd: 26, completion: 20 },
  { name: 'Interior Rough-In', actualStart: null, actualEnd: null, plannedStart: 26, plannedEnd: 32, completion: 0 },
  { name: 'Drywall', actualStart: null, actualEnd: null, plannedStart: 32, plannedEnd: 36, completion: 0 },
  { name: 'Interior Finishes', actualStart: null, actualEnd: null, plannedStart: 36, plannedEnd: 42, completion: 0 },
  { name: 'Flooring', actualStart: null, actualEnd: null, plannedStart: 42, plannedEnd: 46, completion: 0 },
  { name: 'Painting', actualStart: null, actualEnd: null, plannedStart: 46, plannedEnd: 50, completion: 0 },
  { name: 'Fixtures & Equipment', actualStart: null, actualEnd: null, plannedStart: 50, plannedEnd: 54, completion: 0 },
  { name: 'Final Inspection', actualStart: null, actualEnd: null, plannedStart: 54, plannedEnd: 55, completion: 0 },
  { name: 'Handover', actualStart: null, actualEnd: null, plannedStart: 55, plannedEnd: 56, completion: 0 }
];

// Delay metrics data
const delayMetricsData = [
  { name: 'Site Preparation', planned: 5, actual: 4, variance: -1 },
  { name: 'Foundation', planned: 5, actual: 4, variance: -1 },
  { name: 'Structural Framework', planned: 8, actual: 7, variance: -1 },
  { name: 'Exterior Walls', planned: 4, actual: 3, variance: -1 },
  { name: 'Roofing', planned: 4, actual: 5, variance: 1 },
  { name: 'Interior Rough-In', planned: 6, actual: null, variance: null },
  { name: 'Drywall', planned: 4, actual: null, variance: null },
  { name: 'Interior Finishes', planned: 6, actual: null, variance: null },
  { name: 'Flooring', planned: 4, actual: null, variance: null },
  { name: 'Painting', planned: 4, actual: null, variance: null },
  { name: 'Fixtures & Equipment', planned: 4, actual: null, variance: null },
  { name: 'Final Inspection', planned: 1, actual: null, variance: null },
  { name: 'Handover', planned: 1, actual: null, variance: null }
];

// Milestone status data for owner dashboard
const milestoneData = [
  { 
    name: 'Project Kickoff', 
    plannedDate: 'Nov 15, 2023', 
    actualDate: 'Nov 15, 2023', 
    status: 'completed',
    description: 'Initial meeting with all stakeholders to define project scope' 
  },
  { 
    name: 'Permits Approved', 
    plannedDate: 'Dec 05, 2023', 
    actualDate: 'Dec 20, 2023', 
    status: 'delayed',
    description: 'Building permits approved by local authorities' 
  },
  { 
    name: 'Foundation Complete', 
    plannedDate: 'Jan 30, 2024', 
    actualDate: 'Jan 25, 2024', 
    status: 'completed',
    description: 'Foundation work completed and inspected' 
  },
  { 
    name: 'Structural Framework', 
    plannedDate: 'Mar 15, 2024', 
    actualDate: 'Mar 10, 2024', 
    status: 'completed',
    description: 'Main building structure completed' 
  },
  { 
    name: 'Exterior Closure', 
    plannedDate: 'Apr 30, 2024', 
    actualDate: 'In Progress', 
    status: 'in-progress',
    description: 'Building envelope and exterior walls completed' 
  },
  { 
    name: 'Roofing Complete', 
    plannedDate: 'May 30, 2024', 
    actualDate: 'Not Started', 
    status: 'upcoming',
    description: 'Roof installation and weatherproofing' 
  },
  { 
    name: 'Interior Rough-In', 
    plannedDate: 'Jul 15, 2024', 
    actualDate: 'Not Started', 
    status: 'upcoming',
    description: 'Electrical, plumbing, and HVAC rough-in work' 
  }
];

// Budget impact data for owner's financial tracking
const budgetImpactData = [
  { name: 'Foundation Issue Fix', amount: 120000, impact: 'negative' },
  { name: 'Material Cost Savings', amount: 45000, impact: 'positive' },
  { name: 'Timeline Acceleration', amount: 65000, impact: 'negative' },
  { name: 'Design Change: Exterior', amount: 35000, impact: 'negative' },
  { name: 'Value Engineering', amount: 72000, impact: 'positive' }
];

const Timeline = () => {
  const [activeProject, setActiveProject] = useState("downtown");
  const [timelineView, setTimelineView] = useState("gantt");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Project Timeline</h1>
            <p className="text-muted-foreground">Monitor schedules, milestones, and progress across your properties</p>
          </div>
          
          <Tabs defaultValue={activeProject} onValueChange={setActiveProject} className="mb-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <TabsList>
                <TabsTrigger value="downtown">Downtown High-Rise</TabsTrigger>
                <TabsTrigger value="riverside">Riverside Complex</TabsTrigger>
                <TabsTrigger value="corporate">Corporate Offices</TabsTrigger>
                <TabsTrigger value="all">All Projects</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Select defaultValue="timeline">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="View Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="timeline">Timeline View</SelectItem>
                    <SelectItem value="milestone">Milestone View</SelectItem>
                    <SelectItem value="calendar">Calendar View</SelectItem>
                    <SelectItem value="critical">Critical Path</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Downtown High-Rise Timeline</h2>
              <div className="flex items-center gap-2">
                <Button variant={timelineView === "gantt" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setTimelineView("gantt")}>
                  <BarChart4 className="h-4 w-4" />
                  <span>Gantt</span>
                </Button>
                <Button variant={timelineView === "delays" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setTimelineView("delays")}>
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Delays</span>
                </Button>
                <Button variant={timelineView === "milestone" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setTimelineView("milestone")}>
                  <CheckCircle className="h-4 w-4" />
                  <span>Milestones</span>
                </Button>
                <Button variant={timelineView === "activities" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setTimelineView("activities")}>
                  <Calendar className="h-4 w-4" />
                  <span>Activities</span>
                </Button>
                <Button variant={timelineView === "financial" ? "default" : "outline"} size="sm" className="gap-1" onClick={() => setTimelineView("financial")}>
                  <Calendar className="h-4 w-4" />
                  <span>Financial Impact</span>
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                {timelineView === "gantt" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Gantt Chart - Schedule vs. Actual</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            Planned
                          </Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Actual
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[600px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={ganttData}
                            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" domain={[0, 56]} tickCount={15} label={{ value: 'Weeks', position: 'insideBottom', offset: -15 }} />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip 
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border p-2 rounded-md shadow-md">
                                      <p className="font-bold">{data.name}</p>
                                      <p>Planned: Week {data.plannedStart} - Week {data.plannedEnd}</p>
                                      {data.actualStart !== null && (
                                        <p>Actual: Week {data.actualStart}{data.actualEnd ? ` - Week ${data.actualEnd}` : ' (in progress)'}</p>
                                      )}
                                      <p className="font-semibold">Completion: {data.completion}%</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend align="right" verticalAlign="top" />
                            
                            {/* Today marker */}
                            <ReferenceLine x={18} stroke="red" label={{ value: 'Today', position: 'top', fill: 'red' }} />
                            
                            {/* Planned schedule bars */}
                            <Bar 
                              dataKey={(data) => data.plannedEnd - data.plannedStart} 
                              stackId="planned"
                              fill="rgba(59, 130, 246, 0.6)" 
                              name="Planned" 
                              barSize={20}
                              radius={[0, 4, 4, 0]}
                              background={{ fill: 'transparent' }}
                              startPointsAt={data => data.plannedStart}
                            />
                            
                            {/* Actual schedule bars */}
                            <Bar 
                              dataKey={(data) => data.actualEnd !== null ? data.actualEnd - data.actualStart : 0} 
                              stackId="actual"
                              fill="rgba(16, 185, 129, 0.6)" 
                              name="Actual" 
                              barSize={10}
                              radius={[0, 4, 4, 0]} 
                              background={{ fill: 'transparent' }}
                              startPointsAt={data => data.actualStart !== null ? data.actualStart : 0}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {timelineView === "delays" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Schedule Variance Analysis</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Ahead of Schedule
                          </Badge>
                          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                            Behind Schedule
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[500px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={delayMetricsData.filter(d => d.variance !== null)}
                            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" domain={[-2, 2]} tickCount={5} label={{ value: 'Weeks (Variance)', position: 'insideBottom', offset: -15 }} />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip 
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border p-2 rounded-md shadow-md">
                                      <p className="font-bold">{data.name}</p>
                                      <p>Planned Duration: {data.planned} weeks</p>
                                      <p>Actual Duration: {data.actual} weeks</p>
                                      <p className="font-semibold">
                                        {data.variance < 0 ? 
                                          `${Math.abs(data.variance)} weeks ahead of schedule` : 
                                          `${data.variance} weeks behind schedule`
                                        }
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend />
                            <ReferenceLine x={0} stroke="#666" />
                            <Bar 
                              dataKey="variance" 
                              name="Schedule Variance" 
                              barSize={20}
                              radius={4}
                              fill={(data) => data.variance < 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(239, 68, 68, 0.8)"}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {timelineView === "milestone" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Project Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Milestone</th>
                              <th className="text-left py-3 px-4 font-medium">Planned Date</th>
                              <th className="text-left py-3 px-4 font-medium">Actual Date</th>
                              <th className="text-left py-3 px-4 font-medium">Status</th>
                              <th className="text-left py-3 px-4 font-medium">Variance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {milestoneData.map((milestone, index) => {
                              // Calculate date variance
                              let variance = null;
                              if (milestone.status === 'completed') {
                                const planned = new Date(milestone.plannedDate);
                                const actual = new Date(milestone.actualDate);
                                const diffTime = actual.getTime() - planned.getTime();
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                variance = diffDays;
                              }
                              
                              return (
                                <tr key={index} className="border-b hover:bg-muted/50">
                                  <td className="py-3 px-4">
                                    <div className="font-medium">{milestone.name}</div>
                                    <div className="text-sm text-muted-foreground">{milestone.description}</div>
                                  </td>
                                  <td className="py-3 px-4">{milestone.plannedDate}</td>
                                  <td className="py-3 px-4">{milestone.actualDate}</td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full inline-block ${
                                        milestone.status === "completed" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                      } ${
                                        milestone.status === "in-progress" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                      } ${
                                        milestone.status === "upcoming" && "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400"
                                      } ${
                                        milestone.status === "delayed" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                      }`}
                                    >
                                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    {variance !== null && (
                                      <span
                                        className={`text-xs font-medium ${
                                          variance <= 0 
                                            ? "text-green-600 dark:text-green-400" 
                                            : "text-red-600 dark:text-red-400"
                                        }`}
                                      >
                                        {variance === 0 
                                          ? "On time" 
                                          : variance < 0 
                                            ? `${Math.abs(variance)} days early` 
                                            : `${variance} days late`
                                        }
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {timelineView === "activities" && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
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
                  </div>
                )}
                
                {timelineView === "financial" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Budget Impact of Timeline Changes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={budgetImpactData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                              formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                            />
                            <Legend />
                            <Bar 
                              dataKey="amount" 
                              name="Budget Impact" 
                              fill={(data) => data.impact === 'positive' ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'}
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Financial Impact Summary</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Total Budget Changes:</span>
                            <span className="font-bold">
                              ${budgetImpactData.reduce((total, item) => {
                                return total + (item.impact === 'positive' ? item.amount : -item.amount);
                              }, 0).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Cost Increases:</span>
                            <span className="text-red-500 font-bold">
                              -${budgetImpactData.filter(item => item.impact === 'negative').reduce((total, item) => total + item.amount, 0).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Cost Savings:</span>
                            <span className="text-green-500 font-bold">
                              +${budgetImpactData.filter(item => item.impact === 'positive').reduce((total, item) => total + item.amount, 0).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Percent of Total Budget:</span>
                            <span className="font-bold">2.4%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Project Name:</span>
                        <span className="font-medium">Downtown High-Rise</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Phase:</span>
                        <span className="font-medium">Structural Framework</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date:</span>
                        <span className="font-medium">Nov 15, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Completion:</span>
                        <span className="font-medium">Jun 30, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Project Manager:</span>
                        <span className="font-medium">Sarah Wilson</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Overall Status:</span>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          On Track
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Project Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Completion</span>
                          <span className="text-sm font-medium">35%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Timeline Progress</span>
                          <span className="text-sm font-medium">40%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Budget Utilization</span>
                          <span className="text-sm font-medium">32%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {timelineData.slice(7, 12).flatMap(item => item.events).map(event => (
                        <div key={event.id} className="p-3 hover:bg-muted/50">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getEventIcon(event.type)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{event.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 mb-1">{event.description}</p>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{event.project}</span>
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Owner's Action Items</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="p-3 hover:bg-muted/50">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Review Material Substitution Request</p>
                            <p className="text-xs text-muted-foreground mt-0.5 mb-1">Architect proposed alternative facade material for cost savings</p>
                            <p className="text-xs text-red-500">Due in 2 days</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 hover:bg-muted/50">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <FileText className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Sign Change Order #12</p>
                            <p className="text-xs text-muted-foreground mt-0.5 mb-1">Approve $45,000 change for additional HVAC capacity</p>
                            <p className="text-xs text-red-500">Due in 5 days</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 hover:bg-muted/50">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            <Calendar className="h-5 w-5 text-indigo-500" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Quarterly Review Meeting</p>
                            <p className="text-xs text-muted-foreground mt-0.5 mb-1">Financial and progress review with project team</p>
                            <p className="text-xs text-amber-500">Scheduled in 1 week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <TabsContent value="riverside" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Timeline view for Riverside Complex project will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="corporate" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Timeline view for Corporate Offices project will be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Combined timeline view for all projects will be displayed here.
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
