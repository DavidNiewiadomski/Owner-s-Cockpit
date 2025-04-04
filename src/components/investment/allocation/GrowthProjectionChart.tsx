
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ProjectionDataPoint } from './types';

// Sample data for growth projection
const projectionData: ProjectionDataPoint[] = [
  { name: 'Current', value: 100 },
  { name: '1 Year', value: 115 },
  { name: '3 Year', value: 140 },
  { name: '5 Year', value: 180 },
];

export function GrowthProjectionChart() {
  return (
    <Card className="p-6 bg-black border-gray-800">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-medium">Growth Projection</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={projectionData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="projectionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
              </linearGradient>
              <filter id="projectionGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feFlood floodColor="#10b981" floodOpacity="0.7" result="glow" />
                <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
                <feMerge>
                  <feMergeNode in="softGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(56, 189, 248, 0.1)" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
              itemStyle={{ color: '#eee' }}
              formatter={(value) => [`${value}%`, 'Projected Value']}
              cursor={{
                stroke: 'rgba(56, 189, 248, 0.4)',
                strokeWidth: 1
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="url(#projectionGradient)" 
              strokeWidth={2} 
              activeDot={{ 
                r: 8,
                onMouseOver: (e) => {
                  e.target.setAttribute('filter', 'url(#projectionGlow)');
                },
                onMouseOut: (e) => {
                  e.target.removeAttribute('filter');
                }
              }}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#10b981",
                stroke: "#10b981"
              }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
