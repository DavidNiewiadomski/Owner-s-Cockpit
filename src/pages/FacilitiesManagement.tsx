
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FacilitiesManagementDashboard } from '@/components/facilities/FacilitiesManagementDashboard';

export default function FacilitiesManagement() {
  return (
    <DashboardLayout
      projectContext="Facilities Management"
      projectName="All Properties"
      initialInsights={[
        {
          id: 'fm-1',
          title: 'Maintenance Schedule',
          description: '15 preventive maintenance tasks scheduled for this week',
          severity: 'info',
        },
        {
          id: 'fm-2',
          title: 'Energy Efficiency',
          description: 'HVAC optimization resulted in 18% energy cost reduction',
          severity: 'success',
        },
        {
          id: 'fm-3',
          title: 'Critical Issue',
          description: 'Elevator in Building A requires immediate attention',
          severity: 'error',
        }
      ]}
    >
      <FacilitiesManagementDashboard />
    </DashboardLayout>
  );
}
