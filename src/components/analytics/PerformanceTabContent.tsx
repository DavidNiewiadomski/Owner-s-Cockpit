
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from 'recharts';

interface ProjectData {
  name: string;
  complete: number;
  budget: number;
  issues: number;
  efficiency: number;
}

interface PerformanceData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface PerformanceTabContentProps {
  projectData: ProjectData[];
  performanceData: PerformanceData[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gridLine: string;
  };
}

export function PerformanceTabContent({ 
  projectData, 
  performanceData, 
  colors 
}: PerformanceTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Chart */}
        <Card className="bg-black border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-construction-400" />
              Project Completion vs Budget
            </CardTitle>
            <CardDescription className="text-gray-400">
              Comparing completion percentage against budget utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#aaa" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    axisLine={{ stroke: colors.gridLine }}
                  />
                  <YAxis 
                    stroke="#aaa" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    axisLine={{ stroke: colors.gridLine }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                    itemStyle={{ padding: '4px 0' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ paddingTop: '10px' }}
                  />
                  <Bar 
                    dataKey="complete" 
                    name="Completion %" 
                    fill={colors.primary} 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="budget" 
                    name="Budget Used %" 
                    fill={colors.secondary} 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Project Performance Radar Chart */}
        <Card className="bg-black border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-construction-400" />
              Project Performance Metrics
            </CardTitle>
            <CardDescription className="text-gray-400">
              Multi-dimensional performance comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={performanceData}>
                  <PolarGrid stroke={colors.gridLine} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                  />
                  <Radar 
                    name="Current Projects" 
                    dataKey="A" 
                    stroke={colors.primary} 
                    fill={colors.primary} 
                    fillOpacity={0.5}
                    animationDuration={1500}
                  />
                  <Radar 
                    name="Previous Period" 
                    dataKey="B" 
                    stroke={colors.secondary} 
                    fill={colors.secondary} 
                    fillOpacity={0.5}
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Issues by Project - Horizontal Bar Chart */}
      <Card className="bg-black border-gray-700 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-construction-400" />
            Issues by Project
          </CardTitle>
          <CardDescription className="text-gray-400">
            Open issues requiring attention across projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectData}
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                <XAxis 
                  type="number" 
                  stroke="#aaa"
                  tick={{ fill: '#aaa', fontSize: 12 }}
                  axisLine={{ stroke: colors.gridLine }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#aaa"
                  tick={{ fill: '#aaa', fontSize: 12 }}
                  axisLine={{ stroke: colors.gridLine }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="issues" 
                  name="Open Issues" 
                  fill={colors.accent}
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
