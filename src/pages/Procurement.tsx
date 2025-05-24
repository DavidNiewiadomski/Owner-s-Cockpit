
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
          id: 'proc-1',
          title: 'Vendor Selection',
          description: '3 RFPs pending evaluation with responses due this week',
          severity: 'warning',
        },
        {
          id: 'proc-2',
          title: 'Cost Savings',
          description: 'Negotiated 12% savings on electrical materials procurement',
          severity: 'success',
        },
        {
          id: 'proc-3',
          title: 'Delivery Delays',
          description: 'Steel delivery delayed by 2 weeks, may impact critical path',
          severity: 'error',
        }
      ]}
    >
      <ProcurementDashboard />
    </DashboardLayout>
  );
}
