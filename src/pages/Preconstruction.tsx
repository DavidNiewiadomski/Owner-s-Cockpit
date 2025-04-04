
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PreconstructionDashboard } from '@/components/preconstruction/PreconstructionDashboard';

export default function Preconstruction() {
  return (
    <DashboardLayout
      projectContext="Preconstruction"
      projectName="All Projects"
      initialInsights={[
        {
          id: 'pc-1',
          title: 'Budget Review',
          description: 'Initial budget estimates are 12% over benchmark targets for similar projects',
          severity: 'warning',
        },
        {
          id: 'pc-2',
          title: 'Site Assessment',
          description: 'Environmental assessment found potential concerns with soil quality',
          severity: 'error',
        },
        {
          id: 'pc-3',
          title: 'Permits Processing',
          description: 'Building permits are on track for approval by next month',
          severity: 'success',
        }
      ]}
    >
      <PreconstructionDashboard />
    </DashboardLayout>
  );
}
