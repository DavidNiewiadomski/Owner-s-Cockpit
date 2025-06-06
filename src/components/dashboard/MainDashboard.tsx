import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, Wrench, Package, MapPin, Star, Building2, DollarSign, FileText, Zap, Cpu, Eye, PaintBucket, Trees, Settings2, BarChart3, PieChart, Activity, Target, Award, Briefcase, Shield, CircleDot, AlertCircle, Wifi, WifiOff, ThermometerSun, Fan, Lightbulb, Home } from 'lucide-react';
import { getDashboardStats, getProjects, getTasks } from '@/services/dataService';
import type { Project, Task } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, AreaChart } from 'recharts';

// Construction Projects Data with traffic light status
const constructionProjects = [
  {
    id: '1',
    name: 'Arsenal-1 hyperscale manufacturing complex',
    location: 'Pickaway County, OH',
    budgetHealth: 'red', // Over budget
    scheduleHealth: 'yellow', // At risk
    totalCost: 45700000,
    spent: 42300000,
    progress: 88,
    phase: 'Final Systems Installation',
    dueDate: '2025-03-15',
    changeOrders: 8,
    cashflowStatus: 'critical'
  },
  {
    id: '2', 
    name: 'Atlanta (UAV "Allied Studios")',
    location: '1435 Hills Pl. NW, Atlanta GA 30318',
    budgetHealth: 'green', // On budget
    scheduleHealth: 'green', // On schedule
    totalCost: 18900000,
    spent: 12800000,
    progress: 68,
    phase: 'Interior Build-out',
    dueDate: '2024-12-20',
    changeOrders: 3,
    cashflowStatus: 'healthy'
  },
  {
    id: '3',
    name: 'Quonset Point AUV plant',
    location: 'Flex Tech Park Bldg 11, Quonset Business Park, North Kingstown RI 02852',
    budgetHealth: 'yellow', // Slightly over
    scheduleHealth: 'red', // Delayed
    totalCost: 28400000,
    spent: 8200000,
    progress: 22,
    phase: 'Foundation & Utilities',
    dueDate: '2025-06-30',
    changeOrders: 12,
    cashflowStatus: 'warning'
  }
];

// BMS Alarms Data
const bmsAlarms = [
  { id: 'BMS-001', system: 'HVAC Zone 3', priority: 'high', message: 'Temperature sensor fault - Conference Room A', time: '2 min ago', building: 'Arsenal-1' },
  { id: 'BMS-002', system: 'Fire Safety', priority: 'critical', message: 'Smoke detector offline - Floor 2 East Wing', time: '15 min ago', building: 'Atlanta Studio' },
  { id: 'BMS-003', system: 'Lighting Control', priority: 'medium', message: 'Circuit breaker tripped - Parking Garage', time: '1 hour ago', building: 'Quonset Point' },
  { id: 'BMS-004', system: 'Security', priority: 'high', message: 'Card reader malfunction - Main Entrance', time: '45 min ago', building: 'Arsenal-1' }
];

// Equipment Maintenance Data
const equipmentMaintenance = [
  { id: 'EQ-001', equipment: 'AHU-9 Filter Replacement', building: 'Arsenal-1', priority: 'high', dueDate: '2024-12-08', cost: 2500, status: 'pending_approval' },
  { id: 'EQ-002', equipment: 'Generator Testing', building: 'Atlanta Studio', priority: 'critical', dueDate: '2024-12-05', cost: 1200, status: 'scheduled' },
  { id: 'EQ-003', equipment: 'Elevator Annual Inspection', building: 'Quonset Point', priority: 'medium', dueDate: '2024-12-15', cost: 3200, status: 'in_progress' },
  { id: 'EQ-004', equipment: 'Chiller Coil Cleaning', building: 'Arsenal-1', priority: 'medium', dueDate: '2024-12-20', cost: 1800, status: 'pending_approval' }
];

// Space Usage Data (API Integrations)
const spaceUsageData = [
  { space: 'Conference Rooms', historical: 78, planned: 85, building: 'Arsenal-1' },
  { space: 'Manufacturing Floor', historical: 92, planned: 88, building: 'Arsenal-1' },
  { space: 'Office Areas', historical: 65, planned: 75, building: 'Atlanta Studio' },
  { space: 'Cafeteria', historical: 45, planned: 62, building: 'Atlanta Studio' },
  { space: 'Workshop', historical: 83, planned: 80, building: 'Quonset Point' }
];

