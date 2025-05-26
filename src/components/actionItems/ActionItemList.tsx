
import React from 'react';
import { 
  Calendar,
  ArrowDown, // Kept for potential future use, but not used in this refactor
  ListChecks, // Generic task icon
  ClipboardListIcon // Alternative generic task icon
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button'; // Kept for potential future use
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { useToast } from '@/hooks/use-toast'; // Removed as toggleItemStatus is removed
import { Task } from '@/lib/supabase'; // Import Supabase Task type

// ActionItem interface removed
// actionItemsData removed

interface ActionItemListProps {
  tasks: (Task & { projectTitle: string })[]; // Tasks are passed as props
}

export function ActionItemList({ tasks }: ActionItemListProps) {
  // const { toast } = useToast(); // Removed
  // useState for items removed
  
  // Filtering logic is moved to the parent component.
  // This component now directly uses the 'tasks' prop.
  
  // toggleItemStatus function removed
  
  // getTypeIcon function removed (item.type no longer exists)
  // Using a generic icon (e.g., ClipboardListIcon) directly in JSX.
  
  // Get relative date string - updated to handle optional dateString
  const getRelativeDateString = (dateString?: string) => {
    if (!dateString) {
      return 'No due date';
    }
    const today = new Date();
    // Clear time part for today to compare dates only
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(dateString);
    // Clear time part for dueDate to compare dates only
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`;
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
      {tasks.length === 0 ? (
        <Card className="bg-black border-gray-700">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <ClipboardListIcon className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-200">No tasks found</h3>
            <p className="text-gray-400 mt-2">
              There are no tasks matching your current filters, or no tasks have been assigned yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        tasks.map(task => (
          <Card key={task.id} className={`bg-black border-gray-700 ${task.status === 'completed' || task.status === 'cancelled' ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Checkbox 
                    checked={task.status === 'completed'}
                    // onCheckedChange removed as status updates are handled by parent
                    className="data-[state=checked]:bg-construction-500 data-[state=checked]:text-white"
                    aria-label={`Mark task ${task.title} as ${task.status === 'completed' ? 'pending' : 'completed'}`}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <ClipboardListIcon className="h-5 w-5 text-gray-500" /> {/* Generic task icon */}
                    <h4 className={`font-medium text-gray-100 ${task.status === 'completed' || task.status === 'cancelled' ? 'line-through' : ''}`}>
                      {task.title}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-400 mt-1">{task.description || 'No description provided.'}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs bg-black text-gray-300 border-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {getRelativeDateString(task.due_date)}
                    </Badge>
                    
                    <Badge 
                      className={`text-xs ${
                        task.priority === 'critical' ? 'bg-red-700/40 text-red-300 border-red-600' :
                        task.priority === 'high' ? 'bg-red-900/30 text-red-400 border-red-800' : 
                        task.priority === 'medium' ? 'bg-amber-900/30 text-amber-400 border-amber-800' : 
                        'bg-green-900/30 text-green-400 border-green-800' // low or default
                      }`}
                      variant="outline"
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </Badge>
                    
                    <Badge variant="outline" className="text-xs bg-construction-900/30 text-construction-400 border-construction-800">
                      {task.projectTitle}
                    </Badge>
                  </div>
                </div>
                
                {/* Button is kept for potential future actions like "View Details" */}
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white invisible"> 
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
