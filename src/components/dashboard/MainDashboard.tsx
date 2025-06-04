
import React from 'react';
import { ProjectsSection } from './ProjectsSection';
import { ProjectsOverview } from './ProjectsOverview';
import { DashboardStats } from './DashboardStats';
import { FinancialOverview } from './FinancialOverview';
import { ProjectTimeline } from './ProjectTimeline';
import { RecentDocuments } from './RecentDocuments';
import { NotificationsCard } from './NotificationsCard';
import { projects } from '@/data/projects/projectData';
import { financialData } from '@/data/financials/financialData';
import { timelineEvents } from '@/data/timeline/timelineData';
import { documents } from '@/data/documents/documentData';
import { notifications } from '@/data/notifications/notificationData';

export function MainDashboard() {
  console.log('MainDashboard using projects:', projects.map(p => ({ id: p.id, title: p.title })));
  
  return (
    <div className="space-y-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProjectsSection projects={projects} />
          <FinancialOverview financialData={financialData} />
        </div>
        
        <div className="space-y-6">
          <ProjectsOverview />
          <ProjectTimeline events={timelineEvents} />
          <RecentDocuments documents={documents} />
          <NotificationsCard notifications={notifications} />
        </div>
      </div>
    </div>
  );
}
