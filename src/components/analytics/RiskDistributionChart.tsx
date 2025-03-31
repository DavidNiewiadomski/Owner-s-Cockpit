
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface RiskData {
  name: string;
  value: number;
  color: string;
}

interface RiskDistributionChartProps {
  data: RiskData[];
}

export const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ data }) => {
  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex justify-between">
          Risk Distribution
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <InfoIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] flex justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
                formatter={(value, name) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
              <span className="text-xs text-gray-300">{entry.name}: {entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
