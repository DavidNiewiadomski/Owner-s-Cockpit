
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Users, Wrench, Package } from 'lucide-react';
import { getDashboardStats, getProjects, getTasks } from '@/services/dataService';
import type { Project, Task } from '@/lib/supabase';
import { FinancialOverview } from '@/components/dashboard/FinancialOverview'; // Import FinancialOverview
// Import changeOrders directly instead of financialData
import { changeOrders } from '@/data'; 

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
        setRecentProjects(projects.slice(0, 3)); // Show 3 most recent projects
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
                  <p className="text-sm font-medium text-gray-400">Pending Tasks</p>
                  <p className="text-2xl font-bold text-white">{stats?.pendingTasks || 0}</p>
                </div>
                <div className="bg-yellow-600 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-white" />
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

      {/* Recent Projects and Urgent Tasks */}
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

        {/* Urgent Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Urgent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      View
                    </Button>
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
        transition={{ delay: 0.7 }}
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
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700">
                <Users className="h-6 w-6" />
                <span className="text-sm">Team Overview</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700">
                <Package className="h-6 w-6" />
                <span className="text-sm">Material Orders</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Financial Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }} // Adjust delay as needed
      >
        <FinancialOverview changeOrders={changeOrders} /> 
        {/* Use imported changeOrders directly */}
      </motion.div>
    </div>
  );
}
