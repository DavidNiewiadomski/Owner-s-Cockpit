import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, ComposedChart, Area } from 'recharts';
import { DownloadCloud, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Calendar } from 'lucide-react';

// Sample project data
const projectData = [
  { name: 'East Tower', complete: 75, budget: 62, issues: 5, efficiency: 85 },
  { name: 'Westside Park', complete: 45, budget: 48, issues: 3, efficiency: 72 },
  { name: 'North Bridge', complete: 90, budget: 95, issues: 1, efficiency: 94 },
  { name: 'South Plaza', complete: 30, budget: 25, issues: 8, efficiency: 65 },
  { name: 'City Center', complete: 60, budget: 58, issues: 4, efficiency: 79 },
  { name: 'Harbor View', complete: 40, budget: 42, issues: 6, efficiency: 68 }
];

// Sample timeline data
const timelineData = [
  { month: 'Jan', actual: 30, projected: 35, variance: -5 },
  { month: 'Feb', actual: 45, projected: 40, variance: 5 },
  { month: 'Mar', actual: 55, projected: 50, variance: 5 },
  { month: 'Apr', actual: 60, projected: 65, variance: -5 },
  { month: 'May', actual: 75, projected: 80, variance: -5 },
  { month: 'Jun', actual: 85, projected: 90, variance: -5 },
  { month: 'Jul', actual: 95, projected: 95, variance: 0 },
  { month: 'Aug', actual: 100, projected: 100, variance: 0 },
];

// Budget allocation data
const budgetData = [
  { name: 'Materials', value: 45, fill: '#38bdf8' },
  { name: 'Labor', value: 30, fill: '#4ade80' },
  { name: 'Equipment', value: 15, fill: '#f43f5e' },
  { name: 'Permits', value: 5, fill: '#fb923c' },
  { name: 'Other', value: 5, fill: '#a855f7' },
];

// Project performance metrics
const performanceData = [
  { subject: 'Efficiency', A: 85, B: 70, fullMark: 100 },
  { subject: 'Quality', A: 92, B: 85, fullMark: 100 },
  { subject: 'Timeline', A: 78, B: 65, fullMark: 100 },
  { subject: 'Budget', A: 80, B: 88, fullMark: 100 },
  { subject: 'Safety', A: 95, B: 90, fullMark: 100 },
  { subject: 'Sustainability', A: 75, B: 60, fullMark: 100 },
];

// Resource utilization data
const resourceData = [
  { name: 'Week 1', planned: 40, actual: 38, capacity: 45 },
  { name: 'Week 2', planned: 35, actual: 32, capacity: 45 },
  { name: 'Week 3', planned: 42, actual: 43, capacity: 45 },
  { name: 'Week 4', planned: 38, actual: 40, capacity: 45 },
  { name: 'Week 5', planned: 40, actual: 39, capacity: 45 },
  { name: 'Week 6', planned: 35, actual: 37, capacity: 45 },
];

// Analysis periods
const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

