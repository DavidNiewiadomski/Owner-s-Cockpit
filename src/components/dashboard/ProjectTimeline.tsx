
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarDays, Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
}

interface ProjectTimelineProps {
  events: TimelineEvent[];
}

export function ProjectTimeline({ events }: ProjectTimelineProps) {
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-500';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-black border border-gray-800 rounded-lg shadow-lg p-5">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
        <CalendarDays className="h-5 w-5 mr-2 text-cyan-400" />
        Timeline
      </h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700"></div>
        
        {/* Timeline events */}
        <div className="space-y-4 ml-2">
          {events.map((event) => (
            <div key={event.id} className="relative pl-8">
              {/* Status dot */}
              <div className={cn(
                "absolute left-0 top-2 w-2.5 h-2.5 rounded-full border-2 border-black",
                getStatusColor(event.status)
              )} />
              
              <div className="bg-gray-900 rounded-md p-3 space-y-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.date}
                  </div>
                </div>
                <p className="text-xs text-gray-400">{event.description}</p>
                <div className="pt-1">
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    event.status === 'completed' && "bg-green-900/30 text-green-400",
                    event.status === 'in-progress' && "bg-blue-900/30 text-blue-400",
                    event.status === 'upcoming' && "bg-gray-700 text-gray-300",
                    event.status === 'delayed' && "bg-red-900/30 text-red-400"
                  )}>
                    {event.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
        View Full Timeline
      </button>
    </div>
  );
}
