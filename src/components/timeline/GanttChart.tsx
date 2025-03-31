
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine, Legend } from 'recharts';

interface GanttChartProps {
  data: Array<{
    name: string;
    plannedStart: number;
    plannedEnd: number;
    actualStart: number | null;
    actualEnd: number | null;
    completion: number;
  }>;
}

export function GanttChart({ data }: GanttChartProps) {
  const renderPlannedBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = data[index];
    if (!item) return null;
    
    const plannedWidth = (item.plannedEnd - item.plannedStart) * (width / 56);
    const plannedX = item.plannedStart * (width / 56);
    
    return (
      <rect
        x={plannedX}
        y={y + height * 0.25}
        width={plannedWidth}
        height={height * 0.5}
        fill="#60A5FA"
        stroke="#93C5FD"
        strokeWidth={1}
        rx={4}
        ry={4}
      />
    );
  };
  
  const renderActualBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = data[index];
    if (!item || item.actualStart === null) return null;
    
    const actualWidth = item.actualEnd !== null 
      ? (item.actualEnd - item.actualStart) * (width / 56)
      : 1 * (width / 56);
    const actualX = item.actualStart * (width / 56);
    
    return (
      <rect
        x={actualX}
        y={y + height * 0.25}
        width={actualWidth}
        height={height * 0.5}
        fill="#34D399"
        stroke="#10B981"
        strokeWidth={1}
        rx={4}
        ry={4}
      />
    );
  };
  
  const renderProgressBar = (props: any) => {
    const { x, y, width, height, index } = props;
    const item = data[index];
    if (!item || item.completion <= 0) return null;
    
    const plannedDuration = item.plannedEnd - item.plannedStart;
    const progressWidth = (plannedDuration * (item.completion / 100)) * (width / 56);
    const progressX = item.plannedStart * (width / 56);
    
    return (
      <rect
        x={progressX}
        y={y + height * 0.4}
        width={progressWidth}
        height={height * 0.2}
        fill="#D946EF"
        stroke="#C4B5FD"
        strokeWidth={1}
        rx={4}
        ry={4}
      />
    );
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-white">
          <span>Gantt Chart</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-900/40 text-blue-400 border-blue-500">
              Planned
            </Badge>
            <Badge variant="outline" className="bg-green-900/40 text-green-400 border-green-500">
              Actual
            </Badge>
            <Badge variant="outline" className="bg-purple-900/40 text-purple-400 border-purple-500">
              % Complete
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.2)" />
              <XAxis 
                type="number" 
                domain={[0, 56]} 
                tickCount={15} 
                tick={{ fill: '#ffffff' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.5)' }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100} 
                tick={{ fill: '#ffffff' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.5)' }}
              />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'planned_width') return null;
                  if (name === 'actual_width') return null;
                  if (name === 'progress_width') return null;
                  if (name === 'completion') return `${value}%`;
                  return value;
                }}
                labelFormatter={(label) => label}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-800 border border-gray-600 p-3 rounded-md shadow-md">
                        <p className="font-bold text-sm mb-1 text-white">{data.name}</p>
                        <p className="text-sm text-gray-200">Planned: Week {data.plannedStart} - Week {data.plannedEnd}</p>
                        {data.actualStart !== null && (
                          <p className="text-sm text-gray-200">Actual: Week {data.actualStart}{data.actualEnd ? ` - Week ${data.actualEnd}` : ' (in progress)'}</p>
                        )}
                        <p className="font-semibold text-sm mt-1 text-gray-200">Completion: {data.completion}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                formatter={(value, entry) => (
                  <span style={{ color: '#ffffff' }}>{value}</span>
                )}
              />
              <ReferenceLine 
                x={18} 
                stroke="#ef4444" 
                strokeWidth={2} 
                label={{ 
                  value: 'Today', 
                  position: 'top', 
                  fill: '#ef4444',
                  fontSize: 12,
                  fontWeight: 'bold' 
                }} 
              />
              
              <Bar 
                dataKey="planned_width"
                name="Planned"
                fill="#3B82F6"
                stroke="#60A5FA"
                strokeWidth={1}
                shape={renderPlannedBar}
              />
              
              <Bar 
                dataKey="actual_width"
                name="Actual"
                fill="#10B981"
                stroke="#34D399"
                strokeWidth={1}
                shape={renderActualBar}
              />
              
              <Bar
                dataKey="progress_width"
                name="Progress"
                fill="#D946EF"
                stroke="#C4B5FD"
                strokeWidth={1}
                shape={renderProgressBar}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
