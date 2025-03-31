
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface QualityData {
  name: string;
  issues: number;
  resolved: number;
}

interface QualityMetricsChartProps {
  data: QualityData[];
  title?: string;
}

export const QualityMetricsChart: React.FC<QualityMetricsChartProps> = ({ 
  data,
  title = "Quality Metrics"
}) => {
  const colors = {
    issues: '#ef4444',
    resolved: '#22c55e',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Quality issues tracking and resolution rates.</p>
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
              <Bar dataKey="issues" fill={colors.issues} radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill={colors.resolved} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
