
import React from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNavigation />
      <div className="flex-1">
        <DashboardHeader 
          title="Owner's Dashboard" 
          subtitle="Comprehensive view of your construction projects"
        />
        
        <main className="flex-1 p-6">
          <div className="bg-card p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold mb-4">East Tower Development</h2>
            <p className="text-muted-foreground">Downtown Metro Area • Commercial High-Rise</p>
            <p className="text-muted-foreground mt-2">Current Phase: Construction</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border rounded p-4">
                <h3 className="font-medium">Start Date</h3>
                <p>Jan 15, 2024</p>
              </div>
              <div className="border rounded p-4">
                <h3 className="font-medium">Completion Date</h3>
                <p>Dec 30, 2024</p>
              </div>
            </div>
          </div>
          
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

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Project Insights</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800 border border-gray-700">
                <p className="text-sm text-gray-300">Budget Alert: Current cost variance is +8.2% above contingency, mainly in structural materials</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800 border border-gray-700">
                <p className="text-sm text-gray-300">Schedule Update: Project is currently tracking 3 days ahead of schedule with SPI of 1.05</p>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-md bg-gray-800 border border-gray-700">
                <p className="text-sm text-gray-300">Quality Control: Recent inspection revealed 5 minor defects in electrical work, resolution expected by Friday</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
