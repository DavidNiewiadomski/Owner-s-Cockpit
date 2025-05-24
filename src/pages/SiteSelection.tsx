
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SiteSelectionDashboard } from '@/components/site-selection/SiteSelectionDashboard';

export default function SiteSelection() {
  return (
    <DashboardLayout
      projectContext="Site Selection"
      projectName="All Projects"
      initialInsights={[
        {
          id: 'ss-1',
          title: 'High-Priority Site Identified',
          description: 'Downtown Metro Area site scores 94/100 in feasibility analysis with excellent transport access',
          severity: 'success',
        },
        {
          id: 'ss-2',
          title: 'Environmental Concern',
          description: 'Industrial District site requires additional soil remediation - budget impact $150K',
          severity: 'warning',
        },
        {
          id: 'ss-3',
          title: 'Zoning Approval Needed',
          description: 'Suburban location requires zoning variance for proposed building height',
          severity: 'error',
        }
      ]}
    >
      <SiteSelectionDashboard />
    </DashboardLayout>
  );
}
