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
  ArrowUpRight,
  Building,
  Construction,
  Landmark,
  CheckCircle
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
import { PropertyDetails } from '@/components/dashboard/PropertyDetails';

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
    status: 'completed' as const,
    financial: {
      amount: 0,
      type: 'neutral' as const,
    }
  },
  {
    id: '2',
    title: 'Design Approval',
    date: 'April 10, 2024',
    description: 'Final design approval by stakeholders',
    status: 'completed' as const,
    financial: {
      amount: 25000,
      type: 'under' as const,
    }
  },
  {
    id: '3',
    title: 'Foundation Work',
    date: 'Today',
    description: 'Laying building foundation',
    status: 'in-progress' as const,
    impact: 'high' as const
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

const performanceData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 55 },
  { name: 'Apr', value: 57 },
  { name: 'May', value: 62 },
  { name: 'Jun', value: 68 },
  { name: 'Jul', value: 72 },
];

const notifications = [
  { id: 1, title: 'Budget Approval', message: 'East Tower budget increase approved', time: '2 hours ago', read: false },
  { id: 2, title: 'Permit Issued', message: 'Building permit for North Bridge received', time: '5 hours ago', read: false },
  { id: 3, title: 'Inspection Scheduled', message: 'Foundation inspection set for Westside Park', time: 'Yesterday', read: true },
  { id: 4, title: 'Document Updated', message: 'Project Blueprint.pdf has been updated', time: '2 days ago', read: true },
];

const propertyData = {
  propertyName: "Downtown High-Rise",
  propertyType: "Mixed-Use",
  location: "San Francisco, CA",
  squareFootage: 250000,
  floors: 23,
  constructionStartDate: "November 15, 2023",
  estimatedCompletionDate: "June 30, 2025",
  currentPhase: "Structural Framework",
  completionPercentage: 35,
  keyContacts: [
    { role: "Project Manager", name: "Sarah Wilson", contact: "sarah.wilson@example.com" },
    { role: "General Contractor", name: "Alex Rodriguez", contact: "alex.rodriguez@example.com" },
    { role: "Architect", name: "Lisa Chen", contact: "lisa.chen@example.com" },
    { role: "Permit Coordinator", name: "Robert Smith", contact: "robert.smith@example.com" }
  ],
  permits: [
    { type: "Building Permit", status: "approved" as const, date: "2023-10-15" },
    { type: "Electrical Permit", status: "approved" as const, date: "2023-10-20" },
    { type: "Plumbing Permit", status: "pending" as const, date: "2023-11-05" }
  ],
  inspections: [
    { type: "Foundation", status: "passed" as const, date: "2023-12-10", notes: "Passed with minor recommendations" },
    { type: "Framing", status: "scheduled" as const, date: "2024-01-15" },
    { type: "Electrical Rough-In", status: "not-scheduled" as const }
  ]
};

const financialData = {
  projectName: "Downtown High-Rise",
  totalBudget: 42500000,
  spending: [
    { category: "Land Acquisition", amount: 12000000, color: "#4c1d95", status: "normal" as const },
    { category: "Site Preparation", amount: 2500000, color: "#2563eb", status: "under" as const, variance: 150000 },
    { category: "Foundation", amount: 3800000, color: "#0891b2", status: "normal" as const },
    { category: "Structural Frame", amount: 4200000, color: "#059669", status: "over" as const, variance: 250000 },
    { category: "Exterior", amount: 1500000, color: "#65a30d", status: "normal" as const },
    { category: "Mechanical/Electrical", amount: 800000, color: "#a5b4fc", status: "normal" as const }
  ],
  changeOrders: [
    { id: "CO-001", description: "Foundation Redesign", amount: 120000, status: "approved" as const, date: "Jan 18, 2024" },
    { id: "CO-002", description: "Material Substitution Savings", amount: -45000, status: "approved" as const, date: "Feb 02, 2024" },
    { id: "CO-003", description: "Additional HVAC Capacity", amount: 85000, status: "pending" as const, date: "Mar 25, 2024" },
    { id: "CO-004", description: "Design Change: Interior Layout", amount: 35000, status: "rejected" as const, date: "Apr 05, 2024" }
  ]
};

