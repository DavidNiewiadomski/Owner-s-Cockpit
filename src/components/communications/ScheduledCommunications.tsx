
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScheduledEvent {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'video';
  date: string;
  time: string;
  duration: string;
  participants: string[];
  project?: string;
}

interface ScheduledCommunicationsProps {
  events: ScheduledEvent[];
}

export function ScheduledCommunications({ events }: ScheduledCommunicationsProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-red-400" />;
      case 'call':
        return <Phone className="h-4 w-4 text-yellow-400" />;
      case 'meeting':
      default:
        return <Calendar className="h-4 w-4 text-purple-400" />;
    }
  };
  
  return (
    <Card className="border-cyan-900/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-blue-300">Upcoming Communications</CardTitle>
        <CardDescription className="text-gray-400">
          Your scheduled meetings, calls and video conferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div 
              key={event.id}
              className="p-3 border border-cyan-900/20 rounded-lg hover:bg-blue-950/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-950/50 flex items-center justify-center">
                  {getTypeIcon(event.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-blue-200">{event.title}</span>
                    <Badge variant="outline" className="text-xs border-cyan-900/30 bg-cyan-950/20 text-cyan-200">
                      {event.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {event.participants.slice(0, 3).map((participant, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-950/30 text-blue-300 border-none">
                        {participant}
                      </Badge>
                    ))}
                    
                    {event.participants.length > 3 && (
                      <Badge variant="secondary" className="bg-blue-950/30 text-blue-300 border-none">
                        +{event.participants.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  {event.project && (
                    <div className="mt-1.5">
                      <Badge variant="outline" className="text-xs border-blue-900/30 text-blue-400 bg-blue-950/20">
                        {event.project}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Calendar className="h-8 w-8 mx-auto opacity-50 mb-2" />
            <p>No upcoming communications scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
