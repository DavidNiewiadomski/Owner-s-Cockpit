
import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';

export function ProjectTimeline() {
  const milestones = [
    { date: '2023-10-15', title: 'Project Start', status: 'completed' },
    { date: '2023-11-30', title: 'Foundation Complete', status: 'completed' },
    { date: '2024-01-15', title: 'Framing Complete', status: 'in-progress' },
    { date: '2024-03-01', title: 'Electrical & Plumbing', status: 'upcoming' },
    { date: '2024-04-30', title: 'Project Completion', status: 'upcoming' },
  ];

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center ${
            milestone.status === 'completed' ? 'bg-green-500' : 
            milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-200'
          }`}>
            {milestone.status === 'completed' && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {milestone.status === 'in-progress' && (
              <div className="h-2 w-2 rounded-full bg-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{milestone.title}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-3 w-3" />
                {milestone.date}
              </div>
            </div>
            <div className={`h-0.5 w-full mt-2 ${
              milestone.status === 'completed' ? 'bg-green-500' : 
              milestone.status === 'in-progress' ? 'bg-gradient-to-r from-blue-500 to-gray-200' : 'bg-gray-200'
            }`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
