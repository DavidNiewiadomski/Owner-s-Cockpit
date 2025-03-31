
import React from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { useProject } from '@/contexts/ProjectContext';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

const Index = () => {
  const { currentProject } = useProject();
  
  // Calculate project statistics with safe defaults
  const completionPercentage = currentProject && typeof currentProject === 'object' && 'completion' in currentProject 
    ? Number(currentProject.completion) || 0
    : 0;
    
  const daysRemaining = currentProject && typeof currentProject === 'object' && 'daysRemaining' in currentProject 
    ? Number(currentProject.daysRemaining) || 0
    : 0;
    
  const budgetUtilization = currentProject && typeof currentProject === 'object' && 'budgetUtilization' in currentProject 
    ? Number(currentProject.budgetUtilization) || 0
    : 0;
    
  const teamSize = currentProject && typeof currentProject === 'object' && 'team' in currentProject && Array.isArray(currentProject.team)
    ? currentProject.team.length 
    : 0;
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Dashboard" 
          subtitle="Overview of your projects and properties"
        />
        <main className="flex-1 p-6">
          <Dashboard 
            completionPercentage={completionPercentage}
            daysRemaining={daysRemaining}
            budgetUtilization={budgetUtilization}
            teamSize={teamSize}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
