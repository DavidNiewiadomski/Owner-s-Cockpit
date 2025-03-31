
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardTabContent } from '@/components/dashboard/DashboardTabContent';

interface DashboardProps {
  completionPercentage: number;
  daysRemaining: number;
  budgetUtilization: number;
  teamSize: number;
}

export function Dashboard({
  completionPercentage,
  daysRemaining,
  budgetUtilization,
  teamSize
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Project Dashboard" 
        description="Overview of your current construction projects"
        actions={
          <Button>New Project</Button>
        }
      />
      
      <DashboardStats 
        completionPercentage={completionPercentage}
        daysRemaining={daysRemaining}
        budgetUtilization={budgetUtilization}
        teamSize={teamSize}
      />
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
        </TabsList>
        
        <DashboardTabContent />
      </Tabs>
    </div>
  );
}