const budgetCategories = [
  { category: "Materials", amount: 2250000, color: "#10B981", status: "normal" as const },
  { category: "Labor", amount: 1850000, color: "#3B82F6", status: "under" as const, variance: -50000 },
  { category: "Equipment", amount: 920000, color: "#8B5CF6", status: "over" as const, variance: 75000 },
  { category: "Permits", amount: 320000, color: "#F97316", status: "normal" as const }
];

const recentTransactions = [
  { id: "INV-001", description: "Steel Delivery - Downtown Project", amount: 125000, status: "approved" as const, date: "2023-12-15" },
  { id: "INV-002", description: "Concrete Work - Phase 1", amount: 85000, status: "pending" as const, date: "2023-12-18" },
  { id: "INV-003", description: "Electrical Contractor Payment", amount: 42500, status: "approved" as const, date: "2023-12-20" },
  { id: "INV-004", description: "Architect Fees - Design Revisions", amount: 28500, status: "rejected" as const, date: "2023-12-22" }
];

const Index = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChart, setActiveChart] = useState(true);

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
            <AIAssistant />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Owner Dashboard</h1>
                <p className="text-gray-400">Real-time overview of your properties and projects</p>
              </div>
              <div className="mt-3 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                  All projects active
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatCard 
                title="Active Properties" 
                value="8" 
                icon={Building} 
                trend="up" 
                trendValue="2 new acquisitions" 
              />
              <StatCard 
                title="Construction Value" 
                value="$86.4M" 
                description="total investment" 
                icon={DollarSign}
                trend="up" 
                trendValue="12% YOY increase" 
              />
              <StatCard 
                title="Total Square Footage" 
                value="1.2M" 
                icon={Landmark}
                trend="up" 
                trendValue="215,000 sq ft in development" 
              />
              <StatCard 
                title="Critical Issues" 
                value="3" 
                icon={AlertTriangle}
                trend="down" 
                trendValue="5 resolved this month" 
              />
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Featured Property Details</h2>
              <PropertyDetails 
                propertyName={propertyData.propertyName}
                propertyType={propertyData.propertyType}
                location={propertyData.location}
                squareFootage={propertyData.squareFootage}
                floors={propertyData.floors}
                constructionStartDate={propertyData.constructionStartDate}
                estimatedCompletionDate={propertyData.estimatedCompletionDate}
                currentPhase={propertyData.currentPhase}
                completionPercentage={propertyData.completionPercentage}
                keyContacts={propertyData.keyContacts}
                permits={propertyData.permits}
                inspections={propertyData.inspections}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 space-y-6">
                <FinancialTracking 
                  projectName={financialData.projectName}
                  totalBudget={financialData.totalBudget}
                  spending={financialData.spending}
                  changeOrders={financialData.changeOrders}
                />
                
                <Card className="bg-gray-800 border-gray-700 shadow-lg overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-construction-400" />
                        Construction Progress Trend
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
              
              <div className="space-y-6">
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
                
                <Card className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">Owner Action Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-750 rounded-lg border border-amber-800/30">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white text-sm">Budget Approval Required</h4>
                            <p className="text-xs text-gray-400 mt-1">Change order for East Tower HVAC upgrade needs approval.</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-amber-400">Due in 3 days</span>
                              <Button size="sm" variant="destructive" className="h-7 text-xs">Review</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-750 rounded-lg border border-blue-800/30">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white text-sm">Document Review</h4>
                            <p className="text-xs text-gray-400 mt-1">Updated construction contracts for Westside Park project.</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-blue-400">5 documents</span>
                              <Button size="sm" variant="secondary" className="h-7 text-xs">View</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-750 rounded-lg border border-green-800/30">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white text-sm">Schedule Site Visit</h4>
                            <p className="text-xs text-gray-400 mt-1">North Bridge project reached structural completion milestone.</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-green-400">Milestone achieved</span>
                              <Button size="sm" variant="outline" className="h-7 text-xs">Schedule</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-750 rounded-lg border border-construction-800/30">
                        <div className="flex items-start gap-3">
                          <Construction className="h-5 w-5 text-construction-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white text-sm">Design Decision Needed</h4>
                            <p className="text-xs text-gray-400 mt-1">Facade material selection for East Tower project.</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-construction-400">3 options available</span>
                              <Button size="sm" variant="outline" className="h-7 text-xs">Review Options</Button>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Index;
