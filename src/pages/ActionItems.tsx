import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, AlertTriangle, Search, Filter, Plus } from 'lucide-react';
import { getTasks, updateTaskStatus } from '@/services/dataService';
import { useProject } from '@/contexts/ProjectContext';
import type { Task } from '@/lib/supabase';

export default function ActionItems() {
  const { selectedProject } = useProject();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await getTasks(selectedProject?.id);
        setTasks(tasksData);
        setFilteredTasks(tasksData);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [selectedProject]);

  useEffect(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  const handleStatusUpdate = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-blue-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'cancelled':
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        projectContext="Action Items"
        projectName={selectedProject?.title || "All Projects"}
        initialInsights={[]}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      projectContext="Action Items"
      projectName={selectedProject?.title || "All Projects"}
      initialInsights={[
        {
          title: 'Task Overview',
          content: `${tasks.length} total tasks across all projects`,
          type: 'info',
        },
        {
          title: 'Critical Tasks',
          content: `${tasks.filter(t => t.priority === 'critical').length} critical priority tasks need attention`,
          type: 'warning',
        },
        {
          title: 'Completion Rate',
          content: `${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}% tasks completed`,
          type: 'success',
        }
      ]}
    >
      <div className="space-y-6">
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Action Items</h1>
            <p className="text-gray-400 mt-2">
              Manage and track project tasks and deliverables
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-1 rounded-full ${getStatusBadgeColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                      </div>
                      <h3 className="font-semibold text-white text-lg">{task.title}</h3>
                    </div>
                    
                    {task.description && (
                      <p className="text-gray-400 mb-3">{task.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <Badge className={`${getStatusBadgeColor(task.status)} text-white`}>
                        {task.status}
                      </Badge>
                      <Badge className={`${getPriorityBadgeColor(task.priority)} text-white`}>
                        {task.priority} priority
                      </Badge>
                      {task.due_date && (
                        <span className="text-sm text-gray-400">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                      <span className="text-sm text-gray-400">
                        Created: {new Date(task.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.status !== 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(task.id, 
                          task.status === 'pending' ? 'in-progress' : 'completed'
                        )}
                        className="border-gray-600 text-gray-300"
                      >
                        {task.status === 'pending' ? 'Start' : 'Complete'}
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-12 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No tasks found</h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your filters to see more tasks.'
                  : 'Create your first task to get started.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
