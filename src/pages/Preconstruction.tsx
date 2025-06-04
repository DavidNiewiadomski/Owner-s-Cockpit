
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PreconstructionDashboard } from '@/components/preconstruction/PreconstructionDashboard';

export default function Preconstruction() {
  return (
    <DashboardLayout
      projectContext="Preconstruction"
      projectName="Arsenal-1, Atlanta UAV, Quonset Point AUV"
      initialInsights={[
        {
          title: 'Budget Review',
          content: 'Arsenal-1 hyperscale manufacturing budget estimates are 12% over benchmark for similar facilities',
          type: 'warning',
        },
        {
          title: 'Site Assessment',
          content: 'Quonset Point AUV environmental assessment found marine soil stability concerns',
          type: 'warning',
        },
        {
          title: 'Permits Processing',
          content: 'Atlanta UAV Allied Studios building permits on track for approval by next month',
          type: 'success',
        }
      ]}
    >
      <PreconstructionDashboard />
    </DashboardLayout>
  );
}
