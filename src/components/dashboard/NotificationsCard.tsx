
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsCardProps {
  notifications: Notification[];
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white flex items-center">
            <Bell className="h-5 w-5 mr-2 text-construction-400" />
            Notifications
          </CardTitle>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-gray-400 hover:text-white">
            <span className="text-xs">View All</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-gray-700">
          {notifications.map((notification) => (
            <li key={notification.id} className={`p-4 ${!notification.read ? 'bg-gray-750' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 mt-2 rounded-full ${!notification.read ? 'bg-construction-500' : 'bg-transparent'}`} />
                <div>
                  <h4 className="text-sm font-medium text-gray-100">{notification.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                  <span className="text-xs text-gray-500 mt-1 block">{notification.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
