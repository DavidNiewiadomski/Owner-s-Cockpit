
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function TeamMembers() {
  const members = [
    {
      name: 'Alex Johnson',
      role: 'Project Manager',
      avatar: '/placeholder.svg',
      initials: 'AJ',
      status: 'active'
    },
    {
      name: 'Sarah Williams',
      role: 'Architect',
      avatar: '/placeholder.svg',
      initials: 'SW',
      status: 'active'
    },
    {
      name: 'Michael Brown',
      role: 'Civil Engineer',
      avatar: '/placeholder.svg',
      initials: 'MB',
      status: 'away'
    },
    {
      name: 'Lisa Chen',
      role: 'Contractor',
      avatar: '/placeholder.svg',
      initials: 'LC',
      status: 'active'
    },
    {
      name: 'David Rodriguez',
      role: 'Electrical Engineer',
      avatar: '/placeholder.svg',
      initials: 'DR',
      status: 'offline'
    },
  ];

  return (
    <div className="space-y-4">
      {members.map((member, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
          <Badge variant={
            member.status === 'active' ? 'default' : 
            member.status === 'away' ? 'warning' : 'secondary'
          }>
            {member.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
