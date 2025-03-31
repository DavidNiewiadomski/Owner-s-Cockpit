
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface ProgressData {
  name: string;
  planned: number;
  actual: number;
}

interface ProgressOverviewChartProps {
  data: ProgressData[];
}

export const ProgressOverviewChart: React.FC<ProgressOverviewChartProps> = ({ data }) => {
  const colors = {
    planned: '#22c55e',
    actual: '#f97316',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex justify-between">
          Schedule Progress
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <InfoIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
              />
              <Line type="monotone" dataKey="planned" stroke={colors.planned} strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="actual" stroke={colors.actual} strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.planned }}></div>
            <span className="text-xs text-gray-300">Planned</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.actual }}></div>
            <span className="text-xs text-gray-300">Actual</span>
          </div>
          <div className="flex-grow text-right">
            <span className="text-xs text-gray-300">Variance: -7%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
