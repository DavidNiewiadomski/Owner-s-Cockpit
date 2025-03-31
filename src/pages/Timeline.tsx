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
  Calendar as CalendarIcon,
  ArrowDownUp,
  BarChart4,
  Info
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, CartesianGrid } from 'recharts';

// Sample timeline data
const timelineData = [
  {
    date: new Date(),
    formattedDate: 'Today',
    events: [
      {
        id: '1',
        title: 'Concrete pour completed',
        time: '9:30 AM',
        type: 'construction',
        project: 'Downtown High-Rise',
        description: 'Foundation concrete pour completed on schedule',
        user: {
          name: 'John Contractor',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
        }
      },
      {
        id: '2',
        title: 'Material delivery delayed',
        time: '11:45 AM',
        type: 'delivery',
        project: 'Riverside Complex',
        description: 'Steel beam delivery delayed by 2 days due to transportation issues',
        user: {
          name: 'Sarah Logistics',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e'
        }
      },
      {
        id: '3',
        title: 'Inspection scheduled',
        time: '2:15 PM',
        type: 'inspection',
        project: 'Corporate Offices',
        description: 'Electrical inspection scheduled for tomorrow at 10:00 AM',
        user: {
          name: 'Mike Inspector',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f'
        }
      }
    ]
  },
  {
    date: new Date(Date.now() - 86400000),
    formattedDate: 'Yesterday',
    events: [
      {
        id: '4',
        title: 'Design review meeting',
        time: '10:00 AM',
        type: 'meeting',
        project: 'Downtown High-Rise',
        description: 'Final design review with architects and engineers',
        users: [
          {
            name: 'Jennifer Architect',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g'
          },
          {
            name: 'David Engineer',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h'
          },
          {
            name: 'Lisa Project Manager',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i'
          },
          {
            name: 'Robert Owner',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704j'
          }
        ]
      },
      {
        id: '5',
        title: 'Budget adjustment approved',
        time: '3:30 PM',
        type: 'document',
        project: 'Riverside Complex',
        description: 'Additional $250,000 approved for foundation reinforcement',
        user: {
          name: 'Robert Owner',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704j'
        }
      }
    ]
  },
  {
    date: new Date(Date.now() - 172800000),
    formattedDate: '2 days ago',
    events: [
      {
        id: '6',
        title: 'Safety incident reported',
        time: '8:45 AM',
        type: 'incident',
        project: 'Corporate Offices',
        description: 'Minor injury reported, worker treated and returned to work',
        user: {
          name: 'Tom Safety',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704k'
        }
      },
      {
        id: '7',
        title: 'Weather delay',
        time: '12:00 PM',
        type: 'delay',
        project: 'Downtown High-Rise',
        description: 'Work suspended due to high winds, expected to resume tomorrow',
        user: {
          name: 'Lisa Project Manager',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i'
        }
      }
    ]
  }
];

// Function to get icon based on event type
const getEventIcon = (type: string) => {
  switch (type) {
    case 'construction':
      return <HardHat className="h-4 w-4" />;
    case 'delivery':
      return <Truck className="h-4 w-4" />;
    case 'inspection':
      return <CheckCircle className="h-4 w-4" />;
    case 'meeting':
      return <Calendar className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    case 'incident':
      return <AlertTriangle className="h-4 w-4" />;
    case 'delay':
      return <Clock className="h-4 w-4" />;
    default:
      return <Building className="h-4 w-4" />;
  }
};

