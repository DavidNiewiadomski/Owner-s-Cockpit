
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { ShowcaseCharts } from '@/components/dashboard/ShowcaseCharts';
import { dashboardInsights } from '@/data/dashboardData';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';

const Index = () => {
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <DashboardLayout
      projectContext="Dashboard"
      projectName={selectedProject?.title || "Construction Management Suite"}
      initialInsights={dashboardInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <CustomizablePageLayout pageId="dashboard">
        <div className="space-y-8">
          <DashboardHeader />
          <ShowcaseCharts />
        </div>
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default Index;
