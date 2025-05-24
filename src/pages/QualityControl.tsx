
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { QualityControlDashboard } from '@/components/quality/QualityControlDashboard';

export default function QualityControl() {
  return (
    <DashboardLayout
      projectContext="Quality Control"
      projectName="All Projects"
      initialInsights={[
        {
          id: 'qc-1',
          title: 'Inspection Schedule',
          description: '12 quality inspections scheduled for this week',
          severity: 'info',
        },
        {
          id: 'qc-2',
          title: 'Quality Score',
          description: 'Overall quality score improved to 94.2% this month',
          severity: 'success',
        },
        {
          id: 'qc-3',
          title: 'Non-Conformance',
          description: '3 non-conformance issues require immediate attention',
          severity: 'error',
        }
      ]}
    >
      <QualityControlDashboard />
    </DashboardLayout>
  );
}
