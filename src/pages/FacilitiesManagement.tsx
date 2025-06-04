
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
          title: 'Maintenance Schedule',
          content: '15 preventive maintenance tasks scheduled for this week',
          type: 'info',
        },
        {
          title: 'Energy Efficiency',
          content: 'HVAC optimization resulted in 18% energy cost reduction',
          type: 'success',
        },
        {
          title: 'Critical Issue',
          content: 'Elevator in Building A requires immediate attention',
          type: 'warning',
        }
      ]}
    >
      <FacilitiesManagementDashboard />
    </DashboardLayout>
  );
}
