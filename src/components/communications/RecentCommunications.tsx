
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, MessageSquare, Phone, Video } from 'lucide-react';

interface Communication {
  id: string;
  type: 'email' | 'message' | 'call' | 'meeting' | 'video';
  contact: {
    name: string;
    avatar?: string;
  };
  subject?: string;
  excerpt?: string;
  date: string;
  time: string;
  project?: string;
}

interface RecentCommunicationsProps {
  communications: Communication[];
}

export function RecentCommunications({ communications }: RecentCommunicationsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-400" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-green-400" />;
      case 'call':
        return <Phone className="h-4 w-4 text-yellow-400" />;
      case 'meeting':
        return <Calendar className="h-4 w-4 text-purple-400" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-400" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="border-cyan-900/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-blue-300">Recent Communications</CardTitle>
        <CardDescription className="text-gray-400">
          Your latest interactions and discussions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {communications.length > 0 ? (
          communications.map((comm) => (
            <div 
              key={comm.id}
              className="p-3 border border-cyan-900/20 rounded-lg hover:bg-blue-950/20 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-cyan-900/40">
                  <AvatarImage src={comm.contact.avatar} alt={comm.contact.name} />
                  <AvatarFallback className="bg-blue-950/50 text-blue-200">
                    {comm.contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-blue-200">{comm.contact.name}</span>
                      {getIcon(comm.type)}
                    </div>
                    <div className="text-xs text-gray-500">{comm.date} · {comm.time}</div>
                  </div>
                  
                  {comm.subject && (
                    <div className="text-sm font-medium text-gray-300 mt-1">
                      {comm.subject}
                    </div>
                  )}
                  
                  {comm.excerpt && (
                    <div className="text-sm text-gray-400 mt-0.5 line-clamp-2">
                      {comm.excerpt}
                    </div>
                  )}
                  
                  {comm.project && (
                    <div className="mt-1.5">
                      <Badge variant="outline" className="text-xs border-blue-900/30 text-blue-400 bg-blue-950/20">
                        {comm.project}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto opacity-50 mb-2" />
            <p>No recent communications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
