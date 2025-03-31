
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface CostData {
  name: string;
  labor: number;
  materials: number;
  equipment: number;
}

interface CostAnalysisChartProps {
  data: CostData[];
  title?: string;
}

export const CostAnalysisChart: React.FC<CostAnalysisChartProps> = ({ 
  data,
  title = "Cost Analysis"
}) => {
  const colors = {
    labor: '#3b82f6',
    materials: '#8b5cf6',
    equipment: '#06b6d4',
  };

  return (
    <Card className="border-gray-700 bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">Detailed cost breakdown and analysis will be shown here.</p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
      </CardContent>
    </Card>
  );
};
