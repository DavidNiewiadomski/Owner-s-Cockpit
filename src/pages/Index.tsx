
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';

const Index = () => {
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <DashboardLayout
      projectName={selectedProject?.title || "Construction Management Suite"}
      initialInsights={[
        {
          title: 'Critical Action Required: Arsenal-1 AHU-9 Filter System',
          content: 'HVAC Zone 3 temperature sensor fault detected 2 minutes ago correlates with overdue AHU-9 filter replacement ($2,500). Manufacturing environment requires immediate attention - 94% probability of system failure within 72 hours. Approve maintenance now to prevent $15K emergency repair costs.',
          type: 'warning',
        },
        {
          title: 'BMS Alert Optimization: Fire Safety System Offline',
          content: 'Atlanta Studio smoke detector offline on Floor 2 East Wing (15 min ago) requires immediate response. Cross-referencing with scheduled generator testing ($1,200) - coordinate repairs during planned maintenance window to minimize disruption and reduce contractor mobilization costs.',
          type: 'warning',
        },
        {
          title: 'Predictive Maintenance Success: Cost Bundling Opportunity',
          content: 'Quonset Point elevator inspection ($3,200) and Arsenal-1 chiller cleaning ($1,800) can be scheduled simultaneously December 15-20. This bundling reduces contractor mobilization costs by 22% ($1,100 savings) while maintaining compliance schedules.',
          type: 'success',
        },
        {
          title: 'Space Analytics Drive Facility Optimization',
          content: 'Occuspace data shows 23% food service increase trend correlating with Kadence Q1 2025 planning. Current facility ticket volume (8 critical, 15 high priority) suggests proactive restroom restocking contract negotiations could prevent 67% of supply-related tickets and save $45K annually.',
          type: 'info',
        }
      ]}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <CustomizablePageLayout pageId="dashboard">
        <MainDashboard />
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default Index;
