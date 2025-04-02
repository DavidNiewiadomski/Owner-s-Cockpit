
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { dashboardInsights } from '@/data/dashboardData';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';
import { CustomizationMenu } from '@/components/customization/CustomizationMenu';

const Index = () => {
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomizationMenuOpen, setIsCustomizationMenuOpen] = useState(false);
  
  return (
    <DashboardLayout
      projectContext="Dashboard"
      projectName={selectedProject?.title || "All Projects"}
      initialInsights={dashboardInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <CustomizablePageLayout 
        pageId="dashboard"
        isCustomizationMenuOpen={isCustomizationMenuOpen}
        setIsCustomizationMenuOpen={setIsCustomizationMenuOpen}
      >
        <MainDashboard />
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default Index;
