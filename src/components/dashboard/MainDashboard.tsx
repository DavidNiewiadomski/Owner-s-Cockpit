import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, Wrench, Package, MapPin, Star, Building2, DollarSign, FileText, Zap, Cpu, Eye, PaintBucket, Trees, Settings2 } from 'lucide-react';
import { getDashboardStats, getProjects, getTasks } from '@/services/dataService';
import type { Project, Task } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Sample data for site selection analysis
const businessCaseData = [
  { metric: 'ROI', siteA: 18.5, siteB: 15.2, siteC: 22.1 },
  { metric: 'Payback (Years)', siteA: 3.2, siteB: 4.1, siteC: 2.8 },
  { metric: 'NPV (M)', siteA: 12.4, siteB: 8.9, siteC: 16.2 },
  { metric: 'IRR', siteA: 19.8, siteB: 16.3, siteC: 24.5 }
];

const incentivesData = [
  { name: 'Tax Credits', value: 2.5, color: '#22d3ee' },
  { name: 'Job Creation', value: 1.8, color: '#10b981' },
  { name: 'Infrastructure', value: 3.2, color: '#f59e0b' },
  { name: 'Training Grants', value: 0.9, color: '#8b5cf6' }
];

const siteComparisonData = [
  { criteria: 'Cost Efficiency', A: 85, B: 72, C: 95 },
  { criteria: 'Timeline', A: 78, B: 65, C: 70 },
  { criteria: 'Accessibility', A: 85, B: 78, C: 92 },
  { criteria: 'Utilities', A: 92, B: 88, C: 85 },
  { criteria: 'Incentives', A: 78, B: 65, C: 88 },
  { criteria: 'Growth Potential', A: 88, B: 75, C: 82 }
];

const flexsimData = [
  { time: '0', throughput: 0, efficiency: 75 },
  { time: '6', throughput: 45, efficiency: 82 },
  { time: '12', throughput: 78, efficiency: 88 },
  { time: '18', throughput: 92, efficiency: 91 },
  { time: '24', throughput: 95, efficiency: 94 }
];

