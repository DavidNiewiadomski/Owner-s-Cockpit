import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, Wrench, Package, MapPin, Star, Building2, DollarSign, FileText, Zap, Cpu, Eye, PaintBucket, Trees, Settings2, BarChart3, PieChart, Activity, Target, Award, Briefcase, Shield, CircleDot, AlertCircle, Wifi, WifiOff, ThermometerSun, Fan, Lightbulb, Home, Gauge, Compass, Navigation } from 'lucide-react';
import { getDashboardStats, getProjects, getTasks } from '@/services/dataService';
import type { Project, Task } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Area, AreaChart } from 'recharts';

// Circular Gauge Component for Cockpit Style
const CircularGauge = ({ value, max, label, unit, color = "#00ff88", size = 120, showNeedle = true }: {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
  showNeedle?: boolean;
}) => {
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  const angle = (value / max) * 270 - 135; // -135 to 135 degrees
  
  const needleX = centerX + Math.cos((angle * Math.PI) / 180) * (radius - 15);
  const needleY = centerY + Math.sin((angle * Math.PI) / 180) * (radius - 15);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform rotate-0">
        {/* Outer rim */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 5}
          fill="none"
          stroke="#333"
          strokeWidth="3"
        />
        {/* Main gauge background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="url(#gaugeGradient)"
          stroke="#666"
          strokeWidth="2"
        />
        {/* Scale marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const markAngle = -135 + (i * 22.5);
          const markStartX = centerX + Math.cos((markAngle * Math.PI) / 180) * (radius - 15);
          const markStartY = centerY + Math.sin((markAngle * Math.PI) / 180) * (radius - 15);
          const markEndX = centerX + Math.cos((markAngle * Math.PI) / 180) * (radius - 5);
          const markEndY = centerY + Math.sin((markAngle * Math.PI) / 180) * (radius - 5);
          
          return (
            <line
              key={i}
              x1={markStartX}
              y1={markStartY}
              x2={markEndX}
              y2={markEndY}
              stroke="#ccc"
              strokeWidth="2"
            />
          );
        })}
        {/* Needle */}
        {showNeedle && (
          <>
            <line
              x1={centerX}
              y1={centerY}
              x2={needleX}
              y2={needleY}
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="4"
              fill={color}
              stroke="#333"
              strokeWidth="1"
            />
          </>
        )}
        {/* Value arc */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 20}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${(value / max) * 2 * Math.PI * (radius - 20)} ${2 * Math.PI * (radius - 20)}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${centerY})`}
          opacity="0.7"
        />
        
        <defs>
          <radialGradient id="gaugeGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="70%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
        </defs>
      </svg>
      
      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-lg font-bold text-white mt-4" style={{ color }}>
          {value}{unit}
        </div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};

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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const getHealthIndicator = (health: string) => {
    const colors = {
      green: 'bg-green-500',
      yellow: 'bg-yellow-500', 
      red: 'bg-red-500'
    };
    return <div className={`w-4 h-4 rounded-full ${colors[health as keyof typeof colors]} shadow-lg animate-pulse`}></div>;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-green-400 bg-green-900/20';
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-6">
      {/* Cockpit Header Panel */}
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 border-2 border-gray-600 rounded-lg p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
            <h1 className="text-2xl font-bold text-amber-300 uppercase tracking-wider">Construction Management Cockpit</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-amber-300 font-mono text-sm">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="w-6 h-6 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Instrument Panel - Circular Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {constructionProjects.map((project, index) => (
          <motion.div 
            key={project.id} 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 rounded-full p-6 shadow-2xl relative"
          >
            <div className="flex flex-col items-center">
              <CircularGauge
                value={project.progress}
                max={100}
                label={project.name.split(' ')[0]}
                unit="%"
                color={project.budgetHealth === 'green' ? '#00ff88' : project.budgetHealth === 'yellow' ? '#ffaa00' : '#ff4444'}
                size={140}
              />
              <div className="mt-2 text-center">
                <div className="text-xs text-gray-400 uppercase">{project.phase}</div>
                <div className="flex gap-2 mt-1">
                  {getHealthIndicator(project.budgetHealth)}
                  {getHealthIndicator(project.scheduleHealth)}
                </div>
              </div>
            </div>
            
            {/* Corner rivets */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-500 rounded-full shadow-inner"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-gray-500 rounded-full shadow-inner"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-500 rounded-full shadow-inner"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-500 rounded-full shadow-inner"></div>
          </motion.div>
        ))}
      </div>

      {/* Secondary Instrument Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 rounded-lg p-4 text-center">
          <Compass className="h-8 w-8 text-amber-400 mx-auto mb-2" />
          <div className="text-amber-300 font-bold text-lg">$93M</div>
          <div className="text-gray-400 text-xs uppercase">Total Budget</div>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 rounded-lg p-4 text-center">
          <Gauge className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-bold text-lg">$63.3M</div>
          <div className="text-gray-400 text-xs uppercase">Spent</div>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 rounded-lg p-4 text-center">
          <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
          <div className="text-red-300 font-bold text-lg">23</div>
          <div className="text-gray-400 text-xs uppercase">Active Issues</div>
        </div>
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-600 rounded-lg p-4 text-center">
          <Navigation className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
          <div className="text-cyan-300 font-bold text-lg">68%</div>
          <div className="text-gray-400 text-xs uppercase">Avg Progress</div>
        </div>
      </div>

      {/* Control Panel Tabs */}
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-gray-600 grid grid-cols-2 lg:grid-cols-6 h-auto p-1 rounded-lg">
          <TabsTrigger value="controls" className="text-xs px-3 py-2 text-amber-300">Systems</TabsTrigger>
          <TabsTrigger value="facility" className="text-xs px-3 py-2 text-amber-300">Facility</TabsTrigger>
          <TabsTrigger value="space" className="text-xs px-3 py-2 text-amber-300">Space</TabsTrigger>
          <TabsTrigger value="bms" className="text-xs px-3 py-2 text-amber-300">BMS</TabsTrigger>
          <TabsTrigger value="maintenance" className="text-xs px-3 py-2 text-amber-300">Maint</TabsTrigger>
          <TabsTrigger value="lease" className="text-xs px-3 py-2 text-amber-300">Lease</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
                <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                  <AlertTriangle className="h-5 w-5" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {/* Keep existing change orders content but with cockpit styling */}
                <div className="space-y-3">
                  {['CO-085: Fire suppression - $125K', 'CO-086: Electrical upgrade - $85K', 'CO-087: Soundproofing - $45K'].map((item, index) => (
                    <div key={index} className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 flex items-center justify-between">
                      <span className="text-amber-200 font-mono text-sm">{item}</span>
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
                <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                  <DollarSign className="h-5 w-5" />
                  Financial Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 text-center">
                    <CircularGauge
                      value={68}
                      max={100}
                      label="Budget"
                      unit="%"
                      color="#00ff88"
                      size={80}
                    />
                  </div>
                  <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 text-center">
                    <CircularGauge
                      value={85}
                      max={100}
                      label="Schedule"
                      unit="%"
                      color="#ffaa00"
                      size={80}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Keep other tab contents with similar cockpit styling */}
        <TabsContent value="facility" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
              <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                <Wrench className="h-5 w-5" />
                Facility Systems Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <CircularGauge
                    value={8}
                    max={50}
                    label="Critical"
                    color="#ff4444"
                    size={100}
                  />
                </div>
                <div className="text-center">
                  <CircularGauge
                    value={15}
                    max={50}
                    label="High"
                    color="#ffaa00"
                    size={100}
                  />
                </div>
                <div className="text-center">
                  <CircularGauge
                    value={23}
                    max={50}
                    label="Normal"
                    color="#00ff88"
                    size={100}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="space" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
              <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                <Users className="h-5 w-5" />
                Space Usage Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 text-center">
                  <CircularGauge
                    value={78}
                    max={100}
                    label="Offices"
                    unit="%"
                    color="#00ff88"
                    size={80}
                  />
                </div>
                <div className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 text-center">
                  <CircularGauge
                    value={62}
                    max={100}
                    label="Cafeteria"
                    unit="%"
                    color="#ffaa00"
                    size={80}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bms" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
              <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                <ThermometerSun className="h-5 w-5" />
                BMS Alarms Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {bmsAlarms.map((alarm, index) => (
                  <div key={index} className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-amber-200 font-mono text-sm">{alarm.system} - {alarm.message}</span>
                    <div className={`w-3 h-3 rounded-full ${alarm.priority === 'critical' ? 'bg-red-500' : alarm.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'} animate-pulse`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
              <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                <Settings2 className="h-5 w-5" />
                Maintenance Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {equipmentMaintenance.map((item, index) => (
                  <div key={index} className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-amber-200 font-mono text-sm">{item.equipment} - {item.building}</span>
                    <div className={`w-3 h-3 rounded-full ${item.priority === 'critical' ? 'bg-red-500' : item.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'} animate-pulse`}></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lease" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-600 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 border-b-2 border-gray-500">
              <CardTitle className="text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                <FileText className="h-5 w-5" />
                Lease Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {leaseInsights.map((lease, index) => (
                  <div key={index} className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3">
                    <div className="text-amber-200 font-mono text-sm">{lease.property}</div>
                    <div className="text-gray-400 text-xs">{lease.issue}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
