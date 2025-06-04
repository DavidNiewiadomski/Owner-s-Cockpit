
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
          title: 'Budget Review',
          content: 'Initial budget estimates are 12% over benchmark targets for similar projects',
          type: 'warning',
        },
        {
          title: 'Site Assessment',
          content: 'Environmental assessment found potential concerns with soil quality',
          type: 'warning',
        },
        {
          title: 'Permits Processing',
          content: 'Building permits are on track for approval by next month',
          type: 'success',
        }
      ]}
    >
      <PreconstructionDashboard />
    </DashboardLayout>
  );
}
