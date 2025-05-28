
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Wrench, 
  Package,
  DollarSign,
  Building2,
  Target,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Enhanced sample data
const dashboardStats = {
  activeProjects: 12,
  pendingTasks: 47,
  criticalTasks: 8,
  equipmentInUse: 89,
  totalProjects: 15,
  totalTasks: 234,
  totalEquipment: 156,
  totalMaterials: 1247,
  totalBudget: 125000000,
  spentBudget: 78500000,
  teamMembers: 156,
  completedMilestones: 34
};

const recentProjects = [
  {
    id: '1',
    title: 'Manhattan Financial Tower',
    description: '58-story mixed-use development with premium office and retail space',
    location: 'Manhattan, New York',
    status: 'active',
    progress: 78,
    budget: 285000000,
    actual_cost: 198500000,
    client_name: 'Goldman Sachs Properties',
    dueDate: '2024-12-15',
    teamSize: 45,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Waterfront Luxury Residences',
    description: '32-story residential tower with panoramic harbor views',
    location: 'San Francisco, CA',
    status: 'active',
    progress: 65,
    budget: 195000000,
    actual_cost: 127500000,
    client_name: 'Pacific Development Group',
    dueDate: '2025-03-30',
    teamSize: 38,
    priority: 'high'
  },
  {
    id: '3',
    title: 'Tech Campus Phase II',
    description: 'Sustainable corporate headquarters with LEED Platinum certification',
    location: 'Austin, Texas',
    status: 'active',
    progress: 45,
    budget: 167000000,
    actual_cost: 82500000,
    client_name: 'MetaTech Industries',
    dueDate: '2025-08-20',
    teamSize: 32,
    priority: 'medium'
  }
];

const urgentTasks = [
  {
    id: '1',
    title: 'Foundation inspection approval',
    description: 'Critical foundation inspection required before steel installation',
    priority: 'critical',
    due_date: '2024-01-28',
    project: 'Manhattan Financial Tower',
    assignee: 'Sarah Johnson, PE'
  },
  {
    id: '2',
    title: 'MEP systems coordination',
    description: 'Resolve conflicts between electrical and plumbing systems on floors 25-30',
    priority: 'high',
    due_date: '2024-01-30',
    project: 'Waterfront Luxury Residences',
    assignee: 'Michael Chen'
  },
  {
    id: '3',
    title: 'Environmental permit renewal',
    description: 'Submit documentation for environmental compliance renewal',
    priority: 'high',
    due_date: '2024-02-02',
    project: 'Tech Campus Phase II',
    assignee: 'Emily Rodriguez'
  },
  {
    id: '4',
    title: 'Safety equipment inspection',
    description: 'Monthly safety equipment inspection and certification',
    priority: 'critical',
    due_date: '2024-01-29',
    project: 'Manhattan Financial Tower',
    assignee: 'David Park'
  },
  {
    id: '5',
    title: 'Material delivery coordination',
    description: 'Coordinate delivery of specialized glass panels from Germany',
    priority: 'high',
    due_date: '2024-02-05',
    project: 'Waterfront Luxury Residences',
    assignee: 'Lisa Thompson'
  }
];

const progressData = [
  { month: 'Jul', actual: 12, planned: 10, budget: 8.5 },
  { month: 'Aug', actual: 18, planned: 16, budget: 15.2 },
  { month: 'Sep', actual: 25, planned: 24, budget: 23.1 },
  { month: 'Oct', actual: 34, planned: 32, budget: 31.8 },
  { month: 'Nov', actual: 45, planned: 42, budget: 42.5 },
  { month: 'Dec', actual: 58, planned: 54, budget: 54.2 },
  { month: 'Jan', actual: 72, planned: 68, budget: 67.8 }
];

const budgetAllocation = [
  { name: 'Labor', value: 35, amount: 43750000, color: '#3B82F6' },
  { name: 'Materials', value: 28, amount: 35000000, color: '#10B981' },
  { name: 'Equipment', value: 15, amount: 18750000, color: '#F59E0B' },
  { name: 'Subcontractors', value: 18, amount: 22500000, color: '#EF4444' },
  { name: 'Permits & Other', value: 4, amount: 5000000, color: '#8B5CF6' }
];

const teamPerformance = [
  { team: 'Structural', efficiency: 94, safety: 98, quality: 96 },
  { team: 'MEP', efficiency: 87, safety: 95, quality: 91 },
  { team: 'Finishing', efficiency: 91, safety: 97, quality: 93 },
  { team: 'Site Prep', efficiency: 96, safety: 99, quality: 89 }
];

