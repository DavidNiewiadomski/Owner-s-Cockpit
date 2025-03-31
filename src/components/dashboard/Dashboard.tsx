
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
      <DashboardStats 
        completionPercentage={completionPercentage}
        daysRemaining={daysRemaining}
        budgetUtilization={budgetUtilization}
        teamSize={teamSize}
      />
      
      <Tabs 
        defaultValue="overview" 
        onValueChange={(value) => setActiveTab(value)}
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
