
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, MessageSquare } from 'lucide-react';

export function TeamMembers() {
  const team = [
    {
      id: 1,
      name: 'Jessica Wong',
      role: 'Project Manager',
      avatar: '/avatars/jessica.jpg',
      status: 'online',
      email: 'jessica.wong@example.com',
      project: 'Riverside Towers'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Lead Architect',
      avatar: '/avatars/michael.jpg',
      status: 'offline',
      email: 'michael.chen@example.com',
      project: 'Oakwood Residences'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      role: 'Structural Engineer',
      avatar: '/avatars/sarah.jpg',
      status: 'away',
      email: 'sarah.johnson@example.com',
      project: 'Metro Commercial Center'
    },
    {
      id: 4,
      name: 'David Patel',
      role: 'Site Supervisor',
      avatar: '/avatars/david.jpg',
      status: 'online',
      email: 'david.patel@example.com',
      project: 'Parkview Apartments'
    }
  ];

  return (
    <div className="space-y-4">
      {team.map((member) => (
        <Card key={member.id} className="p-4 bg-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <Badge variant={
              member.status === 'online' ? 'default' : 
              member.status === 'away' ? 'secondary' : 'outline'
            }>
              {member.status}
            </Badge>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <p>Assigned to: {member.project}</p>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
