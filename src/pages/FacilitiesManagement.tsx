
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FacilitiesManagementDashboard } from '@/components/facilities/FacilitiesManagementDashboard';

export default function FacilitiesManagement() {
  return (
    <DashboardLayout
      projectContext="Facilities Management"
      projectName="Arsenal-1, Atlanta UAV, Quonset Point AUV"
      initialInsights={[
        {
          title: 'Maintenance Schedule',
          content: '15 preventive maintenance tasks across Arsenal-1, Atlanta UAV, and Quonset Point facilities',
          type: 'info',
        },
        {
          title: 'Energy Efficiency',
          content: 'Arsenal-1 hyperscale HVAC optimization resulted in 18% energy cost reduction',
          type: 'success',
        },
        {
          title: 'Critical Issue',
          content: 'Specialized ventilation system in Atlanta UAV facility requires immediate attention',
          type: 'warning',
        }
      ]}
    >
      <FacilitiesManagementDashboard />
    </DashboardLayout>
  );
}
