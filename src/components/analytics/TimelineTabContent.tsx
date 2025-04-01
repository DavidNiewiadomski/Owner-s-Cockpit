
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
  // Enhanced vibrant colors
  const enhancedColors = {
    primary: "#38bdf8",        // Bright cyan
    secondary: "#a855f7",      // Vibrant purple
    gridLine: "#1e293b",       // Slate-800
    areaGradientStart: "#0284c7", // Cyan-700
    areaGradientEnd: "#38bdf8",   // Cyan-400
    tooltipBackground: "#0f172a" // Slate-900
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Timeline Progress Chart */}
        <Card className="bg-gradient-to-br from-black to-zinc-900 border-cyan-900/30 shadow-[0_4px_30px_rgba(56,189,248,0.15)]">
          <CardHeader className="pb-2 bg-gradient-to-r from-cyan-950/50 to-transparent border-b border-cyan-900/20">
            <CardTitle className="text-lg text-gradient flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-cyan-400" />
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
                  <CartesianGrid strokeDasharray="3 3" stroke={enhancedColors.gridLine} opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#aaa" 
                    tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    axisLine={{ stroke: enhancedColors.gridLine }}
                  />
                  <YAxis 
                    stroke="#aaa" 
                    tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    axisLine={{ stroke: enhancedColors.gridLine }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: enhancedColors.tooltipBackground, 
                      border: '1px solid #334155', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(56,189,248,0.3)'
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => <span style={{ color: '#cbd5e1', fontSize: '12px' }}>{value}</span>}
                  />
                  <defs>
                    <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={enhancedColors.secondary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={enhancedColors.secondary} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={enhancedColors.areaGradientStart} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={enhancedColors.areaGradientEnd} stopOpacity={0}/>
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    name="Projected Progress" 
                    stroke="transparent"
                    fill="url(#colorProjected)"
                    fillOpacity={0.5}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Actual Progress" 
                    stroke={enhancedColors.primary} 
                    strokeWidth={3}
                    dot={{ r: 5, fill: enhancedColors.primary, strokeWidth: 0, filter: 'url(#glow)' }}
                    activeDot={{ r: 7, stroke: '#fff', strokeWidth: 2, filter: 'url(#glow)' }}
                    animationDuration={2000}
                    filter="url(#glow)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    name="Projected Progress" 
                    stroke={enhancedColors.secondary} 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4, fill: enhancedColors.secondary, strokeWidth: 0 }}
                    animationDuration={2000}
                    animationBegin={300}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    name="Actual Area"
                    stroke="transparent"
                    fill="url(#colorActual)"
                    fillOpacity={0.2}
                    animationDuration={1500}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
