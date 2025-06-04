
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProcurementDashboard } from '@/components/procurement/ProcurementDashboard';

export default function Procurement() {
  return (
    <DashboardLayout
      projectContext="Procurement"
      projectName="Arsenal-1, Atlanta UAV, Quonset Point AUV"
      initialInsights={[
        {
          title: 'Vendor Selection',
          content: '3 RFPs for Arsenal-1 hyperscale manufacturing equipment pending evaluation',
          type: 'warning',
        },
        {
          title: 'Cost Savings',
          content: 'Negotiated 12% savings on specialized UAV manufacturing materials for Atlanta facility',
          type: 'success',
        },
        {
          title: 'Delivery Delays',
          content: 'Marine-grade equipment delivery for Quonset Point delayed by 2 weeks',
          type: 'warning',
        }
      ]}
    >
      <ProcurementDashboard />
    </DashboardLayout>
  );
}
