
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ImpactChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title: string;
  description?: string;
}

export const InvestmentImpactChart: React.FC<ImpactChartProps> = ({ 
  data, 
  title, 
  description 
}) => {
  return (
    <Card className="col-span-full shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-500" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#aaa', fontSize: 12 }}
                axisLine={{ stroke: '#333' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="value" 
                name="Impact" 
                fill={(entry) => entry.color || '#3b82f6'} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
