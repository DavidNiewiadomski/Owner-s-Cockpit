
import React, { useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { useToast } from '@/hooks/use-toast';
import { useProject } from '@/contexts/ProjectContext';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const { toast } = useToast();
  const { currentProject, projects } = useProject();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      toast({
        title: "Dashboard Updated",
        description: "Latest project data has been loaded."
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // Calculate project statistics
  // Use 0 as default if currentProject is undefined or is the "all" option
  const completionPercentage = (currentProject && 'completion' in currentProject) ? Number(currentProject.completion) : 0;
  const daysRemaining = (currentProject && 'daysRemaining' in currentProject) ? currentProject.daysRemaining : 0;
  const budgetUtilization = (currentProject && 'budgetUtilization' in currentProject) ? currentProject.budgetUtilization : 0;
  const teamSize = (currentProject && 'team' in currentProject) ? currentProject.team.length : 0;
  
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      
      <main className="flex-1 p-6 pt-0">
        <Dashboard 
          completionPercentage={completionPercentage}
          daysRemaining={daysRemaining}
          budgetUtilization={budgetUtilization}
          teamSize={teamSize}
        />
      </main>
    </div>
  );
};

export default Index;
