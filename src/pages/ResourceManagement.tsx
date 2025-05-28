
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
          title: 'Equipment Utilization',
          content: 'Heavy machinery utilization at 85% capacity across all sites',
          type: 'success',
        },
        {
          title: 'Material Shortage',
          content: 'Steel reinforcement bars running low - reorder required',
          type: 'warning',
        },
        {
          title: 'Labor Allocation',
          content: 'Skilled workers overallocated by 15% this week',
          type: 'warning',
        }
      ]}
    >
      <ResourceManagementDashboard />
    </DashboardLayout>
  );
}
