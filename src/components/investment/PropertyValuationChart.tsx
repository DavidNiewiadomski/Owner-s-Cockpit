
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Building } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Updated interface to match the data we have
interface ValuationDataPoint {
  month: string;
  initial: number;
  current: number;
}

interface PropertyValuationChartProps {
  data: ValuationDataPoint[];
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

export const PropertyValuationChart: React.FC<PropertyValuationChartProps> = ({ data, colors }) => {
  return (
    <Card className="glass-card shadow-glow col-span-full lg:col-span-2 hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-500" />
          Property Valuation Impact
        </CardTitle>
        <CardDescription className="text-gray-400">
          Monthly changes in property value relative to baseline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: colors.gridLine }}
              />
              <YAxis 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: colors.gridLine }}
                domain={[85, 105]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Relative Value']}
                contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.info} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.info} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="current" 
                stroke={colors.info} 
                fill="url(#colorValue)" 
                name="Relative Property Value"
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