// Lease Insights Data
const leaseInsights = [
  { property: 'Arsenal-1', landlordResp: 'Structural, Roof, HVAC Core', tenantResp: 'Interior, Utilities, Security', issue: 'HVAC upgrade responsibility dispute', priority: 'high' },
  { property: 'Atlanta Studio', landlordResp: 'Building Shell, Parking', tenantResp: 'Interior Fit-out, Equipment', issue: 'Parking allocation amendments needed', priority: 'medium' },
  { property: 'Quonset Point', landlordResp: 'Foundation, Exterior', tenantResp: 'Manufacturing Equipment, Interior', issue: 'Vibration mitigation clause review', priority: 'low' }
];

// Change Orders Data
const changeOrders = [
  { id: 'CO-085', project: 'Arsenal-1', description: 'Additional fire suppression for manufacturing area', cost: 125000, status: 'flagged', designImpact: 'high' },
  { id: 'CO-086', project: 'Arsenal-1', description: 'Upgraded electrical capacity for equipment', cost: 85000, status: 'approved', designImpact: 'medium' },
  { id: 'CO-087', project: 'Atlanta Studio', description: 'Soundproofing for recording booths', cost: 45000, status: 'pending', designImpact: 'low' },
  { id: 'CO-088', project: 'Quonset Point', description: 'Additional crane capacity requirements', cost: 220000, status: 'flagged', designImpact: 'high' }
];

// Updated Chart data with better names for the futuristic theme
const facilityTicketsData = [
  { name: 'Critical Alerts', value: 8, color: '#FF0080' },
  { name: 'High Priority', value: 15, color: '#00D4FF' },
  { name: 'Standard', value: 23, color: '#00FF88' }
];

const spaceUsageComparisonData = [
  { space: 'Conf', historical: 78, planned: 85 },
  { space: 'Mfg', historical: 92, planned: 88 },
  { space: 'Office', historical: 65, planned: 75 },
  { space: 'Dining', historical: 45, planned: 62 },
  { space: 'Workshop', historical: 83, planned: 80 }
];

const leaseResponsibilityData = [
  { property: 'Arsenal-1', landlordScore: 85, tenantScore: 92, issues: 3 },
  { property: 'Atlanta', landlordScore: 78, tenantScore: 88, issues: 2 },
  { property: 'Quonset', landlordScore: 90, tenantScore: 85, issues: 1 }
];

