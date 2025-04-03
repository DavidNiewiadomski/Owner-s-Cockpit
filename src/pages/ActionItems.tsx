
import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ActionItemFilters } from '@/components/actionItems/ActionItemFilters';
import { ActionItemSearch } from '@/components/actionItems/ActionItemSearch';
import { TaskResponseModal } from '@/components/actionItems/TaskResponseModal';
import { useProject } from '@/contexts/ProjectContext';

// Define project-specific action items
const projectActionItems = {
  '1': [
    {
      id: '1-1',
      title: 'Review East Tower Facade Design',
      description: 'Updated facade renderings need approval before manufacturing.',
      dueDate: '2024-07-15',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'approval' as const,
      project: 'East Tower'
    },
    {
      id: '1-2',
      title: 'Authorize Additional Concrete Order',
      description: 'Structural engineer requests 15% more for reinforcement.',
      dueDate: '2024-07-10',
      priority: 'medium' as const,
      status: 'pending' as const,
      type: 'decision' as const,
      project: 'East Tower'
    },
    {
      id: '1-3',
      title: 'Sign Off on Elevator Specifications',
      description: 'Final specs from vendor need owner approval.',
      dueDate: '2024-07-20',
      priority: 'low' as const,
      status: 'pending' as const,
      type: 'review' as const,
      project: 'East Tower'
    },
    {
      id: '1-4',
      title: 'Schedule Model Unit Tour',
      description: 'Review completed model unit fixtures and finishes.',
      dueDate: '2024-06-30',
      priority: 'medium' as const,
      status: 'completed' as const,
      type: 'task' as const,
      project: 'East Tower'
    },
  ],
  '2': [
    {
      id: '2-1',
      title: 'Approve Park Landscape Changes',
      description: 'Drought-resistant plant substitutions need approval.',
      dueDate: '2024-07-18',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'approval' as const,
      project: 'Westside Park'
    },
    {
      id: '2-2',
      title: 'Review Playground Equipment Options',
      description: 'Select from three vendor proposals for playground equipment.',
      dueDate: '2024-07-25',
      priority: 'medium' as const,
      status: 'pending' as const,
      type: 'decision' as const,
      project: 'Westside Park'
    },
    {
      id: '2-3',
      title: 'Sign Community Event Agreement',
      description: 'Partnership with local community for park opening event.',
      dueDate: '2024-08-10',
      priority: 'low' as const,
      status: 'pending' as const,
      type: 'review' as const,
      project: 'Westside Park'
    },
    {
      id: '2-4',
      title: 'Finalize Water Feature Design',
      description: 'Approve central fountain and pond specifications.',
      dueDate: '2024-06-25',
      priority: 'high' as const,
      status: 'completed' as const,
      type: 'approval' as const,
      project: 'Westside Park'
    },
  ],
  '3': [
    {
      id: '3-1',
      title: 'Approve Traffic Management Plan',
      description: 'Updated diversion routes during main bridge closure.',
      dueDate: '2024-07-12',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'approval' as const,
      project: 'North Bridge'
    },
    {
      id: '3-2',
      title: 'Review Structural Reinforcement Specs',
      description: 'Engineer\'s report on additional support requirements.',
      dueDate: '2024-07-08',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'review' as const,
      project: 'North Bridge'
    },
    {
      id: '3-3',
      title: 'Sign Change Order for Support Columns',
      description: 'Additional columns needed based on stress test results.',
      dueDate: '2024-07-20',
      priority: 'medium' as const,
      status: 'pending' as const,
      type: 'approval' as const,
      project: 'North Bridge'
    },
    {
      id: '3-4',
      title: 'Schedule Project Update Meeting',
      description: 'Monthly progress review with transportation department.',
      dueDate: '2024-07-01',
      priority: 'low' as const,
      status: 'completed' as const,
      type: 'task' as const,
      project: 'North Bridge'
    },
  ],
  'all': [
    {
      id: 'all-1',
      title: 'Budget Approval Required',
      description: 'Change order for East Tower HVAC upgrade needs approval.',
      dueDate: '2024-07-15',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'approval' as const,
      project: 'East Tower'
    },
    {
      id: 'all-2',
      title: 'Document Review',
      description: 'Updated construction contracts for Westside Park project.',
      dueDate: '2024-07-18',
      priority: 'medium' as const,
      status: 'pending' as const,
      type: 'review' as const,
      project: 'Westside Park'
    },
    {
      id: 'all-3',
      title: 'Schedule Site Visit',
      description: 'North Bridge project reached structural completion milestone.',
      dueDate: '2024-07-10',
      priority: 'low' as const,
      status: 'completed' as const,
      type: 'task' as const,
      project: 'North Bridge'
    },
    {
      id: 'all-4',
      title: 'Design Decision Needed',
      description: 'Facade material selection for East Tower project.',
      dueDate: '2024-07-22',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'decision' as const,
      project: 'East Tower'
    },
    {
      id: 'all-5',
      title: 'Safety Inspection Follow-up',
      description: 'Address safety concerns from recent inspection at South Avenue site.',
      dueDate: '2024-07-08',
      priority: 'high' as const,
      status: 'pending' as const,
      type: 'task' as const,
      project: 'South Avenue'
    },
    {
      id: 'all-6',
      title: 'Contractor Payment Approval',
      description: 'Approve final payment for electrical work at Downtown Heights.',
      dueDate: '2024-07-20',
      priority: 'medium' as const,
      status: 'pending' as const,
      type: 'approval' as const,
      project: 'Downtown Heights'
    },
    {
      id: 'all-7',
      title: 'Permit Extension Request',
      description: 'Complete paperwork for extending building permit for Riverside Complex.',
      dueDate: '2024-07-15',
      priority: 'medium' as const,
      status: 'completed' as const,
      type: 'task' as const,
      project: 'Riverside Complex'
    }
  ]
};

export default function ActionItems() {
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedProject } = useProject();
  const [actionItems, setActionItems] = useState<any[]>([]);
  
  // Get project-specific action items based on selected project
  useEffect(() => {
    const projectId = selectedProject?.id || 'all';
    setActionItems(projectActionItems[projectId as keyof typeof projectActionItems] || projectActionItems['all']);
  }, [selectedProject]);
  
  return (
    <div className="flex h-screen bg-black">
      <SidebarNavigation />
      
      <main className="flex flex-col flex-1 overflow-y-auto bg-black">
        <DashboardHeader title="Action Items" />
        <CollapsibleAIAssistant 
          projectName={selectedProject?.title || 'All Projects'}
          initialInsights={[
            {
              title: 'Priority Items',
              content: `You have ${actionItems.filter(item => item.priority === 'high' && item.status === 'pending').length} high-priority items requiring attention`,
              type: 'warning'
            },
            {
              title: 'Upcoming Deadlines',
              content: `${actionItems.filter(item => new Date(item.dueDate) <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) && item.status === 'pending').length} items due within the next 7 days`,
              type: 'info'
            }
          ]}
        />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Action Items</h1>
              <div className="flex gap-2">
                <ActionItemSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <Button className="gap-1 bg-construction-600 hover:bg-construction-700">
                  <Plus className="h-4 w-4" />
                  New Item
                </Button>
              </div>
            </div>
            
            <ActionItemFilters 
              items={actionItems} 
              searchQuery={searchQuery} 
            />
          </div>
        </div>
        
        {/* Add TaskResponseModal */}
        <TaskResponseModal />
      </main>
    </div>
  );
}
