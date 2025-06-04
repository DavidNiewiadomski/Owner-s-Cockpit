
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
          title: 'High-Priority Site Identified',
          content: 'Downtown Metro Area site scores 94/100 in feasibility analysis with excellent transport access',
          type: 'success',
        },
        {
          title: 'Environmental Concern',
          content: 'Industrial District site requires additional soil remediation - budget impact $150K',
          type: 'warning',
        },
        {
          title: 'Project Milestone Achieved',
          content: 'Phase 1 construction completed 2 days ahead of schedule',
          type: 'success',
        },
        {
          title: 'Budget Alert',
          content: 'Project Alpha is 5% over budget - review required',
          type: 'warning',
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
