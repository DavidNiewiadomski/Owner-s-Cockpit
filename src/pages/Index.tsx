
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { SiteSelectionDashboard } from '@/components/site-selection/SiteSelectionDashboard';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';

const Index = () => {
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <DashboardLayout
      projectContext="Site Selection Dashboard"
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
          title: 'Zoning Approval Needed',
          content: 'Suburban location requires zoning variance for proposed building height',
          type: 'warning',
        },
        {
          title: 'Flexsim Simulation Complete',
          content: 'Manufacturing simulation shows 94% efficiency with optimized layout design',
          type: 'success',
        }
      ]}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <CustomizablePageLayout pageId="dashboard">
        <SiteSelectionDashboard />
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default Index;
