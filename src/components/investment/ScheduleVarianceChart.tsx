
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Updated interface to match the data we have
interface SchedulingDataPoint {
  project: string;
  originalDuration: number;
  currentDuration: number;
}

interface ScheduleVarianceChartProps {
  data: SchedulingDataPoint[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    warning: string;
    info: string;
    background: string;
    gridLine: string;
  };
}

export const ScheduleVarianceChart: React.FC<ScheduleVarianceChartProps> = ({ data, colors }) => {
  return (
    <Card className="glass-card shadow-glow col-span-full lg:col-span-1 hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          Schedule Variance Impact
        </CardTitle>
        <CardDescription className="text-gray-400">
          Comparing original and current timelines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
              <XAxis 
                dataKey="project" 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: colors.gridLine }}
              />
              <YAxis 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: colors.gridLine }}
                label={{ 
                  value: 'Days', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#aaa' }
                }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Bar 
                dataKey="originalDuration" 
                name="Original Timeline" 
                fill={colors.primary} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar 
                dataKey="currentDuration" 
                name="Current Timeline" 
                fill={colors.accent} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
