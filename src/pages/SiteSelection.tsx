
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
          title: 'High-Priority Site Identified',
          content: 'Downtown Metro Area site scores 94/100 in feasibility analysis with excellent transport access',
          type: 'success',
        },
        {
          title: 'Environmental Concern',
          content: 'Industrial District site requires additional soil remediation - budget impact $150K',
          type: 'warning',
        },
        {
          title: 'Zoning Approval Needed',
          content: 'Suburban location requires zoning variance for proposed building height',
          type: 'warning',
        }
      ]}
    >
      <SiteSelectionDashboard />
    </DashboardLayout>
  );
}
