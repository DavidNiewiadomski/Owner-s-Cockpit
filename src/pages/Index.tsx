
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { dashboardInsights } from '@/data/dashboardData';
import { CustomizablePageLayout } from '@/components/customization/CustomizablePageLayout';

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
      onCustomizeClick={() => setIsCustomizationMenuOpen(true)}
    >
      <CustomizablePageLayout pageId="dashboard">
        <MainDashboard />
        {isCustomizationMenuOpen && (
          <CustomizationMenu
            isOpen={isCustomizationMenuOpen}
            onClose={() => setIsCustomizationMenuOpen(false)}
            onAddContent={(content) => {
              // Handle adding content
              setIsCustomizationMenuOpen(false);
            }}
          />
        )}
      </CustomizablePageLayout>
    </DashboardLayout>
  );
};

export default Index;
