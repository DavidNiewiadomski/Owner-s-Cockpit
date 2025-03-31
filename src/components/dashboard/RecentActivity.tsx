
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentActivity() {
  const activities = [
    { 
      user: { name: 'Alex Smith', avatar: '/placeholder.svg', initials: 'AS' },
      action: 'completed',
      item: 'Foundation inspection',
      time: '2 hours ago'
    },
    { 
      user: { name: 'Sarah Johnson', avatar: '/placeholder.svg', initials: 'SJ' },
      action: 'updated',
      item: 'Material delivery schedule',
      time: '5 hours ago'
    },
    { 
      user: { name: 'Mike Chen', avatar: '/placeholder.svg', initials: 'MC' },
      action: 'commented on',
      item: 'Electrical plans',
      time: 'Yesterday'
    },
    { 
      user: { name: 'Jamie Fox', avatar: '/placeholder.svg', initials: 'JF' },
      action: 'uploaded',
      item: 'New site photos',
      time: '2 days ago'
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm leading-none">
              <span className="font-medium">{activity.user.name}</span>
              {' '}
              <span className="text-muted-foreground">{activity.action}</span>
              {' '}
              <span className="font-medium">{activity.item}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