// Analytics insights data
const analyticsInsights = [
  { 
    type: "warning", 
    title: "Budget Alert", 
    content: "City Center project is 8% over budget allocation for Q3." 
  },
  { 
    type: "success", 
    title: "Efficiency Improved", 
    content: "North Bridge timeline efficiency increased by 15% this month." 
  },
  { 
    type: "info", 
    title: "Resource Trend", 
    content: "Equipment utilization is increasing - consider reallocation." 
  },
  { 
    type: "info", 
    title: "Pattern Detected", 
    content: "Material costs show consistent monthly increase of 3.2%." 
  }
];

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState('monthly');
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Trigger animation effect when component mounts
  useEffect(() => {
    setActiveAnimation(true);
  }, []);

  // Effect to switch between animation states for a pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnimation(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Custom color scheme for futuristic look
  const colors = {
    primary: '#38bdf8',
    secondary: '#4ade80',
    accent: '#f43f5e',
    warning: '#fb923c',
    info: '#a855f7',
    background: 'rgba(255, 255, 255, 0.05)',
    gridLine: 'rgba(255, 255, 255, 0.1)'
  };

  return (
    <div className="flex h-screen bg-black text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Insights Card */}
            <AIInsightsCard 
              insights={analyticsInsights} 
              onChatOpen={() => setSheetOpen(true)} 
            />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
                <p className="text-gray-400">Interactive project performance metrics and insights</p>
              </div>
              <div className="mt-3 md:mt-0 flex gap-2">
                <div className="flex items-center bg-black rounded-md p-1 border border-gray-700">
                  {periods.map(period => (
                    <Button 
                      key={period.value}
                      variant="ghost" 
                      size="sm"
                      className={`px-3 py-1 text-xs rounded-sm ${
                        currentPeriod === period.value 
                          ? 'bg-construction-900/40 text-construction-300' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                      onClick={() => setCurrentPeriod(period.value)}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                  <DownloadCloud className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { title: 'Completion Rate', value: '68%', trend: '+5%', color: 'bg-blue-500' },
                { title: 'Budget Utilization', value: '72%', trend: '-2%', color: 'bg-green-500' },
                { title: 'Quality Score', value: '88/100', trend: '+3', color: 'bg-purple-500' },
                { title: 'Safety Rating', value: '95%', trend: '+1%', color: 'bg-orange-500' }
              ].map((kpi, index) => (
                <Card key={index} className={`bg-black border-gray-700 overflow-hidden`}>
                  <div className={`h-1 ${kpi.color}`}></div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                        <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded ${
                        kpi.trend.startsWith('+') ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                      }`}>
                        {kpi.trend}
                      </div>
                    </div>
                    {/* Animated pulse indicator */}
                    <div className="mt-4 relative h-1 bg-gray-700 rounded">
                      <div className={`absolute top-0 left-0 h-full rounded ${kpi.color} transition-all duration-1000 ease-in-out ${
                        activeAnimation ? 'opacity-70' : 'opacity-100'
                      }`} style={{ width: kpi.value }}></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Tabbed Charts Section */}
            <Tabs defaultValue="performance" className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-black border border-gray-700">
                  <TabsTrigger value="performance" className="data-[state=active]:bg-construction-600 data-[state=active]:text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Performance
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-construction-600 data-[state=active]:text-white">
                    <LineChartIcon className="h-4 w-4 mr-2" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-construction-600 data-[state=active]:text-white">
                    <PieChartIcon className="h-4 w-4 mr-2" />
                    Resources
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <div className="flex items-center h-6 px-2 text-xs rounded-full bg-blue-500/20 text-blue-400">
                    <span className="w-2 h-2 mr-1 rounded-full bg-blue-500"></span>
                    Current
                  </div>
                  <div className="flex items-center h-6 px-2 text-xs rounded-full bg-green-500/20 text-green-400">
                    <span className="w-2 h-2 mr-1 rounded-full bg-green-500"></span>
                    Target
                  </div>
                </div>
              </div>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Project Completion Chart */}
                  <Card className="bg-black border-gray-700 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-construction-400" />
                        Project Completion vs Budget
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Comparing completion percentage against budget utilization
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={projectData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                            <XAxis 
                              dataKey="name" 
                              stroke="#aaa" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                              axisLine={{ stroke: colors.gridLine }}
                            />
                            <YAxis 
                              stroke="#aaa" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                              axisLine={{ stroke: colors.gridLine }}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                              labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                              itemStyle={{ padding: '4px 0' }}
                            />
                            <Legend 
                              verticalAlign="top" 
                              height={36}
                              wrapperStyle={{ paddingTop: '10px' }}
                            />
                            <Bar 
                              dataKey="complete" 
                              name="Completion %" 
                              fill={colors.primary} 
                              radius={[4, 4, 0, 0]}
                              animationDuration={1500}
                            />
                            <Bar 
                              dataKey="budget" 
                              name="Budget Used %" 
                              fill={colors.secondary} 
                              radius={[4, 4, 0, 0]}
                              animationDuration={1500}
                              animationBegin={300}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Project Performance Radar Chart */}
                  <Card className="bg-black border-gray-700 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-construction-400" />
                        Project Performance Metrics
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Multi-dimensional performance comparison
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={90} data={performanceData}>
                            <PolarGrid stroke={colors.gridLine} />
                            <PolarAngleAxis 
                              dataKey="subject" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                            />
                            <Radar 
                              name="Current Projects" 
                              dataKey="A" 
                              stroke={colors.primary} 
                              fill={colors.primary} 
                              fillOpacity={0.5}
                              animationDuration={1500}
                            />
                            <Radar 
                              name="Previous Period" 
                              dataKey="B" 
                              stroke={colors.secondary} 
                              fill={colors.secondary} 
                              fillOpacity={0.5}
                              animationDuration={1500}
                              animationBegin={300}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                            <Legend />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Issues by Project - Horizontal Bar Chart */}
                <Card className="bg-black border-gray-700 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-construction-400" />
                      Issues by Project
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Open issues requiring attention across projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={projectData}
                          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                          <XAxis 
                            type="number" 
                            stroke="#aaa"
                            tick={{ fill: '#aaa', fontSize: 12 }}
                            axisLine={{ stroke: colors.gridLine }}
                          />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            stroke="#aaa"
                            tick={{ fill: '#aaa', fontSize: 12 }}
                            axisLine={{ stroke: colors.gridLine }}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                          />
                          <Bar 
                            dataKey="issues" 
                            name="Open Issues" 
                            fill={colors.accent}
                            radius={[0, 4, 4, 0]}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Timeline Progress Chart */}
                  <Card className="bg-black border-gray-700 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-construction-400" />
                        Project Timeline Progress
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Comparing actual progress against projected timeline
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={timelineData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                            <XAxis 
                              dataKey="month" 
                              stroke="#aaa" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                              axisLine={{ stroke: colors.gridLine }}
                            />
                            <YAxis 
                              stroke="#aaa" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                              axisLine={{ stroke: colors.gridLine }}
                              domain={[0, 100]}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                            <Legend 
                              verticalAlign="top" 
                              height={36}
                              wrapperStyle={{ paddingTop: '10px' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="projected" 
                              name="Projected Progress" 
                              stroke="transparent"
                              fill="url(#colorProjected)"
                              fillOpacity={0.3}
                              animationDuration={1500}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="actual" 
                              name="Actual Progress" 
                              stroke={colors.primary} 
                              strokeWidth={3}
                              dot={{ r: 5, fill: colors.primary, strokeWidth: 0 }}
                              activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2 }}
                              animationDuration={2000}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="projected" 
                              name="Projected Progress" 
                              stroke={colors.secondary} 
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ r: 4, fill: colors.secondary, strokeWidth: 0 }}
                              animationDuration={2000}
                              animationBegin={300}
                            />
                            <defs>
                              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.2}/>
                                <stop offset="95%" stopColor={colors.secondary} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Budget Allocation Pie Chart */}
                  <Card className="bg-black border-gray-700 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center">
                        <PieChartIcon className="h-5 w-5 mr-2 text-construction-400" />
                        Budget Allocation
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Distribution of project budget across categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={budgetData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={90}
                              fill="#8884d8"
                              dataKey="value"
                              animationDuration={1500}
                              animationBegin={0}
                            >
                              {budgetData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                              formatter={(value, name) => [`${value}%`, name]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Resource Utilization Chart */}
                  <Card className="bg-black border-gray-700 shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white flex items-center">
                        <LineChartIcon className="h-5 w-5 mr-2 text-construction-400" />
                        Resource Utilization
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Planned vs actual resource usage over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={resourceData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                            <XAxis 
                              dataKey="name" 
                              stroke="#aaa" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                              axisLine={{ stroke: colors.gridLine }}
                            />
                            <YAxis 
                              stroke="#aaa" 
                              tick={{ fill: '#aaa', fontSize: 12 }}
                              axisLine={{ stroke: colors.gridLine }}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="capacity"
                              name="Capacity"
                              fill="url(#capacityGradient)"
                              stroke="transparent"
                              fillOpacity={0.2}
                              animationDuration={1500}
                            />
                            <Bar 
                              dataKey="planned" 
                              name="Planned" 
                              fill={colors.primary}
                              radius={[4, 4, 0, 0]}
                              animationDuration={1500}
                            />
                            <Bar 
                              dataKey="actual" 
                              name="Actual" 
                              fill={colors.secondary}
                              radius={[4, 4, 0, 0]}
                              animationDuration={1500}
                              animationBegin={300}
                            />
                            <defs>
                              <linearGradient id="capacityGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
