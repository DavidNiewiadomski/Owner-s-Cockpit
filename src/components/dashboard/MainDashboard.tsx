
import React from 'react';
import { ProjectsOverview } from './ProjectsOverview';
import { FinancialOverview } from './FinancialOverview';
import { DashboardStats } from './DashboardStats';
import { RecentDocuments } from './RecentDocuments';
import { IntegrationsOverview } from './IntegrationsOverview';

export function MainDashboard() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectsOverview />
        <FinancialOverview />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDocuments />
        <IntegrationsOverview />
      </div>
    </div>
  );
}
