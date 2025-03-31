
import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UpcomingTasks() {
  const tasks = [
    {
      title: 'Site inspection',
      date: 'Tomorrow',
      priority: 'high',
      assignee: 'Alex Johnson'
    },
    {
      title: 'Material order approval',
      date: 'Wed, Apr 3',
      priority: 'medium',
      assignee: 'Sarah Williams'
    },
    {
      title: 'Foundation review',
      date: 'Thu, Apr 4',
      priority: 'medium',
      assignee: 'Michael Brown'
    },
    {
      title: 'Client meeting',
      date: 'Fri, Apr 5',
      priority: 'high',
      assignee: 'You'
    },
  ];

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div key={index} className="flex flex-col space-y-2 border-b border-border pb-3 last:border-0 last:pb-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{task.title}</p>
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <span className="flex items-center">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {task.date}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {task.assignee}
                </span>
              </div>
            </div>
            <Badge variant={
              task.priority === 'high' ? 'destructive' : 
              task.priority === 'medium' ? 'warning' : 'default'
            }>
              {task.priority}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
