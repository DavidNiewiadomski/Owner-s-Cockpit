
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ResourceManagementDashboard } from '@/components/resources/ResourceManagementDashboard';

export default function ResourceManagement() {
  return (
    <DashboardLayout
      projectContext="Resource Management"
      projectName="Arsenal-1, Atlanta UAV, Quonset Point AUV"
      initialInsights={[
        {
          title: 'Equipment Utilization',
          content: 'Heavy manufacturing equipment at Arsenal-1 running at 85% capacity',
          type: 'success',
        },
        {
          title: 'Material Shortage',
          content: 'Specialized carbon fiber components for Atlanta UAV production running low',
          type: 'warning',
        },
        {
          title: 'Labor Allocation',
          content: 'Marine-certified welders overallocated between Arsenal-1 and Quonset Point by 15%',
          type: 'warning',
        }
      ]}
    >
      <ResourceManagementDashboard />
    </DashboardLayout>
  );
}
