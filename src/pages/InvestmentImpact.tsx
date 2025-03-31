
import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Building,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Calendar,
  BarChart2,
  Layers,
  AlertTriangle,
  FileText,
  Download,
  Filter
} from 'lucide-react';

const projectOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'east-tower', label: 'East Tower Construction' },
  { value: 'westside', label: 'Westside Park Development' },
  { value: 'north-bridge', label: 'North Bridge Repair' }
];

const roiData = [
  { name: 'Jan', projected: 7.2, actual: 7.1 },
  { name: 'Feb', projected: 7.3, actual: 7.0 },
  { name: 'Mar', projected: 7.4, actual: 6.8 },
  { name: 'Apr', projected: 7.5, actual: 6.5 },
  { name: 'May', projected: 7.6, actual: 6.3 },
  { name: 'Jun', projected: 7.7, actual: 6.4 },
  { name: 'Jul', projected: 7.8, actual: 6.6 },
  { name: 'Aug', projected: 7.9, actual: 6.9 },
  { name: 'Sep', projected: 8.0, actual: 7.2 },
  { name: 'Oct', projected: 8.1, actual: null },
  { name: 'Nov', projected: 8.2, actual: null },
  { name: 'Dec', projected: 8.3, actual: null },
];

const schedulingImpactData = [
  { name: 'East Tower', original: 18, current: 22, variance: 4 },
  { name: 'Westside Park', original: 12, current: 15, variance: 3 },
  { name: 'North Bridge', original: 8, current: 14, variance: 6 },
];

const costOverrunData = [
  { name: 'Materials', value: 35, color: '#38bdf8' },
  { name: 'Labor', value: 25, color: '#fb7185' },
  { name: 'Permits/Fees', value: 15, color: '#a78bfa' },
  { name: 'Equipment', value: 10, color: '#34d399' },
  { name: 'Design Changes', value: 15, color: '#fbbf24' },
];

const valuationImpactData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 102 },
  { month: 'Mar', value: 105 },
  { month: 'Apr', value: 99 },
  { month: 'May', value: 101 },
  { month: 'Jun', value: 104 },
  { month: 'Jul', value: 108 },
  { month: 'Aug', value: 112 },
  { month: 'Sep', value: 110 },
];

const impactEvents = [
  {
    id: 1,
    project: 'East Tower Construction',
    event: 'Foundation delay',
    financialImpact: '-$120,000',
    schedulingImpact: '+4 weeks',
    roiImpact: '-0.8%',
    date: '2024-03-10',
    status: 'high'
  },
  {
    id: 2,
    project: 'Westside Park Development',
    event: 'Material price increase',
    financialImpact: '-$85,000',
    schedulingImpact: '+0 weeks',
    roiImpact: '-0.5%',
    date: '2024-04-15',
    status: 'medium'
  },
  {
    id: 3,
    project: 'North Bridge Repair',
    event: 'Equipment failure',
    financialImpact: '-$45,000',
    schedulingImpact: '+2 weeks',
    roiImpact: '-0.3%',
    date: '2024-05-22',
    status: 'medium'
  },
  {
    id: 4,
    project: 'East Tower Construction',
    event: 'Design optimization',
    financialImpact: '+$75,000',
    schedulingImpact: '-2 weeks',
    roiImpact: '+0.4%',
    date: '2024-06-08',
    status: 'positive'
  },
  {
    id: 5,
    project: 'Westside Park Development',
    event: 'Permit delay',
    financialImpact: '-$35,000',
    schedulingImpact: '+3 weeks',
    roiImpact: '-0.2%',
    date: '2024-07-19',
    status: 'low'
  }
];

const investmentMetrics = [
  {
    label: 'Internal Rate of Return (IRR)',
    original: '15.2%',
    current: '14.1%',
    impact: 'negative',
    variance: '-1.1%'
  },
  {
    label: 'Net Present Value (NPV)',
    original: '$4.2M',
    current: '$3.8M',
    impact: 'negative',
    variance: '-$0.4M'
  },
  {
    label: 'Cash on Cash Return',
    original: '8.5%',
    current: '7.9%',
    impact: 'negative',
    variance: '-0.6%'
  },
  {
    label: 'Payback Period',
    original: '6.2 years',
    current: '7.1 years',
    impact: 'negative',
    variance: '+0.9 years'
  },
  {
    label: 'Equity Multiple',
    original: '2.4x',
    current: '2.2x',
    impact: 'negative',
    variance: '-0.2x'
  },
  {
    label: 'Debt Service Coverage Ratio',
    original: '1.75',
    current: '1.62',
    impact: 'negative',
    variance: '-0.13'
  }
];

