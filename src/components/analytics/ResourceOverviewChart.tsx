
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface ResourceData {
  name: string;
  utilization: number;
  target: number;
}

interface ResourceOverviewChartProps {
  data: ResourceData[];
}

export const ResourceOverviewChart: React.FC<ResourceOverviewChartProps> = ({ data }) => {
  const colors = {
    utilization: '#3b82f6',
    target: '#f97316',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex justify-between">
          Resource Utilization
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <InfoIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
              />
              <Legend />
              <Bar dataKey="utilization" fill={colors.utilization} radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill={colors.target} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
