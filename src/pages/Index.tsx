
import React from 'react';

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
      </div>
    </div>
  );
};

export default Index;
