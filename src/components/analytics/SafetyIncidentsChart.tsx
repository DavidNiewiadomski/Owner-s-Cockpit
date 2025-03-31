
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface SafetyData {
  name: string;
  count: number;
  severity: number;
}

interface SafetyIncidentsChartProps {
  data: SafetyData[];
  title?: string;
}

export const SafetyIncidentsChart: React.FC<SafetyIncidentsChartProps> = ({ 
  data,
  title = "Safety Incidents"
}) => {
  const colors = {
    count: '#ef4444',
    severity: '#8b5cf6',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Safety incident tracking and severity analysis.</p>
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
              <Line type="monotone" dataKey="count" stroke={colors.count} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="severity" stroke={colors.severity} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
