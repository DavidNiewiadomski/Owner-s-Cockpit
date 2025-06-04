
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, Wrench, Package, MapPin, Star, Building2, DollarSign, FileText, Zap, Cpu, Eye, PaintBucket, Trees, Settings2, BarChart3, PieChart, Activity, Target, Award, Briefcase, LineChart, Shield } from 'lucide-react';
import { getDashboardStats, getProjects, getTasks } from '@/services/dataService';
import type { Project, Task } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, AreaChart } from 'recharts';

// Enhanced sample data for site selection analysis
const businessCaseData = [
  { metric: 'ROI (%)', siteA: 18.5, siteB: 15.2, siteC: 22.1, target: 20 },
  { metric: 'Payback (Years)', siteA: 3.2, siteB: 4.1, siteC: 2.8, target: 3.5 },
  { metric: 'NPV ($M)', siteA: 12.4, siteB: 8.9, siteC: 16.2, target: 12 },
  { metric: 'IRR (%)', siteA: 19.8, siteB: 16.3, siteC: 24.5, target: 18 }
];

const incentivesData = [
  { name: 'Tax Credits', value: 2.5, color: '#22d3ee', percentage: 35 },
  { name: 'Job Creation', value: 1.8, color: '#10b981', percentage: 25 },
  { name: 'Infrastructure', value: 3.2, color: '#f59e0b', percentage: 30 },
  { name: 'Training Grants', value: 0.9, color: '#8b5cf6', percentage: 10 }
];

const siteComparisonData = [
  { criteria: 'Cost Efficiency', A: 85, B: 72, C: 95, fullMark: 100 },
  { criteria: 'Timeline', A: 78, B: 65, C: 70, fullMark: 100 },
  { criteria: 'Accessibility', A: 85, B: 78, C: 92, fullMark: 100 },
  { criteria: 'Utilities', A: 92, B: 88, C: 85, fullMark: 100 },
  { criteria: 'Incentives', A: 78, B: 65, C: 88, fullMark: 100 },
  { criteria: 'Growth Potential', A: 88, B: 75, C: 82, fullMark: 100 }
];

const flexsimData = [
  { time: '0h', throughput: 0, efficiency: 75, capacity: 100 },
  { time: '6h', throughput: 45, efficiency: 82, capacity: 100 },
  { time: '12h', throughput: 78, efficiency: 88, capacity: 100 },
  { time: '18h', throughput: 92, efficiency: 91, capacity: 100 },
  { time: '24h', throughput: 95, efficiency: 94, capacity: 100 }
];

