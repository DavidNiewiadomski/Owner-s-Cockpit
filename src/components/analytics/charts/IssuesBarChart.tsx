
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProjectData {
  name: string;
  issues: number;
}

interface IssuesBarChartProps {
  projectData: ProjectData[];
  colors: {
    accent: string;
    gridLine: string;
  };
}

export function IssuesBarChart({ projectData, colors }: IssuesBarChartProps) {
  return (
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
  );
}
