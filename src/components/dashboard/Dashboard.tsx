
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
  
  // Ensure we have valid numbers for all stats
  const safeCompletionPercentage = typeof completionPercentage === 'number' && !isNaN(completionPercentage) ? completionPercentage : 0;
  const safeDaysRemaining = typeof daysRemaining === 'number' && !isNaN(daysRemaining) ? daysRemaining : 0;
  const safeBudgetUtilization = typeof budgetUtilization === 'number' && !isNaN(budgetUtilization) ? budgetUtilization : 0;
  const safeTeamSize = typeof teamSize === 'number' && !isNaN(teamSize) ? teamSize : 0;
  
  return (
    <div className="space-y-6">
      <DashboardStats 
        completionPercentage={safeCompletionPercentage}
        daysRemaining={safeDaysRemaining}
        budgetUtilization={safeBudgetUtilization}
        teamSize={safeTeamSize}
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
        
        <TabsContent value="overview" className="mt-4">
          <DashboardTabContent tab="overview" />
        </TabsContent>
        <TabsContent value="timeline" className="mt-4">
          <DashboardTabContent tab="timeline" />
        </TabsContent>
        <TabsContent value="budget" className="mt-4">
          <DashboardTabContent tab="budget" />
        </TabsContent>
        <TabsContent value="team" className="mt-4">
          <DashboardTabContent tab="team" />
        </TabsContent>
        <TabsContent value="risks" className="mt-4">
          <DashboardTabContent tab="risks" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
