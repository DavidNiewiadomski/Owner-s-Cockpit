
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

interface DelayMetricsData {
  name: string;
  planned: number;
  actual: number | null;
  variance: number | null;
}

interface DelayAnalysisChartProps {
  data: DelayMetricsData[];
}

export function DelayAnalysisChart({ data }: DelayAnalysisChartProps) {
  const getVarianceColor = (data: any) => {
    if (data.variance === null) return '#9CA3AF';
    return data.variance < 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Schedule Variance Analysis</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Ahead of Schedule
            </Badge>
            <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
              Behind Schedule
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Weeks', angle: -90, position: 'insideLeft', offset: 10 }} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border p-2 rounded-md shadow-md">
                        <p className="font-bold">{data.name}</p>
                        <p>Planned: {data.planned} weeks</p>
                        <p>Actual: {data.actual !== null ? `${data.actual} weeks` : 'In progress'}</p>
                        {data.variance !== null && (
                          <p className={data.variance < 0 ? 'text-green-500' : 'text-red-500'}>
                            Variance: {data.variance < 0 ? `${Math.abs(data.variance)} weeks ahead` : `${data.variance} weeks behind`}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar 
                dataKey="variance"
                name="Schedule Variance" 
                fill="rgba(59, 130, 246, 0.5)"
                shape={(props) => {
                  const { x, y, width, height, payload } = props;
                  const color = getVarianceColor(payload);
                  return <rect x={x} y={y} width={width} height={height} fill={color} />;
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
