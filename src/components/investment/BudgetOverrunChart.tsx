
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface OverrunDataPoint {
  name: string;
  value: number;
  color: string;
}

interface BudgetOverrunChartProps {
  data: OverrunDataPoint[];
}

export const BudgetOverrunChart: React.FC<BudgetOverrunChartProps> = ({ data }) => {
  return (
    <Card className="glass-card shadow-glow-purple col-span-full lg:col-span-1 hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          Budget Overrun Breakdown
        </CardTitle>
        <CardDescription className="text-gray-400">
          Distribution of cost overruns by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ backgroundColor: '#000000', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="bottom"
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
