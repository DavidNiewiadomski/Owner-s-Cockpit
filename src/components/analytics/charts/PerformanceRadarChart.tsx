
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceData {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

interface PerformanceRadarChartProps {
  performanceData: PerformanceData[];
  colors: {
    primary: string;
    secondary: string;
  };
}

export function PerformanceRadarChart({ performanceData, colors }: PerformanceRadarChartProps) {
  return (
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
  );
}
