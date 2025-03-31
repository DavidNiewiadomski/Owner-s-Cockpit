
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardTabContent } from '@/components/dashboard/DashboardTabContent';
import { CollapsibleAIAssistant } from '@/components/ai/CollapsibleAIAssistant';
import { ProjectSelector } from '@/components/project/ProjectSelector';

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
  
  // Define AI insights - ensure these are all strings
  const insights = [
    "Construction delays may impact your ROI by 2.3% annually",
    "Material cost increases have affected 3 of your projects",
    "Current schedule variance is within acceptable limits",
    "Equipment rental costs are 12% over budget"
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Project Dashboard" 
          description="Overview of your current construction projects"
          actions={
            <Button>New Project</Button>
          }
        />
        <div className="flex items-center pr-2 z-10">
          <ProjectSelector />
        </div>
      </div>
      
      <CollapsibleAIAssistant insights={insights} />
      
      <DashboardStats 
        completionPercentage={completionPercentage}
        daysRemaining={daysRemaining}
        budgetUtilization={budgetUtilization}
        teamSize={teamSize}
      />
      
      <Tabs 
        defaultValue="overview" 
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
        
        <TabsContent value="overview">
          <DashboardTabContent tab="overview" />
        </TabsContent>
        <TabsContent value="timeline">
          <DashboardTabContent tab="timeline" />
        </TabsContent>
        <TabsContent value="budget">
          <DashboardTabContent tab="budget" />
        </TabsContent>
        <TabsContent value="team">
          <DashboardTabContent tab="team" />
        </TabsContent>
        <TabsContent value="risks">
          <DashboardTabContent tab="risks" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