const costScheduleData = [
  { phase: 'Planning', siteA: { cost: 2.1, schedule: 3 }, siteB: { cost: 2.8, schedule: 4 }, siteC: { cost: 1.9, schedule: 2.5 }, budget: 2.5 },
  { phase: 'Design', siteA: { cost: 3.2, schedule: 6 }, siteB: { cost: 3.8, schedule: 7 }, siteC: { cost: 2.9, schedule: 5.5 }, budget: 3.5 },
  { phase: 'Permitting', siteA: { cost: 1.5, schedule: 4 }, siteB: { cost: 2.1, schedule: 6 }, siteC: { cost: 1.2, schedule: 3 }, budget: 1.8 },
  { phase: 'Construction', siteA: { cost: 8.9, schedule: 18 }, siteB: { cost: 10.2, schedule: 22 }, siteC: { cost: 7.8, schedule: 16 }, budget: 9.0 }
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
      case 'active': return 'bg-green-600';
      case 'planning': return 'bg-blue-600';
      case 'on-hold': return 'bg-yellow-600';
      case 'completed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Overview - Fixed Sizing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700 relative overflow-hidden h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <CardContent className="p-6 relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-200 truncate">Active Projects</p>
                  <p className="text-3xl font-bold text-white">{stats?.activeProjects || 12}</p>
                  <p className="text-xs text-blue-300 mt-1">+2 from last month</p>
                </div>
                <div className="bg-blue-600/30 p-3 rounded-full backdrop-blur-sm flex-shrink-0 ml-3">
                  <TrendingUp className="h-6 w-6 text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-cyan-900 to-cyan-800 border-cyan-700 relative overflow-hidden h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-transparent"></div>
            <CardContent className="p-6 relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cyan-200 truncate">Sites Under Review</p>
                  <p className="text-3xl font-bold text-white">3</p>
                  <p className="text-xs text-cyan-300 mt-1">Final selection pending</p>
                </div>
                <div className="bg-cyan-600/30 p-3 rounded-full backdrop-blur-sm flex-shrink-0 ml-3">
                  <MapPin className="h-6 w-6 text-cyan-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700 relative overflow-hidden h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent"></div>
            <CardContent className="p-6 relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-200 truncate">Total Investment</p>
                  <p className="text-3xl font-bold text-white">$45.2M</p>
                  <p className="text-xs text-green-300 mt-1">Across all sites</p>
                </div>
                <div className="bg-green-600/30 p-3 rounded-full backdrop-blur-sm flex-shrink-0 ml-3">
                  <DollarSign className="h-6 w-6 text-green-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700 relative overflow-hidden h-[140px]">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent"></div>
            <CardContent className="p-6 relative h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-orange-200 truncate">Expected ROI</p>
                  <p className="text-3xl font-bold text-white">22.1%</p>
                  <p className="text-xs text-orange-300 mt-1">Site C leading</p>
                </div>
                <div className="bg-orange-600/30 p-3 rounded-full backdrop-blur-sm flex-shrink-0 ml-3">
                  <Target className="h-6 w-6 text-orange-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Site Selection Dashboard */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-gray-900 border-gray-700 shadow-2xl">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-2xl text-cyan-300 flex items-center">
              <Building2 className="h-6 w-6 mr-3" />
              Site Selection & Business Case Development
              <Badge className="ml-3 bg-green-600">3 Sites Active</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="business-case" className="w-full">
              <TabsList className="bg-gray-800 text-gray-400 grid grid-cols-3 lg:grid-cols-6 h-auto p-1 rounded-lg">
                <TabsTrigger value="business-case" className="text-xs px-3 py-2 data-[state=active]:bg-cyan-600">Business Case</TabsTrigger>
                <TabsTrigger value="flexsim" className="text-xs px-3 py-2 data-[state=active]:bg-cyan-600">Flexsim API</TabsTrigger>
                <TabsTrigger value="incentives" className="text-xs px-3 py-2 data-[state=active]:bg-cyan-600">Incentives</TabsTrigger>
                <TabsTrigger value="comparison" className="text-xs px-3 py-2 data-[state=active]:bg-cyan-600">Site Comparison</TabsTrigger>
                <TabsTrigger value="space-plan" className="text-xs px-3 py-2 data-[state=active]:bg-cyan-600">Space Plan</TabsTrigger>
                <TabsTrigger value="documents" className="text-xs px-3 py-2 data-[state=active]:bg-cyan-600">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="business-case" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-cyan-400" />
                      Financial Metrics Comparison
                    </h4>
                    <div className="h-[400px] bg-gray-800 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={businessCaseData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="metric" tick={{ fill: '#d1d5db', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#d1d5db', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151',
                              borderRadius: '12px',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                            }}
                          />
                          <Bar dataKey="siteA" name="Site A" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="siteB" name="Site B" fill="#10b981" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="siteC" name="Site C" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                          <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={3} strokeDasharray="5 5" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <Building2 className="h-5 w-5 mr-2 text-cyan-400" />
                        Project Overview
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Facility Size</span>
                            <span className="text-white font-semibold">125,000 sq ft</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Expected Employees</span>
                            <span className="text-white font-semibold">450 FTE</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Total Investment</span>
                            <span className="text-green-400 font-bold text-lg">$45.2M</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">Break Even Point</span>
                            <span className="text-cyan-400 font-semibold">Year 3.2</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-4">Site Ranking</h4>
                      <div className="space-y-3">
                        {[
                          { site: 'Site C', score: 95, color: 'bg-green-600', trend: '+5%' },
                          { site: 'Site A', score: 87, color: 'bg-blue-600', trend: '+2%' },
                          { site: 'Site B', score: 78, color: 'bg-orange-600', trend: '-1%' }
                        ].map((item, index) => (
                          <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <span className="text-white font-medium">{item.site}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-white font-bold">{item.score}/100</span>
                                <span className="text-green-400 text-xs ml-2">{item.trend}</span>
                              </div>
                            </div>
                            <Progress value={item.score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="flexsim" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <Cpu className="h-5 w-5 mr-2 text-green-400" />
                      Manufacturing Simulation Results
                    </h4>
                    <div className="h-[400px] bg-gray-800 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={flexsimData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="time" tick={{ fill: '#d1d5db', fontSize: 12 }} />
                          <YAxis tick={{ fill: '#d1d5db', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151',
                              borderRadius: '12px'
                            }}
                          />
                          <Area type="monotone" dataKey="capacity" stackId="1" stroke="#6b7280" fill="#6b7280" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="throughput" stackId="2" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.6} />
                          <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                        API Integration Status
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 flex items-center">
                              <Activity className="h-4 w-4 mr-2 text-green-400" />
                              Connection Status
                            </span>
                            <Badge className="bg-green-600">Active</Badge>
                          </div>
                          <div className="text-sm text-gray-300">Real-time data streaming</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Last Sync</span>
                            <span className="text-white">2 minutes ago</span>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Simulation Runs</span>
                            <span className="text-white">24/month</span>
                          </div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Data Points</span>
                            <span className="text-cyan-400">1,247,892</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-4">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                          <div className="text-2xl font-bold text-cyan-400">94%</div>
                          <div className="text-sm text-gray-400">Efficiency</div>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                          <div className="text-2xl font-bold text-green-400">95</div>
                          <div className="text-sm text-gray-400">Throughput</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="incentives" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <PieChart className="h-5 w-5 mr-2 text-purple-400" />
                      Labour & Government Incentives Distribution
                    </h4>
                    <div className="h-[400px] bg-gray-800 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={incentivesData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            dataKey="value"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                            labelLine={false}
                          >
                            {incentivesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151',
                              borderRadius: '12px'
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                      Available Incentives
                    </h4>
                    {incentivesData.map((incentive, index) => (
                      <div key={incentive.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: incentive.color }}
                            ></div>
                            <span className="text-white font-medium text-lg">{incentive.name}</span>
                          </div>
                          <Badge className="bg-green-600">Available</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-green-400">${incentive.value}M</div>
                            <div className="text-gray-400 text-sm">Total Value</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-cyan-400">{incentive.percentage}%</div>
                            <div className="text-gray-400 text-sm">Of Total</div>
                          </div>
                        </div>
                        <Progress value={incentive.percentage} className="mt-4 h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-400" />
                      Multi-Criteria Site Analysis
                    </h4>
                    <div className="h-[400px] bg-gray-800 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={siteComparisonData}>
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis tick={{ fill: '#d1d5db', fontSize: 11 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#d1d5db', fontSize: 10 }} />
                          <Radar name="Site A" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} strokeWidth={3} />
                          <Radar name="Site B" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={3} />
                          <Radar name="Site C" dataKey="C" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1f2937', 
                              border: '1px solid #374151',
                              borderRadius: '12px'
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-orange-400" />
                      Cost & Schedule Analysis
                    </h4>
                    <div className="space-y-4">
                      {costScheduleData.map((phase, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="text-white font-medium">{phase.phase}</h5>
                            <Badge className="bg-blue-600">Budget: ${phase.budget}M</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-cyan-400 font-semibold">${phase.siteA.cost}M</div>
                              <div className="text-gray-400">Site A</div>
                              <div className="text-xs text-gray-500">{phase.siteA.schedule} months</div>
                            </div>
                            <div className="text-center">
                              <div className="text-orange-400 font-semibold">${phase.siteB.cost}M</div>
                              <div className="text-gray-400">Site B</div>
                              <div className="text-xs text-gray-500">{phase.siteB.schedule} months</div>
                            </div>
                            <div className="text-center">
                              <div className="text-green-400 font-semibold">${phase.siteC.cost}M</div>
                              <div className="text-gray-400">Site C</div>
                              <div className="text-xs text-gray-500">{phase.siteC.schedule} months</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="space-plan" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-indigo-400" />
                      Space Allocation Breakdown
                    </h4>
                    <div className="space-y-4">
                      {[
                        { name: 'Manufacturing', size: 65000, percentage: 52, color: 'bg-blue-600' },
                        { name: 'Warehouse', size: 35000, percentage: 28, color: 'bg-green-600' },
                        { name: 'Office Space', size: 15000, percentage: 12, color: 'bg-cyan-600' },
                        { name: 'Common Areas', size: 10000, percentage: 8, color: 'bg-orange-600' }
                      ].map((space, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-white font-medium">{space.name}</span>
                            <span className="text-gray-300">{space.size.toLocaleString()} sq ft</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={space.percentage} className="flex-1 h-3" />
                            <span className="text-sm text-gray-400 w-12">{space.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-purple-400" />
                      Preliminary Floor Plan Visualization
                    </h4>
                    <div className="bg-gray-800 rounded-xl p-8 h-[400px] flex flex-col items-center justify-center border border-gray-700">
                      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                        <div className="bg-blue-600/20 border-2 border-blue-600 rounded-lg p-4 text-center">
                          <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                          <div className="text-blue-400 font-medium">Manufacturing</div>
                          <div className="text-xs text-gray-400">65,000 sq ft</div>
                        </div>
                        <div className="bg-green-600/20 border-2 border-green-600 rounded-lg p-4 text-center">
                          <Package className="h-8 w-8 mx-auto mb-2 text-green-400" />
                          <div className="text-green-400 font-medium">Warehouse</div>
                          <div className="text-xs text-gray-400">35,000 sq ft</div>
                        </div>
                        <div className="bg-cyan-600/20 border-2 border-cyan-600 rounded-lg p-4 text-center">
                          <Users className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                          <div className="text-cyan-400 font-medium">Office</div>
                          <div className="text-xs text-gray-400">15,000 sq ft</div>
                        </div>
                        <div className="bg-orange-600/20 border-2 border-orange-600 rounded-lg p-4 text-center">
                          <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                          <div className="text-orange-400 font-medium">Common</div>
                          <div className="text-xs text-gray-400">10,000 sq ft</div>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <div className="text-gray-400 mb-2">Detailed CAD integration pending</div>
                        <Button variant="outline" className="border-gray-600 text-gray-300">
                          <Eye className="h-4 w-4 mr-2" />
                          View 3D Model
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-400" />
                      Document Review & AI Analysis
                    </h4>
                    <div className="space-y-4">
                      {[
                        { type: 'Topographic Survey', status: 'AI Reviewed', insight: 'Minimal grading required - optimal drainage patterns identified', icon: MapPin, confidence: 95 },
                        { type: 'Zoning Documents', status: 'In Review', insight: 'Compliance verified - manufacturing use permitted', icon: Building2, confidence: 88 },
                        { type: 'Lease Agreement', status: 'AI Analysis', insight: 'Favorable terms identified - 15% below market rate', icon: FileText, confidence: 92 },
                        { type: 'Environmental Report', status: 'Completed', insight: 'No major concerns - minor soil remediation needed', icon: AlertTriangle, confidence: 97 }
                      ].map((doc, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <doc.icon className="h-5 w-5 text-cyan-300" />
                              <span className="text-white font-medium">{doc.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                doc.status === 'Completed' ? 'bg-green-600' : 
                                doc.status === 'AI Reviewed' ? 'bg-blue-600' : 'bg-yellow-600'
                              }>
                                {doc.status}
                              </Badge>
                              <div className="text-xs text-gray-400">{doc.confidence}%</div>
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm mb-3">{doc.insight}</div>
                          <Progress value={doc.confidence} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-6 flex items-center">
                      <Settings2 className="h-5 w-5 mr-2 text-green-400" />
                      Facility Management Insights
                    </h4>
                    <div className="space-y-4 mb-8">
                      {[
                        { category: 'Site Painting', insight: 'High-durability coating recommended for industrial environment - estimated 15-year lifecycle', icon: PaintBucket, priority: 'Medium', cost: '$125K' },
                        { category: 'Landscape Modifications', insight: 'Native drought-resistant plants recommended - 40% water savings potential', icon: Trees, priority: 'Low', cost: '$85K' },
                        { category: 'BMS Integration', insight: 'Schneider Electric system compatible - existing infrastructure leverage possible', icon: Settings2, priority: 'High', cost: '$340K' }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 text-cyan-300" />
                              <span className="text-white font-medium">{item.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                item.priority === 'High' ? 'bg-red-600' : 
                                item.priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                              }>
                                {item.priority}
                              </Badge>
                              <div className="text-cyan-400 font-medium">{item.cost}</div>
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm">{item.insight}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h5 className="text-white font-medium mb-4 flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        Previous Property Comparisons
                      </h5>
                      <div className="space-y-3">
                        {[
                          { name: 'Downtown Property A', match: 85, type: 'Lease Terms', details: 'Similar manufacturing setup' },
                          { name: 'Industrial Complex B', match: 92, type: 'Operations', details: 'Comparable facility size' },
                          { name: 'Suburban Site C', match: 78, type: 'Infrastructure', details: 'Utilities compatibility' }
                        ].map((property, index) => (
                          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white font-medium">{property.name}</span>
                              <span className="text-cyan-400 font-bold">{property.match}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">{property.type}</span>
                              <span className="text-gray-500">{property.details}</span>
                            </div>
                            <Progress value={property.match} className="mt-2 h-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* New comprehensive grid layout to fill all space */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects - Enhanced */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-gray-900 border-gray-700 h-full">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{project.title}</h4>
                    <Badge className={`${getStatusBadgeColor(project.status)} text-white`}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{project.location}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-sm text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="mb-3 h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Budget</span>
                    <span className="font-medium text-green-400">
                      ${(project.budget || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Site Ranking Section - NEW */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card className="bg-gray-900 border-gray-700 h-full">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Site Performance Ranking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { rank: 1, name: 'Downtown Metro Site', score: 94, change: '+2', trend: 'up', color: 'text-green-400', bgColor: 'bg-green-600/20' },
                { rank: 2, name: 'Industrial Complex B', score: 89, change: '+1', trend: 'up', color: 'text-blue-400', bgColor: 'bg-blue-600/20' },
                { rank: 3, name: 'Riverside District', score: 87, change: '0', trend: 'stable', color: 'text-orange-400', bgColor: 'bg-orange-600/20' },
                { rank: 4, name: 'Tech Park East', score: 82, change: '-1', trend: 'down', color: 'text-red-400', bgColor: 'bg-red-600/20' },
                { rank: 5, name: 'Suburban Gateway', score: 78, change: '+3', trend: 'up', color: 'text-purple-400', bgColor: 'bg-purple-600/20' }
              ].map((site) => (
                <div key={site.rank} className={`${site.bgColor} rounded-xl p-4 border border-gray-700`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">#{site.rank}</span>
                      </div>
                      <span className="font-medium text-white">{site.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${site.color}`}>{site.change}</span>
                      {site.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-400" />}
                      {site.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />}
                      {site.trend === 'stable' && <Activity className="h-4 w-4 text-gray-400" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Progress value={site.score} className="flex-1 mr-3 h-2" />
                    <span className={`font-bold ${site.color}`}>{site.score}/100</span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 mt-4">
                <Award className="h-4 w-4 mr-2" />
                View Full Rankings
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Urgent Tasks & Action Items - Enhanced */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <Card className="bg-gray-900 border-gray-700 h-full">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Urgent Action Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { task: 'Finalize Site C Lease Agreement', priority: 'critical', due: '2 days', status: 'pending' },
                { task: 'Environmental Impact Assessment', priority: 'high', due: '1 week', status: 'in-progress' },
                { task: 'Zoning Permit Application', priority: 'high', due: '5 days', status: 'pending' },
                { task: 'Infrastructure Cost Analysis', priority: 'medium', due: '2 weeks', status: 'review' },
                { task: 'Local Authority Consultation', priority: 'high', due: '3 days', status: 'scheduled' }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white text-sm">{item.task}</span>
                    <Badge className={`${getPriorityBadgeColor(item.priority)} text-white text-xs`}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-400">Due in {item.due}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                      item.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                      item.status === 'review' ? 'bg-purple-600/20 text-purple-400' :
                      'bg-green-600/20 text-green-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-red-600 hover:bg-red-700 mt-4">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View All Tasks
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <LineChart className="h-5 w-5 text-green-400" />
                Financial Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$45.2M</div>
                  <div className="text-sm text-gray-400">Total Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">22.1%</div>
                  <div className="text-sm text-gray-400">Expected ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">3.2yr</div>
                  <div className="text-sm text-gray-400">Payback Period</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { metric: 'Cash Flow Projection', value: 85, color: 'bg-green-500' },
                  { metric: 'Budget Compliance', value: 92, color: 'bg-blue-500' },
                  { metric: 'Cost Efficiency', value: 78, color: 'bg-orange-500' },
                  { metric: 'Risk Assessment', value: 88, color: 'bg-purple-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.metric}</span>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk & Compliance Dashboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                Risk & Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-green-400">Low</div>
                  <div className="text-xs text-gray-400">Overall Risk</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-blue-400">98%</div>
                  <div className="text-xs text-gray-400">Compliance</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { area: 'Environmental Compliance', status: 'compliant', risk: 'low' },
                  { area: 'Zoning Regulations', status: 'compliant', risk: 'low' },
                  { area: 'Safety Standards', status: 'pending review', risk: 'medium' },
                  { area: 'Financial Regulations', status: 'compliant', risk: 'low' },
                  { area: 'Building Codes', status: 'in progress', risk: 'medium' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <span className="text-white text-sm">{item.area}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${
                        item.status === 'compliant' ? 'bg-green-600' :
                        item.status === 'pending review' ? 'bg-yellow-600' :
                        'bg-blue-600'
                      }`}>
                        {item.status}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${
                        item.risk === 'low' ? 'bg-green-400' :
                        item.risk === 'medium' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0">
                <Calendar className="h-8 w-8" />
                <span className="text-sm font-medium">Schedule Site Visit</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 border-0">
                <CheckCircle className="h-8 w-8" />
                <span className="text-sm font-medium">Review Documents</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 border-0">
                <BarChart3 className="h-8 w-8" />
                <span className="text-sm font-medium">Run Analysis</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 border-0">
                <FileText className="h-8 w-8" />
                <span className="text-sm font-medium">Generate Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
