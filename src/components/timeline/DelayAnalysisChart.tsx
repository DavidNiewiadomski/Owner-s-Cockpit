
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
  // Create a function to determine the color based on variance value
  const getVarianceColor = (data: any) => {
    if (data.variance === null) return 'rgba(148, 163, 184, 0.8)';
    return data.variance < 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)';
  };

  // Custom tooltip for better UX
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 border border-cyan-800/50 p-3 rounded-md shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <p className="font-bold text-cyan-300">{data.name}</p>
          <p className="text-gray-300">Planned: <span className="text-blue-400">{data.planned} weeks</span></p>
          <p className="text-gray-300">Actual: <span className="text-purple-400">{data.actual !== null ? `${data.actual} weeks` : 'In progress'}</span></p>
          {data.variance !== null && (
            <p className={data.variance < 0 ? 'text-green-500' : 'text-red-500'}>
              Variance: {data.variance < 0 ? `${Math.abs(data.variance)} weeks ahead` : `${data.variance} weeks behind`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg border-cyan-900/30 bg-black animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-cyan-300">
          <span>Schedule Variance Analysis</span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-500/50">
              Ahead of Schedule
            </Badge>
            <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-500/50">
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
              <defs>
                {/* Add glow filters for hover effects */}
                <filter id="positiveGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#10B981" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="negativeGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#EF4444" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <filter id="neutralGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feFlood floodColor="#94A3B8" floodOpacity="0.7" result="glow" />
                  <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                  <feMerge>
                    <feMergeNode in="softGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(59, 130, 246, 0.2)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
              />
              <YAxis 
                label={{ value: 'Weeks', angle: -90, position: 'insideLeft', offset: 10, fill: '#94a3b8' }} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(59, 130, 246, 0.3)' }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{
                  fill: 'rgba(56, 189, 248, 0.1)',
                  strokeWidth: 1,
                  stroke: 'rgba(56, 189, 248, 0.4)',
                  rx: 4,
                  ry: 4
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span className="text-gray-300">{value}</span>}
              />
              <ReferenceLine y={0} stroke="rgba(59, 130, 246, 0.5)" />
              <Bar 
                dataKey="variance"
                name="Schedule Variance" 
                fill="rgba(59, 130, 246, 0.5)"
                animationDuration={1500}
                className="transition-all duration-300 ease-in-out"
                shape={(props) => {
                  const { x, y, width, height, payload } = props;
                  const color = getVarianceColor(payload);
                  return <rect x={x} y={y} width={width} height={height} fill={color} />
                }}
                onMouseOver={(data, index) => {
                  let filterId = 'neutralGlow';
                  if (data.variance !== null) {
                    filterId = data.variance < 0 ? 'positiveGlow' : 'negativeGlow';
                  }
                  document.querySelector(`.recharts-bar-rectangle:nth-child(${index + 1})`)?.setAttribute('filter', `url(#${filterId})`);
                }}
                onMouseOut={(data, index) => {
                  document.querySelector(`.recharts-bar-rectangle:nth-child(${index + 1})`)?.removeAttribute('filter');
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
