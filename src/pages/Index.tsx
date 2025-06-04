
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
          title: 'Arsenal-1 Budget Alert - Critical Action Required',
          content: 'Project is $2.4M over budget with 88% completion. Change orders CO-085 and CO-086 totaling $210K require immediate design team review to prevent further cost overruns.',
          type: 'warning',
        },
        {
          title: 'Quonset Point Schedule Recovery Opportunity',
          content: 'Despite 22% progress vs. planned timeline, accelerated foundation work could recover 3 weeks. Generator testing and crane capacity upgrades are on critical path.',
          type: 'info',
        },
        {
          title: 'Facility Management Optimization Insight',
          content: 'BMS data shows HVAC Zone 3 temperature faults correlating with Occuspace high-usage periods. Predictive maintenance on AHU-9 filters could prevent 18% of facility tickets.',
          type: 'success',
        },
        {
          title: 'Space Usage Analytics Drive Cost Savings',
          content: 'Kadence planning data indicates 23% food service increase Q1 2025. Early restroom restocking contract negotiations could save $45K annually across all properties.',
          type: 'success',
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
