
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TimelineData {
  month: string;
  actual: number;
  projected: number;
  variance: number;
}

interface TimelineTabContentProps {
  timelineData: TimelineData[];
  colors: {
    primary: string;
    secondary: string;
    gridLine: string;
  };
}

export function TimelineTabContent({ timelineData, colors }: TimelineTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Timeline Progress Chart */}
        <Card className="bg-black border-gray-700 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-construction-400" />
              Project Timeline Progress
            </CardTitle>
            <CardDescription className="text-gray-400">
              Comparing actual progress against projected timeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={timelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.gridLine} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#aaa" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    axisLine={{ stroke: colors.gridLine }}
                  />
                  <YAxis 
                    stroke="#aaa" 
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    axisLine={{ stroke: colors.gridLine }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ paddingTop: '10px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    name="Projected Progress" 
                    stroke="transparent"
                    fill="url(#colorProjected)"
                    fillOpacity={0.3}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Progress" 
                    stroke={colors.primary} 
                    strokeWidth={3}
                    dot={{ r: 5, fill: colors.primary, strokeWidth: 0 }}
                    activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={2000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    name="Projected Progress" 
                    stroke={colors.secondary} 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: colors.secondary, strokeWidth: 0 }}
                    animationDuration={2000}
                    animationBegin={300}
                  />
                  <defs>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={colors.secondary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
