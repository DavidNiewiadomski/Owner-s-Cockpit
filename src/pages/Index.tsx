
import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Users, 
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { IntegrationCard } from '@/components/dashboard/IntegrationCard';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { DocumentList } from '@/components/dashboard/DocumentList';

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

const integrations = [
  {
    id: '1',
    name: 'Procore',
    logo: 'https://play-lh.googleusercontent.com/UQBJgZn2CXmHUzJ9o6M0nhX-NwxHJJXL80xVq-LkKKlZHmTEYfZRQlkM7Ag5ZrHvgQ',
    description: 'Project management solution for construction.',
    connected: true,
    category: 'Project Management'
  },
  {
    id: '2',
    name: 'BIM 360',
    logo: 'https://yt3.googleusercontent.com/ytc/AGIKgqPUznYGZpK-mTrPdSUyGViJ4_C1gZZMWYS-lSZE=s900-c-k-c0x00ffffff-no-rj',
    description: 'Building Information Modeling platform.',
    connected: true,
    category: 'Design & Modeling'
  },
  {
    id: '3',
    name: 'PlanGrid',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKspQeiAYqXLyGZaEn-jzLg6bKKmEv5mOYJ0sC5g-jQsluR0_F5zDsrRiEnMPU7zJK9UA&usqp=CAU',
    description: 'Construction productivity software.',
    connected: false,
    category: 'Field Management'
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

const Dashboard = () => {
  const { toast } = useToast();

  const handleIntegrationToggle = (name: string) => {
    toast({
      title: `${name} integration ${integrations.find(i => i.name === name)?.connected ? 'disconnected' : 'connected'}`,
      duration: 3000,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back to your project overview</p>
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
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Active Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
                
                <DocumentList documents={documents} className="mt-6" />
              </div>
              
              {/* Sidebar Column */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Project Timeline</h2>
                <TimelineCard events={timelineEvents} />
                
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white mt-6">Integrations</h2>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <IntegrationCard 
                      key={integration.id} 
                      {...integration} 
                      onToggle={() => handleIntegrationToggle(integration.name)} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
