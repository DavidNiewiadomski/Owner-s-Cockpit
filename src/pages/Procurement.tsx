
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProcurementDashboard } from '@/components/procurement/ProcurementDashboard';

export default function Procurement() {
  return (
    <DashboardLayout
      projectContext="Procurement"
      projectName="All Projects"
      initialInsights={[
        {
          title: 'Vendor Selection',
          content: '3 RFPs pending evaluation with responses due this week',
          type: 'warning',
        },
        {
          title: 'Cost Savings',
          content: 'Negotiated 12% savings on electrical materials procurement',
          type: 'success',
        },
        {
          title: 'Delivery Delays',
          content: 'Steel delivery delayed by 2 weeks, may impact critical path',
          type: 'warning',
        }
      ]}
    >
      <ProcurementDashboard />
    </DashboardLayout>
  );
}
