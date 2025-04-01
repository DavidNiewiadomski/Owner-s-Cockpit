
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
  // Futuristic neon colors based on the reference image
  const futuristicColors = {
    accent: "#7c4dff",         // Purple accent
    secondary: "#00e5ff",      // Neon cyan
    gridLine: "#222222",       // Dark gray
    background: "black",
    textColor: "#ffffff"
  };

  return (
    <Card className="bg-black border-none shadow-[0_0_15px_rgba(0,229,255,0.2)]">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-lg text-white flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-[#00e5ff]" />
          Issues by Project
        </CardTitle>
        <CardDescription className="text-gray-400">
          Open issues requiring attention across projects
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectData}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              layout="vertical"
            >
              <defs>
                <linearGradient id="issueGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={futuristicColors.accent} stopOpacity={0.9}/>
                  <stop offset="100%" stopColor={futuristicColors.secondary} stopOpacity={0.9}/>
                </linearGradient>
                <filter id="glow-issue">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={futuristicColors.gridLine} horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                stroke="#666666"
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: futuristicColors.gridLine }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="#666666"
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: futuristicColors.gridLine }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #333333', 
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0,229,255,0.3)'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar 
                dataKey="issues" 
                name="Open Issues" 
                fill="url(#issueGradient)"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                filter="url(#glow-issue)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
