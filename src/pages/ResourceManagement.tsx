
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ResourceManagementDashboard } from '@/components/resources/ResourceManagementDashboard';

export default function ResourceManagement() {
  return (
    <DashboardLayout
      projectContext="Resource Management"
      projectName="All Projects"
      initialInsights={[
        {
          id: 'res-1',
          title: 'Equipment Utilization',
          description: 'Heavy machinery utilization at 85% capacity across all sites',
          severity: 'success',
        },
        {
          id: 'res-2',
          title: 'Material Shortage',
          description: 'Steel reinforcement bars running low - reorder required',
          severity: 'warning',
        },
        {
          id: 'res-3',
          title: 'Labor Allocation',
          description: 'Skilled workers overallocated by 15% this week',
          severity: 'error',
        }
      ]}
    >
      <ResourceManagementDashboard />
    </DashboardLayout>
  );
}