// Function to get badge color based on event type
const getEventBadgeClass = (type: string) => {
  switch (type) {
    case 'construction':
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
    case 'delivery':
      return 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400';
    case 'inspection':
      return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
    case 'meeting':
      return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
    case 'document':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    case 'incident':
      return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
    case 'delay':
      return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
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

const Timeline = () => {
  const [activeProject, setActiveProject] = useState("downtown");
  const [timelineView, setTimelineView] = useState("gantt");
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader onSearch={() => {}} />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Project Timeline</h1>
            <p className="text-muted-foreground">Monitor schedules, milestones, and progress across your projects</p>
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
                <Button 
                  variant={timelineView === "gantt" ? "default" : "outline"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("gantt")}
                >
                  <BarChart4 className="h-4 w-4" />
                  <span>Gantt</span>
                </Button>
                <Button 
                  variant={timelineView === "delays" ? "default" : "outline"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("delays")}
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Delays</span>
                </Button>
                <Button 
                  variant={timelineView === "milestone" ? "default" : "outline"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("milestone")}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Milestones</span>
                </Button>
                <Button 
                  variant={timelineView === "activities" ? "default" : "outline"} 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("activities")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Activities</span>
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                {timelineView === "gantt" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Gantt Chart</span>
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
                            <XAxis type="number" domain={[0, 56]} tickCount={15} />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip 
                              formatter={(value: any, name: string) => {
                                if (name === 'actualStart' || name === 'actualEnd') return null;
                                if (name === 'plannedStart' || name === 'plannedEnd') return null;
                                return value;
                              }}
                              labelFormatter={(label) => label}
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
                            <Legend />
                            {/* Today marker */}
                            <ReferenceLine x={18} stroke="red" label={{ value: 'Today', position: 'top', fill: 'red' }} />
                            
                            {/* Planned schedule bars */}
                            <Bar 
                              dataKey={(data) => data.plannedEnd - data.plannedStart} 
                              stackId="a" 
                              fill="rgba(59, 130, 246, 0.5)" 
                              name="Planned"
                              barSize={20}
                              radius={[0, 4, 4, 0]}
                              background={{ fill: "rgba(0, 0, 0, 0.05)" }}
                            >
                              {ganttData.map((entry, index) => (
                                <defs key={`plannedGradient-${index}`}>
                                  <linearGradient id={`plannedGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
                                  </linearGradient>
                                </defs>
                              ))}
                            </Bar>
                            
                            {/* Actual schedule bars */}
                            <Bar 
                              dataKey={(data) => data.actualEnd !== null && data.actualStart !== null ? data.actualEnd - data.actualStart : 0} 
                              stackId="b" 
                              fill="rgba(16, 185, 129, 0.8)" 
                              name="Actual"
                              barSize={20}
                              radius={[0, 4, 4, 0]} 
                              background={{ fill: "transparent" }}
                            >
                              {ganttData.map((entry, index) => (
                                <defs key={`actualGradient-${index}`}>
                                  <linearGradient id={`actualGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0.8)" />
                                  </linearGradient>
                                </defs>
                              ))}
                            </Bar>
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
                            data={delayMetricsData}
                            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" domain={[-5, 5]} tickCount={11} />
                            <YAxis dataKey="name" type="category" width={100} />
                            <Tooltip
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border p-2 rounded-md shadow-md">
                                      <p className="font-bold">{data.name}</p>
                                      <p>Planned Duration: {data.planned} weeks</p>
                                      {data.actual !== null ? (
                                        <p>Actual Duration: {data.actual} weeks</p>
                                      ) : (
                                        <p>Not started</p>
                                      )}
                                      {data.variance !== null && (
                                        <p className={data.variance < 0 ? "text-green-500" : "text-red-500"}>
                                          {data.variance < 0 ? `${Math.abs(data.variance)} weeks ahead` : `${data.variance} weeks behind`}
                                        </p>
                                      )}
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
                              fill={(data) => data.variance < 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(239, 68, 68, 0.8)"}
                              radius={4}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {timelineView === "milestone" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {milestoneData.map((milestone, index) => (
                          <div key={index} className="flex items-start">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                              milestone.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                              milestone.status === 'delayed' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                              milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                              'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {milestone.status === 'completed' ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : milestone.status === 'delayed' ? (
                                <AlertTriangle className="h-5 w-5" />
                              ) : milestone.status === 'in-progress' ? (
                                <Clock className="h-5 w-5" />
                              ) : (
                                <Calendar className="h-5 w-5" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{milestone.name}</h3>
                                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                </div>
                                <Badge className={`${
                                  milestone.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                  milestone.status === 'delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                  milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                  {milestone.status === 'completed' ? 'Completed' :
                                   milestone.status === 'delayed' ? 'Delayed' :
                                   milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Planned Date:</span>{' '}
                                  <span>{milestone.plannedDate}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Actual Date:</span>{' '}
                                  <span>{milestone.actualDate}</span>
                                </div>
                              </div>
                              
                              {index < milestoneData.length - 1 && (
                                <Separator className="my-4" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {timelineView === "activities" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {timelineData.slice(0, 5).flatMap(day => 
                          day.events.map(event => (
                            <div key={event.id} className="flex items-start">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${getEventBadgeClass(event.type)}`}>
                                {getEventIcon(event.type)}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{event.title}</h3>
                                    {event.description && (
                                      <p className="text-sm text-muted-foreground">{event.description}</p>
                                    )}
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-sm text-muted-foreground mr-2">{day.formattedDate}</span>
                                    <Badge variant="outline">{event.time}</Badge>
                                  </div>
                                </div>
                                
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-medium">{event.project}</span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    {event.users ? (
                                      <div className="flex -space-x-2">
                                        {event.users.slice(0, 3).map((user, i) => (
                                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="text-xs">
                                              {user.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                          </Avatar>
                                        ))}
                                        {event.users.length > 3 && (
                                          <Avatar className="h-6 w-6 border-2 border-background">
                                            <AvatarFallback className="text-xs bg-muted">
                                              +{event.users.length - 3}
                                            </AvatarFallback>
                                          </Avatar>
                                        )}
                                      </div>
                                    ) : event.user ? (
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={event.user.avatar} alt={event.user.name} />
                                        <AvatarFallback className="text-xs">
                                          {event.user.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                    ) : null}
                                  </div>
                                </div>
                                
                                <Separator className="my-4" />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Start Date</span>
                        <span className="text-sm">Nov 15, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Completion</span>
                        <span className="text-sm">Jun 30, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="text-sm">19 months</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Schedule Performance</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="text-2xl font-bold text-green-500">-2</div>
                          <div className="text-xs text-muted-foreground mt-1">Weeks Ahead</div>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="text-2xl font-bold">89%</div>
                          <div className="text-xs text-muted-foreground mt-1">On-Time Tasks</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium mb-2">Critical Milestones</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-sm">Exterior Closure</span>
                          </div>
                          <span className="text-xs">Apr 30, 2024</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                            <span className="text-sm">Roofing Complete</span>
                          </div>
                          <span className="text-xs">May 30, 2024</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                            <span className="text-sm">Interior Rough-In</span>
                          </div>
                          <span className="text-xs">Jul 15, 2024</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted rounded-lg p-3">
                          <div className="text-2xl font-bold text-green-500">$280K</div>
                          <div className="text-xs text-muted-foreground mt-1">Under Budget</div>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <div className="text-2xl font-bold">4.2%</div>
                          <div className="text-xs text-muted-foreground mt-1">Cost Variance</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-2">Delay Cost Impact</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Permit Delays</span>
                            <span className="text-sm text-red-500">+$45,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Accelerated Structural</span>
                            <span className="text-sm text-green-500">-$85,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Material Cost Savings</span>
                            <span className="text-sm text-green-500">-$120,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Button variant="outline" className="w-full">
                          <Info className="h-4 w-4 mr-2" />
                          <span>Detailed Financial Report</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Timeline;
