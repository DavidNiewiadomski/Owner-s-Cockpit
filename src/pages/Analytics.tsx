
import React, { useState } from 'react';
import { SidebarNavigation } from '@/components/layout/SidebarNavigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

const projectData = [
  { name: 'East Tower', complete: 75, budget: 62, issues: 5 },
  { name: 'Westside Park', complete: 45, budget: 48, issues: 3 },
  { name: 'North Bridge', complete: 90, budget: 95, issues: 1 },
  { name: 'South Plaza', complete: 30, budget: 25, issues: 8 },
  { name: 'City Center', complete: 60, budget: 58, issues: 4 },
];

const timelineData = [
  { month: 'Jan', actual: 30, projected: 35 },
  { month: 'Feb', actual: 45, projected: 40 },
  { month: 'Mar', actual: 55, projected: 50 },
  { month: 'Apr', actual: 60, projected: 65 },
  { month: 'May', actual: 75, projected: 80 },
  { month: 'Jun', actual: 85, projected: 90 },
];

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <SidebarNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onSearch={setSearchTerm} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Assistant Section */}
            <AIAssistant />
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">Project performance metrics and insights</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Project Completion Chart */}
              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Project Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={projectData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#333', border: 'none' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="complete" name="Completion %" fill="#38bdf8" />
                        <Bar dataKey="budget" name="Budget Used %" fill="#4ade80" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Timeline Progress Chart */}
              <Card className="bg-gray-800 border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">Timeline Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timelineData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#333', border: 'none' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="actual" name="Actual Progress" stroke="#38bdf8" strokeWidth={2} />
                        <Line type="monotone" dataKey="projected" name="Projected Progress" stroke="#4ade80" strokeWidth={2} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Issues by Project */}
            <Card className="bg-gray-800 border-gray-700 shadow-lg mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Issues by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={projectData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#aaa" />
                      <YAxis dataKey="name" type="category" stroke="#aaa" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="issues" name="Open Issues" fill="#f43f5e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
