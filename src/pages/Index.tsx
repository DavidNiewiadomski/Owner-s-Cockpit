
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Users, 
  AlertTriangle,
  TrendingUp,
  Bell,
  ArrowUpRight
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { DocumentList } from '@/components/dashboard/DocumentList';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const projects = [
  {
    id: '1',
    title: 'East Tower Construction',
    description: 'Multi-story residential building with 200 units in downtown area.',
    progress: 75,
    status: 'on-track' as const,
    dueDate: 'Sep 30, 2024',
    teamMembers: [
      { name: 'Alice Smith' },
      { name: 'Bob Johnson' },
      { name: 'Carol Williams' },
      { name: 'David Brown' },
    ]
  },
  {
    id: '2',
    title: 'Westside Park Development',
    description: 'Public park with recreational facilities and gardens.',
    progress: 45,
    status: 'at-risk' as const,
    dueDate: 'Nov 15, 2024',
    teamMembers: [
      { name: 'Eve Taylor' },
      { name: 'Frank Miller' },
      { name: 'Grace Davis' },
    ]
  },
  {
    id: '3',
    title: 'North Bridge Repair',
    description: 'Structural repairs and renovation of existing bridge.',
    progress: 30,
    status: 'delayed' as const,
    dueDate: 'Dec 10, 2024',
    teamMembers: [
      { name: 'Henry Wilson' },
      { name: 'Irene Martin' },
    ]
  },
];

const timelineEvents = [
  {
    id: '1',
    title: 'Project Kickoff',
    date: 'March 15, 2024',
    description: 'Initial project meeting and scope definition',
    status: 'completed' as const
  },
  {
    id: '2',
    title: 'Design Approval',
    date: 'April 10, 2024',
    description: 'Final design approval by stakeholders',
    status: 'completed' as const
  },
  {
    id: '3',
    title: 'Foundation Work',
    date: 'Today',
    description: 'Laying building foundation',
    status: 'in-progress' as const
  },
  {
    id: '4',
    title: 'Structural Framework',
    date: 'August 20, 2024',
    description: 'Building primary structural components',
    status: 'upcoming' as const
  },
  {
    id: '5',
    title: 'Project Completion',
    date: 'December 5, 2024',
    status: 'upcoming' as const
  },
];

const documents = [
  {
    id: '1',
    name: 'Project Blueprint.pdf',
    type: 'pdf' as const,
    size: '8.5 MB',
    updatedAt: '2 days ago',
    project: 'East Tower'
  },
  {
    id: '2',
    name: 'Site Survey Images.jpg',
    type: 'image' as const,
    size: '12.3 MB',
    updatedAt: '3 days ago',
    project: 'Westside Park'
  },
  {
    id: '3',
    name: 'Budget Forecast.xlsx',
    type: 'spreadsheet' as const,
    size: '1.2 MB',
    updatedAt: '1 week ago',
    project: 'North Bridge'
  },
  {
    id: '4',
    name: 'Contractor Agreement.docx',
    type: 'text' as const,
    size: '567 KB',
    updatedAt: '2 weeks ago',
    project: 'East Tower'
  },
];

// New chart data
const performanceData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 57 },
  { name: 'May', value: 62 },
  { name: 'Jun', value: 68 },
  { name: 'Jul', value: 72 },
];

// Notifications
const notifications = [
  { id: 1, title: 'Budget Approval', message: 'East Tower budget increase approved', time: '2 hours ago', read: false },
  { id: 2, title: 'Permit Issued', message: 'Building permit for North Bridge received', time: '5 hours ago', read: false },
  { id: 3, title: 'Inspection Scheduled', message: 'Foundation inspection set for Westside Park', time: 'Yesterday', read: true },
  { id: 4, title: 'Document Updated', message: 'Project Blueprint.pdf has been updated', time: '2 days ago', read: true },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChart, setActiveChart] = useState(true);

  // Animation effect for the chart
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChart(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filteredDocuments = searchTerm 
    ? documents.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.project.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents;

  const handleDocumentAction = (action: string, docId: string) => {
    const docName = documents.find(d => d.id === docId)?.name || '';
    toast({
      title: `${action} ${docName}`,
      description: `Document ${action.toLowerCase()} action triggered`,
      duration: 3000,
    });
  };

  const gradientOffset = () => {
    const max = Math.max(...performanceData.map(i => i.value));
    const min = Math.min(...performanceData.map(i => i.value));
    if (max <= 0) return 0;
    if (min >= 0) return 1;
    return 1 - (max / (max - min));
  };

  const off = gradientOffset();

  return (
    <div className="flex h-screen bg-gray-900 dark:bg-gray-900">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Assistant Section */}
            <AIAssistant />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
                <p className="text-gray-400">Welcome back to your project overview</p>
              </div>
              <div className="mt-3 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                  All systems operational
                </span>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                title="Active Projects" 
                value="8" 
                icon={Briefcase} 
                trend="up" 
                trendValue="2 new this month" 
              />
              <StatCard 
                title="Budget Utilization" 
                value="$4.2M" 
                description="of $6.8M total" 
                icon={DollarSign}
                trend="up" 
                trendValue="12% since last month" 
              />
              <StatCard 
                title="Team Members" 
                value="32" 
                icon={Users}
                trend="up" 
                trendValue="4 new this month" 
              />
              <StatCard 
                title="Open Issues" 
                value="12" 
                icon={AlertTriangle}
                trend="down" 
                trendValue="3 fewer than last week" 
              />
            </div>
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Projects Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Performance Chart */}
                <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-construction-400" />
                        Overall Performance
                      </CardTitle>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span className="text-xs">Details</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={performanceData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fill: '#aaa', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <YAxis 
                            tick={{ fill: '#aaa', fontSize: 12 }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                          />
                          <defs>
                            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#38bdf8" 
                            fill="url(#splitColor)" 
                            strokeWidth={3}
                            className={`transition-all duration-1000 ${activeChart ? 'opacity-100' : 'opacity-80'}`}
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <h2 className="text-xl font-semibold text-gray-100">Active Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
                
                <DocumentList 
                  documents={filteredDocuments} 
                  className="mt-6" 
                  onView={(id) => handleDocumentAction('Viewed', id)}
                  onDownload={(id) => handleDocumentAction('Downloaded', id)}
                />
              </div>
              
              {/* Sidebar Column */}
              <div className="space-y-6">
                {/* Notifications */}
                <Card className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-white flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-construction-400" />
                        Notifications
                      </CardTitle>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
                        <span className="text-xs">View All</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y divide-gray-700">
                      {notifications.map((notification) => (
                        <li key={notification.id} className={`p-4 ${!notification.read ? 'bg-gray-750' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-2 rounded-full ${!notification.read ? 'bg-construction-500' : 'bg-transparent'}`} />
                            <div>
                              <h4 className="text-sm font-medium text-gray-100">{notification.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                              <span className="text-xs text-gray-500 mt-1 block">{notification.time}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <h2 className="text-xl font-semibold text-gray-100">Project Timeline</h2>
                <TimelineCard events={timelineEvents} />
                
                {/* Quick Actions */}
                <Card className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button className="w-full justify-start bg-construction-600 hover:bg-construction-700 text-white">
                        <FileText className="h-4 w-4 mr-2" />
                        Create New Document
                      </Button>
                      <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Issue
                      </Button>
                      <Button className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-white">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
