
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
          title: 'Inspection Schedule',
          content: '12 quality inspections scheduled for this week',
          type: 'info',
        },
        {
          title: 'Quality Score',
          content: 'Overall quality score improved to 94.2% this month',
          type: 'success',
        },
        {
          title: 'Non-Conformance',
          content: '3 non-conformance issues require immediate attention',
          type: 'warning',
        }
      ]}
    >
      <QualityControlDashboard />
    </DashboardLayout>
  );
}
