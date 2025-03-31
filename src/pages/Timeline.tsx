import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { RealityCaptureViewer } from '@/components/dashboard/RealityCaptureViewer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useProject } from '@/contexts/ProjectContext';
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
  Info,
  Camera,
  Globe,
  Scan
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { ProgressChart } from '@/components/dashboard/ProgressChart';

interface RealityCaptureEvent {
  name: string;
  date: string;
  url: string;
  location: string;
}

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
        realityCapture: {
          available: true,
          date: 'Today, 9:30 AM',
          url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg'
        },
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

const milestoneData = [
  { 
    name: 'Project Kickoff', 
    plannedDate: 'Nov 15, 2023', 
    actualDate: 'Nov 15, 2023', 
    status: 'completed' as const,
    description: 'Initial meeting with all stakeholders to define project scope',
    realityCapture: {
      available: false
    } 
  },
  { 
    name: 'Permits Approved', 
    plannedDate: 'Dec 05, 2023', 
    actualDate: 'Dec 20, 2023', 
    status: 'delayed' as const,
    description: 'Building permits approved by local authorities',
    realityCapture: {
      available: false
    } 
  },
  { 
    name: 'Foundation Complete', 
    plannedDate: 'Jan 30, 2024', 
    actualDate: 'Jan 25, 2024', 
    status: 'completed' as const,
    description: 'Foundation work completed and inspected',
    realityCapture: {
      available: true,
      date: 'Jan 25, 2024',
      url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-construction-site-nav_0.jpg'
    } 
  },
  { 
    name: 'Structural Framework', 
    plannedDate: 'Mar 15, 2024', 
    actualDate: 'Mar 10, 2024', 
    status: 'completed' as const,
    description: 'Main building structure completed',
    realityCapture: {
      available: true,
      date: 'Mar 10, 2024',
      url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-11/scan-gallery/scn-apartments-nav.jpg'
    } 
  },
  { 
    name: 'Exterior Closure', 
    plannedDate: 'Apr 30, 2024', 
    actualDate: 'In Progress', 
    status: 'in-progress' as const,
    description: 'Building envelope and exterior walls completed',
    realityCapture: {
      available: true,
      date: 'Apr 15, 2024',
      url: 'https://matterport.com/sites/default/files/styles/atf_lightbox/public/2021-08/construction%20scan%20nav.jpg'
    } 
  },
  { 
    name: 'Roofing Complete', 
    plannedDate: 'May 30, 2024', 
    actualDate: 'Not Started', 
    status: 'upcoming' as const,
    description: 'Roof installation and weatherproofing' 
  },
  { 
    name: 'Interior Rough-In', 
    plannedDate: 'Jul 15, 2024', 
    actualDate: 'Not Started', 
    status: 'upcoming' as const,
    description: 'Electrical, plumbing, and HVAC rough-in work' 
  }
];

const getVarianceColor = (data: any) => {
  if (data.variance === null) return '#9CA3AF';
  return data.variance < 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';
};

const timelineInsights = [
  {
    title: 'Critical Path Impact',
    content: 'Roofing delay of 1 week may impact Interior Rough-In schedule. Consider resource reallocation.',
    type: 'warning' as const
  },
  {
    title: 'Completion Forecast',
    content: 'Project is currently tracking to complete 2 weeks early. Potential for early occupancy.',
    type: 'success' as const
  },
  {
    title: 'Investment Impact',
    content: 'Early completion could provide additional rental income of $125,000 in Q3 2024.',
    type: 'info' as const
  }
];

const CustomBar = (props: any) => {
  const { dataKey, ...rest } = props;
  return <Bar {...rest} dataKey={dataKey} />;
};

const renderColoredBar = (entry: any) => {
  return <rect fill={getVarianceColor(entry)} />;
};

