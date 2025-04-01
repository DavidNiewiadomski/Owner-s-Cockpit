
import React, { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { dashboardInsights } from '@/data/dashboardData';

const Index = () => {
  const { selectedProject } = useProject();
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <DashboardLayout
      projectContext="Dashboard"
      projectName={selectedProject?.title || "All Projects"}
      initialInsights={dashboardInsights}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    >
      <MainDashboard />
    </DashboardLayout>
  );
};

export default Index;
