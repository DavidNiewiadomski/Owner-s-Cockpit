
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Construction Dashboard</h1>
        <p className="text-muted-foreground mb-6">Welcome to your project management system</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Completion</h3>
            <p className="text-2xl font-bold">65%</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Days Remaining</h3>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Budget Used</h3>
            <p className="text-2xl font-bold">72%</p>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Team Size</h3>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Project Overview</h3>
                <p className="text-muted-foreground">Your current project is 65% complete and on track for completion.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-card/50 p-4 rounded-md">
                    <h4 className="font-medium">Recent Updates</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm">Foundation completed - April 2</li>
                      <li className="text-sm">Framing started - April 5</li>
                      <li className="text-sm">Electrical inspection scheduled - April 15</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Project Timeline</h3>
                <p className="text-muted-foreground">Track your project milestones and deadlines.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-card/50 p-4 rounded-md">
                    <h4 className="font-medium">Upcoming Milestones</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm">Framing Completion - April 20</li>
                      <li className="text-sm">Roofing Start - April 25</li>
                      <li className="text-sm">Plumbing Rough-In - May 5</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="budget" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Budget Information</h3>
                <p className="text-muted-foreground">Track your project budget and expenses.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-card/50 p-4 rounded-md">
                    <h4 className="font-medium">Budget Breakdown</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Materials</span>
                        <span className="text-sm">$120,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Labor</span>
                        <span className="text-sm">$85,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Permits</span>
                        <span className="text-sm">$15,000</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-sm">Total</span>
                        <span className="text-sm">$220,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Team Members</h3>
                <p className="text-muted-foreground">Your project team and their roles.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-card/50 p-4 rounded-md">
                    <h4 className="font-medium">Key Personnel</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm">John Smith - Project Manager</li>
                      <li className="text-sm">Sarah Johnson - Lead Architect</li>
                      <li className="text-sm">Michael Brown - Site Supervisor</li>
                      <li className="text-sm">Emily Davis - Procurement Manager</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
