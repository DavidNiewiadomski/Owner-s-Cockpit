
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, User } from 'lucide-react';

export function UpcomingTasks() {
  const tasks = [
    {
      id: 1,
      title: 'Review updated floor plans',
      dueDate: '2024-05-20',
      priority: 'high',
      assignee: 'Jessica Wong',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Submit permit applications',
      dueDate: '2024-05-22',
      priority: 'high',
      assignee: 'Michael Chen',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Meeting with HVAC contractors',
      dueDate: '2024-05-25',
      priority: 'medium',
      assignee: 'Sarah Johnson',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Approve material samples',
      dueDate: '2024-05-27',
      priority: 'low',
      assignee: 'David Patel',
      status: 'pending'
    }
  ];

  const getBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4 bg-black">
      {tasks.map((task) => (
        <div key={task.id} className="bg-black border border-gray-700 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <Checkbox id={`task-${task.id}`} className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer text-white">
                {task.title}
              </label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  <span>{task.assignee}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{task.status}</span>
                </div>
              </div>
            </div>
            <Badge variant={getBadgeVariant(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
