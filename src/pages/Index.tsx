import React, { useState, useEffect } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useProject } from '@/contexts/ProjectContext';
import { BarChart, Calendar, Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectTimeline } from '@/components/dashboard/ProjectTimeline';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TeamMembers } from '@/components/dashboard/TeamMembers';
import { UpcomingTasks } from '@/components/dashboard/UpcomingTasks';
import { BudgetOverview } from '@/components/dashboard/BudgetOverview';
import { ProjectProgress } from '@/components/dashboard/ProjectProgress';
import { ProjectRisks } from '@/components/dashboard/ProjectRisks';

const Index = () => {
  const { toast } = useToast();
  const { currentProject, projects } = useProject();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      toast({
        title: "Dashboard Updated",
        description: "Latest project data has been loaded.",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Calculate project statistics
  const completionPercentage = currentProject ? Number(currentProject.completion) : 0;
  const daysRemaining = currentProject ? currentProject.daysRemaining : 0;
  const budgetUtilization = currentProject ? currentProject.budgetUtilization : 0;
  const teamSize = currentProject ? currentProject.team.length : 0;

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      
      <main className="flex-1 p-6 pt-0">
        <PageHeader 
          title="Project Dashboard" 
          description="Overview of your current construction projects"
          actions={
            <Button>New Project</Button>
          }
        />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <StatCard 
            title="Completion" 
            value={Number(completionPercentage)} 
            format="percent"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            description="Overall project completion"
            trend={{ value: 12, label: "from last month" }}
          />
          
          <StatCard 
            title="Timeline" 
            value={daysRemaining} 
            format="days"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            description="Days remaining"
            trend={{ value: -3, label: "fewer than expected", direction: "down" }}
          />
          
          <StatCard 
            title="Budget" 
            value={budgetUtilization} 
            format="percent"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            description="Budget utilization"
            trend={{ value: 5, label: "under budget", direction: "down" }}
          />
          
          <StatCard 
            title="Team" 
            value={teamSize} 
            format="number"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            description="Team members"
            trend={{ value: 2, label: "new this month" }}
          />
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>
                    Track the progress of your active projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectProgress />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>
                    Tasks due in the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingTasks />
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Budget Overview</CardTitle>
                  <CardDescription>
                    Financial summary of your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetOverview />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
                <CardDescription>
                  Visualize your project schedule and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectTimeline />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Details</CardTitle>
                <CardDescription>
                  Detailed breakdown of project finances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetOverview detailed />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  People working on your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamMembers />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Risks</CardTitle>
                <CardDescription>
                  Identified risks and mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectRisks />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
