import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SimpleInsightsPanel } from '@/components/dashboard/SimpleInsightsPanel';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, FilterIcon, InfoIcon, PlusIcon, RefreshCw } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';

// Analytics page demo data
const costData = [
  { name: 'Jan', labor: 4000, materials: 2400, equipment: 1800 },
  { name: 'Feb', labor: 4500, materials: 2800, equipment: 1600 },
  { name: 'Mar', labor: 5000, materials: 3200, equipment: 2000 },
  { name: 'Apr', labor: 4800, materials: 3100, equipment: 2200 },
  { name: 'May', labor: 5200, materials: 3400, equipment: 2400 },
  { name: 'Jun', labor: 5500, materials: 3700, equipment: 2600 },
];

const progressData = [
  { name: 'Jan', planned: 20, actual: 18 },
  { name: 'Feb', planned: 40, actual: 35 },
  { name: 'Mar', planned: 60, actual: 52 },
  { name: 'Apr', planned: 75, actual: 68 },
  { name: 'May', planned: 90, actual: 85 },
  { name: 'Jun', planned: 100, actual: 95 },
];

const resourceUtilizationData = [
  { name: 'Excavators', utilization: 85, target: 90 },
  { name: 'Cranes', utilization: 72, target: 80 },
  { name: 'Loaders', utilization: 92, target: 85 },
  { name: 'Trucks', utilization: 65, target: 75 },
  { name: 'Bulldozers', utilization: 78, target: 85 },
];

const qualityIssuesData = [
  { name: 'Foundation', issues: 12, resolved: 10 },
  { name: 'Structural', issues: 8, resolved: 5 },
  { name: 'Electrical', issues: 15, resolved: 12 },
  { name: 'Plumbing', issues: 10, resolved: 8 },
  { name: 'Finishing', issues: 14, resolved: 9 },
];

const safetyIncidentsData = [
  { name: 'Jan', count: 3, severity: 2 },
  { name: 'Feb', count: 2, severity: 1 },
  { name: 'Mar', count: 4, severity: 3 },
  { name: 'Apr', count: 1, severity: 1 },
  { name: 'May', count: 2, severity: 2 },
  { name: 'Jun', count: 0, severity: 0 },
];

