
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar,
  Construction,
  FileText,
  ArrowDown,
  ListChecks
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Define types for our action items
export interface ActionItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  type: 'approval' | 'review' | 'task' | 'decision';
  project: string;
}

interface ActionItemListProps {
  filter: 'all' | 'pending' | 'completed' | 'urgent';
  searchQuery: string;
}

// Sample action items data
const actionItemsData: ActionItem[] = [
  {
    id: '1',
    title: 'Budget Approval Required',
    description: 'Change order for East Tower HVAC upgrade needs approval.',
    dueDate: '2023-12-15',
    priority: 'high',
    status: 'pending',
    type: 'approval',
    project: 'East Tower'
  },
  {
    id: '2',
    title: 'Document Review',
    description: 'Updated construction contracts for Westside Park project.',
    dueDate: '2023-12-18',
    priority: 'medium',
    status: 'pending',
    type: 'review',
    project: 'Westside Park'
  },
  {
    id: '3',
    title: 'Schedule Site Visit',
    description: 'North Bridge project reached structural completion milestone.',
    dueDate: '2023-12-10',
    priority: 'low',
    status: 'completed',
    type: 'task',
    project: 'North Bridge'
  },
  {
    id: '4',
    title: 'Design Decision Needed',
    description: 'Facade material selection for East Tower project.',
    dueDate: '2023-12-22',
    priority: 'high',
    status: 'pending',
    type: 'decision',
    project: 'East Tower'
  },
  {
    id: '5',
    title: 'Safety Inspection Follow-up',
    description: 'Address safety concerns from recent inspection at South Avenue site.',
    dueDate: '2023-12-08',
    priority: 'high',
    status: 'pending',
    type: 'task',
    project: 'South Avenue'
  },
  {
    id: '6',
    title: 'Contractor Payment Approval',
    description: 'Approve final payment for electrical work at Downtown Heights.',
    dueDate: '2023-12-20',
    priority: 'medium',
    status: 'pending',
    type: 'approval',
    project: 'Downtown Heights'
  },
  {
    id: '7',
    title: 'Permit Extension Request',
    description: 'Complete paperwork for extending building permit for Riverside Complex.',
    dueDate: '2023-12-15',
    priority: 'medium',
    status: 'completed',
    type: 'task',
    project: 'Riverside Complex'
  }
];

export function ActionItemList({ filter, searchQuery }: ActionItemListProps) {
  const { toast } = useToast();
  const [items, setItems] = useState<ActionItem[]>(actionItemsData);
  
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
  
  // Toggle item status
  const toggleItemStatus = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newStatus = item.status === 'completed' ? 'pending' : 'completed';
          
          // Show toast notification
          toast({
            title: newStatus === 'completed' ? 'Item Completed' : 'Item Marked as Pending',
            description: item.title,
            variant: newStatus === 'completed' ? 'default' : 'destructive',
          });
          
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };
  
  // Get icon based on item type
  const getTypeIcon = (type: ActionItem['type']) => {
    switch (type) {
      case 'approval':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'review':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'task':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'decision':
        return <Construction className="h-5 w-5 text-construction-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get relative date string
  const getRelativeDateString = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due Today';
    } else if (diffDays === 1) {
      return 'Due Tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };
  
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
                    onCheckedChange={() => toggleItemStatus(item.id)}
                    className="data-[state=checked]:bg-construction-500 data-[state=checked]:text-white"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(item.type)}
                    <h4 className={`font-medium text-gray-100 ${item.status === 'completed' ? 'line-through' : ''}`}>
                      {item.title}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs bg-black text-gray-300 border-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {getRelativeDateString(item.dueDate)}
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