const Timeline = () => {
  const [activeProject, setActiveProject] = useState("downtown");
  const [timelineView, setTimelineView] = useState("gantt");
  const [realityCapture, setRealityCapture] = useState<RealityCaptureEvent | null>(null);
  const { selectedProject } = useProject();
  
  const getPlannedDuration = (item: any) => {
    return item.plannedEnd - item.plannedStart;
  };
  
  const getActualDuration = (item: any) => {
    return item.actualEnd !== null ? item.actualEnd - item.actualStart : (item.actualStart !== null ? 1 : 0);
  };

  const handleViewRealityCapture = (milestone: any) => {
    if (milestone.realityCapture?.available) {
      setRealityCapture({
        name: milestone.name,
        date: milestone.realityCapture.date,
        url: milestone.realityCapture.url,
        location: `${activeProject === 'downtown' ? 'Downtown High-Rise' : 
                    activeProject === 'riverside' ? 'Riverside Complex' : 
                    'Corporate Offices'} - ${milestone.name}`
      });
    }
  };

  const projectSpecificInsights = [
    `Schedule variance is currently 2.5 days ahead for ${selectedProject?.title || 'this project'}`,
    `Critical path activities are 92% on schedule for ${selectedProject?.title || 'this project'}`,
    `Weather forecast shows potential impact to exterior work next week for ${selectedProject?.title || 'this project'}`,
    `Resource allocation is optimized at 87% efficiency for ${selectedProject?.title || 'this project'}`
  ];
  
  const getTransformedGanttData = () => {
    return ganttData.map(item => {
      const plannedDuration = item.plannedEnd - item.plannedStart;
      const actualDuration = item.actualEnd !== null ? 
        item.actualEnd - item.actualStart : 
        (item.actualStart !== null ? 1 : 0);
      
      return {
        ...item,
        planned_width: plannedDuration,
        planned_start: item.plannedStart,
        actual_width: actualDuration,
        actual_start: item.actualStart,
        progress_width: item.completion > 0 ? 
          (plannedDuration * (item.completion / 100)) : 0,
        progress_start: item.plannedStart
      };
    });
  };
  
  const renderPlannedBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = ganttData[index];
    if (!item) return null;
    
    const plannedWidth = (item.plannedEnd - item.plannedStart) * (width / 56);
    const plannedX = item.plannedStart * (width / 56);
    
    return (
      <rect
        x={plannedX}
        y={y + height * 0.25}
        width={plannedWidth}
        height={height * 0.5}
        fill="#3B82F6"
        stroke="#60A5FA"
        strokeWidth={1}
        rx={4}
        ry={4}
      />
    );
  };
  
  const renderActualBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = ganttData[index];
    if (!item || item.actualStart === null) return null;
    
    const actualWidth = item.actualEnd !== null 
      ? (item.actualEnd - item.actualStart) * (width / 56)
      : 1 * (width / 56);
    const actualX = item.actualStart * (width / 56);
    
    return (
      <rect
        x={actualX}
        y={y + height * 0.25}
        width={actualWidth}
        height={height * 0.5}
        fill="#10B981"
        stroke="#34D399"
        strokeWidth={1}
        rx={4}
        ry={4}
      />
    );
  };
  
  const renderProgressBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = ganttData[index];
    if (!item || item.completion <= 0) return null;
    
    const plannedDuration = item.plannedEnd - item.plannedStart;
    const progressWidth = (plannedDuration * (item.completion / 100)) * (width / 56);
    const progressX = item.plannedStart * (width / 56);
    
    return (
      <rect
        x={progressX}
        y={y + height * 0.4}
        width={progressWidth}
        height={height * 0.2}
        fill="#D946EF"
        stroke="#C4B5FD"
        strokeWidth={1}
        rx={4}
        ry={4}
      />
    );
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader onSearch={() => {}} />
        
        <main className="container mx-auto py-6 px-4 md:px-6">
          <CollapsibleAIAssistant 
            projectName={selectedProject?.title || 'your project'} 
            insights={projectSpecificInsights}
            initialInsights={timelineInsights}
          />

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
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("gantt")} 
                  variant={timelineView === "gantt" ? "default" : "outline"}
                >
                  <BarChart4 className="h-4 w-4" />
                  <span>Gantt</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("delays")} 
                  variant={timelineView === "delays" ? "default" : "outline"}
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span>Delays</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("milestone")} 
                  variant={timelineView === "milestone" ? "default" : "outline"}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Milestones</span>
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => setTimelineView("activities")} 
                  variant={timelineView === "activities" ? "default" : "outline"}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Activities</span>
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                {realityCapture ? (
                  <RealityCaptureViewer
                    captureUrl={realityCapture.url}
                    captureDate={realityCapture.date}
                    projectName={activeProject === 'downtown' ? 'Downtown High-Rise' : 
                                activeProject === 'riverside' ? 'Riverside Complex' : 
                                'Corporate Offices'}
                    location={realityCapture.location}
                    onClose={() => setRealityCapture(null)}
                    className="mb-6"
                  />
                ) : null}
                
                {timelineView === "gantt" && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center text-white">
                        <span>Gantt Chart</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-900/40 text-blue-400 border-blue-500">
                            Planned
                          </Badge>
                          <Badge variant="outline" className="bg-green-900/40 text-green-400 border-green-500">
                            Actual
                          </Badge>
                          <Badge variant="outline" className="bg-purple-900/40 text-purple-400 border-purple-500">
                            % Complete
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
                            barSize={20}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.2)" />
                            <XAxis 
                              type="number" 
                              domain={[0, 56]} 
                              tickCount={15} 
                              tick={{ fill: '#ffffff' }}
                              axisLine={{ stroke: 'rgba(255,255,255,0.5)' }}
                            />
                            <YAxis 
                              dataKey="name" 
                              type="category" 
                              width={100} 
                              tick={{ fill: '#ffffff' }}
                              axisLine={{ stroke: 'rgba(255,255,255,0.5)' }}
                            />
                            <Tooltip 
                              formatter={(value: any, name: string) => {
                                if (name === 'planned_width') return null;
                                if (name === 'actual_width') return null;
                                if (name === 'progress_width') return null;
                                if (name === 'completion') return `${value}%`;
                                return value;
                              }}
                              labelFormatter={(label) => label}
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-gray-800 border border-gray-600 p-3 rounded-md shadow-md">
                                      <p className="font-bold text-sm mb-1 text-white">{data.name}</p>
                                      <p className="text-sm text-gray-200">Planned: Week {data.plannedStart} - Week {data.plannedEnd}</p>
                                      {data.actualStart !== null && (
                                        <p className="text-sm text-gray-200">Actual: Week {data.actualStart}{data.actualEnd ? ` - Week ${data.actualEnd}` : ' (in progress)'}</p>
                                      )}
                                      <p className="font-semibold text-sm mt-1 text-gray-200">Completion: {data.completion}%</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend 
                              formatter={(value, entry) => (
                                <span style={{ color: '#ffffff' }}>{value}</span>
                              )}
                            />
                            <ReferenceLine 
                              x={18} 
                              stroke="#ef4444" 
                              strokeWidth={2} 
                              label={{ 
                                value: 'Today', 
                                position: 'top', 
                                fill: '#ef4444',
                                fontSize: 12,
                                fontWeight: 'bold' 
                              }} 
                            />
                            
                            <Bar 
                              dataKey="planned_width"
                              name="Planned"
                              fill="#3B82F6"
                              stroke="#60A5FA"
                              strokeWidth={1}
                              shape={renderPlannedBar}
                            />
                            
                            <Bar 
                              dataKey="actual_width"
                              name="Actual"
                              fill="#10B981"
                              stroke="#34D399"
                              strokeWidth={1}
                              shape={renderActualBar}
                            />
                            
                            <Bar
                              dataKey="progress_width"
                              name="Progress"
                              fill="#D946EF"
                              stroke="#C4B5FD"
                              strokeWidth={1}
                              shape={renderProgressBar}
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
                      <div className="h-[600px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={delayMetricsData}
                            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Weeks', angle: -90, position: 'insideLeft', offset: 10 }} />
                            <Tooltip 
                              content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                    <div className="bg-background border p-2 rounded-md shadow-md">
                                      <p className="font-bold">{data.name}</p>
                                      <p>Planned: {data.planned} weeks</p>
                                      <p>Actual: {data.actual !== null ? `${data.actual} weeks` : 'In progress'}</p>
                                      {data.variance !== null && (
                                        <p className={data.variance < 0 ? 'text-green-500' : 'text-red-500'}>
                                          Variance: {data.variance < 0 ? `${Math.abs(data.variance)} weeks ahead` : `${data.variance} weeks behind`}
                                        </p>
                                      )}
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Legend />
                            <ReferenceLine y={0} stroke="#000" />
                            <Bar 
                              dataKey="variance"
                              name="Schedule Variance" 
                              fill="rgba(59, 130, 246, 0.5)"
                              shape={(props) => {
                                const { x, y, width, height, payload } = props;
                                const color = getVarianceColor(payload);
                                return <rect x={x} y={y} width={width} height={height} fill={color} />;
                              }}
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
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="relative">
                          <div className="absolute left-4 top-0 h-full w-px bg-border"></div>
                          <div className="space-y-8">
                            {milestoneData.map((milestone, index) => (
                              <div key={index} className="relative ml-8">
                                <div className={`absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border ${
                                  milestone.status === 'completed' ? 'bg-green-500 border-green-500' :
                                  milestone.status === 'in-progress' ? 'bg-blue-500 border-blue-500' :
                                  milestone.status === 'delayed' ? 'bg-red-500 border-red-500' :
                                  'bg-gray-200 border-gray-400 dark:bg-gray-700 dark:border-gray-600'
                                }`}></div>
                                <div className="flex flex-col sm:flex-row">
                                  <div className="mb-2 sm:mb-0 sm:w-36 font-medium">
                                    {milestone.actualDate !== 'Not Started' ? milestone.actualDate : milestone.plannedDate}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className={`font-semibold ${
                                      milestone.status === 'delayed' ? 'text-red-500' :
                                      milestone.status === 'completed' ? 'text-green-500' :
                                      milestone.status === 'in-progress' ? 'text-blue-500' : ''
                                    }`}>
                                      {milestone.name}
                                      
                                      <Badge className={`ml-2 ${
                                        milestone.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                        milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                        milestone.status === 'delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                        'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-300'
                                      }`}>
                                        {milestone.status === 'completed' ? 'Completed' :
                                         milestone.status === 'in-progress' ? 'In Progress' :
                                         milestone.status === 'delayed' ? 'Delayed' : 'Upcoming'}
                                      </Badge>
                                      
                                      {milestone.realityCapture?.available && (
                                        <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 flex items-center gap-1 cursor-pointer" onClick={() => handleViewRealityCapture(milestone)}>
                                          <Camera className="h-3 w-3" />
                                          <span>Reality Capture</span>
                                        </Badge>
                                      )}
                                    </h4>
                                    <p className="mt-1 text-muted-foreground text-sm">{milestone.description}</p>
                                    
                                    {milestone.actualDate !== milestone.plannedDate && milestone.status !== 'upcoming' && (
                                      <div className="mt-2 text-xs">
                                        <span className="font-medium">Planned: </span>
                                        <span>{milestone.plannedDate}</span>
                                        {milestone.status === 'delayed' && (
                                          <span className="ml-2 text-red-500">
                                            (Delayed)
                                          </span>
                                        )}
                                        {milestone.status === 'completed' && milestone.actualDate !== milestone.plannedDate && (
                                          <span className="ml-2 text-green-500">
                                            (Early completion)
                                          </span>
                                        )}
                                      </div>
                                    )}
                                    
                                    {milestone.realityCapture?.available && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mt-2 h-7 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 flex items-center gap-1"
                                        onClick={() => handleViewRealityCapture(milestone)}
                                      >
                                        <Camera className="h-3.5 w-3.5" />
                                        <span>View Reality Capture</span>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {timelineView === "activities" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent & Upcoming Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground py-12">
                        Detailed activity timeline will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Project Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Status</h4>
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                          On Track with Minor Delays
                        </Badge>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Project Timeline</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                            <p className="font-medium">Nov 15, 2023</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">End Date</p>
                            <p className="font-medium">Jun 30, 2025</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Duration</p>
                            <p className="font-medium">19.5 Months</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Current Phase</p>
                            <p className="font-medium">Exterior Walls</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Completion Status</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Overall Progress</span>
                            <span>35%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                            <div className="bg-construction-500 h-full rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Financial Impact</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Budget</span>
                            <span className="font-medium">$42,500,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Spent to Date</span>
                            <span className="font-medium">$14,875,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Variance</span>
                            <span className="font-medium text-green-500">-$325,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Projected ROI</span>
                            <span className="font-medium">7.2%</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Dates</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                              <span className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
                                <Calendar className="h-3 w-3 text-yellow-800" />
                              </span>
                              <span className="text-muted-foreground">Next Inspection</span>
                            </div>
                            <span>Apr 28, 2024</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                              <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                <Calendar className="h-3 w-3 text-green-800" />
                              </span>
                              <span className="text-muted-foreground">Payment Milestone</span>
                            </div>
                            <span>May 15, 2024</span>
                          </div>
                          <div className="flex justify-between items-start">
                            <div className="flex gap-2">
                              <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                                <Calendar className="h-3 w-3 text-blue-800" />
                              </span>
                              <span className="text-muted-foreground">Phase Completion</span>
                            </div>
                            <span>Jun 12, 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Schedule Risk Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Current Risks</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Roofing material delivery delay (1 week impact)</span>
                          </li>
                          <li className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>Weather forecast may impact exterior work in May</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Investment Impact</h4>
                        <div className="p-3 bg-muted/50 rounded-md">
                          <p className="text-sm">Current schedule tracking projects completion 2 weeks early. This could result in:</p>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex items-center">
                              <ArrowRight className="h-3 w-3 text-green-500 mr-1.5" />
                              <span>$125,000 additional rental income in Q3 2024</span>
                            </li>
                            <li className="flex items-center">
                              <ArrowRight className="h-3 w-3 text-green-500 mr-1.5" />
                              <span>0.3% increase in projected ROI to 7.5%</span>
                            </li>
                            <li className="flex items-center">
                              <ArrowRight className="h-3 w-3 text-green-500 mr-1.5" />
                              <span>Earlier tenant occupancy by July 2025</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">View Full Schedule Analysis</Button>
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