const riskDistributionData = [
  { name: 'High', value: 15, color: '#ef4444' },
  { name: 'Medium', value: 25, color: '#f97316' },
  { name: 'Low', value: 60, color: '#22c55e' },
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPeriod, setCurrentPeriod] = useState('6M'); // 1M, 3M, 6M, 1Y, ALL
  const [activeAnimation, setActiveAnimation] = useState(false);
  const { selectedProject } = useProject();
  
  const projectName = selectedProject?.title || 'All Projects';
  
  const colors = {
    labor: '#3b82f6',
    materials: '#8b5cf6',
    equipment: '#06b6d4',
    planned: '#22c55e',
    actual: '#f97316',
    issues: '#ef4444',
    resolved: '#22c55e',
    utilization: '#3b82f6',
    target: '#f97316',
    count: '#ef4444',
    severity: '#8b5cf6',
  };
  
  // Create analytics insights as simple strings
  const analyticsInsights = [
    'Cost Trend Alert: Material costs have increased by 12% this month, exceeding your budget allocation.',
    `Schedule Variance: ${projectName} is currently 7% behind planned progress. Action recommended.`,
    'Resource Optimization: Crane utilization is below target (72% vs 80%). Consider reallocation.',
    'Quality Issues: Structural quality issues have a lower resolution rate (62%) than other categories.'
  ];
  
  // Animate charts when tab changes
  useEffect(() => {
    setActiveAnimation(true);
    const timer = setTimeout(() => {
      setActiveAnimation(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Analytics" 
          subtitle="Project performance metrics and insights"
        />
        
        <SimpleInsightsPanel
          title="Analytics Insights"
          projectName={projectName}
          insights={analyticsInsights}
        />
        
        <main className="flex-1 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">Analyzing data from {projectName}</p>
            </div>
            
            <div className="flex gap-2 items-center">
              <div className="bg-gray-800 rounded-md p-1 flex">
                <Button 
                  variant={currentPeriod === '1M' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPeriod('1M')}
                  className="text-xs"
                >
                  1M
                </Button>
                <Button 
                  variant={currentPeriod === '3M' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPeriod('3M')}
                  className="text-xs"
                >
                  3M
                </Button>
                <Button 
                  variant={currentPeriod === '6M' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPeriod('6M')}
                  className="text-xs"
                >
                  6M
                </Button>
                <Button 
                  variant={currentPeriod === '1Y' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPeriod('1Y')}
                  className="text-xs"
                >
                  1Y
                </Button>
                <Button 
                  variant={currentPeriod === 'ALL' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentPeriod('ALL')}
                  className="text-xs"
                >
                  ALL
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <FilterIcon className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cost Overview */}
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between">
                      Cost Breakdown
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={costData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                          />
                          <Area type="monotone" dataKey="labor" stackId="1" stroke={colors.labor} fill={colors.labor} fillOpacity={0.6} />
                          <Area type="monotone" dataKey="materials" stackId="1" stroke={colors.materials} fill={colors.materials} fillOpacity={0.6} />
                          <Area type="monotone" dataKey="equipment" stackId="1" stroke={colors.equipment} fill={colors.equipment} fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.labor }}></div>
                        <span className="text-xs text-gray-300">Labor</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.materials }}></div>
                        <span className="text-xs text-gray-300">Materials</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.equipment }}></div>
                        <span className="text-xs text-gray-300">Equipment</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Progress */}
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between">
                      Schedule Progress
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={progressData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                          />
                          <Line type="monotone" dataKey="planned" stroke={colors.planned} strokeWidth={2} dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="actual" stroke={colors.actual} strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.planned }}></div>
                        <span className="text-xs text-gray-300">Planned</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.actual }}></div>
                        <span className="text-xs text-gray-300">Actual</span>
                      </div>
                      <div className="flex-grow text-right">
                        <span className="text-xs text-gray-300">Variance: -7%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Risk Distribution */}
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between">
                      Risk Distribution
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[180px] flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {riskDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                            formatter={(value, name) => [`${value}%`, name]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      {riskDistributionData.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
                          <span className="text-xs text-gray-300">{entry.name}: {entry.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Resource Utilization */}
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between">
                      Resource Utilization
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={resourceUtilizationData}
                          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                          />
                          <Legend />
                          <Bar dataKey="utilization" fill={colors.utilization} radius={[4, 4, 0, 0]} />
                          <Bar dataKey="target" fill={colors.target} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Quality Issues */}
                <Card className="border-gray-700 bg-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium flex justify-between">
                      Quality Issues
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={qualityIssuesData}
                          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="name" stroke="#9ca3af" />
                          <YAxis stroke="#9ca3af" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                          />
                          <Legend />
                          <Bar dataKey="issues" fill={colors.issues} radius={[4, 4, 0, 0]} />
                          <Bar dataKey="resolved" fill={colors.resolved} radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="costs" className="space-y-6">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Detailed cost breakdown and analysis will be shown here.</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={costData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                        />
                        <Legend />
                        <Area type="monotone" dataKey="labor" stackId="1" stroke={colors.labor} fill={colors.labor} fillOpacity={0.6} />
                        <Area type="monotone" dataKey="materials" stackId="1" stroke={colors.materials} fill={colors.materials} fillOpacity={0.6} />
                        <Area type="monotone" dataKey="equipment" stackId="1" stroke={colors.equipment} fill={colors.equipment} fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Detailed progress monitoring and schedule comparison.</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="planned" stroke={colors.planned} strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="actual" stroke={colors.actual} strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-6">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Equipment and resource utilization analytics.</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={resourceUtilizationData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                        />
                        <Legend />
                        <Bar dataKey="utilization" fill={colors.utilization} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill={colors.target} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quality" className="space-y-6">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Quality issues tracking and resolution rates.</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={qualityIssuesData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                        />
                        <Legend />
                        <Bar dataKey="issues" fill={colors.issues} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="resolved" fill={colors.resolved} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="safety" className="space-y-6">
              <Card className="border-gray-700 bg-gray-800">
                <CardHeader>
                  <CardTitle>Safety Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Safety incident tracking and severity analysis.</p>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={safetyIncidentsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke={colors.count} strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="severity" stroke={colors.severity} strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