export function EnhancedMainDashboard() {
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 hover:bg-green-700';
      case 'planning': return 'bg-blue-600 hover:bg-blue-700';
      case 'on-hold': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'completed': return 'bg-gray-600 hover:bg-gray-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 hover:bg-red-700 animate-pulse';
      case 'high': return 'bg-orange-600 hover:bg-orange-700';
      case 'medium': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'low': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">Active Projects</p>
                  <p className="text-3xl font-bold mt-1">{dashboardStats.activeProjects}</p>
                  <div className="flex items-center mt-2 text-sm text-blue-200">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+2 this month</span>
                  </div>
                </div>
                <div className="bg-blue-700/50 p-4 rounded-full">
                  <Building2 className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-600/20 pointer-events-none" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">Total Budget</p>
                  <p className="text-3xl font-bold mt-1">{formatCurrency(dashboardStats.totalBudget)}</p>
                  <div className="flex items-center mt-2 text-sm text-green-200">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{Math.round((dashboardStats.spentBudget / dashboardStats.totalBudget) * 100)}% utilized</span>
                  </div>
                </div>
                <div className="bg-green-700/50 p-4 rounded-full">
                  <DollarSign className="h-8 w-8 text-green-200" />
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
          <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-orange-700 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-100">Team Members</p>
                  <p className="text-3xl font-bold mt-1">{dashboardStats.teamMembers}</p>
                  <div className="flex items-center mt-2 text-sm text-orange-200">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Across {dashboardStats.activeProjects} projects</span>
                  </div>
                </div>
                <div className="bg-orange-700/50 p-4 rounded-full">
                  <Users className="h-8 w-8 text-orange-200" />
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
          <Card className="bg-gradient-to-br from-red-900 to-red-800 border-red-700 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-100">Critical Tasks</p>
                  <p className="text-3xl font-bold mt-1">{dashboardStats.criticalTasks}</p>
                  <div className="flex items-center mt-2 text-sm text-red-200">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Require immediate attention</span>
                  </div>
                </div>
                <div className="bg-red-700/50 p-4 rounded-full animate-pulse">
                  <AlertTriangle className="h-8 w-8 text-red-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="bg-gray-900 border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Project Progress Overview
                </div>
                <Badge className="bg-blue-600 text-white">Last 7 Months</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(55, 65, 81, 0.4)" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      axisLine={{ stroke: '#374151' }}
                    />
                    <YAxis 
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      axisLine={{ stroke: '#374151' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="plannedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="planned" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      fill="url(#plannedGradient)" 
                      name="Planned Progress"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fill="url(#actualGradient)" 
                      name="Actual Progress"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Budget Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gray-900 border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-green-400" />
                Budget Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {budgetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value}% (${formatCurrency(props.payload.amount)})`,
                        name
                      ]}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {budgetAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Projects and Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-400" />
                  Active Projects
                </div>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={project.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-lg">{project.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-400">{project.location}</span>
                      </div>
                    </div>
                    <Badge className={`${getStatusBadgeColor(project.status)} text-white font-medium`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300 font-medium">Progress</span>
                        <span className="text-white font-bold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2 bg-gray-700" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Budget</p>
                        <p className="font-semibold text-white">{formatCurrency(project.budget)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Team Size</p>
                        <p className="font-semibold text-white">{project.teamSize} members</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                      <span className="text-sm text-gray-400">
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                      <Badge className={`${getPriorityBadgeColor(project.priority)} text-white text-xs`}>
                        {project.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Urgent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Critical Tasks
                </div>
                <Badge className="bg-red-600 text-white animate-pulse">
                  {urgentTasks.length} urgent
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {urgentTasks.map((task, index) => (
                <div key={task.id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-red-600/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                    </div>
                    <Badge className={`${getPriorityBadgeColor(task.priority)} text-white ml-2`}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">{task.project}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-400">{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-orange-400 font-medium">
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105">
                <Calendar className="h-6 w-6" />
                <span className="text-sm font-medium">Schedule Meeting</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-all transform hover:scale-105">
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm font-medium">Create Task</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition-all transform hover:scale-105">
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">Team Overview</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition-all transform hover:scale-105">
                <Package className="h-6 w-6" />
                <span className="text-sm font-medium">Material Orders</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition-all transform hover:scale-105">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm font-medium">Safety Report</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 transition-all transform hover:scale-105">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm font-medium">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
