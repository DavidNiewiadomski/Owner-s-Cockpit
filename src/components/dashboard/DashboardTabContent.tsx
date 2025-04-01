
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { ProjectProgress } from '@/components/dashboard/ProjectProgress';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TeamMembers } from '@/components/dashboard/TeamMembers';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { BudgetOverview } from '@/components/dashboard/BudgetOverview';
import { ProjectTimeline } from '@/components/dashboard/ProjectTimeline';
import { ProjectRisks } from '@/components/dashboard/ProjectRisks';

export function DashboardTabContent() {
  return (
    <>
      <TabsContent value="overview">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Track the progress of your active projects</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ProjectProgress />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your projects</CardDescription>
              </CardHeader>
              
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks due in the next 7 days</CardDescription>
              </CardHeader>
              
              <CardContent>
                <UpcomingTasks />
              </CardContent>
            </Card>
            
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Financial summary of your projects</CardDescription>
              </CardHeader>
              
              <CardContent>
                <BudgetOverview />
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Visualize your project schedule and milestones</CardDescription>
          </CardHeader>
          
          <CardContent>
            <ProjectTimeline />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="budget">
        <Card>
          <CardHeader>
            <CardTitle>Budget Details</CardTitle>
            <CardDescription>Detailed breakdown of project finances</CardDescription>
          </CardHeader>
          
          <CardContent>
            <BudgetOverview detailed={true} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="team">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>People working on your projects</CardDescription>
          </CardHeader>
          
          <CardContent>
            <TeamMembers />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="risks">
        <Card>
          <CardHeader>
            <CardTitle>Project Risks</CardTitle>
            <CardDescription>Identified risks and mitigation strategies</CardDescription>
          </CardHeader>
          
          <CardContent>
            <ProjectRisks />
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
}
