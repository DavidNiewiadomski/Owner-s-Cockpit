
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SiteSelectionDashboard } from '@/components/site-selection/SiteSelectionDashboard';

export default function SiteSelection() {
  return (
    <DashboardLayout
      projectContext="Site Selection"
      projectName="Arsenal-1, Atlanta UAV, Quonset Point AUV"
      initialInsights={[
        {
          title: 'High-Priority Site Identified',
          content: 'Pickaway County, OH site for Arsenal-1 scores 94/100 in feasibility analysis with excellent transport access',
          type: 'success',
        },
        {
          title: 'Environmental Concern',
          content: 'Quonset Point marine environment requires additional environmental compliance - budget impact $150K',
          type: 'warning',
        },
        {
          title: 'Zoning Approval Needed',
          content: 'Atlanta UAV Allied Studios location requires zoning variance for specialized manufacturing height',
          type: 'warning',
        }
      ]}
    >
      <SiteSelectionDashboard />
    </DashboardLayout>
  );
}
