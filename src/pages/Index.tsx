
import React from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { useProject } from '@/contexts/ProjectContext';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ProjectOverview } from '@/components/dashboard/ProjectOverview';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';

// Simple string array for insights - explicitly typed as string[]
const dashboardInsights: string[] = [
  "Budget Alert: Current cost variance is +8.2% above contingency, mainly in structural materials",
  "Schedule Update: Project is currently tracking 3 days ahead of schedule with SPI of 1.05",
  "Quality Control: Recent inspection revealed 5 minor defects in electrical work, resolution expected by Friday",
  "Risk Alert: Supply chain disruption identified for facade materials, mitigation plan in development"
];

const Index = () => {
  const { currentProject, selectedProject } = useProject();
  
  // Calculate project statistics with safe defaults
  const completionPercentage = currentProject && typeof currentProject === 'object' && 'completion' in currentProject 
    ? (typeof currentProject.completion === 'number' ? currentProject.completion : 
       typeof currentProject.completion === 'string' ? parseFloat(currentProject.completion) : 65)
    : 65; // Default value for demo
    
  const daysRemaining = currentProject && typeof currentProject === 'object' && 'daysRemaining' in currentProject 
    ? (typeof currentProject.daysRemaining === 'number' ? currentProject.daysRemaining : 45)
    : 45; // Default value for demo
    
  const budgetUtilization = currentProject && typeof currentProject === 'object' && 'budgetUtilization' in currentProject 
    ? (typeof currentProject.budgetUtilization === 'number' ? currentProject.budgetUtilization : 72)
    : 72; // Default value for demo
    
  const teamSize = currentProject && typeof currentProject === 'object' && 'team' in currentProject && Array.isArray(currentProject.team)
    ? currentProject.team.length 
    : 24; // Default value for demo
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Owner's Dashboard" 
          subtitle="Comprehensive view of your construction projects"
        />
        
        <main className="flex-1 p-6">
          <CollapsibleAIAssistant 
            insights={dashboardInsights}
            projectName={selectedProject?.title || "All Projects"}
          />
          
          <ProjectOverview 
            projectName={selectedProject?.title || "East Tower Development"}
            projectLocation="Downtown Metro Area"
            projectType="Commercial High-Rise"
            currentPhase="Construction"
            startDate="Jan 15, 2024"
            completionDate="Dec 30, 2024"
          />
          
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
