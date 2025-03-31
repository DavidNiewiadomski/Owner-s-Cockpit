
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ProgressData {
  name: string;
  planned: number;
  actual: number;
}

interface ProgressTrackingChartProps {
  data: ProgressData[];
  title?: string;
}

export const ProgressTrackingChart: React.FC<ProgressTrackingChartProps> = ({ 
  data,
  title = "Progress Tracking"
}) => {
  const colors = {
    planned: '#22c55e',
    actual: '#f97316',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Detailed progress monitoring and schedule comparison.</p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
              />
              <Legend />
              <Line type="monotone" dataKey="planned" stroke={colors.planned} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="actual" stroke={colors.actual} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
