
import React from 'react';
import { RecentDocuments } from '@/components/dashboard/RecentDocuments';
import { NotificationsCard } from '@/components/dashboard/NotificationsCard';
import { Document } from '@/data/documents/documentData';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface DashboardSectionsProps {
  recentDocuments: Document[];
  notifications: Notification[];
}

export function DashboardSections({ recentDocuments, notifications }: DashboardSectionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      <div className="shadow-glow">
        <RecentDocuments documents={recentDocuments} />
      </div>
      <div className="shadow-glow">
        <NotificationsCard notifications={notifications} />
      </div>
    </div>
  );
}
