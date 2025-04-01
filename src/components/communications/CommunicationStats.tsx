
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Mail, MessageSquare, Phone, Video } from 'lucide-react';

interface CommunicationStatsProps {
  emails: number;
  messages: number;
  calls: number;
  meetings: number;
  videoConferences: number;
}

export function CommunicationStats({
  emails,
  messages,
  calls,
  meetings,
  videoConferences
}: CommunicationStatsProps) {
  const stats = [
    { label: 'Emails', value: emails, icon: Mail, color: 'text-blue-400', bgColor: 'bg-blue-950/30' },
    { label: 'Messages', value: messages, icon: MessageSquare, color: 'text-green-400', bgColor: 'bg-green-950/30' },
    { label: 'Calls', value: calls, icon: Phone, color: 'text-yellow-400', bgColor: 'bg-yellow-950/30' },
    { label: 'Meetings', value: meetings, icon: Calendar, color: 'text-purple-400', bgColor: 'bg-purple-950/30' },
    { label: 'Video', value: videoConferences, icon: Video, color: 'text-red-400', bgColor: 'bg-red-950/30' }
  ];
  
  return (
    <Card className="border-cyan-900/30 bg-black/40 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div 
                key={index}
                className="flex flex-col items-center p-3 border border-cyan-900/20 rounded-lg bg-gradient-to-br from-transparent to-blue-950/10"
              >
                <div className={`${stat.bgColor} p-2 rounded-lg mb-2`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-blue-200">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
