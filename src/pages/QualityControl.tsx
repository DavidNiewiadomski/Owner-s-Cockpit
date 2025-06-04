
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { QualityControlDashboard } from '@/components/quality/QualityControlDashboard';

export default function QualityControl() {
  return (
    <DashboardLayout
      projectContext="Quality Control"
      projectName="Arsenal-1, Atlanta UAV, Quonset Point AUV"
      initialInsights={[
        {
          title: 'Inspection Schedule',
          content: '12 quality inspections scheduled across Arsenal-1, Atlanta UAV, and Quonset Point facilities',
          type: 'info',
        },
        {
          title: 'Quality Score',
          content: 'Arsenal-1 manufacturing quality score improved to 94.2% this month',
          type: 'success',
        },
        {
          title: 'Non-Conformance',
          content: '3 non-conformance issues at Quonset Point AUV plant require immediate attention',
          type: 'warning',
        }
      ]}
    >
      <QualityControlDashboard />
    </DashboardLayout>
  );
}
