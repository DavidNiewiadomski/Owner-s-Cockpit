
import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Clock, 
  Plus, 
  Search, 
  CheckCircle, 
  Construction, 
  Calendar, 
  ListChecks,
  ArrowDown,
  Tag 
} from 'lucide-react';
import { ActionItemList } from '@/components/actionItems/ActionItemList';
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
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search action items..."
                    className="pl-8 bg-black border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="gap-1 bg-construction-600 hover:bg-construction-700">
                  <Plus className="h-4 w-4" />
                  New Item
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-gray-900 border border-gray-800">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ProjectActionItemList items={actionItems} filter="all" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="pending">
                <ProjectActionItemList items={actionItems} filter="pending" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="completed">
                <ProjectActionItemList items={actionItems} filter="completed" searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="urgent">
                <ProjectActionItemList items={actionItems} filter="urgent" searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

// Component to display project-specific action items
function ProjectActionItemList({ items, filter, searchQuery }: { items: any[], filter: 'all' | 'pending' | 'completed' | 'urgent', searchQuery: string }) {
  // Filter items based on filter type and search query
  const filteredItems = items.filter(item => {
    // Apply status filter
    if (filter === 'pending' && item.status !== 'pending') return false;
    if (filter === 'completed' && item.status !== 'completed') return false;
    if (filter === 'urgent' && item.priority !== 'high') return false;
    
    // Apply search filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.project.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="space-y-4">
      {filteredItems.length === 0 ? (
        <Card className="bg-black border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <ListChecks className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-200">No action items found</h3>
            <p className="text-gray-400 mt-2">
              {searchQuery ? 'Try a different search term' : 'All tasks are complete or filtered out'}
            </p>
          </CardContent>
        </Card>
      ) : (
        filteredItems.map(item => (
          <Card key={item.id} className={`bg-black border-gray-700 ${item.status === 'completed' ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Checkbox 
                    checked={item.status === 'completed'}
                    className="data-[state=checked]:bg-construction-500 data-[state=checked]:text-white"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {item.type === 'approval' ? <AlertTriangle className="h-5 w-5 text-amber-500" /> :
                     item.type === 'review' ? <Clock className="h-5 w-5 text-blue-500" /> :
                     item.type === 'task' ? <CheckCircle className="h-5 w-5 text-green-500" /> :
                     <Construction className="h-5 w-5 text-construction-500" />}
                    <h4 className={`font-medium text-gray-100 ${item.status === 'completed' ? 'line-through' : ''}`}>
                      {item.title}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs bg-black text-gray-300 border-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.dueDate).toLocaleDateString()}
                    </Badge>
                    
                    <Badge 
                      className={`text-xs ${
                        item.priority === 'high' ? 'bg-red-900/30 text-red-400 border-red-800' : 
                        item.priority === 'medium' ? 'bg-amber-900/30 text-amber-400 border-amber-800' : 
                        'bg-green-900/30 text-green-400 border-green-800'
                      }`}
                      variant="outline"
                    >
                      {item.priority === 'high' ? 'High Priority' : 
                       item.priority === 'medium' ? 'Medium Priority' : 
                       'Low Priority'}
                    </Badge>
                    
                    <Badge variant="outline" className="text-xs bg-construction-900/30 text-construction-400 border-construction-800">
                      {item.project}
                    </Badge>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

// Missing Badge component import
import { Badge } from '@/components/ui/badge';
