
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
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
            <p className="text-muted-foreground">Your construction project management system</p>
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
        </main>
      </div>
    </div>
  );
};

export default Index;
