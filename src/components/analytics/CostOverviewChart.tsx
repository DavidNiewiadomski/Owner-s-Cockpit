
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface CostData {
  name: string;
  labor: number;
  materials: number;
  equipment: number;
}

interface CostOverviewChartProps {
  data: CostData[];
}

export const CostOverviewChart: React.FC<CostOverviewChartProps> = ({ data }) => {
  const colors = {
    labor: '#3b82f6',
    materials: '#8b5cf6',
    equipment: '#06b6d4',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex justify-between">
          Cost Breakdown
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <InfoIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }} 
              />
              <Area type="monotone" dataKey="labor" stackId="1" stroke={colors.labor} fill={colors.labor} fillOpacity={0.6} />
              <Area type="monotone" dataKey="materials" stackId="1" stroke={colors.materials} fill={colors.materials} fillOpacity={0.6} />
              <Area type="monotone" dataKey="equipment" stackId="1" stroke={colors.equipment} fill={colors.equipment} fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.labor }}></div>
            <span className="text-xs text-gray-300">Labor</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.materials }}></div>
            <span className="text-xs text-gray-300">Materials</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: colors.equipment }}></div>
            <span className="text-xs text-gray-300">Equipment</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