const mitigationStrategies = [
  {
    id: 1,
    issue: 'Schedule Delays',
    strategy: 'Implement accelerated work schedule and parallel work streams',
    potentialSavings: '+3 weeks',
    costToImplement: '$45,000',
    netRoiImpact: '+0.3%',
    status: 'proposed'
  },
  {
    id: 2,
    issue: 'Material Cost Inflation',
    strategy: 'Pre-purchase critical materials and establish price lock agreements',
    potentialSavings: '$120,000',
    costToImplement: '$15,000',
    netRoiImpact: '+0.6%',
    status: 'in-progress'
  },
  {
    id: 3,
    issue: 'Labor Shortages',
    strategy: 'Revise subcontractor agreements with performance incentives',
    potentialSavings: '+2 weeks, $85,000',
    costToImplement: '$30,000',
    netRoiImpact: '+0.4%',
    status: 'in-progress'
  },
  {
    id: 4,
    issue: 'Design Inefficiencies',
    strategy: 'Value engineering review of remaining project components',
    potentialSavings: '$210,000',
    costToImplement: '$55,000',
    netRoiImpact: '+0.8%',
    status: 'proposed'
  }
];

const InvestmentImpact = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAnimation, setActiveAnimation] = useState(false);
  
  // Effect for animation states
  useEffect(() => {
    setActiveAnimation(true);
    
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
    info: '#a78bfa',
    background: 'rgba(255, 255, 255, 0.05)',
    gridLine: 'rgba(255, 255, 255, 0.1)'
  };
  
  const handleStrategyAction = (id: number, action: string) => {
    toast({
      title: `Strategy ${action}`,
      description: `Mitigation strategy #${id} has been ${action.toLowerCase()}`,
      duration: 3000,
    });
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloading",
      description: "Investment impact analysis report is being generated",
      duration: 3000,
    });
  };

  const handleViewScenario = (scenarioId: string) => {
    toast({
      id: crypto.randomUUID(),
      title: "Scenario Analysis",
      description: `Viewing detailed analysis for scenario ${scenarioId}`,
      duration: 3000,
    });
  };

  const handleRunSimulation = () => {
    toast({
      id: crypto.randomUUID(),
      title: "Simulation In Progress",
      description: "Running investment impact simulation with updated parameters",
      duration: 3000,
    });
  };

  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden bg-black">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <CollapsibleAIAssistant 
              projectName="investment portfolio"
              insights={[
                "Schedule delays have reduced projected IRR by 1.1%",
                "Material cost increases are the primary driver of budget overruns",
                "Implementing proposed mitigation strategies could recover 0.7% ROI",
                "Cash flow projections indicate a 3-month delay to break-even point"
              ]}
            />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Investment Impact Analysis</h1>
                <p className="text-gray-400">Monitor how construction events affect your investment metrics</p>
              </div>
              <div className="mt-3 md:mt-0 flex flex-col sm:flex-row gap-3">
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger className="w-[180px] glass-input">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 border-gray-700 hover:border-gray-600 text-gray-300 hover-scale"
                  onClick={handleDownloadReport}
                >
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="glass-card shadow-glow col-span-full md:col-span-1 hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    ROI Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {investmentMetrics.map((metric, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{metric.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through">{metric.original}</span>
                            <span className={metric.impact === 'negative' ? 'text-red-400' : 'text-green-400'}>
                              {metric.current}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Variance</span>
                          <span className={metric.impact === 'negative' ? 'text-red-400' : 'text-green-400'}>
                            {metric.variance}
                          </span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full mt-1">
                          <div 
                            className={`h-1 rounded-full ${
                              metric.impact === 'negative' ? 'bg-red-500' : 'bg-green-500'
                            } transition-all duration-1000 ease-in-out ${
                              activeAnimation ? 'opacity-70' : 'opacity-100'
                            }`}
                            style={{ width: `${metric.impact === 'negative' ? '75%' : '85%'}` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card shadow-glow-blue col-span-full md:col-span-2 hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    Return on Investment Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={roiData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#aaa', fontSize: 12 }}
                          axisLine={{ stroke: colors.gridLine }}
                        />
                        <YAxis 
                          tick={{ fill: '#aaa', fontSize: 12 }}
                          axisLine={{ stroke: colors.gridLine }}
                          domain={[6, 9]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, '']}
                          contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="projected" 
                          stroke={colors.secondary} 
                          strokeWidth={2} 
                          activeDot={{ r: 6 }}
                          name="Projected ROI"
                          animationDuration={1500}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke={colors.accent} 
                          strokeWidth={2} 
                          activeDot={{ r: 6 }}
                          name="Actual ROI"
                          strokeDasharray="5 5"
                          animationDuration={1500}
                          animationBegin={300}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Construction Impact Events</h2>
              <div className="glass-card rounded-lg shadow-glow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/40">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Financial Impact</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Schedule Impact</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ROI Impact</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {impactEvents.map((event) => (
                        <tr key={event.id} className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-300">{event.project}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{event.event}</td>
                          <td className={`px-4 py-3 text-sm ${event.financialImpact.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                            {event.financialImpact}
                          </td>
                          <td className={`px-4 py-3 text-sm ${event.schedulingImpact.startsWith('+') ? 'text-red-400' : 'text-green-400'}`}>
                            {event.schedulingImpact}
                          </td>
                          <td className={`px-4 py-3 text-sm ${event.roiImpact.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                            {event.roiImpact}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">{event.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={
                              event.status === 'high' ? 'bg-red-900/20 text-red-400' :
                              event.status === 'medium' ? 'bg-amber-900/20 text-amber-400' :
                              event.status === 'low' ? 'bg-yellow-900/20 text-yellow-400' :
                              'bg-green-900/20 text-green-400'
                            }>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="glass-card shadow-glow col-span-full lg:col-span-1 hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Schedule Variance Impact
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Comparing original and current timelines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={schedulingImpactData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#aaa', fontSize: 12 }}
                          axisLine={{ stroke: colors.gridLine }}
                        />
                        <YAxis 
                          tick={{ fill: '#aaa', fontSize: 12 }}
                          axisLine={{ stroke: colors.gridLine }}
                          label={{ 
                            value: 'Months', 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { fill: '#aaa' }
                          }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={36}
                          wrapperStyle={{ paddingTop: '10px' }}
                        />
                        <Bar 
                          dataKey="original" 
                          name="Original Timeline" 
                          fill={colors.primary} 
                          radius={[4, 4, 0, 0]}
                          animationDuration={1500}
                        />
                        <Bar 
                          dataKey="current" 
                          name="Current Timeline" 
                          fill={colors.accent} 
                          radius={[4, 4, 0, 0]}
                          animationDuration={1500}
                          animationBegin={300}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card shadow-glow-purple col-span-full lg:col-span-1 hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    Budget Overrun Breakdown
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Distribution of cost overruns by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costOverrunData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          animationDuration={1500}
                        >
                          {costOverrunData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Percentage']}
                          contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Legend 
                          verticalAlign="bottom"
                          height={36}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="glass-card shadow-glow col-span-full lg:col-span-2 hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    Property Valuation Impact
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Monthly changes in property value relative to baseline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={valuationImpactData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fill: '#aaa', fontSize: 12 }}
                          axisLine={{ stroke: colors.gridLine }}
                        />
                        <YAxis 
                          tick={{ fill: '#aaa', fontSize: 12 }}
                          axisLine={{ stroke: colors.gridLine }}
                          domain={[95, 115]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Relative Value']}
                          contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.info} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={colors.info} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={colors.info} 
                          fill="url(#colorValue)" 
                          name="Relative Property Value"
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card shadow-glow col-span-full lg:col-span-1 hover-scale transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Financial Risk Indicators
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Key metrics indicating financial health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Debt Service Coverage</span>
                        <span className="text-sm font-medium text-amber-400">1.2x</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-amber-500 rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">Below safe threshold (1.25x)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Cost Variance</span>
                        <span className="text-sm font-medium text-red-400">+12.5%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-red-500 rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: '80%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">Above contingency budget (10%)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Schedule Variance</span>
                        <span className="text-sm font-medium text-amber-400">+18%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-amber-500 rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">Projected completion delay</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Loan Covenant Status</span>
                        <span className="text-sm font-medium text-green-400">Compliance</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full transition-all duration-1000 ease-in-out" 
                          style={{ width: '90%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">Within acceptable parameters</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-100 mb-4">Impact Mitigation Strategies</h2>
              <div className="glass-card rounded-lg shadow-glow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/40">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Issue</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Mitigation Strategy</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Potential Savings</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Implementation Cost</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Net ROI Impact</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {mitigationStrategies.map((strategy) => (
                        <tr key={strategy.id} className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-300">{strategy.issue}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{strategy.strategy}</td>
                          <td className="px-4 py-3 text-sm text-green-400">{strategy.potentialSavings}</td>
                          <td className="px-4 py-3 text-sm text-red-400">{strategy.costToImplement}</td>
                          <td className="px-4 py-3 text-sm text-green-400">{strategy.netRoiImpact}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={
                              strategy.status === 'proposed' ? 'bg-blue-900/20 text-blue-400' :
                              strategy.status === 'in-progress' ? 'bg-amber-900/20 text-amber-400' :
                              'bg-green-900/20 text-green-400'
                            }>
                              {strategy.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs border-gray-700 hover:border-gray-600 text-gray-300 hover-scale"
                                onClick={() => handleStrategyAction(strategy.id, 'Approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-gray-300 hover:text-white"
                                onClick={() => handleStrategyAction(strategy.id, 'Detailed')}
                              >
                                Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvestmentImpact;
