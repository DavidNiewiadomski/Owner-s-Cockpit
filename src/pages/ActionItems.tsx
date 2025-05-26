
import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle, Badge
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, AlertTriangle } from 'lucide-react'; 
import { getTasks, getProjects, getTeamMembers, updateTaskStatus } from '@/services/dataService'; // Added getTeamMembers
import { useProject } from '@/contexts/ProjectContext';
import type { Task, Project, TeamMember } from '@/lib/supabase'; // Added TeamMember
import { ActionItemList } from '@/components/actionItems/ActionItemList'; 
import { CreateTaskModal } from '@/components/actionItems/CreateTaskModal'; // Import CreateTaskModal

export default function ActionItems() {
  const { selectedProject } = useProject();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectsMap, setProjectsMap] = useState<Map<string, Project>>(new Map());
  const [enrichedTasks, setEnrichedTasks] = useState<(Task & { projectTitle: string })[]>([]);
  
  const [allProjects, setAllProjects] = useState<Project[]>([]); // For modal
  const [allTeamMembers, setAllTeamMembers] = useState<TeamMember[]>([]); // For modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const loadData = async () => { // Made loadData a standalone function
    setLoading(true);
    try {
      const [tasksData, projectsData, teamMembersData] = await Promise.all([
        getTasks(selectedProject?.id),
        getProjects(), // Fetch all projects
        getTeamMembers() // Fetch all team members
      ]);
      
      setTasks(tasksData);
      setAllProjects(projectsData); // Store all projects for modal
      setAllTeamMembers(teamMembersData); // Store all team members for modal

      const newProjectsMap = new Map<string, Project>();
      projectsData.forEach(project => newProjectsMap.set(project.id, project));
      setProjectsMap(newProjectsMap);

    } catch (error) {
      console.error('Error loading data:', error);
      // Consider setting an error state here to display to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedProject]);

  useEffect(() => {
    // Enrich tasks whenever tasks or projectsMap changes
    if (tasks.length > 0 && projectsMap.size > 0) {
      const currentEnrichedTasks = tasks.map(task => ({
        ...task,
        projectTitle: task.project_id ? (projectsMap.get(task.project_id)?.title || 'Unknown Project') : 'N/A (No Project ID)'
      }));
      setEnrichedTasks(currentEnrichedTasks);
    } else if (tasks.length > 0 && projectsMap.size === 0 && !loading) {
      // Handle case where projects might not have loaded but tasks did (e.g. if getProjects failed)
       const currentEnrichedTasks = tasks.map(task => ({
        ...task,
        projectTitle: 'Project Info N/A'
      }));
      setEnrichedTasks(currentEnrichedTasks);
    } else {
      setEnrichedTasks([]);
    }
  }, [tasks, projectsMap, loading]);


  const filteredAndEnrichedTasks = useMemo(() => {
    let localFilteredTasks = enrichedTasks;

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      localFilteredTasks = localFilteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchTermLower) ||
        (task.description && task.description.toLowerCase().includes(searchTermLower)) ||
        task.projectTitle.toLowerCase().includes(searchTermLower) 
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      localFilteredTasks = localFilteredTasks.filter(task => task.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== 'all') {
      localFilteredTasks = localFilteredTasks.filter(task => task.priority === priorityFilter);
    }
    return localFilteredTasks;
  }, [enrichedTasks, searchTerm, statusFilter, priorityFilter]);

  // handleStatusUpdate and related badge/icon functions are removed for now,
  // as ActionItemList is purely presentational.
  // This functionality can be added back when ActionItemList gets checkbox interactivity.

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
  
  const totalTasks = tasks.length;
  const criticalTasksCount = tasks.filter(t => t.priority === 'critical').length;
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;


  return (
    <DashboardLayout
      projectContext="Action Items"
      projectName={selectedProject?.title || "All Projects"}
      initialInsights={[
        {
          id: 'task-1',
          title: 'Task Overview',
          description: `${totalTasks} total tasks.`,
          severity: 'info',
        },
        {
          id: 'task-2',
          title: 'Critical Tasks',
          description: `${criticalTasksCount} critical priority tasks need attention.`,
          severity: 'error',
        },
        {
          id: 'task-3',
          title: 'Completion Rate',
          description: `${completionRate}% tasks completed.`,
          severity: 'success',
        }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Action Items</h1>
            <p className="text-gray-400 mt-2">
              Manage and track project tasks and deliverables
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsCreateModalOpen(true)}>
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
                    placeholder="Search tasks by title, description, or project..."
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

        {/* Render ActionItemList */}
        <ActionItemList tasks={filteredAndEnrichedTasks} />

        {/* Display message if no tasks match filters */}
        {filteredAndEnrichedTasks.length === 0 && !loading && (
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
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTaskCreated={() => {
          loadData(); // Re-fetch data to include the new task and update enrichment
          // Optionally, could add the new task to local state for quicker UI update
          // before re-fetch completes, but re-fetching ensures consistency.
        }}
        projects={allProjects}
        teamMembers={allTeamMembers}
      />
    </DashboardLayout>
  );
}