// Simplified maintenance data for better chart display
const maintenanceAnalysisData = [
  { item: 'HVAC Filter', cost: 2500, priority: 3, building: 'Arsenal-1' },
  { item: 'Generator Test', cost: 1200, priority: 3, building: 'Atlanta' },
  { item: 'Elevator Inspect', cost: 3200, priority: 2, building: 'Quonset' },
  { item: 'Chiller Clean', cost: 1800, priority: 2, building: 'Arsenal-1' }
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

  const getHealthIndicator = (health: string) => {
    const colors = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500', 
      red: 'bg-red-500'
    };
    return <div className={`w-4 h-4 rounded-full ${colors[health as keyof typeof colors]} shadow-lg`}></div>;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-green-400 bg-green-900/20';
    }
  };

  // Custom futuristic tooltip component
  const FuturisticTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-md border border-cyan-400/30 rounded-lg p-3 shadow-lg shadow-cyan-400/20">
          <p className="text-cyan-400 font-medium text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm">
              <span style={{ color: entry.color }}>{entry.name}: </span>
              <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Project Health Overview with Traffic Lights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {constructionProjects.map((project) => (
          <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gray-900 border-gray-700 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white text-lg font-bold mb-1">{project.name}</CardTitle>
                    <p className="text-gray-300 text-sm">{project.location}</p>
                    <p className="text-gray-400 text-xs mt-1">Phase: {project.phase}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Traffic Light Indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Budget Health</span>
                      {getHealthIndicator(project.budgetHealth)}
                    </div>
                    <div className="text-lg font-bold text-white">${(project.spent / 1000000).toFixed(1)}M / ${(project.totalCost / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Schedule Health</span>
                      {getHealthIndicator(project.scheduleHealth)}
                    </div>
                    <div className="text-lg font-bold text-white">{project.progress}% Complete</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Project Progress</span>
                    <span className="text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Due Date</span>
                    <div className="text-white font-medium">{project.dueDate}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">Change Orders</span>
                    <div className="text-orange-400 font-medium">{project.changeOrders}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className={`${
                    project.cashflowStatus === 'healthy' ? 'bg-green-600' :
                    project.cashflowStatus === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    Cashflow: {project.cashflowStatus}
                  </Badge>
                  <Button variant="outline" size="sm" className="text-cyan-400 border-cyan-400">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="bg-gray-800 text-gray-400 grid grid-cols-2 lg:grid-cols-6 h-auto p-1 rounded-lg">
          <TabsTrigger value="controls" className="text-xs px-3 py-2">Project Controls</TabsTrigger>
          <TabsTrigger value="facility" className="text-xs px-3 py-2">Facility Mgmt</TabsTrigger>
          <TabsTrigger value="space" className="text-xs px-3 py-2">Space Usage</TabsTrigger>
          <TabsTrigger value="bms" className="text-xs px-3 py-2">BMS Alarms</TabsTrigger>
          <TabsTrigger value="maintenance" className="text-xs px-3 py-2">Maintenance</TabsTrigger>
          <TabsTrigger value="lease" className="text-xs px-3 py-2">Lease Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Orders */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  Construction Change Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {changeOrders.map((order) => (
                  <div key={order.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{order.id} - {order.project}</span>
                      <Badge className={`${
                        order.status === 'flagged' ? 'bg-red-600' :
                        order.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{order.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-bold">${order.cost.toLocaleString()}</span>
                      <Badge variant="outline" className={`text-xs ${
                        order.designImpact === 'high' ? 'border-red-400 text-red-400' :
                        order.designImpact === 'medium' ? 'border-yellow-400 text-yellow-400' :
                        'border-green-400 text-green-400'
                      }`}>
                        Design Impact: {order.designImpact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Financial Overview */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  Project Financial Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">$93M</div>
                    <div className="text-sm text-gray-400">Total Project Cost</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">$63.3M</div>
                    <div className="text-sm text-gray-400">Total Spent</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Cashflow Status</span>
                      <span className="text-yellow-400 font-medium">2 Pending Approvals</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Schedule Significance</span>
                      <span className="text-red-400 font-medium">Critical Path Impact</span>
                    </div>
                    <div className="text-xs text-gray-500">Arsenal-1 and Quonset Point require immediate attention</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="facility" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-purple-400" />
                  Facility Management Tickets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-red-400">8</div>
                    <div className="text-xs text-gray-400">Critical</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">15</div>
                    <div className="text-xs text-gray-400">High</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-green-400">23</div>
                    <div className="text-xs text-gray-400">Normal</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { id: 'FM-001', issue: 'HVAC Unit A3 Not Responding', building: 'Arsenal-1', priority: 'critical' },
                    { id: 'FM-002', issue: 'Conference Room Projector Malfunction', building: 'Atlanta Studio', priority: 'high' },
                    { id: 'FM-003', issue: 'Parking Lot Lighting Outage', building: 'Quonset Point', priority: 'high' },
                    { id: 'FM-004', issue: 'Restroom Supply Restocking Needed', building: 'Arsenal-1', priority: 'normal' }
                  ].map((ticket) => (
                    <div key={ticket.id} className="bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium text-sm">{ticket.id}</span>
                          <span className="text-gray-400 text-xs ml-2">{ticket.building}</span>
                        </div>
                        <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{ticket.issue}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Predictive Maintenance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <h4 className="text-blue-300 font-medium mb-2">Construction Data Preview</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Based on Arsenal-1 construction specifications, AHU-9 filter replacement is recommended due to high-efficiency manufacturing requirements.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Estimated Cost: $2,500</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Request Approval
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-white font-medium">Upcoming Maintenance</h4>
                  {['Generator Testing - Atlanta', 'Elevator Inspection - Quonset', 'Fire System Check - Arsenal-1'].map((item, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{item}</span>
                      <span className="text-gray-400 text-xs">Due in {3 + index} days</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="space" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-green-400" />
                  Occuspace - Historical Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {spaceUsageData.map((space, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{space.space}</span>
                      <span className="text-gray-400 text-sm">{space.building}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Historical</span>
                          <span className="text-green-400">{space.historical}%</span>
                        </div>
                        <Progress value={space.historical} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Kadence - Planned Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
                  <h4 className="text-blue-300 font-medium mb-2">Employee Trends Impact</h4>
                  <p className="text-gray-300 text-sm">
                    Based on planned usage, food planning shows 23% increase for Q1 2025. Restroom restocking frequency should increase by 18%.
                  </p>
                </div>
                
                {spaceUsageData.map((space, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{space.space}</span>
                      <span className="text-gray-400 text-sm">{space.building}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Planned</span>
                          <span className="text-blue-400">{space.planned}%</span>
                        </div>
                        <Progress value={space.planned} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bms" className="mt-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ThermometerSun className="h-5 w-5 text-red-400" />
                Building Management System Alarms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bmsAlarms.map((alarm) => (
                <div key={alarm.id} className={`rounded-lg p-4 border ${
                  alarm.priority === 'critical' ? 'bg-red-900/20 border-red-700' :
                  alarm.priority === 'high' ? 'bg-orange-900/20 border-orange-700' :
                  'bg-yellow-900/20 border-yellow-700'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {alarm.system === 'HVAC Zone 3' && <Fan className="h-4 w-4 text-blue-400" />}
                      {alarm.system === 'Fire Safety' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                      {alarm.system === 'Lighting Control' && <Lightbulb className="h-4 w-4 text-yellow-400" />}
                      {alarm.system === 'Security' && <Shield className="h-4 w-4 text-purple-400" />}
                      <span className="text-white font-medium">{alarm.system}</span>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(alarm.priority)} variant="outline">
                        {alarm.priority}
                      </Badge>
                      <div className="text-gray-400 text-xs mt-1">{alarm.time}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{alarm.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{alarm.building}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-orange-400" />
                Equipment/Assets Requiring Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipmentMaintenance.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{item.equipment}</h4>
                      <p className="text-gray-400 text-sm">{item.building}</p>
                    </div>
                    <Badge className={getPriorityColor(item.priority)} variant="outline">
                      {item.priority}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <span className="text-gray-400 text-xs">Due Date</span>
                      <div className="text-white text-sm">{item.dueDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Estimated Cost</span>
                      <div className="text-green-400 text-sm font-medium">${item.cost.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Status</span>
                      <div className={`text-sm font-medium ${
                        item.status === 'pending_approval' ? 'text-yellow-400' :
                        item.status === 'scheduled' ? 'text-blue-400' : 'text-cyan-400'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  
                  {item.equipment === 'AHU-9 Filter Replacement' && (
                    <div className="bg-blue-900/20 border border-blue-700 rounded p-3 mt-3">
                      <p className="text-blue-300 text-sm">
                        🔗 Construction data indicates high-efficiency filters required for manufacturing environment
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-3">
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      {item.status === 'pending_approval' ? 'Review Approval' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lease" className="mt-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
                Lease Insights & Facility Management Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaseInsights.map((lease, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{lease.property}</h4>
                    <Badge className={`${
                      lease.priority === 'high' ? 'bg-red-600' :
                      lease.priority === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {lease.priority} priority
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-gray-400 text-sm font-medium">Landlord Responsibility</span>
                      <p className="text-green-400 text-sm">{lease.landlordResp}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm font-medium">Tenant Responsibility</span>
                      <p className="text-blue-400 text-sm">{lease.tenantResp}</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-900/20 border border-yellow-700 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Business Operations Challenge</span>
                    </div>
                    <p className="text-gray-300 text-sm">{lease.issue}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Futuristic Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Facility Management Tickets Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="bg-black/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/20">
            <CardHeader className="pb-4 border-b border-cyan-500/20">
              <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg font-bold">
                <Wrench className="h-5 w-5 text-cyan-400" />
                System Alert Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                      data={facilityTicketsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      stroke="rgba(0, 212, 255, 0.3)"
                      strokeWidth={2}
                    >
                      {facilityTicketsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<FuturisticTooltip />} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {facilityTicketsData.map((item, index) => (
                  <div key={index} className="text-center p-2 bg-gray-900/50 rounded border border-cyan-500/20">
                    <div className="text-xl font-bold" style={{ color: item.color }}>
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-400">{item.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Space Usage Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Card className="bg-black/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/20">
            <CardHeader className="pb-4 border-b border-cyan-500/20">
              <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg font-bold">
                <Wifi className="h-5 w-5 text-cyan-400" />
                Space Analytics Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={spaceUsageComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                    <XAxis 
                      dataKey="space" 
                      tick={{ fill: '#00D4FF', fontSize: 12, fontWeight: 'bold' }}
                      axisLine={{ stroke: '#00D4FF' }}
                    />
                    <YAxis 
                      tick={{ fill: '#00D4FF', fontSize: 12 }}
                      axisLine={{ stroke: '#00D4FF' }}
                      label={{ value: 'Usage %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#00D4FF' } }}
                    />
                    <Tooltip content={<FuturisticTooltip />} />
                    <Bar dataKey="historical" fill="url(#historicalGradient)" name="Historical Usage %" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="planned" fill="url(#plannedGradient)" name="Planned Usage %" radius={[2, 2, 0, 0]} />
                    <defs>
                      <linearGradient id="historicalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF88" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00FF88" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded shadow-sm shadow-green-400"></div>
                  <span className="text-sm text-cyan-300">Historical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded shadow-sm shadow-cyan-400"></div>
                  <span className="text-sm text-cyan-300">Planned</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lease Responsibility Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="bg-black/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/20">
            <CardHeader className="pb-4 border-b border-cyan-500/20">
              <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg font-bold">
                <FileText className="h-5 w-5 text-cyan-400" />
                Contract Compliance Radar
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    data={leaseResponsibilityData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <PolarGrid stroke="rgba(0, 212, 255, 0.3)" />
                    <PolarAngleAxis 
                      dataKey="property" 
                      tick={{ fill: '#00D4FF', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <PolarRadiusAxis 
                      angle={0} 
                      domain={[0, 100]} 
                      tick={{ fill: '#00D4FF', fontSize: 10 }}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Radar
                      name="Landlord Score"
                      dataKey="landlordScore"
                      stroke="#00FF88"
                      fill="#00FF88"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                    <Radar
                      name="Tenant Score"
                      dataKey="tenantScore"
                      stroke="#00D4FF"
                      fill="#00D4FF"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                    <Tooltip content={<FuturisticTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded shadow-sm shadow-green-400"></div>
                  <span className="text-sm text-cyan-300">Landlord</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded shadow-sm shadow-cyan-400"></div>
                  <span className="text-sm text-cyan-300">Tenant</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Predictive Maintenance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <Card className="bg-black/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/20">
          <CardHeader className="pb-4 border-b border-cyan-500/20">
            <CardTitle className="text-cyan-400 flex items-center gap-2 text-lg font-bold">
              <Target className="h-5 w-5 text-cyan-400" />
              Predictive Maintenance Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={maintenanceAnalysisData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.2)" />
                  <XAxis 
                    dataKey="item" 
                    tick={{ fill: '#00D4FF', fontSize: 11, fontWeight: 'bold' }}
                    axisLine={{ stroke: '#00D4FF' }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fill: '#00D4FF', fontSize: 12 }}
                    axisLine={{ stroke: '#00D4FF' }}
                    label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#00D4FF' } }}
                  />
                  <Tooltip content={<FuturisticTooltip />} />
                  <Bar 
                    dataKey="cost" 
                    fill="url(#maintenanceGradient)"
                    name="Maintenance Cost"
                    radius={[4, 4, 0, 0]}
                    stroke="rgba(255, 0, 128, 0.5)"
                    strokeWidth={1}
                  />
                  <defs>
                    <linearGradient id="maintenanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF0080" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#FF0080" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg p-6">
              <h4 className="text-cyan-300 font-bold mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                AI-Driven Predictive Insights & Recommendations
              </h4>
              
              <div className="space-y-4">
                {/* Critical Priority Insight */}
                <div className="bg-red-900/20 border border-red-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 font-semibold text-sm">Critical Priority</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    <strong>AHU-9 Filter Replacement ($2,500):</strong> Arsenal-1's manufacturing environment requires HEPA-grade filtration. 
                    Predictive algorithms indicate 94% probability of system failure within 72 hours without intervention.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Potential savings: $15,000 in emergency repairs | Risk reduction: 18% fewer facility tickets
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1">
                      Immediate Action Required
                    </Button>
                  </div>
                </div>

                {/* High Priority Insights */}
                <div className="bg-orange-900/20 border border-orange-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-400 font-semibold text-sm">High Priority</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    <strong>Generator Testing ($1,200):</strong> Atlanta Studio's backup power system shows 87% efficiency. 
                    Cross-referencing with weather patterns suggests optimal testing window: next 5 days before storm season.
                  </p>
                  <div className="text-xs text-gray-400">
                    Compliance requirement | Prevents $25K in downtime costs
                  </div>
                </div>

                {/* Optimization Insight */}
                <div className="bg-green-900/20 border border-green-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">Cost Optimization</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    <strong>Maintenance Bundling Opportunity:</strong> Scheduling Elevator Inspection ($3,200) and Chiller Cleaning ($1,800) 
                    simultaneously could reduce contractor mobilization costs by 22% ($1,100 savings).
                  </p>
                  <div className="text-xs text-gray-400">
                    Recommended scheduling: December 15-20 window
                  </div>
                </div>

                {/* Seasonal Intelligence */}
                <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-sm">Seasonal Intelligence</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    <strong>Winter Preparation:</strong> Historical data indicates 34% increase in HVAC issues during Q1. 
                    Proactive maintenance scheduling now could prevent 67% of cold-weather related facility tickets.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
