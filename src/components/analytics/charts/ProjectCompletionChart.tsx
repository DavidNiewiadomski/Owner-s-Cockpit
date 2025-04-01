
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ProjectData {
  name: string;
  complete: number;
  budget: number;
  issues: number;
  efficiency: number;
}

interface ProjectCompletionChartProps {
  projectData: ProjectData[];
  colors: {
    primary: string;
    secondary: string;
    gridLine: string;
  };
}

export function ProjectCompletionChart({ projectData, colors }: ProjectCompletionChartProps) {
  // Futuristic neon colors based on the reference image
  const futuristicColors = {
    primary: "#00e5ff",       // Neon cyan for completion
    secondary: "#ff5d8f",     // Neon pink for budget
    gridLine: "#222222",      // Dark gray
    background: "black",
    textColor: "#ffffff"
  };

  return (
    <Card className="bg-black border-none shadow-[0_0_15px_rgba(0,229,255,0.2)]">
      <CardHeader className="pb-2 border-b border-[#333333]">
        <CardTitle className="text-lg text-white flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-[#00e5ff]" />
          Comparing completion percentage against budget utilization
        </CardTitle>
        <CardDescription className="text-gray-400">
          Project progress vs resources utilized
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <filter id="glow-bar">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={futuristicColors.gridLine} vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#666666" 
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: futuristicColors.gridLine }}
              />
              <YAxis 
                stroke="#666666" 
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: futuristicColors.gridLine }}
                tickLine={{ stroke: futuristicColors.gridLine }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid #333333', 
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0,229,255,0.3)'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}
                itemStyle={{ padding: '4px 0', color: '#ffffff' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => <span style={{ color: '#ffffff', fontSize: '12px' }}>{value === "complete" ? "Completion %" : "Budget Used %"}</span>}
              />
              <Bar 
                dataKey="complete" 
                name="Completion %" 
                fill={futuristicColors.primary}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                filter="url(#glow-bar)"
                fillOpacity={0.8}
              />
              <Bar 
                dataKey="budget" 
                name="Budget Used %" 
                fill={futuristicColors.secondary}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
                filter="url(#glow-bar)"
                fillOpacity={0.8}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
