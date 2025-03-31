
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Updated interface to match the data we have
interface ROIDataPoint {
  month: string;
  original: number;
  current: number;
}

interface ROITrendChartProps {
  data: ROIDataPoint[];
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

export const ROITrendChart: React.FC<ROITrendChartProps> = ({ data, colors }) => {
  return (
    <Card className="glass-card shadow-glow-blue col-span-full md:col-span-2 hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Return on Investment Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: colors.gridLine }}
              />
              <YAxis 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: colors.gridLine }}
                domain={[6, 16]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="original" 
                stroke={colors.secondary} 
                strokeWidth={2} 
                activeDot={{ r: 6 }}
                name="Original ROI"
                animationDuration={1500}
              />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke={colors.accent} 
                strokeWidth={2} 
                activeDot={{ r: 6 }}
                name="Current ROI"
                strokeDasharray="5 5"
                animationDuration={1500}
                animationBegin={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
