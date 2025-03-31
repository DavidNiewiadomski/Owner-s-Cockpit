
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ResourceData {
  name: string;
  utilization: number;
  target: number;
}

interface ResourceUtilizationChartProps {
  data: ResourceData[];
  title?: string;
}

export const ResourceUtilizationChart: React.FC<ResourceUtilizationChartProps> = ({ 
  data,
  title = "Resource Utilization"
}) => {
  const colors = {
    utilization: '#3b82f6',
    target: '#f97316',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Equipment and resource utilization analytics.</p>
        <div className="h-[300px]">
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
