
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

interface DashboardProps {
  completionPercentage: number;
  daysRemaining: number;
  budgetUtilization: number;
  teamSize: number;
}

export function Dashboard({
  completionPercentage = 0,
  daysRemaining = 0,
  budgetUtilization = 0,
  teamSize = 0
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
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Project Overview</h3>
            <p>Overview content will be displayed here.</p>
          </div>
        </TabsContent>
        <TabsContent value="timeline" className="mt-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Project Timeline</h3>
            <p>Timeline content will be displayed here.</p>
          </div>
        </TabsContent>
        <TabsContent value="budget" className="mt-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Budget Information</h3>
            <p>Budget content will be displayed here.</p>
          </div>
        </TabsContent>
        <TabsContent value="team" className="mt-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Team Members</h3>
            <p>Team content will be displayed here.</p>
          </div>
        </TabsContent>
        <TabsContent value="risks" className="mt-4">
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
            <p>Risk content will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
