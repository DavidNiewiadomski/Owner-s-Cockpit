
import React from 'react';
import { ProjectsOverview } from './ProjectsOverview';
import { FinancialOverview } from './FinancialOverview';
import { DashboardStats } from './DashboardStats';
import { RecentDocuments } from './RecentDocuments';
import { IntegrationsOverview } from './IntegrationsOverview';
import { mockFinancialData } from '@/data/projects/projectData';
import { documents } from '@/data/documents/documentData';
import { integrations } from '@/data/integrations/integrationData';

export function MainDashboard() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectsOverview />
        <FinancialOverview financialData={mockFinancialData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDocuments documents={documents} />
        <IntegrationsOverview integrations={integrations} />
      </div>
    </div>
  );
}