export function MainDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [urgentTasks, setUrgentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [dashboardStats, projects, tasks] = await Promise.all([
          getDashboardStats(),
          getProjects(),
          getTasks()
        ]);
        
        setStats(dashboardStats);
        setRecentProjects(projects.slice(0, 3));
        setUrgentTasks(tasks.filter(t => t.priority === 'critical' || t.priority === 'high').slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'planning':
        return 'bg-blue-600';
      case 'on-hold':
        return 'bg-yellow-600';
      case 'completed':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-600';
      case 'medium':
        return 'bg-yellow-600';
      case 'low':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Projects</p>
                  <p className="text-2xl font-bold text-white">{stats?.activeProjects || 0}</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Sites Under Review</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="bg-cyan-600 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Equipment In Use</p>
                  <p className="text-2xl font-bold text-white">{stats?.equipmentInUse || 0}</p>
                </div>
                <div className="bg-green-600 p-3 rounded-full">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Critical Tasks</p>
                  <p className="text-2xl font-bold text-white">{stats?.criticalTasks || 0}</p>
                </div>
                <div className="bg-red-600 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Site Selection Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-cyan-300 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Site Selection & Business Case Development
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business-case" className="w-full">
              <TabsList className="bg-gray-800 text-gray-400 grid grid-cols-2 lg:grid-cols-6 h-auto">
                <TabsTrigger value="business-case" className="text-xs">Business Case</TabsTrigger>
                <TabsTrigger value="flexsim" className="text-xs">Flexsim API</TabsTrigger>
                <TabsTrigger value="incentives" className="text-xs">Incentives</TabsTrigger>
                <TabsTrigger value="comparison" className="text-xs">Site Comparison</TabsTrigger>
                <TabsTrigger value="space-plan" className="text-xs">Space Plan</TabsTrigger>
                <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="business-case" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Financial Metrics Comparison</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={businessCaseData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="metric" tick={{ fill: '#94a3b8' }} />
                          <YAxis tick={{ fill: '#94a3b8' }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="siteA" name="Site A" fill="#22d3ee" />
                          <Bar dataKey="siteB" name="Site B" fill="#10b981" />
                          <Bar dataKey="siteC" name="Site C" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Project Scope Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Facility Size:</span>
                        <span className="text-white">125,000 sq ft</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Employees:</span>
                        <span className="text-white">450 FTE</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Total Investment:</span>
                        <span className="text-green-400">$45.2M</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Break Even:</span>
                        <span className="text-white">Year 3.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="flexsim" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4 flex items-center">
                      <Cpu className="h-4 w-4 mr-2" />
                      Manufacturing Simulation Results
                    </h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={flexsimData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="time" tick={{ fill: '#94a3b8' }} />
                          <YAxis tick={{ fill: '#94a3b8' }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                          <Line type="monotone" dataKey="throughput" stroke="#22d3ee" strokeWidth={2} />
                          <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">API Integration Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400 flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          Connection Status
                        </span>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Last Sync:</span>
                        <span className="text-white">2 minutes ago</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-gray-400">Simulation Runs:</span>
                        <span className="text-white">24/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="incentives" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Labour & Government Incentives</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={incentivesData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: $${value}M`}
                          >
                            {incentivesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Available Incentives</h4>
                    {incentivesData.map((incentive) => (
                      <div key={incentive.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: incentive.color }}
                          ></div>
                          <span className="text-white">{incentive.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">${incentive.value}M</div>
                          <div className="text-gray-400 text-sm">Available</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Multi-Criteria Site Comparison</h4>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={siteComparisonData}>
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis tick={{ fill: '#94a3b8' }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                          <Radar name="Site A" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.1} strokeWidth={2} />
                          <Radar name="Site B" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                          <Radar name="Site C" dataKey="C" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Budget vs Actual Analysis</h4>
                    <div className="space-y-3">
                      {[
                        { site: 'Site A', budget: '$12.5M', actual: '$12.8M', status: 'Over' },
                        { site: 'Site B', budget: '$15.2M', actual: '$14.9M', status: 'Under' },
                        { site: 'Site C', budget: '$10.8M', actual: '$10.2M', status: 'Under' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div>
                            <div className="text-white font-medium">{item.site}</div>
                            <div className="text-gray-400 text-sm">Budget: {item.budget}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white">{item.actual}</div>
                            <Badge className={item.status === 'Under' ? 'bg-green-600' : 'bg-red-600'}>
                              {item.status} Budget
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="space-plan" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Space Allocation</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Manufacturing</span>
                          <span className="text-white">65,000 sq ft</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '52%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Warehouse</span>
                          <span className="text-white">35,000 sq ft</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Office Space</span>
                          <span className="text-white">15,000 sq ft</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Common Areas</span>
                          <span className="text-white">10,000 sq ft</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-white font-medium mb-4">Preliminary Floor Plan</h4>
                    <div className="bg-gray-800 rounded-lg p-6 h-[300px] flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <Building2 className="h-16 w-16 mx-auto mb-4" />
                        <div>Floor plan visualization will be integrated</div>
                        <div className="text-sm">CAD integration pending</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Document Review & AI Insights
                    </h4>
                    <div className="space-y-3">
                      {[
                        { type: 'Topographic Survey', status: 'Reviewed', aiInsight: 'Minimal grading required', icon: MapPin },
                        { type: 'Zoning Documents', status: 'In Review', aiInsight: 'Compliance verified', icon: Building2 },
                        { type: 'Lease Agreement', status: 'AI Analysis', aiInsight: 'Favorable terms identified', icon: FileText },
                        { type: 'Environmental Report', status: 'Completed', aiInsight: 'No major concerns', icon: AlertTriangle }
                      ].map((doc, index) => (
                        <div key={index} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <doc.icon className="h-4 w-4 text-cyan-300" />
                              <span className="text-white font-medium">{doc.type}</span>
                            </div>
                            <Badge className={
                              doc.status === 'Completed' ? 'bg-green-600' : 
                              doc.status === 'Reviewed' ? 'bg-blue-600' : 'bg-yellow-600'
                            }>
                              {doc.status}
                            </Badge>
                          </div>
                          <div className="text-gray-400 text-sm">AI Insight: {doc.aiInsight}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-4">Facility Management Insights</h4>
                    <div className="space-y-3">
                      {[
                        { category: 'Site Painting', insight: 'High-durability coating recommended for industrial environment', icon: PaintBucket, priority: 'Medium' },
                        { category: 'Landscape Modifications', insight: 'Native drought-resistant plants for sustainability', icon: Trees, priority: 'Low' },
                        { category: 'BMS Integration', insight: 'Schneider Electric system compatible with existing infrastructure', icon: Settings2, priority: 'High' }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4 text-cyan-300" />
                              <span className="text-white font-medium">{item.category}</span>
                            </div>
                            <Badge className={
                              item.priority === 'High' ? 'bg-red-600' : 
                              item.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                            }>
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="text-gray-400 text-sm">{item.insight}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h5 className="text-white font-medium mb-3">Previous Property Comparisons</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-gray-800 rounded-lg text-sm">
                          <span className="text-gray-400">Downtown Property A</span>
                          <span className="text-white">85% lease terms match</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-800 rounded-lg text-sm">
                          <span className="text-gray-400">Industrial Complex B</span>
                          <span className="text-white">92% operational similarity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Projects and Site Selection Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{project.title}</h4>
                    <p className="text-sm text-gray-400">{project.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getStatusBadgeColor(project.status)} text-white`}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-gray-400">{project.progress}% complete</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Budget</p>
                    <p className="font-medium text-white">
                      ${(project.budget || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Site Selection Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Site Selection Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Downtown Metro', score: 94, status: 'High Priority', color: 'bg-green-600' },
                { name: 'Industrial East', score: 87, status: 'Under Review', color: 'bg-blue-600' },
                { name: 'Suburban North', score: 82, status: 'Pending Review', color: 'bg-yellow-600' }
              ].map((site, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{site.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${site.color} text-white`}>
                        {site.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-400">{site.score}/100</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              ))}
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 mt-4">
                View All Sites
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Urgent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Urgent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {urgentTasks.map((task, index) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{task.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${getPriorityBadgeColor(task.priority)} text-white`}>
                        {task.priority}
                      </Badge>
                      {task.due_date && (
                        <span className="text-sm text-gray-400">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm">Create Task</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700">
                <MapPin className="h-6 w-6" />
                <span className="text-sm">Site Analysis</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700">
                <Package className="h-6 w-6" />
                <span className="text-sm">Material Orders</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
